speech-rule-engine
==================

NodeJS version of the ChromeVox speech rule engine.
Forked from ChromeVox release 1.31.0

Node dependencies you have to install:

     closure-library
     xmldom
     xpath
     fs
 
Using npm run

     npm install closure-library xmldom xpath fs
 
 
Build
-----

Depending on your setup you might need to adapt the NODEJS and NODE_MODULES variable in the Makefile. 
Then simply run

    make

Run
---

    bin/sre -i infile -o outfile

As an example run

    bin/sre -i samples/sample1.xml -o sample1.txt
