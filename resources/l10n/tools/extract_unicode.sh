#! /bin/bash

dir=$1
lang=$2
out=$3
rules=$1/$2/unicode.tdl

grep "char ?.*==" $rules | grep -v "Blind" | grep -v "exists(" | awk -F= '{print $3":"$5}' | sed s/0x// | sed s/\)//g | sed s/\;\}\;//g | sed s/\ // | sed s/\ // > tmp
## Deal with comment
sed -i 's/\/\/.*$//' tmp
sed -i 's/;sapi.*$//' tmp

## Deal with blind
grep "char ?.*==.*text= \".*Blind" $rules | grep -v -e "^\/\/" | awk -F= '{print $3":"$5$6}' | sed s/0x// | sed s/\)//g | sed s/\;\}\;//g | sed s/\ // | sed s/\ // | sed 's/"+(::target_group!"Blind"\ ?\ ""\ :\ "//' >> tmp
grep "char ?.*==.*text= (.*Blind" $rules | grep -v -e "^\/\/" | awk -F= '{print $3":"$5$6}' | sed s/0x// | sed s/\)//g | sed s/\;\}\;//g | sed s/\ // | sed s/\ // | sed 's/(::target_group!"Blind"\ ?\ ""\ :\ //' | sed 's/"+"/\ /' | sed s/:\ /:/ | sed 's/" /"/' | sed 's/\ \ /\ /' >> tmp

## Deal with exists
grep "char ?.*==.*exists(" $rules | grep -v -e "^\/\/" | grep orig >> pronounce-$lang
grep "char ?.*==.*exists(" $rules | grep -v -e "^\/\/" | grep -v orig >> comma-$lang

## Sort (and uniq?)
sort tmp > tmp2


## Units:
## grep -A1 UIWord fr/units.tdl | grep -v "\-\-" | sed 'N;s/\n//;'
## Functions:
## grep UIInput fr/functions.tdl | grep -v wordRef | awk -F\" '{print "\""$2"\":\""$4"\""}' | sed s/RR_// 

echo "[" > $out
echo " {" >> $out
echo "  \"locale\":\""$lang"\"" >> $out
echo " }," >> $out
awk -F: '{print " {\n  \"key\" : \""$1"\",\n  \"mappings\": {\n    \"default\" : {\n     \"default\": "$2"\n   }\n  }\n },"}' tmp2 >> $out
sed -i '$ s/.$//' $out
echo "]" >> $out

for i in $lines; do
    echo $i
done
