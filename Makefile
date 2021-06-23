#
# Makefile for Speech Rule Engine
# Copyright 2014-2021, Volker Sorge <Volker.Sorge@gmail.com>
#
# This has been reduced to take care maps of only.

MODULE_NAME = node_modules
ifneq ($(wildcard ./$(MODULE_NAME)/.*),)
PREFIX = $(abspath .)
else
PREFIX =$(HOME)
endif

# Nodejs location.
NODEJS = node
NODE_MODULES = $(PREFIX)/$(MODULE_NAME)

IEMAPS_PKG = $(abspath ../sre-mathmaps-ie)

# Ideally, no changes necessary beyond this point!
SRC_DIR = $(abspath ./ts)
BIN_DIR = $(abspath ./bin)
LIB_DIR = $(abspath ./lib)
SRC = $(SRC_DIR)/**/*.js
TARGET = $(LIB_DIR)/sre.js
MATHJAX = $(LIB_DIR)/mathjax-sre.js
LICENSE = $(SRC_DIR)/license-header.txt

JSON_SRC = $(abspath ./mathmaps)
JSON_DST = $(LIB_DIR)/mathmaps
MAPS = messages si functions symbols units rules
IEMAPS_FILE = $(IEMAPS_PKG)/mathmaps_ie.json
LOCALES = $(notdir $(wildcard $(JSON_SRC)/*))  ## $(foreach dir, $(MAPS), $(JSON_SRC)/$(dir))
LOC_SRC = $(JSON_SRC)/*  ## $(foreach dir, $(MAPS), $(JSON_SRC)/$(dir))
LOC_DST = $(addprefix $(JSON_DST)/, $(addsuffix .json,$(LOCALES)))

TEST_DIR = $(abspath ./sre-tests)
TEST_RUNNER = $(TEST_DIR)/dist/sretest.js
TEST = $(BIN_DIR)/test_sre

JSDOC = $(NODE_MODULES)/.bin/jsdoc
JSDOC_FLAGS = -c $(PREFIX)/.jsdoc.json
DOCS = $(PREFIX)/docs
DOCS_SRC = $(DOCS)/src
DOCS_TESTS = $(DOCS)/tests

JSON_MINIFY = npx json-minify

#######################################################################3

all: directories maps

directories: $(BIN_DIR) $(LIB_DIR)

$(BIN_DIR):
	mkdir -p $(BIN_DIR)

$(LIB_DIR):
	mkdir -p $(LIB_DIR)

clean: clean_json clean_mathjax
	rm -f $(TARGET)


##################################################################
# Building the maps and publish the API via npm.
##################################################################

publish: maps

$(JSON_DST):
	@echo "Creating JSON destination."
	@mkdir -p $(JSON_DST)

maps: $(JSON_DST) clean_loc $(LOC_DST)

clean_loc:
	@if ! [ -z $(LOC) ]; then \
		echo "Deleting $(LOC).json"; \
		rm -f $(JSON_DST)/$(LOC).json; \
	fi

$(LOC_DST):
	@echo "Creating mappings for locale `basename $@ .json`."
	@echo '{' > $@
	@for dir in $(MAPS); do\
		if [ -d $(JSON_SRC)/`basename $@ .json`/$$dir ]; then \
			for i in $(JSON_SRC)/`basename $@ .json`/$$dir/*.json; do\
				echo '"'`basename $@ .json`/$$dir/`basename $$i`'": '  >> $@; \
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
				for i in $(JSON_SRC)/$$j/$$dir/*.json; do\
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


##################################################################
# Other useful targets.
##################################################################

mathjax: $(MATHJAX) maps

$(MATHJAX): $(GOOG_BASE_CLEAN) $(SRC)
	@echo Compiling MathJax ready Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Mathjax --js_output_file=$(MATHJAX) $^

clean_mathjax:
	rm -f $(MATHJAX)

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
