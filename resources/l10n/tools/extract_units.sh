#! /bin/bash

indir=$1
outdir=$2
tmp=`mktemp`
tmp2=`mktemp`

declare -a languages=("cs" "da" "de" "el" "en" "es" "fi" "fr" "is" "it" "ja" "nl" "no" "se" "zh")
# declare -a languages=("en")

extract_units () {
    grep UIWord $units > $tmp
    grep unitsPrefix $tmp | grep MatchString | awk -F\" '{print "\""$4"\":\""$(NF-1)"\""}' > $tmp2-prefix
    grep unitsPrefix $tmp | grep \"unicode\" | awk -F\" '{print "\""$6"\":\""$(NF-1)"\""}' >> $tmp2-prefix
    grep unitsBase $tmp | grep singular | grep -v Less > $tmp2-singular
    grep MatchString $tmp2-singular | awk -F\" '{print "\""$4"\":\""$(NF-1)"\":\""$(NF-3)"\":\"\""}' > $tmp2
    grep \"unicode\" $tmp2-singular | awk -F\" '{print "\""$6"\":\""$(NF-1)"\":\""$(NF-3)"\":\"\""}' >> $tmp2
    grep unitsBase $tmp | grep Less > $tmp2-dual
    grep MatchString $tmp2-dual | awk -F\" '{print "\""$4"\":\""$(NF-1)"\":\""$(NF-5)"\":\""$(NF-3)"\""}' >> $tmp2
    grep \"unicode\" $tmp2-dual | awk -F\" '{print "\""$6"\":\""$(NF-1)"\":\""$(NF-5)"\":\""$(NF-3)"\""}' >> $tmp2
    grep unitsBase $tmp | grep -v singular | grep -v Less > $tmp2-plural
    grep MatchString $tmp2-plural | awk -F\" '{print "\""$4"\":\""$(NF-1)"\":\"\":\"\""}' >> $tmp2
    grep \"unicode\" $tmp2-plural | awk -F\" '{print "\""$6"\":\""$(NF-1)"\":\"\":\"\""}' >> $tmp2
    mv $tmp2-prefix $tmp-prefix
    cp $tmp2 jetzt
    mv $tmp2 $tmp
    
}


output_prefix_json () {
    echo "[" > $prefix
    echo " {" >> $prefix
    echo "  \"locale\":\""$lang"\"" >> $prefix
    echo " }," >> $prefix
    awk -F: '{print " {\n  \"key\": "$1",\n  \"mappings\": {\n    \"default\" : {\n     \"default\": "$2"\n   }\n  }\n },"}' $tmp2-prefix >> $prefix
    sed -i '$ s/.$//' $prefix
    echo "]" >> $prefix

    for i in $lines; do
        echo $i
    done
}


output_unit_json () {
    echo "[" > $out
    echo " {" >> $out
    echo "  \"locale\":\""$lang"\"" >> $out
    echo " }," >> $out
    awk -F: '{print " {\n  \"key\": "$1",\n  \"mappings\": {\n    \"default\" : {\n     \"default\": "$2",\n      \"singular\": "$3",\n      \"dual\": "$4"\n   }\n  }\n },"}' $tmp2 >> $out
    sed -i '$ s/.$//' $out
    echo "]" >> $out

    for i in $lines; do
        echo $i
    done
}


## Sort (and uniq?)
for i in ${languages[@]}; do
    lang=$i
    echo $lang
    units=$indir/$lang/units.tdl
    mkdir -p $outdir/$lang
    prefix=$outdir/$lang/prefix.json
    out=$outdir/$lang/units.json
    extract_units
    sort $tmp-prefix > $tmp2-prefix
    sort $tmp > $tmp2
    output_prefix_json
    output_unit_json
done


rm $tmp $tmp2 ## pronounce-$lang comma-$lang
