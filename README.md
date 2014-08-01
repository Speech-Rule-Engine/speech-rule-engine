speech-rule-engine
==================

NodeJS version of the ChromeVox speech rule engine.
Forked from ChromeVox release 1.31.0

There are two ways of useing this engine. Either as a package via npm or by building it as a standalone tool. 

Node Module
-----------

Install as a node module using npm:

     npm install speech-rule-engine

Then import into a running node or a source file using require:

     require('speech-rule-engine');
     
### API #######

Current API functions are
     
     processExpression(mathml); 

Takes a string containing a MathML expression and returns the corresponding speech string.

     processFile(input, output);

Takes an input file containing a MathML expression and writes the corresponding speech string to the output file.


Standalone Engine
-----------------

Node dependencies you have to install:

     closure-library
     xmldom
     xpath
     commander
 
Using npm run

     npm install closure-library xmldom xpath commander
 
 
### Build #############

Depending on your setup you might need to adapt the NODEJS and NODE_MODULES variable in the Makefile. 
Then simply run

    make

### Run  ############


    bin/sre -i infile -o outfile

As an example run

    bin/sre -i samples/sample1.xml -o sample1.txt
