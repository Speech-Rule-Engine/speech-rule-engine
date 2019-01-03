## Directories and Structure



## Helper Files for L10n

Create both online forms and spreadsheets for

* Symbols. 3 columns: symbol, English, Locale (form JSON)
* Units. 4 columns: key, names, English, Locale (from JSON)
* Functions. 4 columns: key, names, English, Locale (from JSON)
* Fonts, Roles, Enclose, Navigate, MS. 3 columns: key, English, Locale (from Messages)
* Numbers, Ordinals. 2 columns: English, Locale (from special files)
* Prefixes, Summaries. 2 columns: English, Locale (from rule files)

### Notes

#### JSON files

We can automate the following processes: 

* JSON to HTML: index file with links to the single tables.
* JSON to ODS: single spreadsheets with single sheets per file.
* ODS to JSON: get content.xml and write the JSON output.

#### Messages

We can automate: 

* locale_XX.js to HTML: index file with links to the single tables.
* locale_XX.js to ODS: single spreadsheets with single sheets per message category.
* ODS to locale_XX.js: get content.xml and write the Locale file. Don't forget to
        include Func element! This can be tricky when updating.

#### Numbers

The spreadsheets are just guidelines to give an idea how the procedure should
work. So they just have to be copied to their respective online positions.

Maybe have a function to extract content and make it available as HTML.


#### Rules:

We can automate:

* Extraction of messages, checking for `[t] "mmm"` elements. The `mmm` is then
  the English to be localised.
  
Replacement can't really be automated, as they might differ per locale.


## Tool chain:

#### Javascript functionality

- [ ] Symbols to HTML
- [ ] Units, Functions to HTML


- [ ] Symbols to Spreadsheet
- [ ] Units, Functions to Spreadsheet

- [ ] Load extracted unicode and match


#### Shell scripts

- [ ] Extract unicode 
- [ ] Helper extraction from JSON/Messages/etc. for locale
- [ ] Locale update (inverse)


## Checklist:

#### Create online forms from Json:

- [ ] Symbols 
- [ ] Units
- [ ] Functions

In the form of a 


#### Create spreadsheets from Json:

- [ ] Symbols
- [ ] Units
- [ ] Functions

In the form of a 


#### Templates:

- [ ] Empty Spreadsheet (without content.xml) for generation of JSON
- [ ] Numbers Spreadsheet
- [ ] Rules Spreadsheet

