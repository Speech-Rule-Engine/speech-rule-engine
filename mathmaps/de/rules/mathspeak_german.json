{
  "locale": "de",
  "domain": "mathspeak",
  "modality": "speech",
  "rules": [
    [
      "Rule",
      "collapsed",
      "default",
      "[n] . (engine:modality=summary,grammar:collapsed); [t] \"kollabiert\"",
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
      "[n] text() (grammar:ignoreCaps=\"großes\")",
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
      "[t] \"leer\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"cell\""
    ],
    [
      "Rule",
      "blank-line-empty",
      "default",
      "[t] \"leer\"",
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
      "name(self::*)!=\"number\"",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\""
    ],
    [
      "Rule",
      "font-number",
      "default",
      "[t] @font (grammar:localFontNumber); [n] . (grammar:ignoreFont=@font)",
      "self::number",
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
      "string-length(text())=1 or string-length(text())=2",
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
      "string-length(text())=1 or string-length(text())=2",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"italic\"",
      "self::*"
    ],
    [
      "Rule",
      "font-double-struck",
      "default",
      "[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)",
      "self::*",
      "name(self::*)!=\"number\"",
      "string-length(text())=1 or string-length(text())=2",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"double-struck\""
    ],
    [
      "Rule",
      "font-number-double-struck",
      "default",
      "[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFontNumber)",
      "self::number",
      "string-length(text())=1 or string-length(text())=2",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"double-struck\""
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
      "[n] children/*[1]; [n] children/*[2]; ",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "number-with-chars",
      "default",
      "[t] \"Zahl\"; [m] CQFspaceoutNumber (grammar:protected)",
      "self::number",
      "@role=\"othernumber\"",
      "\"\" != translate(text(), \"0123456789.,\", \"\")",
      "not(contains(@grammar, \"protected\"))"
    ],
    [
      "Rule",
      "number-as-upper-word",
      "default",
      "[t] \"Wort groß\"; [t] CSFspaceoutText",
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
      "[t] \"Grundlinie\"; [n] . (grammar:baseline)",
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
      "[t] \"Grund\"; [n] . (grammar:baseline)"
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
      "[t] \"Grundlinie\"; [t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)",
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
      "[t] \"Grund\"; [t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)"
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
      "[t] \"minus\"; [n] children/*[1]",
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
      "[t] \"minus\"; [n] children/*[1]",
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
      "[m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop"
    ],
    [
      "Rule",
      "division",
      "default",
      "[n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]",
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
      "[m] children/* (separator:\"minus\");",
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
      "[t] \"Anfang Betrag\"; [n] children/*[1]; [t] \"Ende Betrag\"",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "SpecializedRule",
      "fences-neutral",
      "default",
      "sbrief",
      "[t] \"Betrag\"; [n] children/*[1]; [t] \"Ende Betrag\""
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
      "[t] \"leere Menge\"",
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
      "[t] \"Anfang Menge\"; [n] children/*[1]; [t] \"Ende Menge\"",
      "self::fenced",
      "@role=\"set empty\" or @role=\"set extended\" or @role=\"set singleton\" or @role=\"set collection\"",
      "not(name(../..)=\"appl\")"
    ],
    [
      "SpecializedRule",
      "fences-set",
      "default",
      "sbrief",
      "[t] \"Menge\"; [n] children/*[1]; [t] \"Ende Menge\""
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
      "[t] \"Fakultät\"",
      "self::punctuation",
      "text()=\"!\"",
      "name(preceding-sibling::*[1])!=\"text\""
    ],
    [
      "Rule",
      "minus",
      "default",
      "[t] \"minus\"",
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
      "[t] CSFvulgarFraction (grammar:correctOne)",
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
      "[t] \"Kettenbruch\"; [n] children/*[1];[t] \"durch\"; [n] children/*[2]",
      "self::fraction",
      "not(ancestor::fraction)",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "Rule",
      "continued-fraction-inner",
      "default",
      "[t] \"Anfang Bruch\"; [n] children/*[1];[t] \"durch\"; [n] children/*[2]",
      "self::fraction",
      "ancestor::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-inner",
      "default",
      "sbrief",
      "[t] \"Bruch\"; [n] children/*[1];[t] \"durch\"; [n] children/*[2]"
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
      "root-small",
      "default",
      "[t] CSFopenRadicalVerbose; [n] children/*[2]; [t] CSFcloseRadicalVerbose",
      "self::root",
      "children/*[1][text()=3 or text()=2]"
    ],
    [
      "Rule",
      "root-small",
      "brief",
      "[t] CSFopenRadicalBrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root",
      "children/*[1][text()=3 or text()=2]"
    ],
    [
      "Rule",
      "root-small",
      "sbrief",
      "[t] CSFopenRadicalSbrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root",
      "children/*[1][text()=3 or text()=2]"
    ],
    [
      "Rule",
      "root",
      "default",
      "[t] CSFindexRadicalVerbose; [n] children/*[1];[t] CSFopenRadicalVerbose; [n] children/*[2]; [t] CSFcloseRadicalVerbose",
      "self::root"
    ],
    [
      "Rule",
      "root",
      "brief",
      "[t] CSFindexRadicalBrief; [n] children/*[1];[t] CSFopenRadicalBrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root"
    ],
    [
      "Rule",
      "root",
      "sbrief",
      "[t] CSFindexRadicalSbrief; [n] children/*[1];[t] CSFopenRadicalSbrief; [n] children/*[2]; [t] CSFcloseRadicalBrief",
      "self::root"
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];[t] CSFoverscript; [n] children/*[3]",
      "self::limboth",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];",
      "self::limlower",
      "name(../..)=\"underscore\" or name(../..)=\"overscore\"",
      "following-sibling::*[@role!=\"underaccent\" and @role!=\"overaccent\"]"
    ],
    [
      "Rule",
      "limupper",
      "default",
      "[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];",
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
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];[t] CSFoverscript; [n] children/*[3]; [t] \"Ende Überschrift\"",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower-end",
      "default",
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2]; [t] \"Ende Unterschrift\"",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper-end",
      "default",
      "[n] children/*[1]; [t] CSFoverscript; [n] children/*[2]; [t] \"Ende Überschrift\"",
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
      "[n] children/*[1]; [t] \"Index\"; [n] children/*[2];[t] \"Hoch\"; [n] children/*[3]; [t] \"Grundlinie\";",
      "self::limboth",
      "@role=\"integral\""
    ],
    [
      "SpecializedRule",
      "integral",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"Index\"; [n] children/*[2];[t] \"Hoch\"; [n] children/*[3]; [t] \"Base\";"
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
      "[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];[t] CSFbaselineVerbose",
      "self::superscript",
      "following-sibling::*",
      "not(name(following-sibling::superscript/children/*[1])=\"empty\" or (name(following-sibling::infixop[@role=\"implicit\"]/children/*[1])=\"superscript\" and name(following-sibling::*/children/*[1]/children/*[1])=\"empty\")) and not(following-sibling::*[@role=\"rightsuper\" or @role=\"rightsub\" or @role=\"leftsub\" or @role=\"leftsub\"])"
    ],
    [
      "SpecializedRule",
      "superscript-baseline",
      "default",
      "brief",
      "[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];[t] CSFbaselineBrief"
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
      "[n] children/*[1]; [t] \"Quadrat\"",
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
      "[n] children/*[1]; [t] \"Kubik\"",
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
      "[t] \"zwei Strich\"",
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
      "[t] \"drei Strich\"",
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
      "[t] \"vier Strich\"",
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
      "[t] count(children/*) (grammar:numbers2alpha); [t] \"Strich\"",
      "self::punctuated",
      "@role=\"prime\""
    ],
    [
      "Rule",
      "counted-prime",
      "default",
      "[t] string-length(text()) (grammar:numbers2alpha); [t] \"Strich\"",
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
      "[t] \"modifiziert oben\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]"
    ],
    [
      "SpecializedRule",
      "overscore",
      "default",
      "brief",
      "[t] \"mod oben\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]"
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
      "[t] \"modifiziert oben oben\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]",
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
      "[t] \"mod oben oben\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]"
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
      "[t] \"modifiziert unten\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]"
    ],
    [
      "SpecializedRule",
      "underscore",
      "default",
      "brief",
      "[t] \"mod unten\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]"
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
      "[t] \"modifiziert unten unten\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]",
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
      "[t] \"mod unten unten\"; [n] children/*[1]; [t] \"mit\"; [n] children/*[2]"
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
      "[n] children/*[1]; [t] \"Überstrich\"",
      "self::overscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "underbar",
      "default",
      "[n] children/*[1]; [t] \"Unterstrich\"",
      "self::underscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"underaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "overtilde",
      "default",
      "[n] children/*[1]; [t] \"Tilde oben\"",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "contains(@role,\"letter\")",
      "children/*[2][text()=\"~\" or text()=\"˜\" or text()=\"∼\" or text()=\"～\"]"
    ],
    [
      "Rule",
      "undertilde",
      "default",
      "[n] children/*[1]; [t] \"Tilde unten\"",
      "self::underscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"underaccent\"]",
      "children/*[2][text()=\"~\" or text()=\"˜\" or text()=\"∼\" or text()=\"～\"]"
    ],
    [
      "Rule",
      "matrix",
      "default",
      "[t] \"Anfang\"; [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Matrize\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Matrize\"",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix",
      "sbrief",
      "[t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Matrize\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Matrize\"",
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
      "[m] children/* (ctxtFunc:CTFordinalCounter,context:\"Spalte\", pause: 200)",
      "self::row"
    ],
    [
      "Rule",
      "row-with-label",
      "default",
      "[t] \"mit Bezeichner\"; [n] content/*[1]; [t] \"Ende Bezeichner\" (pause: 200); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Spalte\")",
      "self::row",
      "content"
    ],
    [
      "Rule",
      "row-with-label",
      "brief",
      "[t] \"Bezeichner\"; [n] content/*[1]; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Spalte\")",
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
      "[t] \"Bezeichner\"; [t] CSFRemoveParens;[m] children/* (ctxtFunc:CTFordinalCounter,context:\"Spalte\")",
      "self::row",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-row",
      "default",
      "[t] \"leer\"",
      "self::row",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "matrix-cell",
      "default",
      "[n] children/*[1] (pause: 300)",
      "self::cell"
    ],
    [
      "Rule",
      "empty-cell",
      "default",
      "[t] \"leer\" (pause: 300)",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "determinant",
      "default",
      "[t] \"Anfang\"; [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Determinante\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Determinante\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "SpecializedRule",
      "determinant",
      "default",
      "sbrief",
      "[t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Determinante\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Determinante\""
    ],
    [
      "Rule",
      "determinant-simple",
      "default",
      "[t] \"Anfang\"; [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Determinante\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile\",grammar:simpleDet); [t] \"Ende Determinante\"",
      "self::matrix",
      "@role=\"determinant\"",
      "CQFdetIsSimple"
    ],
    [
      "SpecializedRule",
      "determinant-simple",
      "default",
      "sbrief",
      "[t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Determinante\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile\",grammar:simpleDet); [t] \"Ende Determinante\""
    ],
    [
      "Rule",
      "row-simple",
      "default",
      "[m] children/*;",
      "self::row",
      "@role=\"determinant\"",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "layout",
      "default",
      "[t] \"Anfang Anordnung\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Anordnung\"",
      "self::table"
    ],
    [
      "Rule",
      "layout",
      "sbrief",
      "[t] \"Anordnung\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Anordnung\"",
      "self::table"
    ],
    [
      "Rule",
      "binomial",
      "default",
      "[t] \"Anfang Binomialkoeffizient\"; [n] children/*[2]/children/*[1]; [t] \"aus\";  [n] children/*[1]/children/*[1]; [t] \"Ende Binomialkoeffizient\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "binomial",
      "brief",
      "[t] \"Anfang Binomial\"; [n] children/*[2]/children/*[1]; [t] \"aus\";  [n] children/*[1]/children/*[1]; [t] \"Ende Binomial\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "binomial",
      "sbrief",
      "[t] \"Binomial\"; [n] children/*[2]/children/*[1]; [t] \"aus\";  [n] children/*[1]/children/*[1]; [t] \"Ende Binomial\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "cases",
      "default",
      "[t] \"Anfang Fallunterscheidung\"; [t] \"große\"; [n] content/*[1];[m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Fallunterscheidung\"",
      "self::cases"
    ],
    [
      "Rule",
      "cases",
      "brief",
      "[t] \"Anfang Fälle\"; [t] \"große\"; [n] content/*[1];[m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Fälle\"",
      "self::cases"
    ],
    [
      "Rule",
      "cases",
      "sbrief",
      "[t] \"Fälle\"; [t] \"große\"; [n] content/*[1];[m] children/* (ctxtFunc:CTFordinalCounter,context:\"Zeile \"); [t] \"Ende Fälle\"",
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
      "[t] \"mit Bezeichner\"; [n] content/*[1]; [t] \"Ende Bezeichner\" (pause: 200); [m] children/*",
      "self::line",
      "content"
    ],
    [
      "SpecializedRule",
      "line-with-label",
      "default",
      "brief",
      "[t] \"Bezeichner\"; [n] content/*[1] (pause: 200); [m] children/*"
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
      "[t] \"Bezeichner\"; [t] CSFRemoveParens; [m] children/*",
      "self::line",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-line",
      "default",
      "[t] \"leer\"",
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
      "[t] \"mit Bezeichner\"; [n] content/*[1]; [t] \"Ende Bezeichner\" (pause: 200); [t] \"leer\"",
      "self::line",
      "count(children/*)=0",
      "content"
    ],
    [
      "SpecializedRule",
      "empty-line-with-label",
      "default",
      "brief",
      "[t] \"Bezeichner\"; [n] content/*[1] (pause: 200); [t] \"leer\""
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
      "[t] \"Anfang Umschließung\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"Ende Umschließung\"",
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
      "[t] \"senkrechter Strich\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"senkrechter Strich\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
      "[t] \"durchgestrichen\"; [n] children/*[1]; [t] \"Ende duchgestrichen\"",
      "self::enclose",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "cancel",
      "default",
      "[t] \"durchgestrichen\"; [n] children/*[1]/children/*[1]; [t] \"mit\"; [n] children/*[2]; [t] \"Ende duchgestrichen\"",
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
      "[t] \"durchgestrichen\"; [n] children/*[2]/children/*[1]; [t] \"mit\"; [n] children/*[1]; [t] \"Ende duchgestrichen\"",
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
      "[t] \"Schlussregel\"; [m] content/*; [t] \"mit Folgerung\"; [n] children/*[1]; [t] \"aus\"; [t] count(children/*[2]/children/*); [t] \"Prämissen\"",
      "self::inference"
    ],
    [
      "Rule",
      "inference",
      "default",
      "[t] \"Schlussregel\"; ; [m] content/*; [t] \"mit Folgerung\"; [n] children/*[1]; [t] \"aus\"; [t] count(children/*[2]/children/*); [t] \"Prämisse\"",
      "self::inference",
      "count(children/*[2]/children/*)<2"
    ],
    [
      "Rule",
      "premise",
      "default",
      "[m] children/* (ctxtFunc:CTFordinalCounter,context:\"Prämisse \");",
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
      "[t] \"Regel\"; [n] children/*[1]",
      "self::rulelabel"
    ],
    [
      "Rule",
      "axiom",
      "default",
      "[t] \"Axiom\"; [m] children/*[1];",
      "self::inference",
      "@role=\"axiom\""
    ],
    [
      "Rule",
      "axiom",
      "default",
      "[t] \"leeres Axiom\";",
      "self::empty",
      "@role=\"axiom\""
    ],
    [
      "Generator",
      "CGFtensorRules"
    ]
  ]
}
