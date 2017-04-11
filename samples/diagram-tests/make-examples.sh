../../bin/sre -k ssml -s -t brief -d mathspeak -i examples/example1.xml -o context-prosody/ssml/example1.ssml
../../bin/sre -k ssml -s -t brief -d mathspeak -i examples/example2.xml -o context-prosody/ssml/example2.ssml
../../bin/sre -k ssml -s -t brief -d mathspeak -i examples/example3.xml -o context-prosody/ssml/example3.ssml
../../bin/sre -k ssml -s -t brief -d mathspeak -i examples/example4.xml -o context-prosody/ssml/example4.ssml
../../bin/sre -k ssml -s -t brief -d mathspeak -i examples/example5.xml -o context-prosody/ssml/example5.ssml
../../bin/sre -k ssml -s -t brief -d mathspeak -i examples/example6.xml -o context-prosody/ssml/example6.ssml
../../bin/sre -k ssml -s -t brief -d mathspeak -i examples/example7.xml -o context-prosody/ssml/example7.ssml

../../bin/sre -k sable -s -t brief -d mathspeak -i examples/example1.xml -o context-prosody/sable/example1.sable
../../bin/sre -k sable -s -t brief -d mathspeak -i examples/example2.xml -o context-prosody/sable/example2.sable
../../bin/sre -k sable -s -t brief -d mathspeak -i examples/example3.xml -o context-prosody/sable/example3.sable
../../bin/sre -k sable -s -t brief -d mathspeak -i examples/example4.xml -o context-prosody/sable/example4.sable
../../bin/sre -k sable -s -t brief -d mathspeak -i examples/example5.xml -o context-prosody/sable/example5.sable
../../bin/sre -k sable -s -t brief -d mathspeak -i examples/example6.xml -o context-prosody/sable/example6.sable
../../bin/sre -k sable -s -t brief -d mathspeak -i examples/example7.xml -o context-prosody/sable/example7.sable


text2wave pause-only/sable/example1.sable -o pause-only/sable/example1.wav
text2wave pause-only/sable/example2.sable -o pause-only/sable/example2.wav
text2wave pause-only/sable/example3.sable -o pause-only/sable/example3.wav
text2wave pause-only/sable/example4.sable -o pause-only/sable/example4.wav
text2wave pause-only/sable/example5.sable -o pause-only/sable/example5.wav
text2wave pause-only/sable/example6.sable -o pause-only/sable/example6.wav
text2wave pause-only/sable/example7.sable -o pause-only/sable/example7.wav


cat sable-front.txt context-prosody/sable/example1.sable sable-rear.txt > tmp; mv tmp context-prosody/sable/example1.sable
cat sable-front.txt context-prosody/sable/example2.sable sable-rear.txt > tmp; mv tmp context-prosody/sable/example2.sable
cat sable-front.txt context-prosody/sable/example3.sable sable-rear.txt > tmp; mv tmp context-prosody/sable/example3.sable
cat sable-front.txt context-prosody/sable/example4.sable sable-rear.txt > tmp; mv tmp context-prosody/sable/example4.sable
cat sable-front.txt context-prosody/sable/example5.sable sable-rear.txt > tmp; mv tmp context-prosody/sable/example5.sable
cat sable-front.txt context-prosody/sable/example6.sable sable-rear.txt > tmp; mv tmp context-prosody/sable/example6.sable
cat sable-front.txt context-prosody/sable/example7.sable sable-rear.txt > tmp; mv tmp context-prosody/sable/example7.sable

text2wave context-prosody/sable/example1.sable -o context-prosody/sable/example1.wav
text2wave context-prosody/sable/example2.sable -o context-prosody/sable/example2.wav
text2wave context-prosody/sable/example3.sable -o context-prosody/sable/example3.wav
text2wave context-prosody/sable/example4.sable -o context-prosody/sable/example4.wav
text2wave context-prosody/sable/example5.sable -o context-prosody/sable/example5.wav
text2wave context-prosody/sable/example6.sable -o context-prosody/sable/example6.wav
text2wave context-prosody/sable/example7.sable -o context-prosody/sable/example7.wav

