// Tables
// Binomial:
var mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mrow class="MJX-TeXAtom-OPEN"><mo maxsize="2.047em" minsize="2.047em">(</mo></mrow><mfrac linethickness="0"><mi>n</mi><mi>k</mi></mfrac><mrow class="MJX-TeXAtom-CLOSE"><mo maxsize="2.047em" minsize="2.047em">)</mo></mrow></mrow></math>';
var enr = sre.Enrich.semanticMathmlSync(mml);
console.log(enr.toString());
var stree = sre.Semantic.getTreeFromString(mml);
console.log(sre.DomUtil.formatXml(enr.toString()));
console.log(sre.DomUtil.formatXml(stree.toString()));

var mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mrow class="MJX-TeXAtom-OPEN"><mo maxsize="2.047em" minsize="2.047em">(</mo></mrow><mfrac linethickness="0"><mi>n</mi><mrow><mi>k</mi><mo>+</mo><mi>l</mi></mrow></mfrac><mrow class="MJX-TeXAtom-CLOSE"><mo maxsize="2.047em" minsize="2.047em">)</mo></mrow></mrow></math>';
var enr = sre.Enrich.semanticMathmlSync(mml);
console.log(enr.toString());
var stree = sre.Semantic.getTreeFromString(mml);
console.log(sre.DomUtil.formatXml(enr.toString()));
console.log(sre.DomUtil.formatXml(stree.toString()));


var mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>(</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable><mo>)</mo></mrow></math>';
var enr = sre.Enrich.semanticMathmlSync(mml);
console.log(enr.toString());
var stree = sre.Semantic.getTreeFromString(mml);
console.log(sre.DomUtil.formatXml(enr.toString()));
console.log(sre.DomUtil.formatXml(stree.toString()));

var mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mfenced open="(" close=")"><mfrac linethickness="0"><mi>n</mi><mi>k</mi></mfrac></mfenced></math>';
var enr = sre.Enrich.semanticMathmlSync(mml);
console.log(enr.toString());
var stree = sre.Semantic.getTreeFromString(mml);
console.log(sre.DomUtil.formatXml(enr.toString()));
console.log(sre.DomUtil.formatXml(stree.toString()));

var mml = '<mrow><mrow><mo>(</mo></mrow><mfrac linethickness="0"><mrow><mi>n</mi><mo>+</mo><mi>k</mi><mo>+</mo><mi>l</mi></mrow><mrow><mi>k</mi><mo>+</mo><mi>l</mi><mo>-</mo><mn>1</mn></mrow></mfrac><mrow><mo>)</mo></mrow></mrow>';
var enr = sre.Enrich.semanticMathmlSync(mml);
console.log(enr.toString());


// Lines:
var mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable></math>';
var enr = sre.Enrich.semanticMathmlSync(mml);
var stree = sre.Semantic.getTreeFromString(mml);
console.log(sre.DomUtil.formatXml(enr.toString()));
console.log(sre.DomUtil.formatXml(stree.toString()));



// Embellished stuff

var stree = sre.Semantic.getTreeFromString('<math><mo>(</mo><mi>x</mi><msup><mo>+</mo><mn>2</mn></msup><mi>y</mi><msub><mo>)</mo><mn>2</mn></msub></math>');

console.log(sre.DomUtil.formatXml(sre.Semantic.getTreeFromString('<math><mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>2</mn></msup></math>').toString()));


var mml = '<math><mmultiscripts><mi>A</mi><mn>3</mn><mn>4</mn><mi>k</mi><mi>l</mi>' +
    '<mprescripts/><mn>1</mn><mn>2</mn><mi>i</mi><mi>j</mi></mmultiscripts></math>';
var enr = sre.Enrich.semanticMathmlSync(mml);
var stree = sre.Semantic.getTreeFromString(mml);
var reb = new sre.RebuildStree(enr);
console.log(sre.DomUtil.formatXml(enr.toString()));
console.log(sre.DomUtil.formatXml(stree.toString()));
console.log(sre.DomUtil.formatXml(reb.stree.toString()));

var mml = '<math><mmultiscripts><mi>X</mi><none/><mi>i</mi><none/><mi>j</mi>' +
    '<mprescripts/><none/></mmultiscripts></math>';


var mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';

var skel = sre.SemanticSkeleton.fromTree(stree.root);


