#! /bin/bash

indir=$1
outdir=$2

./extract_unicode.sh $indir $outdir
./extract_functions.sh $indir $outdir
./extract_units.sh $indir $outdir
