{
  "domain": "mathspeak",
  "locale": "hi",
  "modality": "speech",
  "rules": [
    [
      "Rule",
      "collapsed",
      "default",
      "[t] \"निपातित\"; [n] . (engine:modality=summary, grammar:collapsed)",
      "self::*[@alternative]",
      "not(contains(@grammar, \"collapsed\"))"
    ],
    [
      "SpecializedRule",
      "collapsed",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "collapsed",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "direct-speech",
      "default",
      "[t] @ext-speech",
      "self::*[@ext-speech]"
    ],
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
      "self::number",
      "contains(@grammar, \"protected\")"
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
      "blank-cell-empty",
      "default",
      "[t] \"रिक्त\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"cell\""
    ],
    [
      "Rule",
      "blank-line-empty",
      "default",
      "[t] \"रिक्त\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"line\""
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
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"italic\""
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
      "mixed-number",
      "default",
      "[n] children/*[1]; [t] \"पूर्णांक\"; [n] children/*[2]",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "number-with-chars",
      "default",
      "[t] \"संख्या\"; [m] CQFspaceoutNumber (grammar:protected)",
      "self::number",
      "@role=\"othernumber\"",
      "\"\" != translate(text(), \"0123456789.,\", \"\")",
      "not(contains(@grammar, \"protected\"))"
    ],
    [
      "SpecializedRule",
      "number-with-chars",
      "default",
      "brief",
      "[t] \"संख्या\"; [m] CQFspaceoutNumber (grammar:protected)"
    ],
    [
      "SpecializedRule",
      "number-with-chars",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "number-as-upper-word",
      "default",
      "[t] \"ऊपर का शब्द\"; [m] CQFspaceoutNumber",
      "self::number",
      "string-length(text())>1",
      "text()=translate(text(), \"abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρςστυφχψω\", \"ABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\")",
      "\"\"=translate(text(), \"ABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\",\"\")"
    ],
    [
      "SpecializedRule",
      "number-as-upper-word",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "number-as-upper-word",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "number-baseline",
      "default",
      "[t] \"आधार रेखा\"; [n] . (grammar:baseline)",
      "self::number",
      "not(contains(@grammar, \"ignoreFont\"))",
      "preceding-sibling::identifier",
      "not(contains(@grammar, \"baseline\"))",
      "preceding-sibling::*[1][contains(@role,\"letter\")]",
      "parent::*/parent::infixop[@role=\"implicit\"]"
    ],
    [
      "SpecializedRule",
      "number-baseline",
      "default",
      "brief",
      "[t] \"आधार\"; [n] . (grammar:baseline)"
    ],
    [
      "SpecializedRule",
      "number-baseline",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "number-baseline-font",
      "default",
      "[t] \"आधार रेखा\"; [t] @font; [n] . (grammar:ignoreFont=@font)",
      "self::number",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\"",
      "preceding-sibling::identifier",
      "preceding-sibling::*[contains(@role,\"letter\")]",
      "parent::*/parent::infixop[@role=\"implicit\"]"
    ],
    [
      "SpecializedRule",
      "number-baseline-font",
      "default",
      "brief",
      "[t] \"आधार\"; [t] @font; [n] . (grammar:ignoreFont=@font)"
    ],
    [
      "SpecializedRule",
      "number-baseline-font",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "identifier",
      "default",
      "[m] CQFspaceoutIdentifier",
      "self::identifier",
      "string-length(text())>1",
      "@role!=\"unit\"",
      "not(@font) or @font=\"normal\" or contains(@grammar, \"ignoreFont\")",
      "text()!=translate(text(), \"abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρςστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ\", \"\")"
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
      "negative",
      "default",
      "[t] \"ऋण\"; [n] children/*[1]",
      "self::prefixop",
      "@role=\"negative\"",
      "children/identifier"
    ],
    [
      "Aliases",
      "negative",
      "self::prefixop",
      "@role=\"negative\"",
      "children/number"
    ],
    [
      "Aliases",
      "negative",
      "self::prefixop",
      "@role=\"negative\"",
      "children/fraction[@role=\"vulgar\"]"
    ],
    [
      "Rule",
      "negative",
      "default",
      "[t] \"बाकी\"; [n] children/*[1]",
      "self::prefixop",
      "@role=\"negative\""
    ],
    [
      "Rule",
      "prefix",
      "default",
      "[m] content/*; [n] children/*[1]",
      "self::prefixop"
    ],
    [
      "Rule",
      "postfix",
      "default",
      "[n] children/*[1]; [m] content/*",
      "self::postfixop"
    ],
    [
      "Rule",
      "binary-operation",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::infixop"
    ],
    [
      "Rule",
      "division",
      "default",
      "[n] children/*[1]; [t] \"divided by\"; [n] children/*[2]",
      "self::infixop",
      "@role=\"division\"",
      "count(children/*)=2"
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
      "subtraction",
      "default",
      "[m] children/* (separator:\"बाकी\")",
      "self::infixop",
      "@role=\"subtraction\""
    ],
    [
      "Rule",
      "function-unknown",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl"
    ],
    [
      "Rule",
      "function-prefix",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "children/*[1][@role=\"prefix function\"]"
    ],
    [
      "Rule",
      "fences-open-close",
      "default",
      "[n] content/*[1]; [n] children/*[1]; [n] content/*[2]",
      "self::fenced",
      "@role=\"leftright\""
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[t] \"निरपेक्ष मान आरंभ\"; [n] children/*[1]; [t] \"निरपेक्ष मान समाप्त\"",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\""
    ],
    [
      "SpecializedRule",
      "fences-neutral",
      "default",
      "sbrief",
      "[t] \"निरपेक्ष मान\"; [n] children/*[1]; [t] \"निरपेक्ष मान समाप्त\""
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
      "empty-set",
      "default",
      "[t] \"रिक्त समुच्चय\"",
      "self::fenced[@role=\"set empty\"]",
      "not(name(../..)=\"appl\")"
    ],
    [
      "SpecializedRule",
      "empty-set",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "fences-set",
      "default",
      "[t] \"समुच्चय आरंभ\"; [n] children/*[1]; [t] \"समुच्चय समाप्त\"",
      "self::fenced",
      "contains(@role,\"set \")",
      "not(name(../..)=\"appl\")"
    ],
    [
      "SpecializedRule",
      "fences-set",
      "default",
      "sbrief",
      "[t] \"समुच्चय\"; [n] children/*[1]; [t] \"समुच्चय समाप्त\""
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
      "[t] \"क्रमगुणित\"",
      "self::punctuation",
      "text()=\"!\"",
      "name(preceding-sibling::*[1])!=\"text\""
    ],
    [
      "Rule",
      "minus",
      "default",
      "[t] \"बाकी\"",
      "self::operator",
      "text()=\"-\""
    ],
    [
      "Rule",
      "fraction",
      "default",
      "[t] CSFopenFracVerbose; [n] children/*[1]; [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "brief",
      "[t] CSFopenFracBrief; [n] children/*[1]; [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "sbrief",
      "[t] CSFopenFracSbrief; [n] children/*[1]; [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief",
      "self::fraction"
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
      "SpecializedRule",
      "vulgar-fraction",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "vulgar-fraction",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "continued-fraction-outer",
      "default",
      "[t] \"भिन्न चालू\"; [n] children/*[1]; [t] \"ऊपर\"; [n] children/*[2]",
      "self::fraction",
      "not(ancestor::fraction)",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-outer",
      "default",
      "brief",
      "[t] \"भिन्न चालू\"; [n] children/*[1]; [t] \"ऊपर\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-outer",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "continued-fraction-inner",
      "default",
      "[t] \"आरंभ भिन्न\"; [n] children/*[1]; [t] \"ऊपर\"; [n] children/*[2]",
      "self::fraction",
      "ancestor::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-inner",
      "default",
      "brief",
      "[t] \"आरंभ भिन्न\"; [n] children/*[1]; [t] \"ऊपर\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-inner",
      "brief",
      "sbrief",
      "[t] \"भिन्न\"; [n] children/*[1]; [t] \"ऊपर\"; [n] children/*[2]"
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
      "sqrt",
      "brief",
      "[t] CSFopenRadicalBrief; [n] children/*[1]; [t] CSFcloseRadicalBrief",
      "self::sqrt"
    ],
    [
      "Rule",
      "sqrt",
      "sbrief",
      "[t] CSFopenRadicalSbrief; [n] children/*[1]; [t] CSFcloseRadicalBrief",
      "self::sqrt"
    ],
    [
      "Rule",
      "root",
      "default",
      "[t] CSFindexRadicalVerbose; [n] children/*[1]; [t] CSFopenRadicalVerbose; [n] children/*[2]; [t] CSFcloseRadicalVerbose",
      "self::root"
    ],
    [
      "Rule",
      "root",
      "brief",
      "[t] CSFindexRadicalBrief; [n] children/*[1]; [t] CSFopenRadicalBrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root"
    ],
    [
      "Rule",
      "root",
      "sbrief",
      "[t] CSFindexRadicalSbrief; [n] children/*[1]; [t] CSFopenRadicalSbrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root"
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2]; [t] CSFoverscript; [n] children/*[3]",
      "self::limboth",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2]",
      "self::limlower",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limupper",
      "default",
      "[n] children/*[1]; [t] CSFoverscript; [n] children/*[2]",
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
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2]; [t] CSFoverscript; [n] children/*[3]; [t] \"लिपि समाप्त\"",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower-end",
      "default",
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2]; [t] \"लिपि समाप्त\"",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper-end",
      "default",
      "[n] children/*[1]; [t] CSFoverscript; [n] children/*[2]; [t] \"लिपि समाप्त\"",
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
      "[n] children/*[1]; [n] children/*[2]; [n] children/*[3]",
      "self::integral"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[n] children/*[1]; [t] \"पादांक\"; [n] children/*[2]; [t] \"उर्ध्वान्क\"; [n] children/*[3]; [t] \"आधार रेखा\"",
      "self::limboth",
      "@role=\"integral\""
    ],
    [
      "SpecializedRule",
      "integral",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"अधो\"; [n] children/*[2]; [t] \"उर्ध्व\"; [n] children/*[3]; [t] \"आधार\""
    ],
    [
      "SpecializedRule",
      "integral",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "bigop",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
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
      "subscript",
      "brief",
      "[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]",
      "self::subscript"
    ],
    [
      "SpecializedRule",
      "subscript",
      "brief",
      "sbrief"
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
      "./children/*[2][@role!=\"othernumber\"]"
    ],
    [
      "SpecializedRule",
      "subscript-simple",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "subscript-simple",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "subscript-baseline",
      "default",
      "[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]; [t] CSFbaselineVerbose",
      "self::subscript",
      "following-sibling::*",
      "not(name(following-sibling::subscript/children/*[1])=\"empty\" or (name(following-sibling::infixop[@role=\"implicit\"]/children/*[1])=\"subscript\" and name(following-sibling::*/children/*[1]/children/*[1])=\"empty\")) and @role!=\"subsup\"",
      "not(following-sibling::*[@role=\"rightsuper\" or @role=\"rightsub\" or @role=\"leftsub\" or @role=\"leftsub\"])"
    ],
    [
      "SpecializedRule",
      "subscript-baseline",
      "default",
      "brief",
      "[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]; [t] CSFbaselineBrief"
    ],
    [
      "SpecializedRule",
      "subscript-baseline",
      "brief",
      "sbrief"
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
      "SpecializedRule",
      "subscript-empty-sup",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "subscript-empty-sup",
      "brief",
      "sbrief"
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
      "SpecializedRule",
      "superscript",
      "default",
      "brief",
      "[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "superscript",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "superscript-baseline",
      "default",
      "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]; [t] CSFbaselineVerbose",
      "self::superscript",
      "following-sibling::*",
      "not(name(following-sibling::superscript/children/*[1])=\"empty\" or (name(following-sibling::infixop[@role=\"implicit\"]/children/*[1])=\"superscript\" and name(following-sibling::*/children/*[1]/children/*[1])=\"empty\")) and not(following-sibling::*[@role=\"rightsuper\" or @role=\"rightsub\" or @role=\"leftsub\" or @role=\"leftsub\"])"
    ],
    [
      "SpecializedRule",
      "superscript-baseline",
      "default",
      "brief",
      "[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]; [t] CSFbaselineBrief"
    ],
    [
      "SpecializedRule",
      "superscript-baseline",
      "brief",
      "sbrief"
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
      "SpecializedRule",
      "superscript-empty-sub",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "superscript-empty-sub",
      "brief",
      "sbrief"
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
      "square",
      "default",
      "[n] children/*[1]; [t] \"वर्ग\"",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=2]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "name(children/*[1])!=\"subscript\" or (name(children/*[1])=\"subscript\" and name(children/*[1]/children/*[1])=\"identifier\" and name(children/*[1]/children/*[2])=\"number\" and children/*[1]/children/*[2][@role!=\"mixed\"] and children/*[1]/children/*[2][@role!=\"othernumber\"])",
      "not(@embellished)"
    ],
    [
      "SpecializedRule",
      "square",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "square",
      "default",
      "sbrief"
    ],
    [
      "Aliases",
      "square",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=2]",
      "@embellished",
      "children/*[1][@role=\"prefix operator\"]"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[n] children/*[1]; [t] \"घन\"",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=3]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "name(children/*[1])!=\"subscript\" or (name(children/*[1])=\"subscript\" and name(children/*[1]/children/*[1])=\"identifier\" and name(children/*[1]/children/*[2])=\"number\" and children/*[1]/children/*[2][@role!=\"mixed\"] and children/*[1]/children/*[2][@role!=\"othernumber\"])",
      "not(@embellished)"
    ],
    [
      "SpecializedRule",
      "cube",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "cube",
      "default",
      "sbrief"
    ],
    [
      "Aliases",
      "cube",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=3]",
      "@embellished",
      "children/*[1][@role=\"prefix operator\"]"
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
      "SpecializedRule",
      "prime",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "prime",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "double-prime",
      "default",
      "[t] \"डबल प्राइम\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=2"
    ],
    [
      "Aliases",
      "double-prime",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())=2"
    ],
    [
      "Rule",
      "triple-prime",
      "default",
      "[t] \"तिगुना प्राइम\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=3"
    ],
    [
      "Aliases",
      "triple-prime",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())=3"
    ],
    [
      "Rule",
      "quadruple-prime",
      "default",
      "[t] \"चौगुना प्राइम\"",
      "self::punctuated",
      "@role=\"prime\"",
      "count(children/*)=4"
    ],
    [
      "Aliases",
      "quadruple-prime",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())=4"
    ],
    [
      "Rule",
      "counted-prime",
      "default",
      "[t] count(children/*) (grammar:numbers2alpha); [t] \"अभाज्य (as in prime number)\"",
      "self::punctuated",
      "@role=\"prime\""
    ],
    [
      "Rule",
      "counted-prime",
      "default",
      "[t] string-length(text()) (grammar:numbers2alpha); [t] \"अभाज्य (as in prime number)\"",
      "self::operator",
      "@role=\"prime\"",
      "string-length(text())>4"
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
      "SpecializedRule",
      "prime-subscript",
      "default",
      "brief",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]"
    ],
    [
      "SpecializedRule",
      "prime-subscript",
      "brief",
      "sbrief"
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
      "SpecializedRule",
      "prime-subscript-baseline",
      "default",
      "brief",
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]; [t] CSFbaselineBrief"
    ],
    [
      "SpecializedRule",
      "prime-subscript-baseline",
      "brief",
      "sbrief"
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
      "[n] children/*[1]/children/*[1]; [n] children/*[2]; [n] children/*[1]/children/*[2]",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"subscript\"",
      "name(children/*[1]/children/*[1])=\"identifier\"",
      "name(children/*[1]/children/*[2])=\"number\"",
      "children/*[1]/children/*[2][@role!=\"mixed\"]",
      "children/*[1]/children/*[2][@role!=\"othernumber\"]"
    ],
    [
      "SpecializedRule",
      "prime-subscript-simple",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "prime-subscript-simple",
      "default",
      "sbrief"
    ],
    [
      "Rule",
      "overscore",
      "default",
      "[t] \"ऊपर संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]"
    ],
    [
      "SpecializedRule",
      "overscore",
      "default",
      "brief",
      "[t] \"ऊपर संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "overscore",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "double-overscore",
      "default",
      "[t] \"ऊपर के ऊपर संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "name(children/*[1])=\"overscore\"",
      "children/*[1]/children/*[2][@role=\"overaccent\"]"
    ],
    [
      "SpecializedRule",
      "double-overscore",
      "default",
      "brief",
      "[t] \"ऊपर के ऊपर संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "double-overscore",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "underscore",
      "default",
      "[t] \"निचे संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]"
    ],
    [
      "SpecializedRule",
      "underscore",
      "default",
      "brief",
      "[t] \"निचे संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "underscore",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "double-underscore",
      "default",
      "[t] \"निचे के निचे संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]",
      "name(children/*[1])=\"underscore\"",
      "children/*[1]/children/*[2][@role=\"underaccent\"]"
    ],
    [
      "SpecializedRule",
      "double-underscore",
      "default",
      "brief",
      "[t] \"निचे के निचे संशोधित\"; [n] children/*[1]; [t] \"के साथ\"; [n] children/*[2]"
    ],
    [
      "SpecializedRule",
      "double-underscore",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "overbar",
      "default",
      "[n] children/*[1]; [t] \"उर्ध्व दंड\"",
      "self::overscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "SpecializedRule",
      "overbar",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"उर्ध्व दंड\""
    ],
    [
      "SpecializedRule",
      "overbar",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "underbar",
      "default",
      "[n] children/*[1]; [t] \"अधो दंड\"",
      "self::underscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"underaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "SpecializedRule",
      "underbar",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"अधो दंड\""
    ],
    [
      "SpecializedRule",
      "underbar",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "overtilde",
      "default",
      "[n] children/*[1]; [t] \"उर्ध्व अंतर-चिह्न\"",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "contains(@role,\"letter\")",
      "children/*[2][text()=\"~\" or text()=\"˜\" or text()=\"∼\" or text()=\"～\"]"
    ],
    [
      "SpecializedRule",
      "overtilde",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"उर्ध्व अंतर-चिह्न\""
    ],
    [
      "SpecializedRule",
      "overtilde",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "undertilde",
      "default",
      "[n] children/*[1]; [t] \"अधो अंतर-चिह्न\"",
      "self::underscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"underaccent\"]",
      "children/*[2][text()=\"~\" or text()=\"˜\" or text()=\"∼\" or text()=\"～\"]"
    ],
    [
      "SpecializedRule",
      "undertilde",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"अधो अंतर-चिह्न\""
    ],
    [
      "SpecializedRule",
      "undertilde",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "matrix",
      "default",
      "[t] \"आरंभ\"; [t] count(children/*); [t] \"बाय\"; [t] count(children/*[1]/children/*); [t] \"आव्यूह\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"आव्यूह समाप्त\"",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix",
      "sbrief",
      "[t] count(children/*); [t] \"बाय\"; [t] count(children/*[1]/children/*); [t] \"आव्यूह\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"आव्यूह समाप्त\"",
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
      "[m] children/* (ctxtFunc:CTFordinalCounter, context:\"स्तंभ\", pause:200)",
      "self::row"
    ],
    [
      "Rule",
      "row-with-label",
      "default",
      "[t] \"लेबल के साथ\"; [n] content/*[1]; [t] \"लेबल समाप्त\" (pause:200); [m] children/* (ctxtFunc:CTFordinalCounter, context:\"स्तंभ\")",
      "self::row",
      "content"
    ],
    [
      "Rule",
      "row-with-label",
      "brief",
      "[t] \"लेबल\"; [n] content/*[1]; [m] children/* (ctxtFunc:CTFordinalCounter, context:\"स्तंभ\")",
      "self::row",
      "content"
    ],
    [
      "SpecializedRule",
      "row-with-label",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "row-with-text-label",
      "sbrief",
      "[t] \"लेबल\"; [t] CSFRemoveParens; [m] children/* (ctxtFunc:CTFordinalCounter, context:\"स्तंभ\")",
      "self::row",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-row",
      "default",
      "[t] \"रिक्त\"",
      "self::row",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "matrix-cell",
      "default",
      "[n] children/*[1] (pause:300)",
      "self::cell"
    ],
    [
      "Rule",
      "empty-cell",
      "default",
      "[t] \"रिक्त\" (pause:300)",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "determinant",
      "default",
      "[t] \"आरंभ\"; [t] count(children/*); [t] \"बाय\"; [t] count(children/*[1]/children/*); [t] \"सारणिक\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"सारणिक समाप्त\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "SpecializedRule",
      "determinant",
      "default",
      "sbrief",
      "[t] count(children/*); [t] \"बाय\"; [t] count(children/*[1]/children/*); [t] \"सारणिक\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"सारणिक समाप्त\""
    ],
    [
      "Rule",
      "determinant-simple",
      "default",
      "[t] \"आरंभ\"; [t] count(children/*); [t] \"बाय\"; [t] count(children/*[1]/children/*); [t] \"सारणिक\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति\", grammar:simpleDet); [t] \"सारणिक समाप्त\"",
      "self::matrix",
      "@role=\"determinant\"",
      "CQFdetIsSimple"
    ],
    [
      "SpecializedRule",
      "determinant-simple",
      "default",
      "sbrief",
      "[t] count(children/*); [t] \"बाय\"; [t] count(children/*[1]/children/*); [t] \"सारणिक\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति\", grammar:simpleDet); [t] \"सारणिक समाप्त\""
    ],
    [
      "Rule",
      "row-simple",
      "default",
      "[m] children/*",
      "self::row",
      "@role=\"determinant\"",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "layout",
      "default",
      "[t] \"खाका आरंभ\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"खाका समाप्त\"",
      "self::table"
    ],
    [
      "Rule",
      "layout",
      "sbrief",
      "[t] \"खाका\"; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"खाका समाप्त\"",
      "self::table"
    ],
    [
      "Rule",
      "binomial",
      "default",
      "[t] \"द्विपद अथवा आव्यूह आरंभ\"; [n] children/*[1]/children/*[1]; [t] \"चयन करें\"; [n] children/*[2]/children/*[1]; [t] \"द्विपद अथवा आव्यूह समाप्त\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "binomial",
      "sbrief",
      "[t] \"द्विपद अथवा आव्यूह\"; [n] children/*[1]/children/*[1]; [t] \"चयन करें\"; [n] children/*[2]/children/*[1]; [t] \"द्विपद अथवा आव्यूह समाप्त\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "cases",
      "default",
      "[t] \"खाका आरंभ\"; [t] \"विस्तारित\"; [n] content/*[1]; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"खाका समाप्त\"",
      "self::cases"
    ],
    [
      "Rule",
      "cases",
      "sbrief",
      "[t] \"खाका\"; [t] \"विस्तारित\"; [n] content/*[1]; [m] children/* (ctxtFunc:CTFordinalCounter, grammar:female, context:\"पंक्ति \"); [t] \"खाका समाप्त\"",
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
      "[t] \"लेबल के साथ\"; [n] content/*[1]; [t] \"लेबल समाप्त\" (pause:200); [m] children/*",
      "self::line",
      "content"
    ],
    [
      "SpecializedRule",
      "line-with-label",
      "default",
      "brief",
      "[t] \"लेबल\"; [n] content/*[1] (pause:200); [m] children/*"
    ],
    [
      "SpecializedRule",
      "line-with-label",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "line-with-text-label",
      "sbrief",
      "[t] \"लेबल\"; [t] CSFRemoveParens; [m] children/*",
      "self::line",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-line",
      "default",
      "[t] \"रिक्त\"",
      "self::line",
      "count(children/*)=0",
      "not(content)"
    ],
    [
      "SpecializedRule",
      "empty-line",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "empty-line",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "empty-line-with-label",
      "default",
      "[t] \"लेबल के साथ\"; [n] content/*[1]; [t] \"लेबल समाप्त\" (pause:200); [t] \"रिक्त\"",
      "self::line",
      "count(children/*)=0",
      "content"
    ],
    [
      "SpecializedRule",
      "empty-line-with-label",
      "default",
      "brief",
      "[t] \"लेबल\"; [n] content/*[1] (pause:200); [t] \"रिक्त\""
    ],
    [
      "SpecializedRule",
      "empty-line-with-label",
      "brief",
      "sbrief"
    ],
    [
      "Rule",
      "enclose",
      "default",
      "[t] \"घेरे का आरंभ\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"घेरा समाप्त\"",
      "self::enclose"
    ],
    [
      "Aliases",
      "overbar",
      "self::enclose",
      "@role=\"top\""
    ],
    [
      "Aliases",
      "underbar",
      "self::enclose",
      "@role=\"bottom\""
    ],
    [
      "Rule",
      "leftbar",
      "default",
      "[t] \"ऊर्ध्वाधर दंड\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"ऊर्ध्वाधर दंड\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
      "[t] \"मिटाया हुआ\"; [n] children/*[1]; [t] \"मिटाया हुआ समाप्त\"",
      "self::enclose",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "cancel",
      "default",
      "[t] \"मिटाया हुआ\"; [n] children/*[1]/children/*[1]; [t] \"के साथ\"; [n] children/*[2]; [t] \"मिटाया हुआ समाप्त\"",
      "self::overscore",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "SpecializedRule",
      "cancel",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "cancel",
      "default",
      "sbrief"
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
      "[t] \"मिटाया हुआ\"; [n] children/*[2]/children/*[1]; [t] \"के साथ\"; [n] children/*[1]; [t] \"मिटाया हुआ समाप्त\"",
      "self::overscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [
      "SpecializedRule",
      "cancel-reverse",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "cancel-reverse",
      "default",
      "sbrief"
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
      "punctuated",
      "default",
      "[m] children/*",
      "self::punctuated"
    ],
    [
      "Rule",
      "unit",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate:plural)",
      "self::identifier[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-combine",
      "default",
      "[m] children/*",
      "self::infixop[@role=\"unit\"]"
    ],
    [
      "Rule",
      "inference",
      "default",
      "[t] \"अनुमान नियम\"; [m] content/*; [t] \"निष्कर्ष के साथ\"; [n] children/*[1]; [t] \"और\"; [t] count(children/*[2]/children/*); [t] \"पूर्वपक्ष\"",
      "self::inference"
    ],
    [
      "Rule",
      "inference",
      "default",
      "[t] \"अनुमान नियम\"; [m] content/*; [t] \"निष्कर्ष के साथ\"; [n] children/*[1]; [t] \"और\"; [t] count(children/*[2]/children/*); [t] \"पूर्वपक्ष\"",
      "self::inference",
      "count(children/*[2]/children/*)<2"
    ],
    [
      "Rule",
      "premise",
      "default",
      "[m] children/* (ctxtFunc:CTFordinalCounter, context:\"premise \")",
      "self::premises"
    ],
    [
      "Rule",
      "conclusion",
      "default",
      "[n] children/*[1]",
      "self::conclusion"
    ],
    [
      "Rule",
      "label",
      "default",
      "[t] \"सूचक पर्चा\"; [n] children/*[1]",
      "self::rulelabel"
    ],
    [
      "Rule",
      "axiom",
      "default",
      "[t] \"अभिगृहीत\"; [m] children/*[1]",
      "self::inference",
      "@role=\"axiom\""
    ],
    [
      "Rule",
      "axiom",
      "default",
      "[t] \"रिक्त अभिगृहीत\"",
      "self::empty",
      "@role=\"axiom\""
    ],
    [
      "Generator",
      "CGFtensorRules"
    ]
  ]
}