var mjx = '<span class="MathJax" id="MathJax-Element-2-Frame" tabindex="0" role="application" aria-label="StartBinomialOrMatrix n Choose k EndBinomialOrMatrix" haslabel="true" hasspeech="true" style="text-align: center;"><nobr><span class="math" id="MathJax-Span-15" data-semantic-complexity="10.2" style="width: 2.324em; display: inline-block;"><span style="display: inline-block; position: relative; width: 2.205em; height: 0px; font-size: 105%;"><span style="position: absolute; clip: rect(2.443em 1002.03em 5.241em -999.997em); top: -4.104em; left: 0em;"><span class="mrow" id="MathJax-Span-16"><span class="mrow" id="MathJax-Span-17" data-semantic-type="vector" data-semantic-role="binomial" data-semantic-id="5" data-semantic-children="1,2" data-semantic-content="0,6" data-semantic-collapsed="(5 (3 1) (4 2))" data-semantic-complexity="10.2" data-semantic-speech="StartBinomialOrMatrix n Choose k EndBinomialOrMatrix"><span class="texatom" id="MathJax-Span-18" data-semantic-complexity="1"><span class="mrow" id="MathJax-Span-19"><span class="mo" id="MathJax-Span-20" data-semantic-type="fence" data-semantic-role="open" data-semantic-id="0" data-semantic-parent="5" data-semantic-complexity="1" data-semantic-speech="left-parenthesis" style="vertical-align: -0.592em;"><span style="font-family: STIXSizeThreeSym;">(</span></span></span></span><span class="mfrac" id="MathJax-Span-21" data-semantic-complexity="5.2"><span style="display: inline-block; position: relative; width: 0.479em; height: 0px; margin-right: 0.122em; margin-left: 0.122em;"><span style="position: absolute; clip: rect(3.396em 1000.48em 4.17em -999.997em); top: -4.64em; left: 50%; margin-left: -0.235em;"><span class="mi" id="MathJax-Span-22" data-semantic-type="identifier" data-semantic-role="latinletter" data-semantic-font="italic" data-semantic-id="1" data-semantic-parent="3" data-semantic-complexity="1" data-semantic-speech="n" style="font-family: STIXGeneral; font-style: italic;">n</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(3.158em 1000.48em 4.17em -999.997em); top: -3.271em; left: 50%; margin-left: -0.235em;"><span class="mi" id="MathJax-Span-23" data-semantic-type="identifier" data-semantic-role="latinletter" data-semantic-font="italic" data-semantic-id="2" data-semantic-parent="4" data-semantic-complexity="1" data-semantic-speech="k" style="font-family: STIXGeneral; font-style: italic;">k<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span><span class="texatom" id="MathJax-Span-24" data-semantic-complexity="1"><span class="mrow" id="MathJax-Span-25"><span class="mo" id="MathJax-Span-26" data-semantic-type="fence" data-semantic-role="close" data-semantic-id="6" data-semantic-parent="5" data-semantic-complexity="1" data-semantic-speech="right-parenthesis" style="vertical-align: -0.592em;"><span style="font-family: STIXSizeThreeSym;">)</span></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 4.11em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -1.059em; border-left: 0px solid; width: 0px; height: 2.691em;"></span></span></nobr></span>';

console.log(sre.DomUtil.formatXml(sre.EnrichMathml.removeAttributePrefix(mjx.toString())));

var mml = '<math><mi>a</mi></math>';


  // var virtual = this.rebuilt.streeRoot.querySelectorAll(
  //   function(x) {return x.id.toString() === id;})[0];
  // if (!virtual) {
  //   return null;
  // }
  // var children = virtual.childNodes.map(function(x) {return x.id;});
  // var nodes = children.map(goog.bind(this.getBySemanticId, this));
  // return new sre.VirtualFocus(nodes, virtual);



// <math><munderover><mi>a</mi><mi>b</mi><mi>c</mi></munderover></math>
// x^2_2


// {n \choose k}
// \begin{pmatrix}a\\b\end{pmatrix}
// {{n + 1}\choose k}
// \begin{pmatrix}a+1\\b\end{pmatrix}


mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>(</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable><mo>)</mo></mrow></math>';

mml = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>(</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable><mo>)</mo></mrow></math>';


mml = '<math><mfrac linethickness="0"><mi>n</mi><mi>k</mi></mfrac></math>';


////////////

var matrix =       '<math><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable><mo>]</mo></math>';

sre.System.getInstance().setupEngine({semantics: true, domain: 'mathspeak', cache: true});
var enr = sre.Enrich.semanticMathmlSync(matrix);
console.log(enr.toString());
var stree = sre.Semantic.getTreeFromString(matrix);
console.log(sre.DomUtil.formatXml(enr.toString()));
console.log(sre.DomUtil.formatXml(stree.toString()));


//// Mfenced problem with interpretation as infix operation!

var mm = sre.DomUtil.parseInput('<math><mfenced open="55" close=" "><mi>a</mi><mn>1</mn></mfenced></math>');
var stree = new sre.SemanticTree(mm);
var en = sre.EnrichMathml.enrich(mm, stree);
var rs = new sre.RebuildStree(en);
rs.stree.toString() === stree.toString();
console.log(sre.DomUtil.formatXml(stree.toString()));
console.log(sre.DomUtil.formatXml(en.toString()));
