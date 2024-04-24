#
# Makefile for Speech Rule Engine
# Copyright 2014-2022, Volker Sorge <Volker.Sorge@gmail.com>
#
# This has been reduced to take care maps of only.

IEMAPS_PKG = $(abspath ../sre-mathmaps-ie)

# Ideally, no changes necessary beyond this point!
SRC_DIR = $(abspath ./ts)
LIB_DIR = $(abspath ./lib)
SRC = $(SRC_DIR)/**/*.ts
TARGET = $(LIB_DIR)/sre.js

JSON_SRC = $(abspath ./mathmaps)
JSON_DST = $(LIB_DIR)/mathmaps
MAPS = messages si characters functions symbols units rules
IEMAPS_FILE = $(IEMAPS_PKG)/mathmaps_ie.json
LOCALES = $(notdir $(wildcard $(JSON_SRC)/*))  ## $(foreach dir, $(MAPS), $(JSON_SRC)/$(dir))
LOC_DST = $(addprefix $(JSON_DST)/, $(addsuffix .json,$(LOCALES)))


XPLAT_DIR = $(abspath ./xplatmath)
XPLAT_DST = $(XPLAT_DIR)/mathmaps
XLOC_DST = $(addprefix $(XPLAT_DST)/, $(addsuffix .ts,$(LOCALES)))

JSON_MINIFY = pnpm json-minify

### Intermediate minified locale files for faster building
MINI_DIR = $(abspath ./minimaps)
JSON_FILES = $(wildcard $(foreach fd, $(LOCALES), $(foreach gd, $(MAPS), $(JSON_SRC)/$(fd)/$(gd)/*.json)))
MINI_SRC = $(foreach file, $(JSON_FILES), $(subst $(JSON_SRC)/, , $(file)))
MINI_DST = $(patsubst %.json, %.min, $(JSON_FILES))



#######################################################################3
# Main Targets

all: directories maps

clean: clean_json clean_iemaps
	rm -f $(TARGET)

#######################################################################3

directories: $(LIB_DIR)

$(LIB_DIR):
	mkdir -p $(LIB_DIR)


##################################################################
# Building the maps and publish the API via npm.
##################################################################

$(JSON_DST):
	@echo "Creating JSON destination."
	@mkdir -p $(JSON_DST)

maps: $(JSON_DST) clean_loc $(LOC_DST)

clean_loc:
	@if ! [ -z $(LOC) ]; then \
		echo "Deleting $(LOC).json"; \
		rm -f $(JSON_DST)/$(LOC).json; \
	fi

%.min: %.json
	@echo "Minifying " $@
	@echo $<
	@mkdir -p $(@D)
	$(JSON_MINIFY) $(patsubst %.min, %.json, $@) > $@


$(LOC_DST): $(MINI_DST)
	@echo "Creating mappings for locale `basename $@ .json`."
	@echo '{' > $@
	@for dir in $(MAPS); do\
		if [ -d $(JSON_SRC)/`basename $@ .json`/$$dir ]; then \
			for i in $(JSON_SRC)/`basename $@ .json`/$$dir/*.min; do\
				echo '"'`basename $@ .json`/$$dir/`basename $$i`'": '  >> $@; \
				cat $$i >> $@; \
				echo ','  >> $@; \
			done; \
		fi; \
	done
	@sed '$$d' $@ > $@.tmp
	@echo '}' >> $@.tmp
	@echo '' >> $@.tmp
	@mv $@.tmp $@

xplat: $(XPLAT_DST) $(XLOC_DST)

$(XPLAT_DST):
	@echo "Creating Xplatmath locale destination."
	@mkdir -p $(XPLAT_DST)

$(XLOC_DST): $(LOC_DST)
	@echo "Creating xplatmath locales" `basename $@`;
	@if [ -e $(JSON_DST)/`basename $@ .ts`.json ]; then \
		echo "export const "`basename $@ .ts`":{[key: string]: any} = " > $@; \
		cat $(JSON_DST)/`basename $@ .ts`.json >> $@; \
		echo ";" >> $@; \
	fi

iemaps: $(JSON_DST) $(IEMAPS_FILE)

$(IEMAPS_FILE): $(MINI_DST)
	@echo "Creating mappings for IE."
	@echo 'sre.BrowserUtil.mapsForIE = {' > $(IEMAPS_FILE)
	@for j in $(LOCALES); do\
		for dir in $(MAPS); do\
			echo $(JSON_SRC)/$$j/$$dir;\
			if [ -d $(JSON_SRC)/$$j/$$dir ]; then\
				for i in $(JSON_SRC)/$$j/$$dir/*.min; do\
					echo '"'`basename $$j`/$$dir/`basename $$i`'": '  >> $(IEMAPS_FILE); \
					cat $$i >> $@; \
					echo ','  >> $(IEMAPS_FILE); \
				done; \
			fi; \
		done; \
	done
	@sed '$$d' $(IEMAPS_FILE) > $(IEMAPS_FILE).tmp
	@echo '}' >> $(IEMAPS_FILE).tmp
	@echo '' >> $(IEMAPS_FILE).tmp
	@mv $(IEMAPS_FILE).tmp $(IEMAPS_FILE)


# Emacs-speak convenience
emacs: publish
	@cp $(TARGET) ../emacs-math-speak/


##################################################################
# Other cleanup targets.
##################################################################

clean_iemaps:
	rm -f $(IEMAPS_FILE)

clean_json:
	rm -rf $(JSON_DST)

clean_xplat:
	rm -rf $(XPLAT_DST)

clean_min:
	rm $(MINI_DST)
