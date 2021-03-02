{
  "locale": "nemeth",
  "modality": "braille",
  "domain": "default",
  "rules": [
    [
      "Rule",
      "stree",
      "default",
      "[n] ./*[1]",
      "self::stree",
      "CQFresetNesting"
    ],
    [
      "Rule",
      "unknown",
      "default",
      "[n] text()",
      "self::unknown"
    ],
    [
      "Rule",
      "protected",
      "default",
      "[t] text()",
      "self::*",
      "@role=\"protected\""
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
      "blank-empty",
      "default",
      "[t] \"⠀\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"cell\" or name(../..)=\"line\""
    ],
    [
      "Rule",
      "font",
      "default",
      "[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\""
    ],
    [
      "Rule",
      "font-identifier-short",
      "default",
      "[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"normal\"",
      "\"\"=translate(text(), \"abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρςστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\", \"\")",
      "@role!=\"unit\""
    ],
    [
      "Rule",
      "font-identifier-english",
      "default",
      "[t] @font (grammar:localFont); [t] \"⠰\"; [n] . (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "\"\"=translate(text(), \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\", \"\")",
      "@role!=\"unit\""
    ],
    [
      "Rule",
      "font-identifier",
      "default",
      "[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)",
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
      "self::identifier[@font=\"italic\"]",
      "string-length(text())=1",
      "@role!=\"greekletter\"",
      "not(contains(@grammar, \"ignoreFont\"))"
    ],
    [
      "Rule",
      "number-indicator",
      "default",
      "[t] \"⠼\"; [n] text() (pause:10)",
      "self::number", "not(@font) or @font=\"normal\"",
      "contains(@annotation, \"nemeth:number\")",
      "not(ancestor::sqrt)",
      "not(ancestor::root)",
      "not(ancestor::fraction)",
      "@role!=\"othernumber\""
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
      "number-font-indicator",
      "default",
      "[t] \"⠼\"; [n] text() (pause:10)",
      "self::number", "contains(@grammar, \"ignoreFont\")",
      "contains(@annotation, \"nemeth:number\")",
      "not(ancestor::sqrt)",
      "not(ancestor::root)",
      "not(ancestor::fraction)",
      "\"\" = translate(text(), \"0123456789.,\", \"\")"
    ],
    [
      "Rule",
      "mixed-number",
      "default",
      "[n] children/*[1]; [t] \"⠸⠹\"; [n] children/*[2]/children/*[1]; [t] \"⠌\"; [n] children/*[2]/children/*[2]; [t] \"⠸⠼\"",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "number-with-chars",
      "default",
      "[t] \"⠼\"; [m] CQFspaceoutNumber",
      "self::number",
      "\"\" != translate(text(), \"0123456789.,\", \"\")",
      "text() != translate(text(), \"0123456789.,\", \"\")"
    ],
    [
      "Rule",
      "number-baseline",
      "default",
      "[t] \"⠐\"; [n] text()",
      "self::number",
      "not(contains(@grammar, \"ignoreFont\"))",
      "preceding-sibling::identifier",
      "preceding-sibling::*[1][@role=\"latinletter\" or @role=\"greekletter\" or @role=\"otherletter\"]",
      "parent::*/parent::infixop[@role=\"implicit\"]"
    ],
    [
      "Rule",
      "number-baseline-font",
      "default",
      "[t] \"⠐\"; [t] @font; [n] . (grammar:ignoreFont=@font)",
      "self::number",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\"",
      "preceding-sibling::identifier",
      "preceding-sibling::*[@role=\"latinletter\" or @role=\"greekletter\" or @role=\"otherletter\"]",
      "parent::*/parent::infixop[@role=\"implicit\"]"
    ],
    [
      "Rule",
      "identifier",
      "default",
      "[n] text()",
      "self::identifier",
      "@role=\"protected\""
    ],
    [
      "Rule",
      "prefix",
      "default",
      "[n] text(); [n] children/*[1]",
      "self::prefixop"
    ],
    [
      "Rule",
      "postfix",
      "default",
      "[n] children/*[1]; [n] text()",
      "self::postfixop"
    ],
    [
      "Rule",
      "binary-operation",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop"
    ],
    [
      "Rule",
      "implicit",
      "default",
      "[m] children/*",
      "self::infixop",
      "@role=\"implicit\""
    ],
    [
      "Aliases",
      "implicit",
      "self::infixop",
      "@role=\"leftsuper\" or @role=\"leftsub\" or @role=\"rightsuper\" or @role=\"rightsub\""
    ],
    [
      "Rule",
      "function-named",
      "default",
      "[n] children/*[1]; [t] \"⠀\"; [n] children/*[2]",
      "self::appl"
    ],
    [
      "Rule",
      "function-prefix",
      "default",
      "[n] content/*[1]; [t] \"⠀\"; [n] children/*[1]",
      "self::prefixop",
      "content/*[1][@role=\"infix function\"]"
    ],
    [
      "Rule",
      "function-infix",
      "default",
      "[n] children/*[1]; [n] content/*[1]; [t] \"⠀\"; [n] children/*[2]",
      "self::infixop",
      "@role=\"infix function\""
    ],
    [
      "Rule",
      "function-simple",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "children/*[1][@role=\"simple function\"]"
    ],
    [
      "Rule",
      "fences-open-close",
      "default",
      "[n] content/*[1]; [n] children/*[1]; [n] content/*[2]",
      "self::fenced"
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[n] content/*[1]; [n] children/*[1]; [n] content/*[2]",
      "self::fenced",
      "@role=\"neutral\""
    ],
    [
      "Rule",
      "text",
      "default",
      "[n] text()",
      "self::text"
    ],
    [
      "Rule",
      "factorial",
      "default",
      "[t] \"⠯\"",
      "self::punctuation",
      "text()=\"!\"",
      "name(preceding-sibling::*[1])!=\"text\""
    ],
    [
      "Rule",
      "single-prime",
      "default",
      "[t] \"⠄\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=1"
    ],
    [
      "Rule",
      "double-prime",
      "default",
      "[t] \"⠄⠄\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=2"
    ],
    [
      "Rule",
      "triple-prime",
      "default",
      "[t] \"⠄⠄⠄\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=3"
    ],
    [
      "Rule",
      "quadruple-prime",
      "default",
      "[t] \"⠄⠄⠄⠄\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=4"
    ],
    [
      "Rule",
      "fraction",
      "default",
      "[t] CSFopenFraction; [n] children/*[1]; [t] CSFoverFraction; [n] children/*[2]; [t] CSFcloseFraction",
      "self::fraction"
    ],
    [
      "Rule",
      "bevelled-fraction",
      "default",
      "[t] CSFopenFraction; [n] children/*[1]; [t] CSFoverBevFraction; [n] children/*[2]; [t] CSFcloseFraction",
      "self::fraction",
      "contains(@annotation, \"general:bevelled\")"
    ],
    [
      "Rule",
      "sqrt",
      "default",
      "[t] CSFopenRadicalVerbose; [n] children/*[1]; [t] CSFcloseRadicalVerbose",
      "self::sqrt"
    ],
    [
      "Rule",
      "root",
      "default",
      "[t] CSFindexRadicalVerbose; [n] children/*[1];[t] \"⠜\"; [n] children/*[2]; [t] CSFcloseRadicalVerbose",
      "self::root"
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];[t] CSFoverscript; [n] children/*[3]",
      "self::limboth",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];",
      "self::limlower",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limupper",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] CSFoverscript; [n] children/*[2];",
      "self::limupper",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Aliases",
      "limlower",
      "self::underscore",
      "@role=\"limit function\"",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Aliases",
      "limlower",
      "self::underscore",
      "children/*[2][@role!=\"underaccent\"]",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Aliases",
      "limupper",
      "self::overscore",
      "children/*[2][@role!=\"overaccent\"]",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limboth-end",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];[t] CSFoverscript; [n] children/*[3]; [t] \"⠻\"",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower-end",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2]; [t] \"⠻\"",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper-end",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] CSFoverscript; [n] children/*[2]; [t] \"⠻\"",
      "self::limupper"
    ],
    [
      "Aliases",
      "limlower-end",
      "self::underscore",
      "@role=\"limit function\""
    ],
    [
      "Aliases",
      "limlower-end",
      "self::underscore"
    ],
    [
      "Aliases",
      "limupper-end",
      "self::overscore"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[n] children/*[1]; [n] children/*[2]; [n] children/*[3];",
      "self::integral"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[n] children/*[1]; [t] \"⠰\"; [n] children/*[2];[t] \"⠘\"; [n] children/*[3]; [t] \"⠐\"",
      "self::limboth",
      "@role=\"integral\""
    ],
    [
      "Rule",
      "bigop",
      "default",
      "[n] children/*[1]; [n] children/*[2];",
      "self::bigop"
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
      "equality",
      "default",
      "[n] children/*[1]; [n] content/*[1]; [n] children/*[2]",
      "self::relseq",
      "@role=\"equality\"",
      "count(./children/*)=2"
    ],
    [
      "Rule",
      "multi-equality",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::relseq",
      "@role=\"equality\"",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "multrel",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::multirel"
    ],
    [
      "Rule",
      "subscript",
      "default",
      "[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]",
      "self::subscript"
    ],
    [
      "Rule",
      "subscript-simple",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::subscript",
      "name(./children/*[1])=\"identifier\"",
      "name(./children/*[2])=\"number\"",
      "./children/*[2][@role!=\"mixed\"]",
      "./children/*[2][@role!=\"othernumber\"]",
      "self::*"
    ],
    [
      "Rule",
      "subscript-baseline",
      "default",
      "[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]; [t] CSFbaselineVerbose",
      "self::subscript",
      "following-sibling::*",
      "@role!=\"prefix function\"",
      "not(name(following-sibling::subscript/children/*[1])=\"empty\" or (name(following-sibling::infixop[@role=\"implicit\"]/children/*[1])=\"subscript\" and name(following-sibling::*/children/*[1]/children/*[1])=\"empty\")) and @role!=\"subsup\"",
      "not(following-sibling::*[@role=\"rightsuper\" or @role=\"rightsub\" or @role=\"leftsub\" or @role=\"leftsub\"])"
    ],
    [
      "Aliases",
      "subscript-baseline",
      "self::subscript",
      "not(following-sibling::*)",
      "ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::punctuated|ancestor::fraction",
      "not(ancestor::punctuated[@role=\"leftsuper\" or @role=\"rightsub\" or @role=\"rightsuper\" or @role=\"rightsub\"])"
    ],
    [
      "Aliases",
      "subscript-baseline",
      "self::subscript",
      "not(following-sibling::*)",
      "ancestor::relseq|ancestor::multirel",
      "CGFbaselineConstraint"
    ],
    [
      "Aliases",
      "subscript-baseline",
      "self::subscript",
      "not(following-sibling::*)",
      "@embellished"
    ],
    [
      "Rule",
      "subscript-empty-sup",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::subscript",
      "name(children/*[2])=\"infixop\"",
      "name(children/*[2][@role=\"implicit\"]/children/*[1])=\"superscript\"",
      "name(children/*[2]/children/*[1]/children/*[1])=\"empty\""
    ],
    [
      "Aliases",
      "subscript-empty-sup",
      "self::subscript",
      "name(children/*[2])=\"superscript\"",
      "name(children/*[2]/children/*[1])=\"empty\""
    ],
    [
      "Rule",
      "superscript",
      "default",
      "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]",
      "self::superscript"
    ],
    [
      "Rule",
      "superscript-baseline",
      "default",
      "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];[t] CSFbaselineVerbose",
      "self::superscript",
      "following-sibling::*",
      "@role!=\"prefix function\"",
      "not(name(following-sibling::superscript/children/*[1])=\"empty\" or (name(following-sibling::infixop[@role=\"implicit\"]/children/*[1])=\"superscript\" and name(following-sibling::*/children/*[1]/children/*[1])=\"empty\")) and not(following-sibling::*[@role=\"rightsuper\" or @role=\"rightsub\" or @role=\"leftsub\" or @role=\"leftsub\"])"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "ancestor::punctuated",
      "ancestor::*/following-sibling::* and not(ancestor::punctuated[@role=\"leftsuper\" or @role=\"rightsub\" or @role=\"rightsuper\" or @role=\"rightsub\"])"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "ancestor::fraction|ancestor::fenced|ancestor::root|ancestor::sqrt"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "ancestor::relseq|ancestor::multirel",
      "not(@embellished)",
      "CGFbaselineConstraint"
    ],
    [
      "Aliases",
      "superscript-baseline",
      "self::superscript",
      "not(following-sibling::*)",
      "@embellished",
      "not(children/*[2][@role=\"prime\"])"
    ],
    [
      "Rule",
      "superscript-empty-sub",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::superscript",
      "name(children/*[2])=\"infixop\"",
      "name(children/*[2][@role=\"implicit\"]/children/*[1])=\"subscript\"",
      "name(children/*[2]/children/*[1]/children/*[1])=\"empty\""
    ],
    [
      "Aliases",
      "superscript-empty-sub",
      "self::superscript",
      "name(children/*[2])=\"subscript\"",
      "name(children/*[2]/children/*[1])=\"empty\""
    ],
    [
      "Rule",
      "prime",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::superscript",
      "children/*[2]",
      "children/*[2][@role=\"prime\"]"
    ],
    [
      "Rule",
      "prime-subscript",
      "default",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "not(following-sibling::*)"
    ],
    [
      "Rule",
      "prime-subscript-baseline",
      "default",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]; [t] CSFbaselineVerbose",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "following-sibling::*"
    ],
    [
      "Aliases",
      "prime-subscript-baseline",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "not(following-sibling::*)",
      "@embellished"
    ],
    [
      "Rule",
      "prime-subscript-simple",
      "default",
      "[n] children/*[1]/children/*[1]; [n] children/*[2];[n] children/*[1]/children/*[2]",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "name(children/*[1]/children/*[1])=\"identifier\"",
      "name(children/*[1]/children/*[2])=\"number\"",
      "children/*[1]/children/*[2][@role!=\"mixed\"]",
      "children/*[1]/children/*[2][@role!=\"othernumber\"]"
    ],
    [
      "Rule",
      "overscore",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] \"⠣\"; [n] children/*[2]; [t] \"⠻\"",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]"
    ],
    [
      "Rule",
      "overscore",
      "default",
      "[n] children/*[1]; [t] \"⠣\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "contains(@grammar, \"modified\")"
    ],
    [
      "Rule",
      "double-overscore",
      "default",
      "[t] \"⠐\"; [n] children/*[1] (grammar:\"modified\"); [t] \"⠣\"; [n] children/*[2]; [t] \"⠻\"",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "name(children/*[1])=\"overscore\"",
      "children/*[1]/children/*[2][@role=\"overaccent\"]"
    ],
    [
      "Rule",
      "underscore",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] \"⠩\"; [n] children/*[2]; [t] \"⠻\"",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]"
    ],
    [
      "Rule",
      "underscore",
      "default",
      "[n] children/*[1]; [t] \"⠩\"; [n] children/*[2]",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]",
      "contains(@grammar, \"modified\")"
    ],
    [
      "Rule",
      "double-underscore",
      "default",
      "[t] \"⠐\"; [n] children/*[1] (grammar:\"modified\"); [t] \"⠩\"; [n] children/*[2]; [t] \"⠻\"",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]",
      "name(children/*[1])=\"underscore\"",
      "children/*[1]/children/*[2][@role=\"underaccent\"]"
    ],
    [
      "Rule",
      "matrix-fence",
      "default",
      "[n] children/*[1];",
      "self::fenced",
      "count(children/*)=1",
      "name(children/*[1])=\"matrix\""
    ],
    [
      "Rule",
      "matrix",
      "default",
      "[m] children/* (separator:\"⠀\", join:\"\");",
      "self::matrix"
    ],
    [
      "Aliases",
      "matrix",
      "self::vector"
    ],
    [
      "Rule",
      "matrix-row",
      "default",
      "[n] ../../content/*[1] (grammar:enlargeFence); [m] children/* (separator:\"⠀\"); [n] ../../content/*[2] (grammar:enlargeFence); ",
      "self::row"
    ],
    [
      "Aliases",
      "matrix-row",
      "self::line",
      "@role=\"vector\""
    ],
    [
      "Aliases",
      "matrix-row",
      "self::line",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "row-with-label",
      "default",
      "[t] \"with Label\"; [n] content/*[1]; [t] \"EndLabel\"(pause: 200); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Column\")",
      "self::row",
      "content"
    ],
    [
      "Rule",
      "empty-row",
      "default",
      "[t] \"⠀\" (pause:300)",
      "self::row",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "matrix-cell",
      "default",
      "[n] children/*[1]",
      "self::cell"
    ],
    [
      "Rule",
      "empty-cell",
      "default",
      "[t] \"⠀\" (pause: 300)",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "layout",
      "default",
      "[m] children/* (separator:\"⠀\", join:\"\");",
      "self::table"
    ],
    [
      "Rule",
      "cases",
      "default",
      "[n] ../../content/*[1] (grammar:enlargeFence); [m] children/* (separator:\"⠀\"); [t] \"⠐\"",
      "self::cases"
    ],
    [
      "Aliases",
      "layout",
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
      "line-with-label",
      "default",
      "[t] \"with Label\"; [n] content/*[1]; [t] \"EndLabel\" (pause: 200); [m] children/*",
      "self::line",
      "content"
    ],
    [
      "Rule",
      "empty-line",
      "default",
      "[t] \"⠀\"",
      "self::line",
      "count(children/*)=0",
      "not(content)"
    ],
    [
      "Rule",
      "empty-line-with-label",
      "default",
      "[t] \"with Label\"; [n] content/*[1]; [t] \"EndLabel\"(pause: 200); [t] \"Blank\"",
      "self::line",
      "count(children/*)=0",
      "content"
    ],
    [
      "Rule",
      "enclose",
      "default",
      "[t] \"StartEnclose\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"EndEnclose\"",
      "self::enclose"
    ],
    [
      "Rule",
      "overbar",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] \"⠣⠱⠻\"",
      "self::enclose",
      "@role=\"top\""
    ],
    [
      "Rule",
      "underbar",
      "default",
      "[t] \"⠐\"; [n] children/*[1]; [t] \"⠩⠱⠻\"",
      "self::enclose",
      "@role=\"bottom\""
    ],
    [
      "Rule",
      "leftbar",
      "default",
      "[t] \"⠳\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"⠳\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
      "[t] \"⠪\"; [n] children/*[1]; [t] \"⠻\"",
      "self::enclose",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "cancel",
      "default",
      "[t] \"⠪\"; [n] children/*[1]/children/*[1]; [t] \"⠪\"; [n] children/*[2]; [t] \"⠻\"",
      "self::overscore",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Aliases",
      "cancel",
      "self::underscore",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "cancel-reverse",
      "default",
      "[t] \"⠪\"; [n] children/*[2]/children/*[1]; [t] \"⠪\"; [n] children/*[1]; [t] \"⠻\"",
      "self::overscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [
      "Aliases",
      "cancel-reverse",
      "self::underscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [
      "Rule",
      "end-punct",
      "default",
      "[m] children/*",
      "self::punctuated",
      "@role=\"endpunct\""
    ],
    [
      "Rule",
      "start-punct",
      "default",
      "[n] content/*[1]; [m] children/*[position()>1]",
      "self::punctuated",
      "@role=\"startpunct\""
    ],
    [
      "Rule",
      "punctuation",
      "default",
      "[n] text(); [t] \"⠐\"",
      "self::punctuation",
      "@role=\"fullstop\"",
      "contains(@annotation, \"nemeth:number\")"
    ],
    [
      "Rule",
      "punctuated",
      "default",
      "[m] children/*",
      "self::punctuated"
    ],
    [
      "Rule",
      "punctuation-comma",
      "default",
      "[n] text(); [t] \"⠀\"",
      "self::punctuation",
      "parent::*/parent::punctuated",
      "following-sibling::*",
      "@role!=\"fullstop\"",
      "@role!=\"vbar\""
    ],
    [
      "Rule",
      "punctuation-ellipses",
      "default",
      "[t] \"⠀\"; [n] text(); [t] \"⠀\"",
      "self::punctuation",
      "parent::*/parent::punctuated",
      "following-sibling::*",
      "@role=\"ellipsis\"",
      "name(preceding-sibling::*[1])!=\"punctuation\""
    ],
    [
      "Rule",
      "punctuation-ellipses",
      "default",
      "[t] \"⠀\"; [n] text();",
      "self::punctuation",
      "parent::*/parent::punctuated",
      "@role=\"ellipsis\"",
      "name(preceding-sibling::*[1])!=\"punctuation\""
    ],
    [
      "Rule",
      "reference-sign",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::superscript",
      "name(children/*[1])=\"text\" or (name(children/*[1])=\"punctuated\" and children/*[1][@role=\"text\"])",
      "name(children/*[2])=\"operator\" or name(children/*[2])=\"punctuation\""
    ],
    [
      "Rule",
      "reference-number",
      "default",
      "[n] children/*[1]; [t] \"⠈⠻\"; [n] children/*[2]; [t] \"⠐\"",
      "self::superscript",
      "name(children/*[1])=\"text\" or (name(children/*[1])=\"punctuated\" and children/*[1][@role=\"text\"])",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Generator",
      "CGFtensorRules"
    ]
  ],
  "annotators": [
    "number"
  ]
}
