{
  "locale": "de",
  "domain": "clearspeak",
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
      "self::stree"
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
      "[p] (pause:\"short\")",
      "self::empty"
    ],
    [
      "Rule",
      "font",
      "default",
      "[t] @font (grammar:localFont); [n] self::* (grammar:ignoreFont=@font,pause:\"short\")",
      "self::*",
      "name(self::*)!=\"number\"",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font!=\"normal\""
    ],
    [
      "SpecializedRule",
      "font",
      "default",
      "Caps_SayCaps"
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
      "font-identifier",
      "default",
      "[t] @font (grammar:localFont); [n] self::* (grammar:ignoreFont=@font,pause:\"short\")",
      "self::identifier",
      "string-length(text())=1 or string-length(text())=2",
      "@font",
      "@font=\"normal\"",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@role!=\"unit\""
    ],
    [
      "SpecializedRule",
      "font-identifier",
      "default",
      "Caps_SayCaps"
    ],
    [
      "Rule",
      "omit-font",
      "default",
      "[n] self::* (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1 or string-length(text())=2",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"italic\"",
      "self::*"
    ],
    [
      "SpecializedRule",
      "omit-font",
      "default",
      "Caps_SayCaps"
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
      "SpecializedRule",
      "font-double-struck",
      "default",
      "Caps_SayCaps"
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
      "text",
      "default",
      "[n] text()",
      "self::text"
    ],
    [
      "Rule",
      "capital",
      "default",
      "[n] text() (pitch:0.6,grammar:ignoreCaps=\"großes\")",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\" or @role=\"simple function\"",
      "CQFisCapital"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[n] text()",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[p] (pause:\"short\"); [n] text()",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital",
      "preceding-sibling::*[1]",
      "not(name(preceding-sibling::*[1])=\"function\")",
      "not(contains(@grammar, \"angle\"))"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[n] text() (pause:\"short\")",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital",
      "following-sibling::*[1]"
    ],
    [
      "Rule",
      "capital",
      "Caps_SayCaps",
      "[p] (pause:\"short\"); [n] text() (pause:\"short\")",
      "self::identifier",
      "@role=\"latinletter\" or @role=\"greekletter\"",
      "CQFisCapital",
      "preceding-sibling::*[1]",
      "following-sibling::*[1]",
      "not(name(preceding-sibling::*[1])=\"function\")",
      "not(contains(@grammar, \"angle\"))"
    ],
    [
      "Rule",
      "punctuation-lr",
      "default",
      "[p] (pause:\"short\"); [n] text() (pause:\"short\")",
      "self::punctuation",
      "@role=\"comma\""
    ],
    [
      "Rule",
      "punctuation",
      "default",
      "[n] text()",
      "self::punctuation",
      "@role=\"comma\"",
      "not(preceding-sibling::*[1]/children)",
      "not(following-sibling::*[1]/children)"
    ],
    [
      "Rule",
      "punctuation-l",
      "default",
      "[p] (pause:\"short\"); [n] text()",
      "self::punctuation",
      "@role=\"comma\"",
      "not(following-sibling::*[1]/children)"
    ],
    [
      "Rule",
      "punctuation-r",
      "default",
      "[n] text() (pause:\"short\")",
      "self::punctuation",
      "@role=\"comma\"",
      "not(preceding-sibling::*[1]/children)"
    ],
    [
      "Rule",
      "ellipsis",
      "Ellipses_AndSoOn",
      "[t] \"und so weiter\"",
      "self::punctuation",
      "@role=\"ellipsis\"",
      "not(following-sibling::*[1])",
      "not(preceding-sibling::*[last()][@role=\"ellipsis\"])"
    ],
    [
      "Rule",
      "ellipsis",
      "Ellipses_AndSoOn",
      "[t] \"und so weiter bis\"",
      "self::punctuation",
      "@role=\"ellipsis\"",
      "preceding-sibling::*[1]",
      "following-sibling::*[1]"
    ],
    [
      "Rule",
      "vbar-evaluated",
      "default",
      "[n] children/*[1]; [p] (pause:\"short\"); [t] \"ausgewertet für\"; [n] content/*[1]/children/*[2]; [p] (pause:\"short\")",
      "self::punctuated",
      "@role=\"endpunct\"",
      "content/*[1][@role=\"vbar\"]",
      "content/*[1][@embellished]",
      "name(content/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "vbar-evaluated",
      "default",
      "[n] children/*[1]; [p] (pause:\"short\"); [t] \"ausgewertet für\"; [n] content/*[1]/children/*[2]; [p] (pause:\"short\"); [t] \"minus des gleichen Ausdrucks ausgewertet für\"; [n] content/*[1]/children/*[1]/children/*[2]; [p] (pause:\"short\")",
      "self::punctuated",
      "@role=\"endpunct\"",
      "content/*[1][@role=\"vbar\"]",
      "content/*[1][@embellished]",
      "name(content/*[1])=\"superscript\"",
      "name(content/*[1]/children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "vbar-such-that",
      "VerticalLine_SuchThat",
      "[t] \"so dass\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [
      "Rule",
      "vbar-divides",
      "default",
      "[t] \"teilt\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])",
      "parent::*/parent::*[@role=\"sequence\"]"
    ],
    [
      "Rule",
      "vbar-divides",
      "VerticalLine_Divides",
      "[t] \"teilt\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [
      "Rule",
      "vbar-given",
      "VerticalLine_Given",
      "[t] \"für die gilt\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [
      "Rule",
      "set-member",
      "default",
      "[t] \"in\"",
      "self::operator",
      "@role=\"set extended\"",
      "text()=\"∈\" or text()=\"∊\""
    ],
    [
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Element",
      "[t] \"Element von\""
    ],
    [
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Belongs",
      "[t] \"gehört zu\""
    ],
    [
      "Rule",
      "set-not-member",
      "default",
      "[t] \"nicht in\"",
      "self::operator",
      "@role=\"set extended\"",
      "text()=\"∉\""
    ],
    [
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Element",
      "[t] \"kein Element von\""
    ],
    [
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Belongs",
      "[t] \"gehört nicht zu\""
    ],
    [
      "Rule",
      "prime",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::superscript",
      "children/*[2]",
      "children/*[2][@role=\"prime\"]",
      "self::*"
    ],
    [
      "Rule",
      "degrees",
      "default",
      "[m] children/* (grammar:degree)",
      "self::punctuated[@role=\"sequence\"]",
      "content/*[1][@role=\"degree\"]"
    ],
    [
      "Rule",
      "feet",
      "default",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "foot",
      "default",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"′\"]",
      "children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "inches",
      "default",
      "[n] children/*[1]; [t] \"in\" (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "inch",
      "default",
      "[n] children/*[1]; [t] \"in\" (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "name(children/*[1])=\"number\"",
      "children/*[2][text()=\"″\"]",
      "children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"degree\"))"
    ],
    [
      "Rule",
      "minutes",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "contains(@grammar, \"degree\")"
    ],
    [
      "Rule",
      "minute",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "contains(@grammar, \"degree\")",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "seconds",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "contains(@grammar, \"degree\")"
    ],
    [
      "Rule",
      "second",
      "default",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "contains(@grammar, \"degree\")",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "degrees-angle",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate:plural, pause:short)",
      "self::punctuation",
      "@role=\"degree\""
    ],
    [
      "Rule",
      "degree-angle",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate, pause:short)",
      "self::punctuation",
      "@role=\"degree\"",
      "preceding-sibling::*[text()=\"1\"]"
    ],
    [
      "Rule",
      "minutes-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "minute-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "seconds-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate:plural)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "second-angle",
      "Prime_Angle",
      "[n] children/*[1]; [t] children/*[2]/text() (grammar:annotation=\"unit\":translate)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "feet-length",
      "Prime_Length",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate:plural, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "foot-length",
      "Prime_Length",
      "[n] children/*[1]; [t] \"ft\" (grammar:annotation=\"unit\":translate, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"′\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "inches-length",
      "Prime_Length",
      "[n] children/*[1]; ; [t] \"in\" (grammar:annotation=\"unit\":translate:plural, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "name(children/*[1])=\"number\" or (children/*[1][@role=\"latinletter\"] and \"\"=translate(children/*[1]/text(),\"abcdefghijklmnopqrstuvwxyz\", \"\"))"
    ],
    [
      "Rule",
      "inch-length",
      "Prime_Length",
      "[n] children/*[1]; ; [t] \"in\" (grammar:annotation=\"unit\":translate, pause:short)",
      "self::superscript",
      "children/*[2][@role=\"prime\"]",
      "children/*[2][text()=\"″\"]",
      "not(contains(@grammar, \"degree\"))",
      "children/*[1][text()=\"1\"]"
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
      "function",
      "default",
      "[n] text()",
      "self::function"
    ],
    [
      "Rule",
      "function-article",
      "default",
      "[t] \"der\" (grammar:article); [n] text()",
      "self::function",
      "@role=\"prefix function\"",
      "contains(@grammar, \"addArticle\")"
    ],
    [
      "Rule",
      "function-article-fem",
      "default",
      "[t] \"die\" (grammar:article); [n] text()",
      "self::function",
      "@role=\"prefix function\"",
      "contains(@grammar, \"addArticle\")",
      "text()=\"det\" or text()=\"dim\" or text()=\"tr\""
    ],
    [
      "Rule",
      "appl",
      "default",
      "[n] children/*[1]; [t] \"von\"; [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl"
    ],
    [
      "Rule",
      "appl-simple",
      "default",
      "[n] children/*[1]; [t] \"von\"; [p] (pause:\"short\"); [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"simple function\"",
      "name(children/*[2])=\"appl\""
    ],
    [
      "Rule",
      "appl-simple",
      "default",
      "[n] children/*[1]; [t] \"von\"; [p] (pause:\"short\"); [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"simple function\"",
      "name(children/*[2])=\"fenced\"",
      "name(children/*[2]/children/*[1])=\"appl\""
    ],
    [
      "Rule",
      "appl",
      "Functions_None",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"mal\"; [n] children/*[2]; [p] (pause:\"short\")",
      "self::appl"
    ],
    [
      "Rule",
      "function-prefix",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "@role=\"prefix function\""
    ],
    [
      "Rule",
      "binary-operation",
      "ImpliedTimes_MoreImpliedTimes",
      "[n] . (grammar:impliedTimes); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "parent::*/parent::infixop[@role=\"implicit\"]",
      "following-sibling::*",
      "not(contains(@grammar, \"impliedTimes\"))"
    ],
    [
      "Rule",
      "function-prefix-simple-arg",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[2])=\"fenced\"",
      "contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")",
      "name(children/*[2]/children/*[1])!=\"number\"",
      "name(children/*[2]/children/*[1])!=\"identifier\"",
      "name(children/*[2]/children/*[1])!=\"appl\""
    ],
    [
      "Rule",
      "function-prefix-embell",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1]; [n] children/*[2]; [p] (pause:\"short\"); ",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])!=\"function\""
    ],
    [
      "Rule",
      "function-prefix-fenced-or-frac-arg",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1] (grammar:addArticle); [t] \"von\"; [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or name(children/*[2])=\"fraction\" or (name(children/*[2])!=\"fenced\" and not(contains(children/*[2]/@annotation, \"clearspeak:simple\")))",
      "self::*"
    ],
    [
      "Rule",
      "function-prefix-subscript",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1] (grammar:addArticle); [t] \"von\"; [p] (pause:\"short\"); [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"subscript\"",
      "self::*"
    ],
    [
      "Rule",
      "function-ln",
      "default",
      "[n] children/*[1]; [n] children/*[2]",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(following-sibling::*)",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "default",
      "[n] children/*[1]; [n] children/*[2]; [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "default",
      "[n] children/*[1]; [t] \"von\"; [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "name(children/*[2])=\"fenced\"",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "Log_LnAsNaturalLog",
      "[n] . (grammar:NatLog)",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(following-sibling::*)",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-ln",
      "Log_LnAsNaturalLog",
      "[n] . (grammar:NatLog); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-prefix-as-exp",
      "default",
      "[n] children/*[1]; [t] \"von\"; [p] (pause:\"short\"); [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(parent::*/parent::*)=\"superscript\"",
      "not(following-sibling::*)",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or name(children/*[2])=\"fraction\" or (name(children/*[2])!=\"fenced\" and not(contains(children/*[2]/@annotation, \"clearspeak:simple\")))"
    ],
    [
      "Rule",
      "function-prefix-subscript-as-exp",
      "default",
      "[n] children/*[1]; [t] \"von\"; [p] (pause:\"short\"); [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(parent::*/parent::*)=\"superscript\"",
      "not(following-sibling::*)",
      "name(children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "function-prefix-hyper",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"von\"; [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "CQFisHyperbolic"
    ],
    [
      "Rule",
      "function-prefix-inverse",
      "default",
      "[p] (pause:\"short\"); [t] \"der\" (grammar:article); [t] \"inverse\" (grammar:masculine); [n] children/*[1]/children/*[1]; [t] \"von\"; [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "appl-triginverse",
      "Trig_TrigInverse",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"von\"; [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]"
    ],
    [
      "Rule",
      "function-prefix-arc-simple",
      "Trig_ArcTrig",
      "[p] (pause:\"short\"); [t] \"Arkus\" (join:\"\"); [n] children/*[1]/children/*[1] (grammar:lowercase); [n] children/*[2]; [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-prefix-arc-simple",
      "Trig_ArcTrig",
      "[p] (pause:\"short\"); [t] \"Arkus\" (join:\"\"); [n] children/*[1]/children/*[1] (grammar:lowercase); [p] (pause:\"short\"); [n] children/*[2]; [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "name(children/*[2])=\"fenced\"",
      "children/*[2]/children/*[1][@role=\"prefix function\"]",
      "contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "function-prefix-arc",
      "Trig_ArcTrig",
      "[p] (pause:\"short\"); [t] \"Arkus\" (join:\"\"); [n] children/*[1]/children/*[1] (grammar:lowercase); [t] \"von\"; [n] children/*[2] (grammar:case=\"dative\"); [p] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or (name(children/*[2])=\"fraction\" and children/*[2][@role!=\"vulgar\"])"
    ],
    [
      "Rule",
      "function-inverse",
      "default",
      "[n] children/*[1]; [t] \"invers\"",
      "self::superscript",
      "@role=\"prefix function\" or @role=\"simple function\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "superscript-prefix-function",
      "default",
      "[t] \"die\" (grammar:article); [n] children/*[2] (grammar:ordinal); [t] \"Potenz von\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"prefix function\"",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-prefix-function",
      "default",
      "[t] \"die\" (grammar:article); [n] children/*[2] (grammar:ordinal); [t] \"Potenz von\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"prefix function\"",
      "name(children/*[2])=\"identifier\""
    ],
    [
      "Rule",
      "function-inverse",
      "Functions_None",
      "[n] . (grammar:functions_none)",
      "self::superscript",
      "@role=\"prefix function\" or @role=\"simple function\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "superscript",
      "default",
      "[n] children/*[1]; [t] \"mit Exponent\" (pause:\"short\"); [n] children/*[2]; [p] (pause:\"short\"); [t] \"Ende Exponent\" (pause:\"short\")",
      "self::superscript"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "default",
      "[n] children/*[1]; [t] \"hoch\"; [n] children/*[2]; [p] (pause:\"short\")",
      "self::superscript",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "default",
      "[n] children/*[1]; [t] \"hoch\"; [n] children/*[2]; [p] (pause:\"short\")",
      "self::superscript",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "name(children/*[2]/children/*[1])=\"number\"",
      "children/*[2]/children/*[1][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "default",
      "[n] children/*[1]; [t] \"hoch\"; [n] children/*[2]; [p] (pause:\"short\")",
      "self::superscript",
      "name(children/*[2])=\"identifier\"",
      "children/*[2][@role=\"latinletter\" or @role=\"greekletter\" or @role=\"otherletter\"]"
    ],
    [
      "Rule",
      "superscript-ordinal-default",
      "default",
      "[n] children/*[1]; [t] \"mit Exponent\" (pause:\"short\"); [n] children/*[2]; [p] (pause:\"short\"); [t] \"Ende Exponent\" (pause:\"short\")",
      "self::superscript",
      "children//superscript"
    ],
    [
      "Rule",
      "superscript-simple-exponent",
      "default",
      "[n] children/*[1]; [t] \"hoch\"; [n] children/*[2]; [p] (pause:\"short\")",
      "self::superscript",
      "not(descendant::superscript)"
    ],
    [
      "Rule",
      "superscript-simple-exponent-end",
      "default",
      "[n] children/*[1]; [t] \"hoch\"; [n] children/*[2]; ",
      "self::superscript",
      "not(descendant::superscript)",
      "not(following-sibling::*)"
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"number\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"fraction\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"identifier\""
    ],
    [
      "Aliases",
      "superscript-simple-exponent",
      "self::superscript",
      "children/*[2][@role=\"implicit\"]",
      "count(children/*[2]/children/*)=2",
      "contains(children/*[2]/children/*[1]/@annotation, \"simple\")",
      "name(children/*[2]/children/*[2])=\"superscript\"",
      "(name(children/*[2]/children/*[2]/children/*[1])=\"number\" and contains(children/*[2]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")) or name(children/*[2]/children/*[2]/children/*[1])=\"identifier\"",
      "children/*[2]/children/*[2]/children/*[2][text()=\"2\"] or children/*[2]/children/*[2]/children/*[2][text()=\"3\"]"
    ],
    [
      "Rule",
      "superscript-simple-power",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"potenziert mit\"; [n] children/*[2]; [p] (pause:\"short\")",
      "self::superscript",
      "not(descendant::superscript)"
    ],
    [
      "Rule",
      "superscript-simple-power-end",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"potenziert mit\"; [n] children/*[2]; ",
      "self::superscript",
      "not(descendant::superscript)",
      "not(following-sibling::*)"
    ],
    [
      "Aliases",
      "superscript-simple-power",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"number\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-power",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"fraction\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-power",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"identifier\""
    ],
    [
      "Aliases",
      "superscript-simple-power",
      "self::superscript",
      "children/*[2][@role=\"implicit\"]",
      "count(children/*[2]/children/*)=2",
      "contains(children/*[2]/children/*[1]/@annotation, \"simple\")",
      "name(children/*[2]/children/*[2])=\"superscript\"",
      "(name(children/*[2]/children/*[2]/children/*[1])=\"number\" and contains(children/*[2]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")) or name(children/*[2]/children/*[2]/children/*[1])=\"identifier\"",
      "children/*[2]/children/*[2]/children/*[2][text()=\"2\"] or children/*[2]/children/*[2]/children/*[2][text()=\"3\"]"
    ],
    [
      "Rule",
      "superscript-ordinal-power",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"zur\"; [n] children/*[2] (grammar:ordinal,join:\"\"); [t] \"n Potenz\" (pause:\"short\")",
      "self::superscript",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Aliases",
      "superscript-ordinal-power",
      "self::superscript",
      "name(children/*[2])=\"identifier\"",
      "children/*[2][@role=\"latinletter\" or @role=\"greekletter\" or @role=\"otherletter\"]"
    ],
    [
      "Rule",
      "superscript-non-ordinal",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"zur negativ\"; [n] children/*[2]/children/*[1] (grammar:ordinal, join:\"\"); [t] \"n Potenz\" (pause:\"short\")",
      "self::superscript",
      "children/*[2][@role=\"negative\"]",
      "name(children/*[2]/children/*[1])=\"number\"",
      "children/*[2]/children/*[1][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-simple-function",
      "Exponent_OrdinalPower",
      "[t] \"die\" (grammar:article); [n] children/*[2] (grammar:ordinal); [t] \"Potenz von\" (pause:\"short\"); [n] children/*[1]",
      "self::superscript",
      "name(children/*[1])=\"identifier\"",
      "children/*[1][@role=\"simple function\"]",
      "children/*[2][@role!=\"prime\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "exponent",
      "default",
      "[n] text() (join:\"\"); [t] \"te\"",
      "self::identifier",
      "contains(@grammar, \"ordinal\")"
    ],
    [
      "Rule",
      "exponent",
      "default",
      "[t] CSFwordOrdinal",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()!=\"0\""
    ],
    [
      "Rule",
      "exponent",
      "default",
      "[t] \"nullte\"",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()=\"0\""
    ],
    [
      "Rule",
      "superscript-simple-exp",
      "Exponent_Exponent",
      "[n] children/*[1]; [t] \"mit Exponent\"; [n] children/*[2]; [p] (pause:\"short\")",
      "self::superscript",
      "not(descendant::superscript)"
    ],
    [
      "Rule",
      "superscript-simple-exp-end",
      "Exponent_Exponent",
      "[n] children/*[1]; [t] \"mit Exponent\"; [n] children/*[2]; ",
      "self::superscript",
      "not(descendant::superscript)",
      "not(following-sibling::*)"
    ],
    [
      "Aliases",
      "superscript-simple-exp",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"number\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-exp",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"fraction\"",
      "contains(children/superscript/children/*[1]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Aliases",
      "superscript-simple-exp",
      "self::superscript",
      "children/superscript/children/*[2][text()=\"2\"] or children/superscript/children/*[2][text()=\"3\"]",
      "name(children/superscript/children/*[1])=\"identifier\""
    ],
    [
      "Aliases",
      "superscript-simple-exp",
      "self::superscript",
      "children/*[2][@role=\"implicit\"]",
      "count(children/*[2]/children/*)=2",
      "contains(children/*[2]/children/*[1]/@annotation, \"simple\")",
      "name(children/*[2]/children/*[2])=\"superscript\"",
      "(name(children/*[2]/children/*[2]/children/*[1])=\"number\" and contains(children/*[2]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")) or name(children/*[2]/children/*[2]/children/*[1])=\"identifier\"",
      "children/*[2]/children/*[2]/children/*[2][text()=\"2\"] or children/*[2]/children/*[2]/children/*[2][text()=\"3\"]"
    ],
    [
      "Rule",
      "superscript-simple-function",
      "Functions_None",
      "[n] . (grammar:functions_none)",
      "self::superscript",
      "name(children/*[1])=\"identifier\"",
      "children/*[1][@role=\"simple function\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [
      "Rule",
      "square",
      "default",
      "[n] children/*[1]; [t] \"Quadrat\"",
      "self::superscript",
      "children/*[2][text()=\"2\"]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[n] children/*[1]; [t] \"Kubik\"",
      "self::superscript",
      "children/*[2][text()=\"3\"]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "paren-simple",
      "default",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"leftright\"",
      "contains(children/*[1]/@annotation, \"clearspeak:simple\")",
      "name(../..)!=\"superscript\" and name(../..)!=\"subscript\""
    ],
    [
      "Rule",
      "paren-simple-exp",
      "default",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../..)=\"superscript\"",
      "children/*[1][@role=\"integer\"] or children/*[1][@role=\"float\"] or (children/*[1][@role=\"vulgar\"] and contains(children/*[1]/@annotation, \"clearspeak:simple\")) or children/*[1][@role=\"latinletter\"] or children/*[1][@role=\"greekletter\"] or children/*[1][@role=\"otherletter\"]"
    ],
    [
      "Rule",
      "paren-simple-nested-func",
      "default",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "children/*[1][@role=\"simple function\" or @role=\"prefix function\"]",
      "contains(children/*[1]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\") or name(children/*[1]/children/*[2]/children/*[1])=\"subscript\" or name(children/*[1]/children/*[2]/children/*[1])=\"superscript\" or children/*[1]/children/*[2]/children/*[1][@role=\"vulgar\"] "
    ],
    [
      "Rule",
      "paren-simple-nested-func-no-bracket",
      "Functions_None",
      "[n] children/*[1];",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "children/*[1][@role=\"simple function\" or @role=\"prefix function\"]",
      "name(children/*[1]/children/*[1])=\"identifier\" or name(children/*[1]/children/*[1])=\"function\"",
      "contains(children/*[1]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\")",
      "name(children/*[1]/children/*[2]/children/*[1])=\"identifier\" or name(children/*[1]/children/*[2]/children/*[1])=\"number\""
    ],
    [
      "Rule",
      "fences-open-close",
      "default",
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence); [p] (pause:\"short\"); [n] children/*[1]; [p] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence); [p] (pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\""
    ],
    [
      "Rule",
      "paren-simple-nested-func",
      "default",
      "[p] (pause:\"short\"); [n] content/*[1]; [p] (pause:\"short\"); [n] children/*[1]; [p] (pause:\"short\"); [n] content/*[2]; [p] (pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "not(contains(children/*[1]/@annotation, \"clearspeak:simple\"))"
    ],
    [
      "Rule",
      "paren-simple-nested-func",
      "Functions_None",
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence); [p] (pause:\"short\"); [n] children/*[1]; [p] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence); [p] (pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../*[1])=\"identifier\" or name(../*[1])=\"function\"",
      "parent::*/parent::*[@role=\"simple function\" or @role=\"prefix function\"]",
      "children/*[1][@role=\"simple function\" or @role=\"prefix function\"]",
      "contains(children/*[1]/children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\") or name(children/*[1]/children/*[2]/children/*[1])=\"subscript\" or name(children/*[1]/children/*[2]/children/*[1])=\"superscript\" or children/*[1]/children/*[2]/children/*[1][@role=\"vulgar\"] "
    ],
    [
      "SpecializedRule",
      "fences-open-close",
      "default",
      "Paren_Speak"
    ],
    [
      "Aliases",
      "fences-open-close",
      "self::fenced",
      "@role=\"composed function\""
    ],
    [
      "Rule",
      "fence-silent",
      "Paren_Silent",
      "[p] (pause:\"short\"); [n] children/*[1]; [p] (pause:\"short\")",
      "self::fenced"
    ],
    [
      "Rule",
      "fences-open-close",
      "ImpliedTimes_None",
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence); [p] (pause:\"short\"); [n] children/*[1]; [p] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence); [p] (pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "parent::*/parent::*[@role!=\"simple function\"]",
      "parent::*/parent::*[@role!=\"prefix function\"]"
    ],
    [
      "Rule",
      "fence-nesting",
      "Paren_SpeakNestingLevel",
      "[n] text() (grammar:insertNesting=CSFnestingDepth)",
      "self::fence",
      "contains(@grammar, \"spokenFence\")",
      "CQFmatchingFences"
    ],
    [
      "Rule",
      "fence-no-nesting",
      "Paren_SpeakNestingLevel",
      "[n] text()",
      "self::fence"
    ],
    [
      "Rule",
      "fences-points",
      "Paren_CoordPoint",
      "[t] \"der Punkt mit Koordinaten\"; [n] children/*[1]",
      "self::fenced",
      "name(children/*[1])=\"punctuated\"",
      "children/*[1][@role=\"sequence\"]"
    ],
    [
      "Rule",
      "fences-interval",
      "Paren_Interval",
      "[t] \"das Interval von\"; [n] children/*[1]/children/*[1]; [t] \"bis\"; [n] children/*[1]/children/*[3]; [p] (pause:\"short\"); [n] . (grammar:interval)",
      "self::fenced",
      "not(contains(@grammar, \"interval\"))",
      "name(children/*[1])=\"punctuated\"",
      "children/*[1][@role=\"sequence\"]",
      "count(./children/*[1]/content/*)=1",
      "children/*[1]/content/*[1][@role=\"comma\"]"
    ],
    [
      "Rule",
      "interval-open",
      "Paren_Interval",
      "[t] \"ohne\"; [n] children/*[1]/children/*[1]; [t] \"und\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\""
    ],
    [
      "Rule",
      "interval-closed-open",
      "Paren_Interval",
      "[t] \"einschließlich\"; [n] children/*[1]/children/*[1]; [p] (pause:\"short\"); [t] \"aber ohne\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\")\""
    ],
    [
      "Rule",
      "interval-open-closed",
      "Paren_Interval",
      "[t] \"ohne\"; [n] children/*[1]/children/*[1]; [p] (pause:\"short\"); [t] \"aber einschließlich\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\"]\""
    ],
    [
      "Rule",
      "interval-closed",
      "Paren_Interval",
      "[t] \"einschließlich\"; [n] children/*[1]/children/*[1]; [t] \"und\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\"]\""
    ],
    [
      "Rule",
      "interval-open-inf-r",
      "Paren_Interval",
      "[t] \"ohne\"; [n] children/*[1]/children/*[1]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[3]/text()=\"∞\" or (name(children/*[1]/children/*[3])=\"prefixop\" and children/*[1]/children/*[3]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-open-inf-l",
      "Paren_Interval",
      "[t] \"ohne\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[1]/text()=\"∞\" or (name(children/*[1]/children/*[1])=\"prefixop\" and children/*[1]/children/*[1]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-open-inf-lr",
      "Paren_Interval",
      "",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[3]/text()=\"∞\" or (name(children/*[1]/children/*[3])=\"prefixop\" and children/*[1]/children/*[3]/children/*[1]/text()=\"∞\")",
      "children/*[1]/children/*[1]/text()=\"∞\" or (name(children/*[1]/children/*[1])=\"prefixop\" and children/*[1]/children/*[1]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-closed-open-inf",
      "Paren_Interval",
      "[t] \"einschließlich\"; [n] children/*[1]/children/*[1]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\")\"",
      "children/*[1]/children/*[3]/text()=\"∞\" or (name(children/*[1]/children/*[3])=\"prefixop\" and children/*[1]/children/*[3]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "interval-open-closed-inf",
      "Paren_Interval",
      "[t] \"einschließlich\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\"]\"",
      "children/*[1]/children/*[1]/text()=\"∞\" or (name(children/*[1]/children/*[1])=\"prefixop\" and children/*[1]/children/*[1]/children/*[1]/text()=\"∞\")"
    ],
    [
      "Rule",
      "paren-nested-embellished-funcs",
      "Functions_None",
      "[p] (pause:\"short\"); [n] content/*[1]; [p] (pause:\"short\"); [n] children/*[1]; [p] (pause:\"short\"); [n] content/*[2]; [p] (pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\"",
      "name(../..)=\"appl\"",
      "name(children/*[1]) = \"appl\"",
      "preceding-sibling::*/descendant-or-self::*[@role=\"subsup\"] or children/*[1]/descendant-or-self::*[@role=\"subsup\"]"
    ],
    [
      "Rule",
      "set-empty",
      "default",
      "[t]  \"die leere Menge\"",
      "self::fenced",
      "@role=\"set empty\""
    ],
    [
      "Rule",
      "set-extended",
      "default",
      "[t] \"die Menge aller\"; [n] children/*[1]/children/*[1]; [t] \"mit\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "@role=\"set extended\""
    ],
    [
      "Rule",
      "set-collection",
      "default",
      "[t] \"die Menge\"; [n] children/*[1]",
      "self::fenced",
      "@role=\"set collection\""
    ],
    [
      "Aliases",
      "set-collection",
      "self::fenced",
      "@role=\"set singleton\""
    ],
    [
      "Rule",
      "set-extended",
      "Sets_woAll",
      "[t] \"die Menge von\"; [n] children/*[1]/children/*[1]; [t] \"mit\"; [n] children/*[1]/children/*[3]",
      "self::fenced",
      "@role=\"set extended\""
    ],
    [
      "Rule",
      "set-collection",
      "Sets_SilentBracket",
      "[n] children/*[1]",
      "self::fenced",
      "@role=\"set collection\""
    ],
    [
      "Rule",
      "subscript",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"Index\"; [n] children/*[2]; [p] (pause:short)",
      "self::subscript"
    ],
    [
      "Rule",
      "subscript-base",
      "default",
      "[n] children/*[1]; [t] \"Basis\"; [n] children/*[2]",
      "self::subscript",
      "CQFisLogarithm"
    ],
    [
      "Rule",
      "subscript-index",
      "default",
      "[n] children/*[1]; [t] \"Index\"; [n] children/*[2]",
      "self::subscript",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "fraction",
      "default",
      "[p] (pause:short); [t] \"Bruch mit Zähler\"; [n] children/*[1]; [p] (pause:short); [t] \"und Nenner\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Functions_None",
      "[p] (pause:short); [t] \"Bruch mit Zähler\"; [n] children/*[1]; [p] (pause:short); [t] \"und Nenner\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"appl\" or name(children/*[2])=\"appl\""
    ],
    [
      "Rule",
      "simple-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction",
      "contains(children/*[1]/@annotation, \"clearspeak:simple\") or contains(children/*[1]/@annotation, \"clearspeak:unit\")",
      "contains(children/*[2]/@annotation, \"clearspeak:simple\") or contains(children/*[2]/@annotation, \"clearspeak:unit\")"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction",
      "@role=\"vulgar\""
    ],
    [
      "Rule",
      "simple-text-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"text\"",
      "name(children/*[2])=\"text\""
    ],
    [
      "Rule",
      "simple-text-fraction",
      "default",
      "[p] (pause:short); [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"infixop\"",
      "children/*[1][@role=\"unit\"]",
      "name(children/*[2])=\"text\""
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
      "Rule",
      "fraction",
      "Fraction_Over",
      "[p] (pause:short); [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_OverEndFrac",
      "[p] (pause:short); [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short); [t] \"Ende Bruch\"; [p] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_FracOver",
      "[p] (pause:short); [t] \"Bruch\"; [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_Per",
      "[p] (pause:short); [n] children/*[1]; [t] \"per\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_GeneralEndFrac",
      "[p] (pause:short); [t] \"Bruch mit Zähler\"; [n] children/*[1]; [p] (pause:short); [t] \"und Nenner\"; [n] children/*[2]; [p] (pause:short); [t] \"Ende Bruch\"; [p] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_General",
      "[p] (pause:short); [t] \"Bruch mit Zähler\"; [n] children/*[1]; [p] (pause:short); [t] \"und Nenner\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "Fraction_Ordinal",
      "[t] CSFvulgarFraction (grammar:correctOne)",
      "self::fraction",
      "@role=\"vulgar\""
    ],
    [
      "Rule",
      "fraction",
      "Fraction_EndFrac",
      "[p] (pause:short); [n] . (grammar:endfrac); [t] \"Ende Bruch\"; [p] (pause:short)",
      "self::fraction",
      "not(contains(@grammar, \"endfrac\"))",
      "not(contains(children/*[1]/@annotation, \"clearspeak:unit\"))",
      "not(contains(children/*[2]/@annotation, \"clearspeak:unit\"))"
    ],
    [
      "Rule",
      "vulgar-fraction",
      "Fraction_EndFrac",
      "[p] (pause:short); [n] children/*[1]; [t] \"geteilt durch\"; [n] children/*[2]; [p] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"fraction\"",
      "name(children/*[2])=\"fraction\"",
      "contains(children/*[1]/@annotation, \"clearspeak:simple\")",
      "contains(children/*[2]/@annotation, \"clearspeak:simple\")"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "Fraction_EndFrac",
      "[t] CSFvulgarFraction (grammar:correctOne)",
      "self::fraction",
      "@role=\"vulgar\"",
      "contains(@annotation, \"clearspeak:simple\")",
      "self::*"
    ],
    [
      "Rule",
      "sqrt",
      "default",
      "[t] \"Quadratwurzel aus\"; [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::sqrt"
    ],
    [
      "Rule",
      "sqrt-nested",
      "default",
      "[p] (pause: \"short\"); [t] \"Quadratwurzel aus\"; [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "negative-sqrt",
      "default",
      "[t] \"negative Quadratwurzel aus\"; [n] children/*[1]/children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\""
    ],
    [
      "Rule",
      "negative-sqrt",
      "default",
      "[p] (pause: \"short\"); [t] \"negative Quadratwurzel aus\"; [n] children/*[1]/children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "sqrt-plus-minus",
      "Roots_PosNegSqRoot",
      "[t] \"positive Quadratwurzel aus\"; [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::sqrt",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-nested-plus-minus",
      "Roots_PosNegSqRoot",
      "[p] (pause: \"short\"); [t] \"positive Quadratwurzel aus\"; [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-plus-minus",
      "Roots_PosNegSqRootEnd",
      "[t] \"positive Quadratwurzel aus\"; [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::sqrt",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-nested-plus-minus",
      "Roots_PosNegSqRootEnd",
      "[p] (pause: \"short\"); [t] \"positive Quadratwurzel aus\"; [n] children/*[1] (grammar:EndRoot=false); [p] (pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"Wurzel Ende\"; [p] (pause:short)",
      "self::sqrt",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative-sqrt-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"Wurzel Ende\"; [p] (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "sqrt-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"Wurzel Ende\"; [p] (pause:short)",
      "self::sqrt",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative-sqrt-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"Wurzel Ende\"; [p] (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[t] \"Kubikwurzel aus\"; [n] children/*[2] (grammar:EndRoot=false); [p] (pause:short)",
      "self::root",
      "children/*[1][text()=\"3\"]"
    ],
    [
      "Rule",
      "cube-nested",
      "default",
      "[p] (pause:short); [t] \"Kubikwurzel aus\"; [n] children/*[2] (grammar:EndRoot=false); [p] (pause:short)",
      "self::root",
      "children/*[1][text()=\"3\"]",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "root",
      "default",
      "[t] \"die\" (grammar:article); [n] children/*[1] (grammar:ordinal); [t] \"Wurzel aus\"; [n] children/*[2] (grammar:EndRoot=false); [p] (pause:short)",
      "self::root"
    ],
    [
      "Rule",
      "root-nested",
      "default",
      "[p] (pause:short); [t] \"die\" (grammar:article); [n] children/*[1] (grammar:ordinal); [t] \"Wurzel aus\"; [n] children/*[2] (grammar:EndRoot=false); [p] (pause:short)",
      "self::root",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "root-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"Wurzel Ende\"; [p] (pause:short)",
      "self::root",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "root-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"Wurzel Ende\"; [p] (pause:short)",
      "self::root",
      "not(contains(@grammar, \"EndRoot\"))"
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
      "positive",
      "default",
      "[t] \"plus\"; [n] children/*[1]",
      "self::prefixop",
      "@role=\"positive\""
    ],
    [
      "Rule",
      "angle-measure",
      "default",
      "[t] \"das Maß des Winkels\"; [n] children/*[2] (grammar:angle)",
      "self::infixop",
      "content/*[1]/text()=\"∠\"",
      "children/*[1][text()=\"m\"]"
    ],
    [
      "Rule",
      "prefix",
      "default",
      "[m] content/* (grammar:prefix); [n] children/*[1]",
      "self::prefixop"
    ],
    [
      "Rule",
      "postfix",
      "default",
      "[n] children/*[1]; [m] content/* (grammar:postfix)",
      "self::postfixop"
    ],
    [
      "Rule",
      "set-prefix-operators",
      "default",
      "[t] \"der\" (grammar:article); [n] self::* (grammar:!prefix); [t] \"von\"",
      "self::*",
      "contains(@grammar,\"prefix\")",
      "descendant-or-self::*/text()=\"∩\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "set-prefix-operators",
      "default",
      "[t] \"die\" (grammar:article); [n] self::* (grammar:!prefix); [t] \"von\"",
      "self::*",
      "contains(@grammar,\"prefix\")",
      "descendant-or-self::*/text()=\"∪\"",
      "self::*",
      "self::*",
      "self::*"
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
      "binary-operation",
      "ImpliedTimes_MoreImpliedTimes",
      "[m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop",
      "@role=\"implicit\""
    ],
    [
      "Rule",
      "binary-operation-pause",
      "default",
      "[p] (pause:short); [m] children/* (sepFunc:CTFcontentIterator);",
      "self::infixop",
      "@role=\"implicit\"",
      "name(children/*[1])=\"appl\""
    ],
    [
      "Rule",
      "binary-operation-pause",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator); [p] (pause:short)",
      "self::infixop",
      "@role=\"implicit\"",
      "name(children/*[last()])=\"appl\""
    ],
    [
      "Rule",
      "binary-operation-pause",
      "default",
      "[p] (pause:short); [m] children/* (sepFunc:CTFcontentIterator); [p] (pause:short)",
      "self::infixop",
      "@role=\"implicit\"",
      "name(children/*[1])=\"appl\"",
      "name(children/*[last()])=\"appl\""
    ],
    [
      "Rule",
      "implicit-times",
      "default",
      "[p] (pause:short)",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\""
    ],
    [
      "Rule",
      "implicit-times",
      "default",
      "",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\"",
      "CQFsimpleArguments"
    ],
    [
      "Rule",
      "implicit-times",
      "default",
      "[n] text()",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\"",
      "CQFfencedArguments"
    ],
    [
      "Rule",
      "implicit-times",
      "ImpliedTimes_MoreImpliedTimes",
      "[n] text()",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\""
    ],
    [
      "Rule",
      "implicit-times",
      "ImpliedTimes_None",
      "",
      "self::operator",
      "@role=\"multiplication\"",
      "text()=\"⁢\""
    ],
    [
      "Rule",
      "binary-operation-simple",
      "default",
      "[m] children/* (rate:\"0.5\"); [p] (pause:short)",
      "self::infixop",
      "@role=\"implicit\"",
      "contains(@annotation, \"clearspeak:simple\")",
      "not(contains(@grammar, \"inFrac\"))"
    ],
    [
      "Rule",
      "simple-in-fraction",
      "default",
      "[n] . (rate:\"0.5\",grammar:inFrac)",
      "self::*",
      "contains(@annotation, \"clearspeak:simple\")",
      "not(contains(@grammar, \"inFrac\"))",
      "name(.)!=\"identifier\"",
      "name(.)!=\"function\"",
      "name(.)!=\"number\"",
      "name(parent::*/parent::*)=\"fraction\"",
      "not(preceding-sibling::*)"
    ],
    [
      "Rule",
      "operators-after-power",
      "Exponent_AfterPower",
      "[m] children/* (rate:\"0.5\")",
      "self::infixop",
      "@role=\"implicit\"",
      "contains(@grammar, \"afterPower\")"
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
      "multrel",
      "default",
      "[m] children/* (sepFunc:CTFcontentIterator)",
      "self::multirel"
    ],
    [
      "Rule",
      "natural-numbers",
      "default",
      "[t] \"die natürlichen Zahlen\"",
      "self::identifier",
      "text()=\"ℕ\" or (text()=\"N\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "integers",
      "default",
      "[t] \"die ganzen Zahlen\"",
      "self::identifier",
      "text()=\"ℤ\" or (text()=\"Z\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "rational-numbers",
      "default",
      "[t] \"die rationalen Zahlen\"",
      "self::identifier",
      "text()=\"ℚ\" or (text()=\"Q\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "real-numbers",
      "default",
      "[t] \"die reellen Zahlen\"",
      "self::identifier",
      "text()=\"ℝ\" or (text()=\"R\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "complex-numbers",
      "default",
      "[t] \"die komplexen Zahlen\"",
      "self::identifier",
      "text()=\"ℂ\" or (text()=\"C\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "natural-numbers-super",
      "default",
      "[t] \"n\" (join: \"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℕ\" or (children/*[1]/text()=\"N\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "integers-super",
      "default",
      "[t] \"z\" (join: \"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "rational-numbers-super",
      "default",
      "[t] \"q\" (join: \"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "real-numbers-super",
      "default",
      "[t] \"r\" (join:\"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℝ\" or (children/*[1]/text()=\"R\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "complex-numbers-super",
      "default",
      "[t] \"c\" (join:\"-\"); [n] children/*[2] (grammar:numbers2alpha)",
      "self::superscript",
      "children/*[1]/text()=\"ℂ\" or (children/*[1]/text()=\"C\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "natural-numbers-with-zero",
      "default",
      "[t] \"die natürlichen Zahlen mit Null\"",
      "self::subscript",
      "children/*[1]/text()=\"ℕ\" or (children/*[1]/text()=\"N\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"0\"",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "positive-integers",
      "default",
      "[t] \"die positiven ganzen Zahlen\"",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"+\"",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "positive-integers",
      "default",
      "[t] \"die negativen ganzen Zahlen\"",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"-\"",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "positive-rational-numbers",
      "default",
      "[t] \"die positiven rationalen Zahlen\"",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"+\"",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "negative-rational-numbers",
      "default",
      "[t] \"die negativen rationalen Zahlen\"",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"-\"",
      "self::*",
      "self::*",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[p] (pause:short); [t] \"der Betrag von\"; [n] children/*[1]; [p] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_AbsEnd",
      "[p] (pause:short); [t] \"der Betrag von\"; [n] children/*[1]; [p] (pause: short); [t] \"Ende Betrag\"; [p] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_Cardinality",
      "[p] (pause:short); [t] \"die Mächtigkeit der Menge\"; [n] children/*[1]; [p] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_Determinant",
      "[p] (pause:short); [t] \"die Determinante von\"; [n] children/*[1]; [p] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\""
    ],
    [
      "Rule",
      "matrix",
      "default",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Matrize\"; [p] (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\"); [p] (pause:long)",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix-simple",
      "default",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Matrize\"; [p] (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\",grammar:simpleDet); [p] (pause:long)",
      "self::matrix",
      "count(children/*)<4",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "matrix-trivial",
      "default",
      "[t] \"die 1 mal 1 Matrize mit Element\"; [n] children/*[1]; [p] (pause:long)",
      "self::vector",
      "@role=\"squarematrix\""
    ],
    [
      "Rule",
      "determinant",
      "default",
      "[t] \"die\" (grammar:article); [t] \"Determinante der\"; [t] count(children/*); [t] \"mal\"; [t] count(children/*[1]/children/*); [t] \"Matrize\"; [p] (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\",grammar:simpleDet); [p] (pause:long)",
      "self::matrix",
      "@role=\"determinant\"",
      "count(children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "determinant-simple",
      "default",
      "[t] \"die\" (grammar:article); [t] \"Determinante der\"; [t] count(children/*); [t] \"mal\"; [t] count(children/*[1]/children/*); [t] \"Matrize\"; [p] (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\"); [p] (pause:long)",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "Rule",
      "matrix-vector",
      "default",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Spaltenmatrize\"; [p] (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\",grammar:simpleDet); [p] (pause:long)",
      "self::vector"
    ],
    [
      "SpecializedRule",
      "matrix-vector",
      "default",
      "Matrix_SpeakColNum"
    ],
    [
      "Rule",
      "matrix-vector-simple",
      "default",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Spaltenmatrize\"; [p] (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet); [p] (pause:long)",
      "self::vector",
      "count(children/*)<4",
      "CQFcellsSimple",
      "@role!=\"squarematrix\""
    ],
    [
      "Rule",
      "matrix-vector-simple",
      "Matrix_SilentColNum",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Spaltenmatrize\"; [p] (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet); [p] (pause:long)",
      "self::vector"
    ],
    [
      "Rule",
      "matrix-row-vector",
      "default",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Zeilenmatrize\"; [p] (pause:long); [m] children/*[1]/children/* (ctxtFunc:CTFnodeCounter,context:\"Spalte-:\",grammar:simpleDet); [p] (pause:long)",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "SpecializedRule",
      "matrix-row-vector",
      "default",
      "Matrix_SpeakColNum"
    ],
    [
      "Rule",
      "matrix-row-vector-simple",
      "default",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Zeilenmatrize\"; [p] (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet); [p] (pause:long)",
      "self::matrix",
      "@role=\"rowvector\"",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "matrix-row-vector-simple",
      "Matrix_SilentColNum",
      "[t] \"die\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Zeilenmatrize\"; [p] (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet); [p] (pause:long)",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "Rule",
      "matrix-row-simple",
      "default",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\")",
      "self::row",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "matrix-row-simple",
      "Matrix_SilentColNum",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\")",
      "self::row"
    ],
    [
      "Rule",
      "line-simple",
      "default",
      "[n] children/*[1]",
      "self::line",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "matrix-row",
      "default",
      "[m] children/* (ctxtFunc:CTFnodeCounter,context:\"Spalte-,- \",sepFunc:CTFpauseSeparator,separator:\"medium\"); [p] (pause:long)",
      "self::row"
    ],
    [
      "SpecializedRule",
      "matrix-row",
      "default",
      "Matrix_SpeakColNum"
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
      "matrix-end-matrix",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"Ende Matrize\"",
      "self::matrix",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "matrix-end-vector",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"Ende Matrize\"",
      "self::vector",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "matrix-end-determinant",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"Ende Determinante\"",
      "self::matrix",
      "@role=\"determinant\"",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "vector",
      "Matrix_Vector",
      "[t] \"der\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Spaltenvektor\"; [p] (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\",grammar:simpleDet); [p] (pause:long)",
      "self::vector"
    ],
    [
      "SpecializedRule",
      "vector",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "vector-simple",
      "Matrix_Vector",
      "[t] \"der\" (grammar:article); [t] count(children/*);  [t] \"mal\"; [t] count(children/*[1]/children/*); [t] \"Spaltenvektor\"; [p] (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet); [p] (pause:long)",
      "self::vector",
      "count(children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "SpecializedRule",
      "vector-simple",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "row-vector",
      "Matrix_Vector",
      "[t] \"der\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Zeilenvektor\"; [p] (pause:long); [m] children/*[1]/children/* (ctxtFunc:CTFnodeCounter,context:\"Spalte-:\",grammar:simpleDet); [p] (pause:long)",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "SpecializedRule",
      "row-vector",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "row-vector-simple",
      "Matrix_Vector",
      "[t] \"der\" (grammar:article); [t] count(children/*);  [t] \"mal\";[t] count(children/*[1]/children/*); [t] \"Zeilenvektor\"; [p] (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet); [p] (pause:long)",
      "self::matrix",
      "@role=\"rowvector\"",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "SpecializedRule",
      "row-vector-simple",
      "Matrix_Vector",
      "Matrix_EndVector"
    ],
    [
      "Rule",
      "vector-end-matrix",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"Ende Matrize\"",
      "self::matrix",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-vector",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"Ende Vektor\"",
      "self::vector",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-vector",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"Ende Vektor\"",
      "self::matrix",
      "@role=\"rowvector\"",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-determinant",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"Ende Determinante\"",
      "self::matrix",
      "@role=\"determinant\"",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "binomial",
      "Matrix_Combinatoric",
      "[n] children/*[1]/children/*[1]; [t] \"über\"; [n] children/*[2]/children/*[1]; ",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "lines-summary",
      "default",
      "[p] (pause:short); [t] count(children/*); [t] \"Zeilen\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))",
      "self::*"
    ],
    [
      "Rule",
      "lines-summary",
      "MultiLineOverview_None",
      "[n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))",
      "self::*"
    ],
    [
      "Aliases",
      "lines-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "cases-summary",
      "default",
      "[p] (pause:short); [t] count(children/*); [t] \"Fälle\";  [n] . (grammar:layoutSummary)",
      "self::cases",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "cases-summary",
      "MultiLineOverview_None",
      "[n] . (grammar:layoutSummary)",
      "self::cases",
      "not(contains(@grammar, \"layoutSummary\"))",
      "self::*"
    ],
    [
      "Rule",
      "lines",
      "default",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\",sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines",
      "self::multiline"
    ],
    [
      "Rule",
      "line",
      "default",
      "[n] children/*[1]",
      "self::line"
    ],
    [
      "Rule",
      "row-medium",
      "default",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"medium\")",
      "self::row",
      "@role=\"table\""
    ],
    [
      "Aliases",
      "row-medium",
      "self::row",
      "@role=\"cases\""
    ],
    [
      "Rule",
      "row-long",
      "MultiLinePausesBetweenColumns_Long",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"long\")",
      "self::row",
      "@role=\"table\""
    ],
    [
      "Aliases",
      "row-long",
      "self::row",
      "@role=\"cases\""
    ],
    [
      "Rule",
      "row-short",
      "MultiLinePausesBetweenColumns_Short",
      "[m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\")",
      "self::row",
      "@role=\"table\""
    ],
    [
      "Aliases",
      "row-short",
      "self::row",
      "@role=\"cases\""
    ],
    [
      "Rule",
      "blank-cell",
      "default",
      "[t] \"leer\"",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "blank-line",
      "default",
      "[t] \"leer\"",
      "self::line",
      "count(children/*)=0"
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
      "cases",
      "default",
      "[p] (pause:short);  [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Fall-:\",sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::cases"
    ],
    [
      "Rule",
      "lines-cases-summary",
      "MultiLineLabel_Case",
      "[p] (pause:short); [t] count(children/*); [t] \"Fälle\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-cases-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-cases",
      "MultiLineLabel_Case",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Fall-:\",sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-cases",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-equations-summary",
      "MultiLineLabel_Equation",
      "[p] (pause:short); [t] count(children/*); [t] \"Gleichungen\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-equations-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-equations",
      "MultiLineLabel_Equation",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Gleichung-:\",sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-equations",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-steps-summary",
      "MultiLineLabel_Step",
      "[p] (pause:short); [t] count(children/*); [t] \"Rechenschritte\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-steps-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-steps",
      "MultiLineLabel_Step",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Schritt-:\",sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-steps",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-rows-summary",
      "MultiLineLabel_Row",
      "[p] (pause:short); [t] count(children/*); [t] \"Zeilen\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-rows-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-rows",
      "MultiLineLabel_Row",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Zeile-:\",sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-rows",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-constraints-summary",
      "MultiLineLabel_Constraint",
      "[p] (pause:short); [t] count(children/*); [t] \"Bedingungen\";  [n] . (grammar:layoutSummary)",
      "self::multiline",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Aliases",
      "lines-constraints-summary",
      "self::table",
      "not(contains(@grammar, \"layoutSummary\"))"
    ],
    [
      "Rule",
      "lines-constraints",
      "MultiLineLabel_Constraint",
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"Bedingung-:\",sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::table"
    ],
    [
      "Aliases",
      "lines-constraints",
      "self::multiline"
    ],
    [
      "Rule",
      "lines-none",
      "MultiLineLabel_None",
      "[p] (pause:short); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"long\"); [p] (pause:long)",
      "self::table",
      "contains(@grammar, \"layoutSummary\")"
    ],
    [
      "Aliases",
      "lines-none",
      "self::multiline",
      "contains(@grammar, \"layoutSummary\")"
    ],
    [
      "Aliases",
      "lines-none",
      "self::cases",
      "contains(@grammar, \"layoutSummary\")"
    ],
    [
      "Rule",
      "bigop",
      "default",
      "[n] children/*[1]; [t] \"über\"; [n] children/*[2]; [p] (pause:short)",
      "self::bigop"
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[n] children/*[1]; [t] \"von\"; [n] children/*[2];[t] \"bis\"; [n] children/*[3];",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[n] children/*[1]; [t] \"über\"; [n] children/*[2]; [p] (pause:short)",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper",
      "default",
      "[n] children/*[1]; [t] \"unter\"; [n] children/*[2]; [p] (pause:short)",
      "self::limupper"
    ],
    [
      "Rule",
      "integral",
      "default",
      "[t] \"das\"; [n] children/*[1]; [t] \"über\"; [n] children/*[2]; [p] (pause:short)",
      "self::integral"
    ],
    [
      "Rule",
      "overscript",
      "default",
      "[n] children/*[1]; [t] \"unter\"; [n] children/*[2]; [p] (pause:short)",
      "self::overscore"
    ],
    [
      "Rule",
      "overscript",
      "default",
      "[n] children/*[1]; [n] children/*[2];",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]"
    ],
    [
      "Rule",
      "overscript-limits",
      "default",
      "[n] children/*[1]; [t] \"bis\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role!=\"overaccent\"]",
      "name(children/*[1])=\"underscore\"",
      "children/*[1]/children/*[2][@role!=\"underaccent\"]"
    ],
    [
      "Rule",
      "underscript",
      "default",
      "[n] children/*[1]; [t] \"über\"; [n] children/*[2]; [p] (pause:short)",
      "self::underscore"
    ],
    [
      "Rule",
      "underscript-limits",
      "default",
      "[n] children/*[1]; [t] \"von\"; [n] children/*[2]",
      "self::underscore",
      "@role=\"underover\"",
      "children/*[2][@role!=\"underaccent\"]"
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
      "decimal-period",
      "default",
      "[t] \"Dezimalbruch\"; [n] children/*[1] (grammar:spaceout); [t] \"Komma mit Periode\";  [n] children/*[3]/children/*[1] (grammar:spaceout)",
      "self::punctuated",
      "@role=\"sequence\"",
      "count(./content/*)=1",
      "./content/*[1][@role=\"fullstop\"]",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"integer\"]",
      "name(children/*[3])=\"overscore\"",
      "children/*[3][@role=\"integer\"]",
      "children/*[3]/children/*[2][@role=\"overaccent\"]",
      "children/*[3]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "decimal-period",
      "default",
      "[t] \"Dezimalbruch\"; [n] children/*[1] (grammar:spaceout); [t] \"mit Periode\";  [n] children/*[2]/children/*[1] (grammar:spaceout);",
      "self::infixop",
      "@role=\"implicit\"",
      "count(./children/*)=2",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"float\"]",
      "name(children/*[2])=\"overscore\"",
      "children/*[2][@role=\"integer\"]",
      "children/*[2]/children/*[2][@role=\"overaccent\"]",
      "children/*[2]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "decimal-period-singular",
      "default",
      "[t] \"Dezimalbruch\"; [n] children/*[1] (grammar:spaceout); [t] \"Komma mit Periode\";  [n] children/*[3]/children/*[1] (grammar:spaceout)",
      "self::punctuated",
      "@role=\"sequence\"",
      "count(./content/*)=1",
      "./content/*[1][@role=\"fullstop\"]",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"integer\"]",
      "name(children/*[3])=\"overscore\"",
      "children/*[3][@role=\"integer\"]",
      "children/*[3]/children/*[2][@role=\"overaccent\"]",
      "children/*[3]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]",
      "string-length(./children/*[3]/children/*[1]/text())=1"
    ],
    [
      "Rule",
      "decimal-period-singular",
      "default",
      "[t] \"Dezimalbruch\"; [n] children/*[1] (grammar:spaceout); [t] \"mit Periode\";  [n] children/*[2]/children/*[1] (grammar:spaceout);",
      "self::infixop",
      "@role=\"implicit\"",
      "count(./children/*)=2",
      "name(children/*[1])=\"number\"",
      "children/*[1][@role=\"float\"]",
      "name(children/*[2])=\"overscore\"",
      "children/*[2][@role=\"integer\"]",
      "children/*[2]/children/*[2][@role=\"overaccent\"]",
      "children/*[2]/children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]",
      "string-length(./children/*[2]/children/*[1]/text())=1"
    ],
    [
      "Rule",
      "number-with-spaces",
      "default",
      "[m] CQFspaceoutNumber (grammar:!spaceout:number)",
      "self::number",
      "contains(@grammar, \"spaceout\")"
    ],
    [
      "Rule",
      "decimal-point",
      "default",
      "[t] \"Komma\"",
      "self::punctuation",
      "@role=\"fullstop\"",
      "contains(@grammar,\"number\")"
    ],
    [
      "Rule",
      "line-segment",
      "default",
      "[t] \"die Strecke\"; [n] children/*[1]/children/*[1]; [n] children/*[1]/children/*[2]; [p] (pause:short)",
      "self::overscore",
      "@role=\"implicit\"",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]",
      "name(children/*[1])=\"infixop\"",
      "count(./children/*[1]/children/*)=2"
    ],
    [
      "Rule",
      "conjugate",
      "Bar_Conjugate",
      "[t] \"die komplexe Konjugation von\"; [n] children/*[1]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [
      "Rule",
      "defined-by",
      "default",
      "[t] \"ist definiert als\" (pause:short)",
      "self::overscore",
      "@role=\"equality\"",
      "@embellished=\"relation\"",
      "name(children/*[2])=\"text\"",
      "children/*[2][text()]=\"def\""
    ],
    [
      "Rule",
      "adorned-sign",
      "default",
      "[n] children/*[1] ; [t] \"Zeichen mit darüberstehendem\"; [n] children/*[2]",
      "self::overscore",
      "@embellished",
      "name(children/*[1])=\"operator\" or name(children/*[1])=\"relation\""
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
      "tensor-base",
      "default",
      "[n] children/*[2]; [n] children/*[3]; [n] children/*[1]; [n] children/*[4]; [n] children/*[5]",
      "self::tensor"
    ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"linker oberer Index\"; [n] text()",
      "self::*[@role=\"leftsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"linker oberer Index\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"linker unterer Index\"; [n] text()",
      "self::*[@role=\"leftsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"linker unterer Index\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsub\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"rechter oberer Index\"; [n] text()",
      "self::*[@role=\"rightsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"rechter oberer Index\"; [m] children/*",
      "self::punctuated",
      "@role=\"rightsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"rechter unterer Index\"; [n] text()",
      "self::*[@role=\"rightsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"rechter unterer Index\"; [m] children/*",
      "self::punctuated",
      "@role=\"rightsub\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "empty-index",
      "default",
      "[p] (pause:medium)",
      "self::empty",
      "@role=\"rightsub\" or @role=\"rightsuper\" or @role=\"leftsub\" or @role=\"leftsuper\""
    ],
    [
      "Rule",
      "combinatorics",
      "default",
      "[n] children/*[2] (grammar:combinatorics); [n] children/*[1]; [n] children/*[4] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"P\" or text()=\"C\"]"
    ],
    [
      "Rule",
      "choose",
      "CombinationPermutation_ChoosePermute",
      "[n] children/*[4] (grammar:combinatorics); [t] \"aus\"; [n] children/*[2] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"C\"]"
    ],
    [
      "Rule",
      "permute",
      "CombinationPermutation_ChoosePermute",
      "[n] children/*[4] (grammar:combinatorics); [t] \"Permutionen von\"; [n] children/*[2] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"P\"]"
    ],
    [
      "Rule",
      "unit-singular",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate)",
      "self::identifier[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-plural",
      "default",
      "[t] text() (grammar:annotation=\"unit\":translate:plural)",
      "self::identifier[@role=\"unit\"]",
      "not(contains(@grammar, \"singularUnit\"))"
    ],
    [
      "Rule",
      "unit-square",
      "default",
      "[t] \"Quadrat\" (join:\"\"); [n] children/*[1] (grammar:lowercase)",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=2]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "Rule",
      "unit-cubic",
      "default",
      "[t] \"Kubik\" (join:\"\"); [n] children/*[1] (grammar:lowercase)",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=3]",
      "name(children/*[1])=\"identifier\""
    ],
    [
      "Rule",
      "reciprocal",
      "default",
      "[n] children/*[1]; [t] \"invers\"",
      "self::superscript[@role=\"unit\"]",
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
      "[t] \"pro\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
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
      "self::infixop[@role=\"unit\"]"
    ],
    [
      "Rule",
      "unit-combine-singular",
      "default",
      "[n] children/*[1]; [n] children/*[2] (grammar:singularUnit); [m] children/*[position()>2]",
      "self::infixop[@role=\"unit\"]",
      "name(children/*[1])=\"number\"",
      "children/*[1][text()=1]"
    ],
    [
      "Rule",
      "unit-divide",
      "default",
      "[n] children/*[1]; [t] \"pro\"; [n] children/*[2]",
      "self::fraction[@role=\"unit\"]"
    ],
    [
      "Rule",
      "currency",
      "default",
      "[m] children/*[position()>1]; [n] children/*[1];",
      "self::infixop",
      "contains(@annotation, \"clearspeak:unit\")",
      "children/*[1][@role=\"unit\"]",
      "CQFfirstCurrency"
    ],
    [
      "Rule",
      "currency",
      "Currency_Position",
      "[m] children/*",
      "self::infixop",
      "contains(@annotation, \"clearspeak:unit\")"
    ],
    [
      "SpecializedRule",
      "currency",
      "Currency_Position",
      "Currency_Prefix"
    ],
    [
      "Rule",
      "currency",
      "Currency_Prefix",
      "[n] children/*[last()]; [m] children/*[position()<last()]; ",
      "self::infixop",
      "contains(@annotation, \"clearspeak:unit\")",
      "children/*[last()][@role=\"unit\"]",
      "CQFlastCurrency"
    ]
  ],
  "annotators": [
    "simple",
    "unit"
  ]
}
