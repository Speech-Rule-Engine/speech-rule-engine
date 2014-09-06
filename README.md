speech-rule-engine
==================

NodeJS version of the ChromeVox speech rule engine.
Forked from ChromeVox release 1.31.0

There are two ways of using this engine. Either as a package via npm or by
building it as a standalone tool.  The former is the easiest way to use the
speech rule engine via its Api and is the preferred option if you just want to
include it in your project. The latter is useful if you want to use the speech
rule engine in batch mode or interactivley to add your own code.

Node Module
-----------

Install as a node module using npm:

     npm install speech-rule-engine

Then import into a running node or a source file using require:

     require('speech-rule-engine');
     
#### API #######

Current API functions are
     
     processExpression(mathml); 

Takes a string containing a MathML expression and returns the corresponding
speech string.

     processFile(input, output);

Takes an input file containing a MathML expression and writes the corresponding
speech string to the output file.


Standalone Engine
-----------------

Node dependencies you have to install:

     closure
     closurecompiler
     closure-library
     xmldom
     xpath
     commander
 
Using npm run

     npm install closure closurecompiler closure-library xmldom xpath commander


In version 1.43 of the closure library there is a mistake in the file 

    closure-library/closure/bin/build/jscompiler.py 

You might need to change

    # Attempt 32-bit mode if we're <= Java 1.7
    if java_version >= 1.7:
      args += ['-d32']

to 

    # Attempt 32-bit mode if we're <= Java 1.7
    if java_version <= 1.7:
      args += ['-d32']

#### Build #############

Depending on your setup you might need to adapt the NODEJS and NODE_MODULES
variable in the Makefile.  Then simply run

    make

#### Run on command line ############


    bin/sre -i infile -o outfile

As an example run

    bin/sre -i samples/sample1.xml -o sample1.txt
    
#### Run interactively ############

Import into a running node process

    require('./lib/sre4node.js');

Note, that this will import the full functionality of the speech rule engine in
the sre namespace and of the closure library in the goog namespace.
  
