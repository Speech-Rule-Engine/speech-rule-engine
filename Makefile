#
# Makefile for Speech Rule Engine
# Copyright 2014-2016, Volker Sorge <Volker.Sorge@gmail.com>
#

MODULE_NAME = node_modules
ifneq ($(wildcard ./$(MODULE_NAME)/.*),)
PREFIX = $(abspath .)
else
PREFIX =$(HOME)
endif

# Nodejs location.
NODEJS = node
NODE_MODULES = $(PREFIX)/$(MODULE_NAME)

# Ideally, no changes necessary beyond this point!
SRC_DIR = $(abspath ./src)
BIN_DIR = $(abspath ./bin)
LIB_DIR = $(abspath ./lib)
SRC = $(SRC_DIR)/**/*.js
TARGET = $(LIB_DIR)/sre.js
DEPS = $(SRC_DIR)/deps.js
BROWSER = $(LIB_DIR)/sre_browser.js
MATHJAX = $(LIB_DIR)/mathjax-sre.js
SEMANTIC = $(LIB_DIR)/semantic.js
SEMANTIC_NODE = $(LIB_DIR)/semantic-node.js
ENRICH = $(LIB_DIR)/enrich.js
LICENSE = $(SRC_DIR)/license-header.txt

INTERACTIVE = $(LIB_DIR)/sre4node.js
JSON_SRC = $(SRC_DIR)/mathmaps
JSON_DST = $(LIB_DIR)/mathmaps
MAPS = si functions symbols units rules
IEMAPS_FILE = $(JSON_DST)/mathmaps_ie.js
LOCALES = $(notdir $(wildcard $(JSON_SRC)/*))  ## $(foreach dir, $(MAPS), $(JSON_SRC)/$(dir))
LOC_SRC = $(JSON_SRC)/*  ## $(foreach dir, $(MAPS), $(JSON_SRC)/$(dir))
LOC_DST = $(addprefix $(JSON_DST)/, $(addsuffix .js,$(LOCALES)))

TEST_DIR = $(abspath ./sre-tests)
TEST_TARGET = $(LIB_DIR)/sre_test.js
TEST_RUNNER = $(TEST_DIR)/dist/sretest.js
TEST = $(BIN_DIR)/test_sre

JSDOC = $(NODE_MODULES)/.bin/jsdoc
JSDOC_FLAGS = -c $(PREFIX)/.jsdoc.json
DOCS = $(PREFIX)/docs
DOCS_SRC = $(DOCS)/src
DOCS_TESTS = $(DOCS)/tests

JSON_MINIFY = npx json-minify

##################################################################
# Error flags.
# Compiling as rigidly as possible.
# (Currently we use automatically all)
##################################################################
CLOSURE_ERRORS = accessControls\
	checkDebuggerStatement\
	checkRegExp\
	checkTypes\
	checkVars\
	closureDepMethodUsageChecks\
	conformanceViolations\
	constantProperty\
	const\
	deprecatedAnnotations\
	deprecated\
	duplicateMessage\
	duplicate\
	es5Strict\
	externsValidation\
        extraRequire\
	globalThis\
	invalidCasts\
	misplacedSuppress\
	misplacedTypeAnnotation\
	missingGetCssName\
	missingProperties\
	missingProvide\
	missingRequire\
	missingReturn\
	nonStandardJsDocs\
	strictModuleDepCheck\
        strictPrimitiveOperators\
	suspiciousCode\
	tweakValidation\
	typeInvalidation\
	undefinedNames\
	undefinedVars\
	unknownDefines\
	unusedLocalVariables\
	unusedPrivateMembers\
	untranspilableFeatures\
	uselessCode\
	violatedModuleDep\
	visibility\
#	reportUnknownTypes\
#       strictCheckTypes\
#       strictMissingProperties
MAKE_ERROR_FLAG = --jscomp_error=$(error)
ERROR_FLAGS = $(foreach error, $(CLOSURE_ERRORS), $(MAKE_ERROR_FLAG))

##################################################################
# Extern files.
# (Currently not used as they seem to be included automatically now.)
##################################################################
EXTERN_FILES = $(shell find $(SRC_DIR) -type f -name 'externs.js')
MAKE_EXTERN_FLAG = --externs=$(extern)
EXTERN_FLAGS = $(foreach extern, $(EXTERN_FILES), $(MAKE_EXTERN_FLAG))

COMPILER_FLAGS = $(EXTERN_FLAGS) $(ERROR_FLAGS)


## Node JS modules
# Closure compiler in nodejs.
# Linter in nodejs. 
CLOSURE_LIB_NAME = google-closure-library
CLOSURE_LIB = $(NODE_MODULES)/$(CLOSURE_LIB_NAME)
CLOSURE_ROOT = $(CLOSURE_LIB)/closure/bin/build
GOOG_BASE = $(CLOSURE_LIB)/closure/goog/base.js
GOOG_BASE_CLEAN = $(CLOSURE_LIB)/sre_cleaned
COMPILER_JAR = $(NODE_MODULES)/google-closure-compiler/cli.js
CLOSURE_COMPILER = $(COMPILER_JAR) --dependency_mode=PRUNE $(GOOG_BASE) $(ERROR_FLAGS) $(EXTERN_FLAGS) '!**externs.js' --output_wrapper_file $(LICENSE)
DEPSWRITER = python $(CLOSURE_ROOT)/depswriter.py

space = $(null) #
comma = ,
LINT_EXCLUDE_FILES = deps.js,$(IEMAPS_FILE)
LINT_EXCLUDE_DIRS = $(JSON_SRC),$(NODE_MODULES),$(TEST_DIR)

LINT_ROOT = $(NODE_MODULES)/closure-linter-wrapper/tools/
GJSLINT = python $(LINT_ROOT)/gjslint.py --unix_mode --strict --jsdoc -x '$(LINT_EXCLUDE_FILES)' -e '$(LINT_EXCLUDE_DIRS)'
FIXJSSTYLE = python $(LINT_ROOT)/fixjsstyle.py --strict --jsdoc -x '$(LINT_EXCLUDE_FILES)' -e '$(LINT_EXCLUDE_DIRS)' -r

#######################################################################3

all: directories deps compile start_files maps

## This is a hack to get around a closure library problem.
$(GOOG_BASE_CLEAN):
	@sed -i.bak s/"^.*@deprecated Use ES6.*"// $(GOOG_BASE)
	@touch $(GOOG_BASE_CLEAN)

directories: $(BIN_DIR)

$(BIN_DIR):
	mkdir -p $(BIN_DIR)

lint:
	$(GJSLINT) -r $(SRC_DIR)
	$(GJSLINT) --disable 0110 -r $(TEST_DIR)


fixjsstyle:
	$(FIXJSSTYLE) $(SRC_DIR)
	$(FIXJSSTYLE) $(TEST_DIR)


compile: $(TARGET)

$(TARGET): $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Cli --entry_point=goog:sre.Api --js_output_file=$(TARGET) $^

deps: $(DEPS)

$(DEPS):
	@echo Building Javascript dependencies $(DEPS)
	@$(DEPSWRITER) --root_with_prefix="$(SRC_DIR) $(SRC_DIR)" > $(DEPS)


start_files: directories $(INTERACTIVE)

interactive: directories $(INTERACTIVE) deps maps

$(INTERACTIVE): 
	@echo "Making interactive script."
	@echo "// This file is automatically generated. Do not edit!" > $@
	@echo "" > $@
	@echo "require('google-closure-library');" >> $@ 
	@echo "// Rewrite google closure script for our purposes." >> $@
	@echo "global.CLOSURE_IMPORT_SCRIPT = function(src, opt_sourceText) {" >> $@
	@echo "  if (opt_sourceText === undefined) {" >> $@
	@echo "    require((src[0] === '/' ? '' : './../') + src);" >> $@
	@echo "  } else {" >> $@
	@echo "    eval(opt_sourceText);" >> $@
	@echo "  }" >> $@
	@echo "  return true;" >> $@
	@echo "};" >> $@
	@echo "process.env.SRE_JSON_PATH = '$(JSON_DST)';" >> $@
	@echo "require('$(DEPS)');" >> $@ 
	@echo "goog.require('sre.System');" >> $@
	@echo "sre.System.setAsync()" >> $@

clean: clean_test clean_semantic clean_browser clean_enrich clean_mathjax clean_iemaps clean_json
	rm -f $(TARGET)
	rm -f $(DEPS)
	rm -f $(INTERACTIVE)


##################################################################
# Test environment.
##################################################################
# Extern files.
##################################################################

test: directories deps test_compile test_script maps run_test

test_compile: $(TEST_TARGET)

$(TEST_TARGET): $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling test version of Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Global --js_output_file=$(TEST_TARGET) $^


test_script: $(TEST)

$(TEST): 
	@echo "Making test script."
	@echo "#!/bin/bash" > $@
	@echo "## This script is automatically generated. Do not edit!" >> $@
	@echo "" >> $@
	@echo "export SRE_JSON_PATH=$(JSON_DST)" >> $@
	@echo "" >> $@
	@echo $(NODEJS) $(TEST_RUNNER) "\$$@" >> $@
	@chmod 755 $@

run_test: $(TEST_RUNNER)
	@$(TEST)

$(TEST_RUNNER): $(TEST_DIR)/node_modules
	@cd $(TEST_DIR); npm run prepare
	@cd ..

## Using webpack instead.
## @cd $(TEST_DIR); npx webpack

$(TEST_DIR)/node_modules:
	@cd $(TEST_DIR); npm install
	@cd ..


clean_test:
	rm -f $(TEST_TARGET)
	rm -f $(TEST_RUNNER)
	rm -f $(TEST)
	rm -f tests

###
### This is for local tests, assuming that sre-tests repo is in parallel to the
### speech-rule-engine directory. This allows easier changes in sre-tests
### without having to bother with commits from a git submodule.
###
### Call with: make test_local TEST_DIR=tests
###
test_local: tests test

tests:
	@ln -s ../sre-tests tests
	@echo $(TEST_DIR)

##################################################################
# Publish the API via npm.
##################################################################

publish: clean compile browser maps iemaps

$(JSON_DST):
	@echo "Creating JSON destination."
	@mkdir -p $(JSON_DST)

maps: $(JSON_DST) clean_loc $(LOC_DST)

clean_loc:
	@if ! [ -z $(LOC) ]; then \
		echo "Deleting $(LOC).js"; \
		rm -f $(JSON_DST)/$(LOC).js; \
	fi

$(LOC_DST):
	@echo "Creating mappings for locale `basename $@ .js`."
	@echo '{' > $@
	@for dir in $(MAPS); do\
		if [ -d $(JSON_SRC)/`basename $@ .js`/$$dir ]; then \
			for i in $(JSON_SRC)/`basename $@ .js`/$$dir/*.js; do\
				echo '"'`basename $@ .js`/$$dir/`basename $$i`'": '  >> $@; \
				$(JSON_MINIFY) $$i >> $@; \
				echo ','  >> $@; \
			done; \
		fi; \
	done
	@sed '$$d' $@ > $@.tmp
	@echo '}' >> $@.tmp
	@echo '' >> $@.tmp
	@mv $@.tmp $@

iemaps: $(JSON_DST) $(IEMAPS_FILE)

$(IEMAPS_FILE):
	@echo "Creating mappings for IE."
	@echo 'sre.BrowserUtil.mapsForIE = {' > $(IEMAPS_FILE)
	@for j in $(LOCALES); do\
		for dir in $(MAPS); do\
			echo $(JSON_SRC)/$$j/$$dir;\
			if [ -d $(JSON_SRC)/$$j/$$dir ]; then\
				for i in $(JSON_SRC)/$$j/$$dir/*.js; do\
					echo '"'`basename $$j`/$$dir/`basename $$i`'": '  >> $(IEMAPS_FILE); \
					$(JSON_MINIFY) $$i >> $(IEMAPS_FILE); \
					echo ','  >> $(IEMAPS_FILE); \
				done; \
			fi; \
		done; \
	done
	@sed '$$d' $(IEMAPS_FILE) > $(IEMAPS_FILE).tmp
	@echo '}' >> $(IEMAPS_FILE).tmp
	@echo '' >> $(IEMAPS_FILE).tmp
	@mv $(IEMAPS_FILE).tmp $(IEMAPS_FILE)

api: $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling Speech Rule Engine API
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Api --js_output_file=$(TARGET) $^


##################################################################
# Other useful targets.
##################################################################

browser: $(BROWSER) maps

$(BROWSER): $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling browser ready Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Browser --js_output_file=$(BROWSER) $^

clean_browser:
	rm -f $(BROWSER)

mathjax: $(MATHJAX) maps

$(MATHJAX): $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling MathJax ready Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Mathjax --js_output_file=$(MATHJAX) $^

clean_mathjax:
	rm -f $(MATHJAX)

semantic: $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling browser ready Semantic Tree API
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Semantic --js_output_file=$(SEMANTIC) $^

clean_semantic:
	rm -f $(SEMANTIC)

semantic_node: $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling Semantic Tree API for Node
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.SemanticApi --js_output_file=$(SEMANTIC_NODE) $^

clean_semantic_node:
	rm -f $(SEMANTIC_NODE)

enrich: $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling browser ready MathML Enrichment API
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Enrich --js_output_file=$(ENRICH) $^

clean_enrich:
	rm -f $(ENRICH)

emacs: publish
	@cp $(TARGET) ../emacs-math-speak/

docs: $(JSDOC)
	@$(JSDOC) $(JSDOC_FLAGS) $(SRC) -r -d $(DOCS_SRC)
	@$(JSDOC) $(JSDOC_FLAGS) $(TEST_DIR) -r -d $(DOCS_TESTS)

clean_docs:
	rm -rf $(DOCS)

clean_iemaps:
	rm -f $(IEMAPS_FILE)

clean_json:
	rm -rf $(JSON_DST)
