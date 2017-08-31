#! /bin/bash

dir=$1
lang=$2
out=$3
rules=$1/$2/unicode.tdl

grep char $rules | awk -F= '{print $3":"$5}' | sed s/0x// | sed s/\)//g | sed s/\;\}\;//g | sed s/\ // | sed s/\ // > tmp
sort tmp > tmp2

echo "[" > $out
awk -F: '{print " {\n  \"key\" : \""$1"\",\n  \"mappings\": {\n    \"default\" : {\n     \"spanish\": "$2"\n   }\n  }\n },"}' tmp2 >> $out
echo "]" >> $out

for i in $lines; do
    echo $i
done
