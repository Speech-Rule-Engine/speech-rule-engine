#! /bin/bash

indir=$1
outdir=$2
tmp=`mktemp`
tmp2=`mktemp`

declare -a languages=("cs" "da" "de" "el" "es" "fi" "fr" "is" "it" "ja" "nl" "no" "se" "zh")

extract_functions () {
    grep UIInput $functions | grep -v wordRef > $tmp
    grep -v \? $tmp | awk -F\" '{print "\""$4"\":\""$2"\""}' | sed s/RR_// > $tmp2
    grep \? $tmp | awk -F\" '{print "\""$(NF-1)"\":\""$(NF-3)"\""}' | sed s/RR_// >> $tmp2
    mv $tmp2 $tmp
}

## Units:
## grep -A1 UIWord fr/units.tdl | grep -v "\-\-" | sed 'N;s/\n//;'

output_json () {
    echo "[" > $out
    echo " {" >> $out
    echo "  \"locale\":\""$lang"\"" >> $out
    echo " }," >> $out
    awk -F: '{print " {\n  \"key\": "$1",\n  \"mappings\": {\n    \"default\" : {\n     \"default\": "$2"\n   }\n  }\n },"}' $tmp2 >> $out
    sed -i '$ s/.$//' $out
    echo "]" >> $out

    for i in $lines; do
        echo $i
    done
}


for i in ${languages[@]}; do
    lang=$i
    echo $lang
    functions=$indir/$lang/functions.tdl
    mkdir -p $outdir/$lang
    out=$outdir/$lang/functions.json
    extract_functions
    sort $tmp > $tmp2
    output_json
done


rm $tmp $tmp2
