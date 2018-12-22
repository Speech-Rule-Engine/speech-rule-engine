#! /bin/bash

indir=$1
outdir=$2
tmp=`mktemp`
tmp2=`mktemp`

declare -a languages=("cs" "da" "de" "el" "es" "fi" "fr" "is" "it" "ja" "nl" "no" "se" "zh")

extract_unicode () {
    grep "char ?.*==" $unicode | grep -v "Blind" | grep -v "exists(" | awk -F= '{print $3":"$5}' | sed s/0x// | sed s/\)//g | sed s/\;\}\;//g | sed s/\ // | sed s/\ // > $tmp
    ## Deal with comment
    sed -i 's/\/\/.*$//' $tmp
    sed -i 's/;sapi.*$//' $tmp
    ## Deal with blind
    grep "char ?.*==.*text= \".*Blind" $unicode | grep -v -e "^\/\/" | awk -F= '{print $3":"$5$6}' | sed s/0x// | sed s/\)//g | sed s/\;\}\;//g | sed s/\ // | sed s/\ // | sed 's/"+(::target_group!"Blind"\ ?\ ""\ :\ "//' >> $tmp
    grep "char ?.*==.*text= (.*Blind" $unicode | grep -v -e "^\/\/" | awk -F= '{print $3":"$5$6}' | sed s/0x// | sed s/\)//g | sed s/\;\}\;//g | sed s/\ // | sed s/\ // | sed 's/(::target_group!"Blind"\ ?\ ""\ :\ //' | sed 's/"+"/\ /' | sed s/:\ /:/ | sed 's/" /"/' | sed 's/\ \ /\ /' >> $tmp

}

extract_exists () {
    ## Deal with exists
    grep "char ?.*==.*exists(" $unicode | grep -v -e "^\/\/" | grep orig >> pronounce-$lang
    grep "char ?.*==.*exists(" $unicode | grep -v -e "^\/\/" | grep -v orig >> comma-$lang

}


output_json () {
    echo "[" > $out
    echo " {" >> $out
    echo "  \"locale\":\""$lang"\"" >> $out
    echo " }," >> $out
    awk -F: '{print " {\n  \"key\": \""$1"\",\n  \"mappings\": {\n    \"default\" : {\n     \"default\": "$2"\n   }\n  }\n },"}' $tmp2 >> $out
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
    unicode=$indir/$lang/unicode.tdl
    mkdir -p $outdir/$lang
    out=$outdir/$lang/symbols.json
    extract_unicode
    # extract_exists
    sort $tmp > $tmp2
    output_json
done


rm $tmp $tmp2 ## pronounce-$lang comma-$lang
