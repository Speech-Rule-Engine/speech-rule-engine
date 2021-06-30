{
  "domain": "emacspeak",
  "locale": "en",
  "modality": "speech",
  "rules": [
    [
      "Rule",
      "stree",
      "default",
      "[n] ./*[1]",
      "self::stree"
    ],
    [
      "Rule",
      "multrel",
      "default",
      "[t] \"multirelation\"; [m] children/* (sepFunc:CTFcontentIterator)",
      "self::multirel"
    ],
    [
      "Rule",
      "variable-equality",
      "default",
      "[t] \"equation sequence\"; [m] children/* (context:\"part\",ctxtFunc:CTFnodeCounter,sepFunc:CTFcontentIterator)",
      "self::relseq[@role=\"equality\"]",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "multi-equality",
      "default",
      "[t] \"equation sequence\"; [m] children/* (context:\"part\",ctxtFunc:CTFnodeCounter,sepFunc:CTFcontentIterator)",
      "self::relseq[@role=\"equality\"]",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "equality",
      "default",
      "[t] \"equation\"; [t] \"left hand side\"; [n] children/*[1] (pause:200); [n] content/*[1] (pause:200);[t] \"right hand side\"; [n] children/*[2]",
      "self::relseq[@role=\"equality\"]",
      "count(./children/*)=2"
    ],
    [
      "Rule",
      "simple-equality",
      "default",
      "[n] children/*[1] (pause:200); [n] content/*[1] (pause:200);[n] children/*[2]",
      "self::relseq[@role=\"equality\"]",
      "count(./children/*)=2",
      "./children/identifier or ./children/number"
    ],
    [
      "Rule",
      "simple-equality2",
      "default",
      "[n] children/*[1] (pause:200); [n] content/*[1] (pause:200);[n] children/*[2]",
      "self::relseq[@role=\"equality\"]",
      "count(./children/*)=2",
      "./children/function or ./children/appl"
    ],
    [
      "Rule",
      "relseq",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::relseq"
    ],
    [
      "Rule",
      "implicit",
      "default",
      "[m] children/*",
      "self::infixop",
      "@role=\"implicit\"",
      "children/*[1][@role=\"latinletter\"] or children/*[1][@role=\"greekletter\"] or children/*[1][@role=\"otherletter\"] or name(children/*[1])=\"number\"",
      "children/*[2][@role=\"latinletter\"] or children/*[2][@role=\"greekletter\"] or children/*[2][@role=\"otherletter\"] or name(children/*[2])=\"number\""
    ],
    [
      "Rule",
      "binary-operation",
      "default",
      "[p] (pause:100); [m] children/* (sepFunc:CTFcontentIterator, pause:100);",
      "self::infixop"
    ],
    [
      "Rule",
      "variable-addition",
      "default",
      "[t] \"sum with variable number of summands\" (pause:400); [m] children/* (sepFunc:CTFcontentIterator)",
      "self::infixop[@role=\"addition\"]",
      "count(children/*)>2",
      "children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "prefix",
      "default",
      "[t] \"prefix\"; [n] text(); [t] \"of\" (pause 150);[n] children/*[1]",
      "self::prefixop"
    ],
    [
      "Rule",
      "negative",
      "default",
      "[t] \"negative\"; [n] children/*[1]",
      "self::prefixop",
      "self::prefixop[@role=\"negative\"]"
    ],
    [
      "Rule",
      "postfix",
      "default",
      "[n] children/*[1]; [t] \"postfix\"; [n] text() (pause 300)",
      "self::postfixop"
    ],
    [
      "Rule",
      "identifier",
      "default",
      "[n] text()",
      "self::identifier"
    ],
    [
      "Rule",
      "number",
      "default",
      "[n] text()",
      "self::number"
    ],
    [
      "Rule",
      "font",
      "default",
      "[t] @font; [n] . (grammar:ignoreFont=@font)",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\""
    ],
    [
      "Rule",
      "font-identifier-short",
      "default",
      "[t] @font; [n] CQFhideFont; [t] CSFshowFont",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "@font=\"normal\"",
      "\"\"=translate(text(), \"abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρςστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\", \"\")",
      "@role!=\"unit\""
    ],
    [
      "Rule",
      "font-identifier",
      "default",
      "[t] @font; [n] . (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "@font=\"normal\"",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@role!=\"unit\""
    ],
    [
      "Rule",
      "omit-font",
      "default",
      "[n] . (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"italic\""
    ],
    [
      "Rule",
      "simple-fraction",
      "default",
      "[p] (pause:100); [n] children/*[1] (rate:0.35); [t] \"over\";  [n] children/*[2] (rate:0.35, pause:100)",
      "self::fraction",
      "name(children/*[1])=\"number\" or name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"number\" or name(children/*[2])=\"identifier\""
    ],
    [
      "Rule",
      "vulgar-fraction",
      "default",
      "[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\"",
      "CQFvulgarFractionSmall"
    ],
    [
      "Rule",
      "fraction",
      "default",
      "[p] (pause:250); [n] children/*[1] (rate:0.35, pause:250); [t] \"divided by\" (pause:250);  [n] children/*[2] (rate:0.35, pause:250)",
      "self::fraction"
    ],
    [
      "Rule",
      "superscript",
      "default",
      "[n] children/*[1]; [t] \"super\"; [n] children/*[2] (pitch:0.35, pause:300)",
      "self::superscript"
    ],
    [
      "Rule",
      "subscript",
      "default",
      "[n] children/*[1]; [t] \"sub\"; [n] children/*[2] (pitch:-0.35, pause:300)",
      "self::subscript"
    ],
    [
      "Rule",
      "ellipsis",
      "default",
      "[p] (pause:200); [t] \"ellipsis\" (pause:300)",
      "self::punctuation",
      "self::punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "fence-single",
      "default",
      "[n] text()",
      "self::punctuation",
      "self::punctuation[@role=\"openfence\"]"
    ],
    [
      "Alias",
      "fence-single",
      "self::punctuation",
      "self::punctuation[@role=\"closefence\"]"
    ],
    [
      "Alias",
      "fence-single",
      "self::punctuation",
      "self::punctuation[@role=\"vbar\"]"
    ],
    [
      "Alias",
      "fence-single",
      "self::punctuation",
      "self::punctuation[@role=\"application\"]"
    ],
    [
      "Rule",
      "omit-empty",
      "default",
      "[p] (pause:100)",
      "self::empty"
    ],
    [
      "Rule",
      "fences-open-close",
      "default",
      "[p] (pause:200); [n] children/*[1] (rate:0.35, pause:200)",
      "self::fenced",
      "@role=\"leftright\""
    ],
    [
      "Rule",
      "fences-open-close-in-appl",
      "default",
      "[p] (pause:200); [n] children/*[1] (pause:200);",
      "self::fenced[@role=\"leftright\"]",
      "./parent::children/parent::appl"
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[p] (pause:100); [t] \"absolute value of\"; [n] children/*[1] (pause:350);",
      "self::fenced",
      "self::fenced[@role=\"neutral\"]"
    ],
    [
      "Rule",
      "omit-fences",
      "default",
      "[p] (pause:500); [n] children/*[1] (pause:200);",
      "self::fenced"
    ],
    [
      "Rule",
      "matrix",
      "default",
      "[t] \"matrix\"; [m] children/* (ctxtFunc:CTFnodeCounter,context:\"row\",pause:100)",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix-row",
      "default",
      "[m] children/* (ctxtFunc:CTFnodeCounter,context:\"column\",pause:100)",
      "self::row[@role=\"matrix\"]"
    ],
    [
      "Rule",
      "matrix-cell",
      "default",
      "[n] children/*[1]",
      "self::cell[@role=\"matrix\"]"
    ],
    [
      "Rule",
      "vector",
      "default",
      "[t] \"vector\"; [m] children/* (ctxtFunc:CTFnodeCounter,context:\"element\",pause:100)",
      "self::vector"
    ],
    [
      "Rule",
      "cases",
      "default",
      "[t] \"case statement\"; [m] children/* (ctxtFunc:CTFnodeCounter,context:\"case\",pause:100)",
      "self::cases"
    ],
    [
      "Rule",
      "cases-row",
      "default",
      "[m] children/*",
      "self::row[@role=\"cases\"]"
    ],
    [
      "Rule",
      "cases-cell",
      "default",
      "[n] children/*[1]",
      "self::cell[@role=\"cases\"]"
    ],
    [
      "Rule",
      "row",
      "default",
      "[m] ./* (ctxtFunc:CTFnodeCounter,context:\"column\",pause:100)",
      "self::row"
    ],
    [
      "Rule",
      "cases-end",
      "default",
      "[t] \"case statement\"; [m] children/* (ctxtFunc:CTFnodeCounter,context:\"case\",pause:100);[t] \"end cases\"",
      "self::cases",
      "following-sibling::*"
    ],
    [
      "Rule",
      "multiline",
      "default",
      "[t] \"multiline equation\";[m] children/* (ctxtFunc:CTFnodeCounter,context:\"line\",pause:100)",
      "self::multiline"
    ],
    [
      "Rule",
      "line",
      "default",
      "[m] children/*",
      "self::line"
    ],
    [
      "Rule",
      "table",
      "default",
      "[t] \"multiline equation\";[m] children/* (ctxtFunc:CTFnodeCounter,context:\"row\",pause:200)",
      "self::table"
    ],
    [
      "Rule",
      "table-row",
      "default",
      "[m] children/* (pause:100)",
      "self::row[@role=\"table\"]"
    ],
    [
      "Alias",
      "cases-cell",
      "self::cell[@role=\"table\"]"
    ],
    [
      "Rule",
      "end-punct",
      "default",
      "[m] children/* (pause:300)",
      "self::punctuated",
      "@role=\"endpunct\""
    ],
    [
      "Rule",
      "start-punct",
      "default",
      "[n] content/*[1] (pause:200); [m] children/*[position()>1]",
      "self::punctuated",
      "@role=\"startpunct\""
    ],
    [
      "Rule",
      "punctuated",
      "default",
      "[m] children/* (pause:100)",
      "self::punctuated"
    ],
    [
      "Rule",
      "function",
      "default",
      "[n] text()",
      "self::function"
    ],
    [
      "Rule",
      "appl",
      "default",
      "[n] children/*[1]; [n] content/*[1]; [n] children/*[2]",
      "self::appl"
    ],
    [
      "Rule",
      "sum-only",
      "default",
      "[n] children/*[1]; [t] \"from\"; [n] children/*[2]; [t] \"to\";[n] children/*[3]",
      "self::limboth",
      "@role=\"sum\" or @role=\"integral\""
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[n] children/*[1] (pause 100); [t] \"over\"; [n] children/*[2];[t] \"under\"; [n] children/*[3] (pause 250);",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[n] children/*[1]; [t] \"over\"; [n] children/*[2];",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper",
      "default",
      "[n] children/*[1]; [t] \"under\"; [n] children/*[2];",
      "self::limupper"
    ],
    [
      "Rule",
      "largeop",
      "default",
      "[n] text()",
      "self::largeop"
    ],
    [
      "Rule",
      "bigop",
      "default",
      "[n] children/*[1] (pause 100); [t] \"over\"; [n] children/*[2] (pause 250);",
      "self::bigop"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[n] children/*[1] (pause 100); [n] children/*[2] (pause 200); [n] children/*[3] (rate:0.35);",
      "self::integral"
    ],
    [
      "Rule",
      "sqrt",
      "default",
      "[t] \"Square root of\"; [n] children/*[1] (rate:0.35, pause:400)",
      "self::sqrt"
    ],
    [
      "Rule",
      "square",
      "default",
      "[n] children/*[1]; [t] \"squared\" (pitch:0.35, pause:200)",
      "self::superscript",
      "children/*[2][text()=2]",
      "name(./children/*[1])!=\"text\""
    ],
    [
      "Rule",
      "cube",
      "default",
      "[n] children/*[1]; [t] \"cubed\" (pitch:0.35, pause:200)",
      "self::superscript",
      "children/*[2][text()=3]",
      "name(./children/*[1])!=\"text\""
    ],
    [
      "Rule",
      "root",
      "default",
      "[t] \"root of order\"; [n] children/*[1];[t] \"over\"; [n] children/*[1] (rate:0.35, pause:400)",
      "self::root"
    ],
    [
      "Rule",
      "text-no-mult",
      "default",
      "[n] children/*[1] (pause:200); [n] children/*[2]",
      "self::infixop",
      "children/text"
    ],
    [
      "Rule",
      "text",
      "default",
      "[n] text() (pause:200)",
      "self::text"
    ],
    [
      "Rule",
      "unit",
      "default",
      "[t] text() (annotation:unit, preprocess)",
      "self::identifier",
      "@role=\"unit\""
    ],
    [
      "Rule",
      "unit-square",
      "default",
      "[t] \"square\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"unit\"",
      "children/*[2][text()=2]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "Rule",
      "unit-cubic",
      "default",
      "[t] \"cubic\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"unit\"",
      "children/*[2][text()=3]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "Rule",
      "reciprocal",
      "default",
      "[t] \"reciprocal\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"unit\"",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "count(preceding-sibling::*)=0 or preceding-sibling::*[@role!=\"unit\"]"
    ],
    [
      "Rule",
      "reciprocal",
      "default",
      "[t] \"per\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"unit\"",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "preceding-sibling::*[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-combine",
      "default",
      "[m] children/*",
      "self::infixop",
      "@role=\"unit\""
    ],
    [
      "Rule",
      "unit-divide",
      "default",
      "[n] children/*[1] (pitch:0.3); [t] \"per\"; [n] children/*[2] (pitch:-0.3)",
      "self::fraction",
      "@role=\"unit\""
    ]
  ]
}
