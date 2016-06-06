#
# Makefile for Speech Rule Engine
# Copyright 2014, Volker Sorge <Volker.Sorge@gmail.com>
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
SRC = $(SRC_DIR)/*/*.js
TARGET = $(LIB_DIR)/sre.js
DEPS = $(SRC_DIR)/deps.js
BROWSER = $(LIB_DIR)/sre_browser.js
MATHJAX = $(LIB_DIR)/mathjax-sre.js
SEMANTIC = $(LIB_DIR)/semantic.js
ENRICH = $(LIB_DIR)/enrich.js

START = $(BIN_DIR)/sre
INTERACTIVE = $(LIB_DIR)/sre4node.js
JSON_DIR = $(SRC_DIR)/mathmaps
MAPS = functions symbols units
IEMAPS_FILE = $(JSON_DIR)/mathmaps_ie.js

TEST_DIR = $(abspath ./tests)
TEST_TARGET = $(LIB_DIR)/test.js
TEST_DEPS = $(TEST_DIR)/deps.js
TEST = $(BIN_DIR)/test_sre
TEST_SRC = $(TEST_DIR)/*.js
# Use installed closure binary, NOT node.js closure.

## Separate binary
# Closure compiler as binary
# Linter as binary. 

# CLOSURE_ROOT = /opt/closure/bin
# CLOSURE_COMPILER = java -jar $(CLOSURE_ROOT)/compiler.jar
# DEPSWRITER = python $(CLOSURE_ROOT)/depswriter.py

# LINT_ROOT = $(CLOSURE_ROOT)
# GJSLINT = $(LINT_ROOT)/gjslint --strict --jsdoc -r
# FIXJSSTYLE = /usr/local/bin/fixjsstyle --strict --jsdoc -r
#######################################################################3


##################################################################
# Error flags.
# Compiling as rigidly as possible.
##################################################################
CLOSURE_ERRORS = accessControls ambiguousFunctionDecl checkDebuggerStatement checkRegExp checkTypes checkVars const constantProperty deprecated duplicate externsValidation fileoverviewTags globalThis internetExplorerChecks invalidCasts missingProperties nonStandardJsDocs strictModuleDepCheck suspiciousCode undefinedNames undefinedVars unknownDefines uselessCode visibility # es5Strict  ## This does not work with older version of the closure library!
MAKE_ERROR_FLAG = --jscomp_error=$(error)
ERROR_FLAGS = $(foreach error, $(CLOSURE_ERRORS), $(MAKE_ERROR_FLAG))

##################################################################
# Extern files.
##################################################################
EXTERN_FILES = $(shell find $(SRC_DIR) -type f -name 'externs.js')
MAKE_EXTERN_FLAG = --externs=$(extern)
EXTERN_FLAGS = $(foreach extern, $(EXTERN_FILES), $(MAKE_EXTERN_FLAG))

##################################################################
# Assembling compiler flags.
#
# Note, that depending on how we compile, we need to wrap up the 
# compiler flags to pass them through to the py script.
#
##################################################################
# For use with python script
MAKE_FLAG = $(addprefix --compiler_flags=, "$(flag)")
# For use with compiler directly:
# MAKE_FLAG = $(flag)
COMPILER_FLAGS = $(EXTERN_FLAGS) $(ERROR_FLAGS)
CLOSURE_FLAGS = $(foreach flag, $(COMPILER_FLAGS), $(MAKE_FLAG))


## Node JS modules
# Closure compiler in nodejs.
# Linter in nodejs. 
CLOSURE_LIB_NAME = closure-library
CLOSURE_LIB = $(NODE_MODULES)/$(CLOSURE_LIB_NAME)
CLOSURE_ROOT = $(CLOSURE_LIB)/closure/bin/build
COMPILER_JAR = $(NODE_MODULES)/closurecompiler/compiler/compiler.jar
CLOSURE_COMPILER = python $(CLOSURE_ROOT)/closurebuilder.py --root=$(CLOSURE_LIB)/ --root=$(SRC_DIR) --output_mode=compiled --compiler_jar=$(COMPILER_JAR) $(CLOSURE_FLAGS)
DEPSWRITER = python $(CLOSURE_ROOT)/depswriter.py

LINT_EXCLUDE_FILES = deps.js,$(IEMAPS_FILE)

LINT_ROOT = $(NODE_MODULES)/closure-linter-wrapper/tools/
GJSLINT = python $(LINT_ROOT)/gjslint.py --unix_mode --strict --jsdoc -x '$(LINT_EXCLUDE_FILES)' -r
FIXJSSTYLE = python $(LINT_ROOT)/fixjsstyle.py --strict --jsdoc -x '$(LINT_EXCLUDE_FILES)' -r

#######################################################################3
# Probably don't need those!
START_FILE := $(shell mktemp --dry-run --tmpdir=$(SRC_DIR) --suffix=.js)
INTER_FILE := $(shell mktemp --dry-run --tmpdir=$(SRC_DIR) --suffix=.js)

#######################################################################3

all: directories link deps compile start_files

directories: $(BIN_DIR)

$(BIN_DIR):
	mkdir -p $(BIN_DIR)

lint:
	$(GJSLINT) $(SRC_DIR)
	$(GJSLINT) $(TEST_DIR)


fixjsstyle:
	$(FIXJSSTYLE) $(SRC_DIR)
	$(FIXJSSTYLE) $(TEST_DIR)


compile: $(TARGET)

$(TARGET): $(SRC)
	@echo Compiling Speech Rule Engine
	@echo $^
#	@$(CLOSURE_COMPILER) --js $^ --js_output_file $(SRC_DIR)/sre.js
# The following command has to become the final namespace that gets everything together.
	@$(CLOSURE_COMPILER) --namespace="sre.Cli" --output_file $(TARGET)

deps: $(DEPS)

$(DEPS):
	@echo Building Javascript dependencies $(DEPS)
	@$(DEPSWRITER) --root_with_prefix="$(SRC_DIR) ../../../" > $(DEPS)


start_files: directories $(START) $(INTERACTIVE)

start: link $(START)

$(START): 
	@echo "Making startup script."
	@echo "#!/bin/bash" > $@
	@echo "## This script is automatically generated. Do not edit!" >> $@
	@echo "\nexport SRE_JSON_PATH=$(JSON_DIR)\n" >> $@
	@echo $(NODEJS) $(TARGET) "\$$@" >> $@
	@chmod 755 $@


interactive: directories link $(INTERACTIVE) deps

$(INTERACTIVE): 
	@echo "Making interactive script."
	@echo "// This file is automatically generated. Do not edit!\n" > $@
	@echo "process.chdir('$(SRC_DIR)');" >> $@ 
	@echo "require('closure').Closure(global);" >> $@ 
	@echo "process.env.SRE_JSON_PATH = '$(JSON_DIR)';" >> $@
	@echo "require('$(DEPS)');" >> $@ 
	@echo "goog.require('sre.System');" >> $@
	@echo "sre.System.getInstance().setupEngine({'mode': sre.Engine.Mode.ASYNC});" >> $@

CLOSURE_LIB_LINK = $(SRC_DIR)/$(CLOSURE_LIB_NAME)

link: $(CLOSURE_LIB_LINK)

$(CLOSURE_LIB_LINK): 
	@echo "Making link..."
	@ln -s $(CLOSURE_LIB) $(CLOSURE_LIB_LINK)

clean: clean_test clean_semantic clean_browser clean_enrich clean_mathjax
	rm -f $(TARGET)
	rm -f $(DEPS)
	rm -f $(START)
	rm -f $(INTERACTIVE)
	rm -f $(CLOSURE_LIB_LINK)
	$(foreach map, $(MAPS), rm -rf $(LIB_DIR)/$(map))


##################################################################
# Test environment.
##################################################################
# Extern files.
##################################################################
TEST_EXTERN_FILES = $(shell find $(TEST_DIR) -type f -name 'externs.js')
TEST_EXTERN_FLAGS = $(foreach extern, $(TEST_EXTERN_FILES), $(MAKE_EXTERN_FLAG))
TEST_FLAGS = $(foreach flag, $(TEST_EXTERN_FLAGS), $(MAKE_FLAG))

test_deps: $(TEST_DEPS)

$(TEST_DEPS):
	@echo Building Javascript dependencies in test directory $(TEST_DEPS)
	@$(DEPSWRITER) --root_with_prefix="$(TEST_DIR) ../../../" > $(TEST_DEPS)

test: directories link test_deps deps test_compile test_script run_test

test_compile: $(TEST_TARGET)

$(TEST_TARGET): $(TEST_SRC) $(SRC)
	@echo Compiling test version of Speech Rule Engine
	@echo $^
	@$(CLOSURE_COMPILER) $(TEST_FLAGS) --root=$(TEST_DIR) --namespace="sre.Tests" --output_file $(TEST_TARGET)

test_script: $(TEST)

$(TEST): 
	@echo "Making test script."
	@echo "#!/bin/bash" > $@
	@echo "## This script is automatically generated. Do not edit!" >> $@
	@echo "\nexport SRE_JSON_PATH=$(JSON_DIR)\n" >> $@
	@echo $(NODEJS) $(TEST_TARGET) "\$$@" >> $@
	@chmod 755 $@

run_test:
	@$(TEST)

clean_test:
	rm -f $(TEST_TARGET)
	rm -f $(TEST_DEPS)
	rm -f $(TEST)


## Publish the API via npm.

publish: api maps

maps: $(MAPS)

$(MAPS): 
	cp -R $(JSON_DIR)/$@ $(LIB_DIR)/$@

iemaps:
	@echo 'sre.BrowserUtil.mapsForIE = {' > $(IEMAPS_FILE)
	@for dir in $(MAPS); do\
		for i in $(JSON_DIR)/$$dir/*.json; do\
			echo '"'`basename $$i`'": '  >> $(IEMAPS_FILE); \
			cat $$i >> $(IEMAPS_FILE); \
			echo ','  >> $(IEMAPS_FILE); \
		done; \
	done
	@head -n -1 $(IEMAPS_FILE) > $(IEMAPS_FILE).tmp
	@mv $(IEMAPS_FILE).tmp $(IEMAPS_FILE)
	@echo '}\n' >> $(IEMAPS_FILE)

api: $(SRC)
	@echo Compiling Speech Rule Engine API
	@echo $^
	@$(CLOSURE_COMPILER) --namespace="sre.Api" --output_file $(TARGET)


## Other useful targets.

browser: $(SRC)
	@echo Compiling browser ready Speech Rule Engine
	@echo $^
	@$(CLOSURE_COMPILER) --namespace="sre.Browser" --output_file $(BROWSER)

clean_browser:
	rm -f $(BROWSER)

mathjax: $(SRC)
	@echo Compiling MathJax ready Speech Rule Engine
	@echo $^
	@$(CLOSURE_COMPILER) --namespace="sre.Mathjax" --output_file $(MATHJAX)

clean_mathjax:
	rm -f $(MATHJAX)

semantic: $(SRC)
	@echo Compiling browser ready Semantic Tree API
	@echo $^
	@$(CLOSURE_COMPILER) --namespace="sre.Semantic" --output_file $(SEMANTIC)

clean_semantic:
	rm -f $(SEMANTIC)

enrich: $(SRC)
	@echo Compiling browser ready MathML Enrichment API
	@echo $^
	@$(CLOSURE_COMPILER) --namespace="sre.Enrich" --output_file $(ENRICH)

clean_enrich:
	rm -f $(ENRICH)

clean_closure: clean_compiler clean_import_script

clean_compiler:
	@sed -i s/\'-d32\'//g $(CLOSURE_ROOT)/jscompiler.py

clean_import_script:
	@sed -i s/'goog.global.CLOSURE_IMPORT_SCRIPT\;'/'goog.global.CLOSURE_IMPORT_SCRIPT = null\;'/g $(CLOSURE_LIB)/closure/goog/base.js

