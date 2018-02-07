for i in chap*.tex; do
perl -i.bak -pe 's/&\n//' $i;
perl -i.bak -pe 's/bottomrule/hline/' $i;
perl -i.bak -pe 's/end{longtable}/end{tabular}/' $i;
perl -i.bak -pe 's/toprule\\addlinespace/\hline/' $i;
perl -i.bak -pe 's/\\addlinespace/[1ex]/' $i;
perl -i.bak -pe 's/\\begin{longtable}\[c\]{@\{}lll@\{}}/\n\\begin{tabular}{lp{12cm}}/' $i;
perl -i.bak -pe 's/\\begin{longtable}\[c\]{@\{}ll@\{}}/\n\\begin{tabular}{lp{12cm}}/' $i;
done
