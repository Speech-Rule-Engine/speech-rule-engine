Speech Rule Engine
==================
[![Build Status](https://travis-ci.org/zorkow/speech-rule-engine.svg?branch=master)](https://travis-ci.org/zorkow/speech-rule-engine) [![Dependencies](https://david-dm.org/zorkow/speech-rule-engine.svg)](https://david-dm.org/zorkow/speech-rule-engine) [![devDependency Status](https://david-dm.org/zorkow/speech-rule-engine/dev-status.svg)](https://david-dm.org/zorkow/speech-rule-engine#info=devDependencies) [![NPM version](https://img.shields.io/npm/v/speech-rule-engine.svg?style=flat)](https://www.npmjs.com/package/speech-rule-engine) [![NPM monthly downloads](https://img.shields.io/npm/dm/speech-rule-engine.svg?style=flat)](https://npmjs.org/package/speech-rule-engine) [![NPM total downloads](https://img.shields.io/npm/dt/speech-rule-engine.svg?style=flat)](https://npmjs.org/package/speech-rule-engine) [![Linux Build Status](https://img.shields.io/travis/zorkow/speech-rule-engine.svg?style=flat&label=Travis)](https://travis-ci.org/zorkow/speech-rule-engine) [![Coverage Status](https://coveralls.io/repos/zorkow/speech-rule-engine/badge.svg?branch=master&service=github)](https://coveralls.io/github/zorkow/speech-rule-engine?branch=master)

***

**Breaking Change:** Please move to v3.0.2 (master) or v3.1.0-beta.3 (develop). [More info here.](#breaking-change)

***

NodeJS version of the ChromeVox speech rule engine.
Forked from ChromeVox release 1.31.0

Speech rule engine (SRE) can translate XML expressions into speech strings
according to rules that can be specified in a syntax using Xpath expressions.
It was originally designed for translation of MathML and MathJax DOM elements
for the ChromeVox screen reader.  Besides the rules originally designed for the
use in ChromeVox, it also has an implemententation of the full set of Mathspeak
and Clearspeak rules, localisation into a number of languages and Braille output
currently in Nemeth.

SRE contains a library for semantic interpretation to re-represents any
mathematical expression in its own internal semantic format, overcoming the poor
design of presentation MathML by fully disassembling and reconstructing an
expression. For a better understanding of the representation have a look at its
[visualiser](https://zorkow.github.io/semantic-tree-visualiser/visualise.html).
The semantic trees can be used in their own XML format directly or used to
enrich the input MathML expressions with semantic information and speech
strings.

There are three ways of using SRE:

1. [**Node Module:**](#node-module) Download via npm. This is the easiest way to use the speech
rule engine via its Api and is the preferred option if you just want to include
it in your project.

2. [**Standalone Tool:**](#standalone-tool) Download via github and build with make. This is useful
if you want to use the speech rule engine in batch mode or interactivley to add
your own code. Or simply run it with ```npx```, for example to get all SRE
options anywhere without local installation run:

```bash
    npx speech-rule-engine -h
```

3. [**Browser Library:**](#browser-library) This gives you the option of loading
   SRE in a browser and use its full functionality on your webesites.


Node Module
-----------

Install as a node module using npm:

     npm install speech-rule-engine

Then import into a running node or a source file using require:

     require('speech-rule-engine');

### API #######

Current API functions are divided into three categories.

#### Methods that take a string containing a MathML expression:

| Method | Return Value |
| ---- | ---- |
| `toSpeech(mathml)` | Speech string for the MathML. |
| `toSemantic(mathml)` | XML representation of the semantic tree for the MathML. |
| `toJson(mathml)` | The semantic tree in JSON. |
| `toDescription(mathml)` | The array of auditory description objects of the MathML expression. |
| `toEnriched(mathml)` | The semantically enriched MathML expression. |

**Note that in asynchronous operation mode for these methods to work correctly,
it is necessary to ensure that the Engine is ready for processing. See the
engineReady flag below.**

#### Methods that take an input filename and optionally an output filename:

If the output filename is not provided, output will be written to stdout. _Note
that the file methods only work in Node!_

| Method | Return Value |
| ---- | ---- |
| `file.toSpeech(input, output)` | Speech string for the MathML. |
| `file.toSemantic(input, output)` | XML representation of the semantic tree for the MathML. |
| `file.toJson(input, output)` | The semantic tree in JSON.  |
| `file.toDescription(input, output)` | The array of auditory description objects of the MathML expression. |
| `file.toEnriched(input, output)` | The semantically enriched MathML expression. |

#### Methods for querying and controlling the engine behaviour:

| Method | Return Value |
| ---- | ---- |
| `version` | Returns SRE's version number. |
| `engineReady()` | Returns flag indicating that the engine is ready for procssing (i.e., all necessary rule files have been loaded, the engine is done updating, etc.). **This is important in asynchronous settings.** |
| `setupEngine(options)` | Takes an [options feature vector](#options) to parameterise the Speech Rule Engine. |
| `engineSetup()` | Returns the current setup of the engine as an  [options feature vector](#options). |


#### Experimental methods for navigating math expressions:

For the following methods SRE maintains an internal state, hence they are only
really useful when running in browser or in a Node REPL. Therefore, they are not
exposed via the command line interface.

| Method | Return Value |
| ---- | ---- |
| `walk(input)` | Speech string for the MathML. |
| `move(keycode)` | Speech string after the move. Keycodes are numerical strings representing cursor keys, space, enter, etc. |

For more information on keybindings for the walker see here [this dedicated
page](https://speechruleengine.org/www/keybindings.html).


### Options

There are a number of options that allow you to parameterise the Speech Rule
Engine. They can be set with the `setupEngine(options)` method, which takes an
options feature vector (an object of option/value pairs) to parameterise the
engine. The engine's setup can be queried with the `engineSetup()` method that
returns feature vector representing its current setup. Some options are quite
internal to SRE and are therefore not exposed via the command line interface.

#### Options to control speech output

| Option | Value |
| ---- | ---- |
| *domain* | Domain or subject area of speech rules (e.g., mathspeak, clearspeak).|
| *style* | Style or preference setting of speech rules (e.g., brief).|
| | In case of clearspeak, multiple preferences can be chosen using `:` as separator.|
| *locale* | Language locale in 639-1. Currently available: en, es, fr |
| *markup*| Set output markup for speech: ```none```, ```ssml```, ```sable```, ```voicexml```, ```acss```, ```ssml_step``` |
| *modality* | Set the modality SRE returns. E.g., ```speech```, ```braille```, ```prefix```, ```summary``` |

Observe that not every _domain_ (i.e., speech rule set) implements every
style. Similarly, not every speech rule set is implemneted in every locale. For
a more detailed overview of `locale, domain, style` combinations, use the
`--opt` switch on the command line interface.

#### Options for enriched MathML output

Enriched MathML output is markup that embeds the internal semantic structure SRE
uses into a modified represnentation of the original MathML. To get an idea of
the semantic tree, take a look at [its
visualisation](https://zorkow.github.io/semantic-tree-visualiser/visualise.html).

| Option | Value |
| ---- | ---- |
| *speech* | Depth to which generated speech is stored in attributes during semantic enrichment. Values are ```none```, ```shallow```, ```deep```. Default is ```none```. |
| *pprint* | Boolean flag to switch on pretty printing of output. This works on any XML style output. Default is ```true```. |
| *structure* | If set, includes a `structure` attribute in the enriched MathML that summarises the structure of the semantic tree in form of an sexpression. |

#### Options for internal control of the engine

These other options give more fine grained control of SRE. They can be useful
during development and when integrating SRE into a larger project. They are
given in decreasing order of interestingness.

| Option | Value |
| ---- | ---- |
| *json* | URL where to pull the json speech rule files from. |
| *xpath* | URL where to pull an xpath library from. This is important for environments not supporting xpath, e.g., IE or Edge. |
| *rate* | Base value for speech rate in ```ssml_step``` markup |
| *cache* | Boolean flag to switch expression caching during speech generation. Default is ```true```. |
| *strict* | Boolean flag indicating if only a directly matching rule should be used. I.e., no default rules are used in case a rule is not available for a particular domain, style, etc. Default is ```false```. |
| *mode* | The running mode for SRE: ```sync```, ```async```, ```http``` |
| | By default SRE in node is in `async`, in browser in `http`, and on CLI in `sync` mode. |

### Deprecated Options

| Option | Value |
| ---- | ---- |
| *rules* | A list of rulesets to use by SRE. This allows to artificially restrict available speech rules, which can be useful for testing and during rule development. ***Always expects a list, even if only one rule set is supplied!*** |
|| **Note that setting rule sets is no longer useful with the new rule indexing structures. It is only retained for testing purposes.** |
| *walker* | A walker to use for interactive exploration: ```None```, ```Syntax```, ```Semantic```, ```Table``` |



Standalone Tool
---------------

Install dependencies either by running:

     npm install

Or install them manually. SRE depends on the following libraries:

     google-closure-compiler
     google-closure-library
     xmldom-sre
     wicked-good-xpath
     commander
     xml-mapping


### Build #############

Depending on your setup you might need to adapt the NODEJS and NODE_MODULES
variable in the Makefile.  Then simply run

    make

This will make both the command line executable and the interactive load script.

### Run on command line ############

SRE can be run on the command line by providing a set of processing options and
either a list of input files or a inputting an XML expression manually.

    bin/sre [options] infile1 infile2 infile3 ...

For example running

    bin/sre -j -p resources/samples/sample1.xml resources/samples/sample2.xml

will return the semantic tree in JSON as well as the speech translation for the
expressions in the two sample files.
(Note, that `-p` is the default option if no processing options are given).

SRE also enables direct input from command line. For example, running

    bin/sre -j -p

will wait for a complete XML expression to be input for translation. Similarly,
shell piping is allowed:

    bin/sre -j -p < resources/samples/sample1.xml

Note, that when providing the `-o outfile` option output is saved into the given file.
However, when processing from file only the very last output is saved, while when
processing via pipes or command line input all output is saved.

### Run on command line (old) ############

__Note that the `-i` option is deprecated and will be removed in future releases.__

    bin/sre -i infile -o outfile

As an example run

    bin/sre -i resources/samples/sample1.xml -o sample1.txt

### Run interactively ############

Import into a running node process

    require('./lib/sre4node.js');

Note, that this will import the full functionality of the speech rule engine in
the sre namespace and of the closure library in the goog namespace.


### Command Line Options ###########

The following is a list of command line options for the speech rule engine.

| Short | Long | Meaning |
| ----- | ---- | :------- |
| -i | --input [name]  | Input file [name]. **This option is deprecated!** |
| -o | --output [name] | Output file [name].
||| If not given output is printed to stdout. |
| | |
| | |
| | |
| -d | --domain [name] | Domain or subject area [name]. |
||| This refers to a particular subject type of speech rules or subject area rules are defined for (e.g., mathspeak, clearspeak). |
||| If no domain parameter is provided, default is used. |
| -t | --style [name]  | Speech style [name]. |
||| Selects a particular speech style (e.g., brief). |
||| If no style parameter is provided, style default is used. |
| -c | --locale | Language locale in ISO 639-1. |
| -k | --markup [name] | Generate speech output with markup tags. Currently supported SSML, VoiceXML, Sable, ACSS (as sexpressions for Emacsspeak) |
| | |
| | |
| | |
| -p | --speech  | Generate speech output (default). |
| -a | --audit | Generate auditory descriptions (JSON format). |
| -j | --json  | Generate JSON of semantic tree. |
| -x | --xml  | Generate XML of semantic tree. |
| -P | --pprint  | When given output is pretty printed if possible. |
| | |
| | |
| | |
| -m | --mathml  | Generate enriched MathML. |
| -g | --generate [depth] | Include generated speech in enriched MathML. Supported values: none, shallow, deep  (default: none) |
| -w | --structure | Include structure attribute in enriched MathML. |
| | |
| | |
| | |
| -v | --verbose       | Verbose mode. Print additional information, useful for debugging. |
| -l | --log [name]    | Log file [name]. Verbose output is redirected to this file. |
||| If not given verbose output is printed to stdout. |
| -h | --help   | Enumerates all command line options. |
|    | --opt    | Enumerates all available options for locale, modality, domain and style. |
| -V | --version  |  Outputs the version number |

Browser Library
---------------

SRE can be used as a browser ready library giving you the option of loading it
in a browser and use its full functionality on your webesites.

### Usage #############

Build SRE with

    make browser

Then include the resulting file ``sre_browser.js`` in your website in a script tag

``` html
<script src="[URL]/sre_browser.js"></script>
```

The full functionality is now available in the ``sre`` namespace.  The most
important API functions are also available in ``SRE``.

### Configuration ####

In addition to programmatically configuring SRE using the ``setupEngine``
method, you can also include a configuration element in a website, that can take the same options as ``setupEngine``.

For example the configuration element
``` html
<script type="text/x-sre-config">
{
"json": "https://cdn.jsdelivr.net/gh/zorkow/speech-rule-engine@develop/src/mathmaps",
"xpath": "https://cdn.jsdelivr.net/gh/google/wicked-good-xpath@master/dist/wgxpath.install.js",
"domain": "mathspeak",
"style": "sbrief"
}
</script>
```
will cause SRE to load JSON files from rawgit and for IE or Edge it will also load Google's
[wicked good xpath library](https://github.com/google/wicked-good-xpath). In addition the speech rules are set to ``mathspeak`` in ``super brief`` style.

**Make sure the configuration element comes before the script tag loading SRE in your website!**



MathJax Library
--------------

This is only relevant for MathJax distributins version 2.7.X. As of version 3.0
MathJax use `sre_browser.js` library distributed in the `npm` release.

    make mathjax

generates a build specific for [MathJax](https://mathjax.org) in ``mathjax_sre.js``.
SRE can then be configured locally on webpages as described above.



Developers Notes
----------------

### Build Options

Other make targets useful during development are:

    make test

Runs all the tests using Node's assert module. Output is pretty printed to stdout.

    make lint

Runs the closure linter tool. To use this option, you need to install the node package

    npm install closure-linter-wrapper

To automatically fix some of linting errors run:

    make fixjsstyle

Note, that all JavaScript code in this repository is fully linted and compiles error free with respect to the strictest possible closure compiler settings, however, not using the ``newCheckTypes`` option.

When creating a pull request, please make sure that your code compiles and is fully linted.


### Node Package

The speech rule engine is published as a node package in fully compiled form, together with the JSON libraries for translating atomic expressions. All relevant files are in the lib subdirectory.

To publish the node package run

    npm publish

This first builds the package by executing

    make publish

This make command is also useful for local testing of the package.

### Documentation

To generate documentation from the [JSDOC](https://jsdoc.app/), simply run

    make docs

This will generate documentation for the source coude and test code in the directories ``docs/src`` and ``docs/tests``, respectively.


Removed in v3.0
---------------

The following has been removed with the release of version 3.0. You will have
to adapt your code, in case you have been using this functionality.

#### Removed Engine Setup Options


| Option | Value |
| ---- | ---- |
| *semantics* | Boolean flag to switch **OFF** semantic interpretation. **Non-semantic rule sets have been removed since v3.0.** |

#### Removed API functions #########

| Method | Return Value |
| ---- | ---- |
| `pprintXML(string)` | Returns pretty printed version of a serialised XML string. |
| | *Use the `pprint` option instead.` |


#### Removed Command Line Options #########


| Short | Long | Meaning |
| ----- | ---- | :------- |
| -s | --semantics     | Switch on semantics interpretation. |
||| **This option is now removed.** |
||| There is no longer support for non-semantic rule sets. |


## Breaking Change

Due to a breaking change in
the [commander library](https://github.com/tj/commander.js/releases/tag/v6.0.0)
old versions of SRE might break when newly installed from `npm`.  SRE relies on
commander for running its command line interface.

**Therefore, please move to SRE v3.0.2 (master) or v3.1.0-beta.3 (develop).**


If you want to run older versions of SRE, you need to manually downgrade the
`commander` package to `v5.1.0` by running 

```bash
npm install commander@5.1.0
```

Note, that the command line option `--options` has now been renamed to `--opt`.
