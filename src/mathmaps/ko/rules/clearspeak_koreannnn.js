{
  "domain": "clearspeak",
  "locale": "ko",
  "modality": "speech",
  "rules": [
    [
      "Rule",
      "collapsed",
      "default",
      "[t] \"접다\"; [n] . (engine:modality=summary,grammar:collapsed)",
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
      "[n] text() (grammar:ignoreCaps=\"cap\")",
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
      "[n] self::* (grammar:ignoreFont=@font)",
      "self::identifier",
      "string-length(text())=1",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"italic\""
    ],
    [ //보류
      "Rule",
      "german-font",
      "default",
      "[t] \"German\"; [n] self::* (grammar:ignoreFont=@font)",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"fraktur\""
    ],
    [
      "Rule",
      "german-font",
      "default",
      "[t] \"bold German\"; [n] self::* (grammar:ignoreFont=@font)",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"bold-fraktur\""
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
      "[n] text() (pitch:0.6,grammar:ignoreCaps=\"cap\")",
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
      "[t] \"점 점 점\"",
      "self::punctuation",
      "@role=\"ellipsis\"",
      "not(following-sibling::*[1])",
      "not(preceding-sibling::*[last()][@role=\"ellipsis\"])"
    ],
    [ // 보류
      "Rule",
      "ellipsis",
      "Ellipses_AndSoOn",
      "[t] \"부터\" [n] following-sibling::*[1]; [t] \"까지\"",
      "self::punctuation",
      "@role=\"ellipsis\"",
      "preceding-sibling::*[1]",
      "following-sibling::*[1]"
    ],
    [
      "Rule",
      "vbar-evaluated",
      "default",
      "[n] children/*[1] (pause:\"short\"); [t] \"조건\"; [n] content/*[1]/children/*[2]; (pause:\"short\")",
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
      "[n] children/*[1] (pause:\"short\"); [n] content/*[1]/children/*[2]; [t] \"일 때\"; [n](pause:\"short\"); [t] \"빼기 같은 수식\"; [n] content/*[1]/children/*[1]/children/*[2]; [t] \"일 때\"; [n] (pause:\"short\")",
      "self::punctuated",
      "@role=\"endpunct\"",
      "content/*[1][@role=\"vbar\"]",
      "content/*[1][@embellished]",
      "name(content/*[1])=\"superscript\"",
      "name(content/*[1]/children/*[1])=\"subscript\""
    ],
    [ //보류
      "Rule",
      "vbar-such-that",
      "VerticalLine_SuchThat",
      "[t] \"such that\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [ //보류
      "Rule",
      "vbar-divides",
      "default",
      "[t] \"divides\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])",
      "parent::*/parent::*[@role=\"sequence\"]"
    ],
    [//보류
      "Rule",
      "vbar-divides",
      "VerticalLine_Divides",
      "[t] \"divides\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [//보류
      "Rule",
      "vbar-given",
      "VerticalLine_Given",
      "[t] \"바\"",
      "self::punctuation",
      "@role=\"vbar\"",
      "not(parent::*/parent::*[@embellished=\"punctuation\"])"
    ],
    [//보류
      "Rule",
      "set-member",
      "default",
      "[t] \"in\"",
      "self::operator",
      "@role=\"set extended\"",
      "text()=\"∈\" or text()=\"∊\""
    ],
    [//보류
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Member",
      "[t] \"member of\""
    ],
    [//보류
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Element",
      "[t] \"element of\""
    ],
    [//보류
      "SpecializedRule",
      "set-member",
      "default",
      "SetMemberSymbol_Belongs",
      "[t] \"belonging to\""
    ],
    [//보류
      "Rule",
      "set-not-member",
      "default",
      "[t] \"not in\"",
      "self::operator",
      "@role=\"set extended\"",
      "text()=\"∉\""
    ],
    [//보류
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Member",
      "[t] \"not member of\""
    ],
    [//보류
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Element",
      "[t] \"not element of\""
    ],
    [//보류
      "SpecializedRule",
      "set-not-member",
      "default",
      "SetMemberSymbol_Belongs",
      "[t] \"not belonging to\""
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
      "[n] children/*[1]; [t] \"피트\" (grammar:annotation=\"unit\":translate:plural)",
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
      "[n] children/*[1]; [t] \"피트\" (grammar:annotation=\"unit\":translate)",
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
      "[n] children/*[1]; [t] \"인치\" (grammar:annotation=\"unit\":translate:plural)",
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
      "[n] children/*[1]; [t] \"인치\" (grammar:annotation=\"unit\":translate)",
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
      "[n] children/*[1]; [t] \"피트\" (grammar:annotation=\"unit\":translate:plural, pause:short)",
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
      "[n] children/*[1]; [t] \"피트\" (grammar:annotation=\"unit\":translate, pause:short)",
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
      "[n] children/*[1]; ; [t] \"인치\" (grammar:annotation=\"unit\":translate:plural, pause:short)",
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
      "[n] children/*[1]; ; [t] \"인치\" (grammar:annotation=\"unit\":translate, pause:short)",
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
      "article",
      "default",
      "[n] . (grammar:noArticle)",
      "self::*[contains(@grammar, \"addArticle\")]",
      "not(contains(@grammar, \"noArticle\"))"
    ],
    [
      "Rule",
      "appl",
      "default",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\")",
      "self::appl"
    ],
    [
      "Rule",
      "appl-simple",
      "default",
      "[n] children/*[1]; [t] \"의\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"simple function\"",
      "name(children/*[2])=\"appl\""
    ],
    [
      "Rule",
      "appl-simple",
      "default",
      "[n] children/*[1]; [t] \"의\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"simple function\"",
      "name(children/*[2])=\"fenced\"",
      "name(children/*[2]/children/*[1])=\"appl\""
    ],
    [
      "Rule",
      "appl",
      "Functions_None",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\")",
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
      "[n] . (grammar:impliedTimes, pause:\"short\")",
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
      "[p] (pause:\"short\"); [n] children/*[1]; [n] children/*[2] (pause:\"short\"); ",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])!=\"function\""
    ],
    [
      "Rule",
      "function-prefix-fenced-or-frac-arg",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1] (grammar:addArticle); [t] \"의\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or name(children/*[2])=\"fraction\" or (name(children/*[2])!=\"fenced\" and not(contains(children/*[2]/@annotation, \"clearspeak:simple\")))",
      "self::*"
    ],
    [
      "Rule",
      "function-prefix-subscript",
      "default",
      "[p] (pause:\"short\"); [n] children/*[1] (grammar:addArticle); [t] \"의\" (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
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
      "[n] children/*[1]; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [ //보류
      "Rule",
      "function-ln",
      "default",
      "[n] children/*[1]; [t] \"진수 시작\"; [n] children/*[2]; [t] \"진수 끝\"; (pause:\"short\")",
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
      "[n] . (grammar:NatLog, pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "content/*[2][text()=\"ln\"]",
      "not(contains(@grammar, \"NatLog\"))"
    ],
    [
      "Rule",
      "function-prefix-as-exp",
      "default",
      "[n] children/*[2] (pause:\"short\"); [t] \"의\" (pause:\"short\"); [n] children/*[1]; ",
      "self::appl",
      "@role=\"prefix function\"",
      "name(parent::*/parent::*)=\"superscript\"",
      "not(following-sibling::*)",
      "(name(children/*[2])=\"fenced\" and not(contains(children/*[2]/children/*[1]/@annotation, \"clearspeak:simple\"))) or name(children/*[2])=\"fraction\" or (name(children/*[2])!=\"fenced\" and not(contains(children/*[2]/@annotation, \"clearspeak:simple\")))"
    ],
    [ //보류
      "Rule",
      "function-prefix-subscript-as-exp",
      "default",
      "[n] children/*[2] (pause:\"short\"); [t] \"의\" (pause:\"short\"); [n] children/*[1];",
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
      "[p] (pause:\"short\"); [n] children/*[1]; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "CQFisHyperbolic"
    ],
    [
      "Rule",
      "function-prefix-inverse",
      "default",
      "[p] (pause:\"short\"); [t] \"역함수\"; [n] children/*[1]/children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\")",
      "self::appl",
      "@role=\"prefix function\"",
      "name(children/*[1])=\"superscript\"",
      "name(children/*[1]/children/*[2])=\"prefixop\"",
      "children/*[1]/children/*[2][@role=\"negative\"]",
      "children/*[1]/children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [ //보류
      "Rule",
      "appl-triginverse",
      "Trig_TrigInverse",
      "[p] (pause:\"short\"); [n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\")",
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
      "[p] (pause:\"short\"); [t] \"아크\"; [n] children/*[1]/children/*[1]; [n] children/*[2] (pause:\"short\")",
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
      "[p] (pause:\"short\"); [t] \"아크\"; [n] children/*[1]/children/*[1] (pause:\"short\"); [n] children/*[2] (pause:\"short\")",
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
      "[p] (pause:\"short\"); [t] \"아크\"; [n] children/*[1]/children/*[1]; [n] children/*[2] (pause:\"short\")",
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
      "[t] \"역함수\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"prefix function\" or @role=\"simple function\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=\"1\"]",
      "not(contains(@grammar, \"functions_none\"))"
    ],
    [ // fourth 보류
      "Rule",
      "superscript-prefix-function",
      "default",
      "[n] children/*[2]; [t] \"제곱\"; [n] children/*[1]",
      "self::superscript",
      "@role=\"prefix function\"",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-prefix-function",
      "default",
      "[n] children/*[2]; [t] \"제곱\"; [n] children/*[1]",
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
      "[n] children/*[1]; [t] \"지수 시작\" (pause:\"short\"); [n] children/*[2] (pause:\"short\"); [t] \"지수 끝\" (pause:\"short\")",
      "self::superscript"
    ],
    [
      "Rule",
      "superscript-simple-exponent",
      "default",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (grammar:noArticle); [t] \"제곱\" (pause:\"short\")",
      "self::superscript",
      "not(descendant::superscript)"
    ],
    [
      "Rule",
      "superscript-simple-exponent-end",
      "default",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (grammar:noArticle); [t] \"제곱\"",
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
      "superscript-ordinal",
      "default",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2]; [t] \"제곱\" (pause:\"short\")",
      "self::superscript",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Aliases",
      "superscript-ordinal",
      "self::superscript",
      "name(children/*[2])=\"identifier\"",
      "children/*[2][@role=\"latinletter\" or @role=\"greekletter\" or @role=\"otherletter\"]"
    ],
    [
      "Rule",
      "superscript-non-ordinal",
      "default",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (grammar:noArticle); [t] \"제곱\" (pause:\"short\")",
      "self::superscript",
      "children/*[2][@role=\"negative\"]",
      "name(children/*[2]/children/*[1])=\"number\"",
      "children/*[2]/children/*[1][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-simple-function",
      "default",
      "[n] children/*[2]; [t] \"제곱\" (pause:\"short\"); [n] children/*[1]",
      "self::superscript",
      "name(children/*[1])=\"identifier\"",
      "children/*[1][@role=\"simple function\"]",
      "children/*[2][@role!=\"prime\"]",
      "not(contains(@grammar, \"functions_none\"))"
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
      "superscript-ordinal",
      "Exponent_Ordinal",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\"); [t] \"제곱\"",
      "self::superscript",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "Exponent_Ordinal",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\"); [t] \"제곱\"",
      "self::superscript",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "name(children/*[2]/children/*[1])=\"number\"",
      "children/*[2]/children/*[1][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "Exponent_Ordinal",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\"); [t] \"제곱\"",
      "self::superscript",
      "name(children/*[2])=\"identifier\"",
      "children/*[2][@role=\"latinletter\" or @role=\"greekletter\" or @role=\"otherletter\"]"
    ],
    [
      "Rule",
      "superscript-ordinal-default",
      "Exponent_Ordinal",
      "[n] children/*[1]; [t] \"지수 시작\" (pause:\"short\"); [n] children/*[2] (pause:\"short\"); [t] \"지수 끝\" (pause:\"short\")",
      "self::superscript",
      "children//superscript"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\"); [t] \"제곱\"",
      "self::superscript",
      "name(children/*[2])=\"number\"",
      "children/*[2][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\"); [t] \"제곱\"",
      "self::superscript",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "name(children/*[2]/children/*[1])=\"number\"",
      "children/*[2]/children/*[1][@role=\"integer\"]"
    ],
    [
      "Rule",
      "superscript-ordinal",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\"); [t] \"제곱\"",
      "self::superscript",
      "name(children/*[2])=\"identifier\"",
      "children/*[2][@role=\"latinletter\" or @role=\"greekletter\" or @role=\"otherletter\"]"
    ],
    [
      "Rule",
      "superscript-ordinal-default",
      "Exponent_OrdinalPower",
      "[n] children/*[1]; [t] \"지수 시작\" (pause:\"short\"); [n] children/*[2] (pause:\"short\"); [t] \"지수 끝\" (pause:\"short\")",
      "self::superscript",
      "children//superscript"
    ],
    [
      "Rule",
      "superscript-power",
      "Exponent_AfterPower",
      "[n] children/*[1]; [t] \"의\"; [n] children/*[2] (pause:\"short\"); [t] \"제곱\"",
      "self::superscript"
    ],
    [
      "Rule",
      "superscript-power-default",
      "Exponent_AfterPower",
      "[n] children/*[1]; [t] \"지수 시작\" (pause:\"short\"); [n] children/*[2] (pause:\"short\"); [t] \"지수 끝\" (pause:\"short\")",
      "self::superscript",
      "children//superscript"
    ],/*
    [
      "Rule",
      "exponent",
      "default",
      "[n] text() (join:\"-\"); [t] \"th\"",
      "self::identifier",
      "contains(@grammar, \"ordinal\")"
    ],*/
    [
      "Rule",
      "exponent",
      "default",
      "[t] CSFordinalExponent",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
    ],
    [
      "Rule",
      "exponent",
      "default",
      "[t] CSFordinalExponent",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()!=\"0\"",
      "not(contains(@annotation, \"general:basenumber\"))"
    ],
    [
      "Rule",
      "exponent",
      "Exponent_Ordinal",
      "[t] CSFwordOrdinal",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()!=\"0\"",
      "not(contains(@annotation, \"general:basenumber\"))"
    ],
    [
      "Rule",
      "exponent",
      "Exponent_Ordinal",
      "[t] \"영\"",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()=\"0\""
    ],
    [
      "Rule",
      "exponent",
      "Exponent_OrdinalPower",
      "[t] CSFwordOrdinal",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()!=\"0\"",
      "not(contains(@annotation, \"general:basenumber\"))"
    ],
    [
      "Rule",
      "exponent",
      "Exponent_OrdinalPower",
      "[t] \"영\"",
      "self::number",
      "@role=\"integer\"",
      "contains(@grammar, \"ordinal\")",
      "text()=\"0\""
    ],
    [
      "Rule",
      "square",
      "default",
      "[n] children/*[1]; [t] \"제곱\" (span:children/*[2])",
      "self::superscript",
      "@role!=\"unit\"",
      "children/*[2][text()=\"2\"]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "self::*"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[n] children/*[1]; [t] \"세제곱\" (span:children/*[2])",
      "self::superscript",
      "@role!=\"unit\"",
      "children/*[2][text()=\"3\"]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "self::*"
    ],
    [//창조
      "Rule",
      "4D",
      "default",
      "[n] children/*[1]; [t] \"네제곱\" (span:children/*[2])",
      "self::superscript",
      "@role!=\"unit\"",
      "children/*[2][text()=\"4\"]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
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
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence, pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence, pause:\"short\")",
      "self::fenced",
      "@role=\"leftright\""
    ],
    [
      "Rule",
      "paren-simple-nested-func",
      "default",
      "[p] (pause:\"short\"); [n] content/*[1] (pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (pause:\"short\")",
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
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence, pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence, pause:\"short\")",
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
      "[p] (pause:\"short\"); [n] children/*[1] (pause:\"short\")",
      "self::fenced"
    ],
    [
      "Rule",
      "fences-open-close",
      "ImpliedTimes_None",
      "[p] (pause:\"short\"); [n] content/*[1] (grammar:spokenFence, pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (grammar:spokenFence, pause:\"short\")",
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
      "[t] \"좌표\"; [n] children/*[1]",
      "self::fenced",
      "name(children/*[1])=\"punctuated\"",
      "children/*[1][@role=\"sequence\"]"
    ],
    [
      "Rule",
      "fences-interval",
      "Paren_Interval",
      "[n] . (grammar:interval)",
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
      "[t] \"열린 구간\"; [n] children/*[1]/children/*[1]; [t] \"에서\"; [n] children/*[1]/children/*[3]; [t] \"까지\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\")\""
    ],
    [
      "Rule",
      "interval-closed-open",
      "Paren_Interval",
      "[t] \"반 열린 구간\"; [n] children/*[1]/children/*[1]; [t] \"이상\"; [n] children/*[1]/children/*[3]; [t] \"미만\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\")\""
    ],
    [
      "Rule",
      "interval-open-closed",
      "Paren_Interval",
      "[t] \"반 열린 구간\"; [n] children/*[1]/children/*[1]; [t] \"초과\"; [n] children/*[1]/children/*[3]; [t] \"이하\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\"]\""
    ],
    [
      "Rule",
      "interval-closed",
      "Paren_Interval",
      "[t] \"닫힌 구간\"; [n] children/*[1]/children/*[1]; [t] \"에서\"; [n] children/*[1]/children/*[3]; [t] \"까지\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"[\"",
      "content/*[2]/text()=\"]\""
    ],
    [
      "Rule",
      "interval-open-inf-r",
      "Paren_Interval",
      "[t] \"열린 구간\"; [n] children/*[1]/children/*[1]; [t] \"에서 무한대까지\"",
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
      "[t] \"열린 구간 음의 무한대에서\"; [n] children/*[1]/children/*[3]; [t] \"까지\"",
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
      "[t] \"전 구간\"",
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
      "[t] \"닫힌 구간\"; [n] children/*[1]/children/*[1]; [t] \"에서 무한대까지\"",
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
      "[t] \"닫힌 구간 음의 무한대에서\"; [n] children/*[1]/children/*[3]; [t] \"까지\"",
      "self::fenced",
      "contains(@grammar, \"interval\")",
      "content/*[1]/text()=\"(\"",
      "content/*[2]/text()=\"]\"",
      "children/*[1]/children/*[1]/text()=\"∞\" or (name(children/*[1]/children/*[1])=\"prefixop\" and children/*[1]/children/*[1]/children/*[1]/text()=\"∞\")"
    ],
    [//보류
      "Rule",
      "paren-nested-embellished-funcs",
      "Functions_None",
      "[p] (pause:\"short\"); [n] content/*[1] (pause:\"short\"); [n] children/*[1] (pause:\"short\"); [n] content/*[2] (pause:\"short\")",
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
      "[t] \"공집합\"",
      "self::fenced",
      "@role=\"set empty\""
    ],
    [
      "Rule",
      "set-extended",
      "default",
      "[n] children/*[1]/children/*[3]; [t] \"를 만족하는 모든\"; [n] children/*[1]/children/*[1]; [t] \"의 집합\"",
      "self::fenced",
      "@role=\"set extended\""
    ],
    [
      "Rule",
      "set-collection",
      "default",
      "[t] \"집합\"; [n] children/*[1]",
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
      "[n] children/*[1]/children/*[3]; [t] \"를 만족하는\"; [n] children/*[1]/children/*[1]; [t] \"의 집합\"",
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
      "[p] (pause:short); [n] children/*[1]; [t] \"아래첨자\"; [n] children/*[2] (pause:short)",
      "self::subscript"
    ],
    [
      "Rule",
      "subscript-base",
      "default",
      "[t] \"밑이\"; [n] children/*[2]; [t] \"인\"; [n] children/*[1]",
      "self::subscript",
      "CQFisLogarithm"
    ],
    [
      "Rule",
      "subscript-index",
      "default",
      "[n] children/*[1]; [t] \"아래첨자\"; [n] children/*[2]",
      "self::subscript",
      "contains(@grammar, \"simpleDet\")"
    ],
    [
      "Rule",
      "fraction",
      "default",
      "[p] (pause:short); [t] \"분모가\"; [n] children/*[2] (pause:short); [t] \"이고 분자가\"; [n] children/*[1] (pause:short); [t] \"인 분수\"",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Functions_None",
      "[p] (pause:short); [t] \"분모가\"; [n] children/*[2] (pause:short); [t] \"이고 분자가\"; [n] children/*[1] (pause:short); [t] \"인 분수\"",
      "self::fraction",
      "name(children/*[1])=\"appl\" or name(children/*[2])=\"appl\""
    ],
    [
      "Rule",
      "simple-fraction",
      "default",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",
      "self::fraction",
      "contains(children/*[1]/@annotation, \"clearspeak:simple\") or contains(children/*[1]/@annotation, \"clearspeak:unit\")",
      "contains(children/*[2]/@annotation, \"clearspeak:simple\") or contains(children/*[2]/@annotation, \"clearspeak:unit\")"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "default",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",
      "self::fraction",
      "@role=\"vulgar\""
    ],
    [
      "Rule",
      "simple-text-fraction",
      "default",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"text\"",
      "name(children/*[2])=\"text\""
    ],
    [
      "Rule",
      "simple-text-fraction",
      "default",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",
      "self::fraction",
      "name(children/*[1])=\"infixop\"",
      "children/*[1][@role=\"unit\"]",
      "name(children/*[2])=\"text\""
    ],
    [
      "Rule",
      "vulgar-fraction",
      "default",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)", //"[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\"",
      "CQFvulgarFractionSmall"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_Over",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_OverEndFrac",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short); [t] \"분수 끝\" (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_FracOver",
      "[p] (pause:short); [t] \"분수\"; [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",
      "self::fraction"
    ],
    [ //보류
      "Rule",
      "fraction",
      "Fraction_Per",
      "[p] (pause:short); [n] children/*[1]; [t] \"퍼\"; [n] children/*[2] (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_GeneralEndFrac",
      "[p] (pause:short); [t] \"분수 시작\"; [p] (pause:short); [t] \"분모가\"; [n] children/*[2] (pause:short); [t] \"이고 분자가\"; [n] children/*[1] (pause:short); [t] \"인 분수 끝\" (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "Fraction_General",
      "[p] (pause:short); [t] \"분모가\"; [n] children/*[2] (pause:short); [t] \"이고 분자가\"; [n] children/*[1] (pause:short); [t] \"인 분수\" (pause:short)",
      "self::fraction"
    ],
    [
      "Rule",
      "simple-vulgar-fraction",
      "Fraction_Ordinal",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",//"[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\""
    ],
    [
      "Rule",
      "fraction",
      "Fraction_EndFrac",
      "[p] (pause:short); [n] . (grammar:endfrac); [t] \"분수 끝\" (pause:short)",
      "self::fraction",
      "not(contains(@grammar, \"endfrac\"))",
      "not(contains(children/*[1]/@annotation, \"clearspeak:unit\"))",
      "not(contains(children/*[2]/@annotation, \"clearspeak:unit\"))"
    ],
    [
      "Rule",
      "vulgar-fraction",
      "Fraction_EndFrac",
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",
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
      "[p] (pause:short); [n] children/*[2]; [t] \"분의\"; [n] children/*[1] (pause:short)",//"[t] CSFvulgarFraction",
      "self::fraction",
      "@role=\"vulgar\"",
      "contains(@annotation, \"clearspeak:simple\")",
      "self::*"
    ],
    [ //  보류 (순서)
      "Rule",
      "sqrt",
      "default",
      "[t] \"루트\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt"
    ],
    [
      "Rule",
      "sqrt-nested",
      "default",
      "[p] (pause: \"short\"); [t] \"루트\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "negative-sqrt",
      "default",
      "[t] \"마이너스 루트\"; [n] children/*[1]/children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\""
    ],
    [
      "Rule",
      "negative-sqrt",
      "default",
      "[p] (pause: \"short\"); [t] \"마이너스 루트\"; [n] children/*[1]/children/*[1] (grammar:EndRoot=false, pause:short)",
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
      "[t] \"플러스 루트\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-nested-plus-minus",
      "Roots_PosNegSqRoot",
      "[p] (pause: \"short\"); [t] \"플러스 루트\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-plus-minus",
      "Roots_PosNegSqRootEnd",
      "[t] \"플러스 루트\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-nested-plus-minus",
      "Roots_PosNegSqRootEnd",
      "[p] (pause: \"short\"); [t] \"플러스 루트\"; [n] children/*[1] (grammar:EndRoot=false, pause:short)",
      "self::sqrt",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root",
      "parent::stree or not(parent::*/parent::infixop[@role=\"addition\"]) or (parent::*/parent::*[1]/text()!=\"±\" and parent::*/parent::*/text()!=\"∓\")"
    ],
    [
      "Rule",
      "sqrt-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"루트 끝\" (pause:short)",
      "self::sqrt",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative-sqrt-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"루트 끝\" (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "sqrt-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"루트 끝\" (pause:short)",
      "self::sqrt",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative-sqrt-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"루트 끝\" (pause:short)",
      "self::prefixop",
      "@role=\"negative\"",
      "name(children/*[1])=\"sqrt\"",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "cube",
      "default",
      "[t] \"세제곱근\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "children/*[1][text()=\"3\"]"
    ],
    [
      "Rule",
      "cube-nested",
      "default",
      "[p] (pause:short); [t] \"세제곱근\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "children/*[1][text()=\"3\"]",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],[
      "Rule",
      "4D",
      "default",
      "[t] \"네제곱근\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "children/*[1][text()=\"4\"]"
    ],
    [
      "Rule",
      "4D-nested",
      "default",
      "[p] (pause:short); [t] \"네제곱근\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "children/*[1][text()=\"4\"]",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "root",
      "default",
      "[n] children/*[1]; [t] \"제곱근\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root"
    ],
    [
      "Rule",
      "root-nested",
      "default",
      "[p] (pause:short); [n] children/*[1] ; [t] \"제곱근\"; [n] children/*[2] (grammar:EndRoot=false, pause:short)",
      "self::root",
      "not(preceding-sibling::*)",
      "ancestor::sqrt|ancestor::root"
    ],
    [
      "Rule",
      "root-endroot",
      "Roots_RootEnd",
      "[n] . (grammar:EndRoot); [t] \"루트 끝\" (pause:short)",
      "self::root",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "root-endroot",
      "Roots_PosNegSqRootEnd",
      "[n] . (grammar:EndRoot); [t] \"루트 끝\" (pause:short)",
      "self::root",
      "not(contains(@grammar, \"EndRoot\"))"
    ],
    [
      "Rule",
      "negative",
      "default",
      "[t] \"마이너스\" (span:content/*[1]); [n] children/*[1]",
      "self::prefixop",
      "@role=\"negative\""
    ],
    [
      "Rule",
      "positive",
      "default",
      "[t] \"플러스\" (span:content/*[1]); [n] children/*[1]",
      "self::prefixop",
      "@role=\"positive\""
    ],
    [
      "Rule",
      "angle-measure",
      "default",
      "[n] content/*[1]; [n] children/*[2] (grammar:angle); [t] \"의 크기\";",
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
    [ //보류(grammar 확인)
      "Rule",
      "set-prefix-operators",
      "default",
      "[n] self::* (grammar:!prefix:addArticle);",
      "self::*",
      "contains(@grammar,\"prefix\")",
      "descendant-or-self::*/text()=\"∩\" or descendant-or-self::*/text()=\"∪\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [ //  보류
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
      "[n] children/*[1]; [t] \"나누기\" (span:content/*[1]); [n] children/*[2]",
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
      "[m] children/* (sepFunc:CTFcontentIterator, pause:short)",
      "self::infixop",
      "@role=\"implicit\"",
      "name(children/*[last()])=\"appl\""
    ],
    [
      "Rule",
      "binary-operation-pause",
      "default",
      "[p] (pause:short); [m] children/* (sepFunc:CTFcontentIterator, pause:short)",
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
      "[m] children/* (rate:\"0.5\", pause:short)",
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
      "[t] \"자연수 집합\" (span:.)",
      "self::identifier",
      "text()=\"ℕ\" or (text()=\"N\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "integers",
      "default",
      "[t] \"정수 집합\" (span:.)",
      "self::identifier",
      "text()=\"ℤ\" or (text()=\"Z\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "rational-numbers",
      "default",
      "[t] \"유리수 집합\" (span:.)",
      "self::identifier",
      "text()=\"ℚ\" or (text()=\"Q\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "real-numbers",
      "default",
      "[t] \"실수 집합\" (span:.)",
      "self::identifier",
      "text()=\"ℝ\" or (text()=\"R\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "complex-numbers",
      "default",
      "[t] \"복소수 집합\" (span:.)",
      "self::identifier",
      "text()=\"ℂ\" or (text()=\"C\" and @font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "natural-numbers-super",
      "default",
      "[n] children/*[2] (grammar:numbers2alpha); [t] \"차원 자연수 집합\"",
      "self::superscript",
      "children/*[1]/text()=\"ℕ\" or (children/*[1]/text()=\"N\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "integers-super",
      "default",
      "[n] children/*[2] (grammar:numbers2alpha); [t] \"차원 정수 집합\"",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "rational-numbers-super",
      "default",
      "[n] children/*[2] (grammar:numbers2alpha); [t] \"차원 유리수 집합\"",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "real-numbers-super",
      "default",
      "[n] children/*[2] (grammar:numbers2alpha); [t] \"차원 실수 집합\"",
      "self::superscript",
      "children/*[1]/text()=\"ℝ\" or (children/*[1]/text()=\"R\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "complex-numbers-super",
      "default",
      "[n] children/*[2] (grammar:numbers2alpha); [t] \"차원 복소수 집합\"",
      "self::superscript",
      "children/*[1]/text()=\"ℂ\" or (children/*[1]/text()=\"C\" and children/*[1]/@font=\"double-struck\")",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "natural-numbers-with-zero",
      "default",
      "[t] \"영을 포함한 자연수 집합\" (span:.)",
      "self::subscript",
      "children/*[1]/text()=\"ℕ\" or (children/*[1]/text()=\"N\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"0\""
    ],
    [
      "Rule",
      "positive-integers",
      "default",
      "[t] \"양의 정수 집합\" (span:.)",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"+\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "positive-integers",
      "default",
      "[t] \"음의 정수 집합\" (span:.)",
      "self::superscript",
      "children/*[1]/text()=\"ℤ\" or (children/*[1]/text()=\"Z\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"-\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "positive-rational-numbers",
      "default",
      "[t] \"양의 유리수 집합\" (span:.)",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"+\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "negative-rational-numbers",
      "default",
      "[t] \"음의 유리수 집합\" (span:.)",
      "self::superscript",
      "children/*[1]/text()=\"ℚ\" or (children/*[1]/text()=\"Q\" and children/*[1]/@font=\"double-struck\")",
      "children/*[2]/text()=\"-\"",
      "self::*",
      "self::*",
      "self::*"
    ],
    [
      "Rule",
      "fences-neutral",
      "default",
      "[p] (pause:short); [t] \"절댓값\" (span:.); [n] children/*[1] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_AbsEnd",
      "[p] (pause:short); [t] \"절댓값 시작\" (span:content/*[1]); [n] children/*[1] (pause: short); [t] \"절댓값 끝\"  (span:content/*[1], pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_Cardinality",
      "[p] (pause:short); [n] children/*[1]; [t] \"의 기수\" (span:.); [p](pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [
      "Rule",
      "fences-neutral",
      "AbsoluteValue_Determinant",
      "[p] (pause:short); [t] \"행렬식\" (span:.); [n] children/*[1] (pause: short)",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"❘\" or content/*[1][text()]=\"｜\" or content/*[1][text()]=\"∣\""
    ],
    [// 보류(children row 조사)
      "Rule",
      "matrix",
      "default",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\", pause:long)",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix-simple",
      "default",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\", grammar:simpleDet, pause:long)",
      "self::matrix",
      "count(children/*)<4",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "matrix-trivial",
      "default",
      "[t] \"1 곱하기 1 행렬\"; [n] children/*[1] (pause:long)",
      "self::vector",
      "@role=\"squarematrix\""
    ],
    [
      "Rule",
      "determinant",
      "default",
      "[t] \"행렬식\"; [t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"determinant\"",
      "count(children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "determinant-simple",
      "default",
      "[t] \"행렬식\"; [t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\", pause:long)",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "Rule",
      "matrix-vector",
      "default",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\",grammar:simpleDet, pause:long)",
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
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::vector",
      "count(children/*)<4",
      "CQFcellsSimple",
      "@role!=\"squarematrix\""
    ],
    [
      "Rule",
      "matrix-vector-simple",
      "Matrix_SilentColNum",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::vector"
    ],
    [
      "Rule",
      "matrix-row-vector",
      "default",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/*[1]/children/* (ctxtFunc:CTFnodeCounter,context:\"Column-:\",grammar:simpleDet, pause:long)",
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
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
      "self::matrix",
      "@role=\"rowvector\"",
      "count(children/*[1]/children/*)<4",
      "CQFcellsSimple"
    ],
    [
      "Rule",
      "matrix-row-vector-simple",
      "Matrix_SilentColNum",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\" (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
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
      "[m] children/* (ctxtFunc:CTFnodeCounter,context:\"-열,- \",sepFunc:CTFpauseSeparator,separator:\"medium\",pause:long)",
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
      "[n] . (grammar:EndMatrix); [t] \"행렬 끝\"",
      "self::matrix",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "matrix-end-vector",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"행렬 끝\"",
      "self::vector",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "matrix-end-determinant",
      "Matrix_EndMatrix",
      "[n] . (grammar:EndMatrix); [t] \"행렬식 끝\"",
      "self::matrix",
      "@role=\"determinant\"",
      "not(contains(@grammar, \"EndMatrix\"))"
    ],
    [
      "Rule",
      "vector",
      "Matrix_Vector",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 벡터\" (pause:long); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\",grammar:simpleDet, pause:long)",
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
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 벡터\" (pause:long); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
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
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 벡터\" (pause:long); [m] children/*[1]/children/* (ctxtFunc:CTFnodeCounter,context:\"Column-:\",grammar:simpleDet, pause:long)",
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
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 벡터\" (pause:long); [m] children/*[1]/children/* (sepFunc:CTFpauseSeparator,separator:\"short\",grammar:simpleDet, pause:long)",
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
      "[n] . (grammar:EndMatrix); [t] \"행렬 끝\"",
      "self::matrix",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-vector",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"벡터 끝\"",
      "self::vector",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-vector",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"벡터 끝\"",
      "self::matrix",
      "@role=\"rowvector\"",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "vector-end-determinant",
      "Matrix_EndVector",
      "[n] . (grammar:EndMatrix); [t] \"행렬식 끝\"",
      "self::matrix",
      "@role=\"determinant\"",
      "not(contains(@grammar, \"EndMatrix\"))",
      "self::*"
    ],
    [
      "Rule",
      "binomial",
      "Matrix_Combinatoric",
      "[t] \"조합\"; [n] children/*[1]/children/*[1]; [t] \"씨\"; [n] children/*[2]/children/*[1]; ",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "lines-summary",
      "default",
      "[p] (pause:short); [t] \"총 줄수 \"; [t] count(children/*); [n] . (grammar:layoutSummary)",
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
      "[p] (pause:short); [t] \"총 케이스 수\"; [t] count(children/*); [n] . (grammar:layoutSummary)",
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
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
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
      "[t] \"빈 칸\"",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "blank-line",
      "default",
      "[t] \"빈 칸\"",
      "self::line",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "blank-cell-empty",
      "default",
      "[t] \"빈 칸\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"cell\""
    ],
    [
      "Rule",
      "blank-line-empty",
      "default",
      "[t] \"빈 칸\"",
      "self::empty",
      "count(../*)=1",
      "name(../..)=\"line\""
    ],
    [
      "Rule",
      "cases",
      "default",
      "[p] (pause:short);  [m] children/* (ctxtFunc:CTFnodeCounter,context:\"케이스-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
      "self::cases"
    ],
    [
      "Rule",
      "lines-cases-summary",
      "MultiLineLabel_Case",
      "[p] (pause:short); [t] \"총 케이스 수\"; [t] count(children/*);  [n] . (grammar:layoutSummary)",
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
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"케이스-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
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
      "[p] (pause:short); [t] \"총 방정식 수\"; [t] count(children/*);  [n] . (grammar:layoutSummary)",
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
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"방정식-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
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
      "[p] (pause:short); [t] \"총 단계 수\"; [t] count(children/*);  [n] . (grammar:layoutSummary)",
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
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-단계:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
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
      "[p] (pause:short); [t] \"총\"; [t] count(children/*); [t] \"행\"; [n] . (grammar:layoutSummary)",
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
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"-행:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
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
      "[p] (pause:short); [t] \"총 조건문 수\"; [t] count(children/*); [n] . (grammar:layoutSummary)",
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
      "[p] (pause:short); [m] children/* (ctxtFunc:CTFnodeCounter,context:\"조건문-:\",sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
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
      "[p] (pause:short); [m] children/* (sepFunc:CTFpauseSeparator,separator:\"long\", pause:long)",
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
    [ // 보류 (of)
      "Rule",
      "bigop",
      "default",
      "[n] children/*[1] (grammar:addArticle); [n] children/*[2] (pause:short)",
      "self::bigop"
    ],
    [
      "Rule",
      "limboth",
      "default",
      "[n] children/*[1]; [n] children/*[2]; [t] \"에서\"; [n] children/*[3]; [t] \"까지\";",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower",
      "default",
      "[n] children/*[2]; [t] \"에 대한\"; [n] children/*[1]; [p] (pause:short)",
      "self::limlower"
    ],
    [ // 보류 (under 개념)
      "Rule",
      "limupper",
      "default",
      "[n] children/*[2]; [t] \"에 대한\"; [n] children/*[1]; [p] (pause:short)",
      "self::limupper"
    ],
    [ // 보류 (of)
      "Rule",
      "integral",
      "default",
      "[n] children/*[1] (grammar:addArticle); [p] (pause:short); [n] children/*[2] (pause:short)",
      "self::integral"
    ],
    [ //보류 (overscript 개념)
      "Rule",
      "overscript",
      "default",
      "[n] children/*[1]; [n] children/*[2]; [t] \"까지\"; [p] (pause:short)",
      "self::overscore"
    ],
    [ //보류 (overscript 개념)
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
      "[n] children/*[1]; [n] children/*[2]; [t] \"까지\"; ",
      "self::overscore",
      "children/*[2][@role!=\"overaccent\"]",
      "name(children/*[1])=\"underscore\"",
      "children/*[1]/children/*[2][@role!=\"underaccent\"]"
    ],
    [//보류 (underscript 개념)
      "Rule",
      "underscript",
      "default",
      "[t] \"조건\"; [n] children/*[2]; [t] \"에 대한\"; [n] children/*[1]; [p] (pause:short)",
      "self::underscore"
    ],
    [//보류 (underscript 개념)
      "Rule",
      "underscript-limits",
      "default",
      "[n] children/*[1]; [n] children/*[2]; [t] \"에서\";",
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
    [ // 보류 (와 과)
      "Rule",
      "mixed-number",
      "default",
      "[n] children/*[1]; [t] \"와(과)\"; [n] children/*[2]; ",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "number-with-chars",
      "default",
      "[t] \"수\"; [m] CQFspaceoutNumber (grammar:protected)",
      "self::number",
      "@role=\"othernumber\"",
      "\"\" != translate(text(), \"0123456789.,\", \"\")",
      "not(contains(@grammar, \"protected\"))"
    ],
    [
      "Rule",
      "decimal-period",
      "default",
      "[t] \"순환소수\"; [n] children/*[1] (grammar:spaceout); [t] \"점 순환마디\";  [n] children/*[3]/children/*[1] (grammar:spaceout)",
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
      "[t] \"순환소수\"; [n] children/*[1] (grammar:spaceout); [t] \"순환마디\";  [n] children/*[2]/children/*[1] (grammar:spaceout);",
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
      "[t] \"순환소수\"; [n] children/*[1] (grammar:spaceout); [t] \"점 순환마디\";  [n] children/*[3]/children/*[1] (grammar:spaceout)",
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
      "[t] \"순환소수\"; [n] children/*[1] (grammar:spaceout); [t] \"순환마디\";  [n] children/*[2]/children/*[1] (grammar:spaceout);",
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
      "[t] \"점\"",
      "self::punctuation",
      "@role=\"fullstop\"",
      "contains(@grammar,\"number\")"
    ],
    [
      "Rule",
      "line-segment",
      "default",
      "[t] \"선분\"; [n] children/*[1]/children/*[1]; [n] children/*[1]/children/*[2] (pause:short)",
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
      "[t] \"켤레복소수\"; [n] children/*[1]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"¯\" or text()=\"￣\" or text()=\"＿\" or text()=\"_\" or text()=\"‾\"]"
    ],
    [ // 보류 (순서)
      "Rule",
      "defined-by",
      "default",
      "[t] \"의 정의는\" (pause:short) [n] children/*[2]",
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
      "[n] children/*[2]; [t] \"기호가 위에 있는\"; [n] children/*[1];",
      "self::overscore",
      "@embellished",
      "name(children/*[1])=\"operator\" or name(children/*[1])=\"relation\""
    ],
    [
      "Rule",
      "factorial",
      "default",
      "[t] \"팩토리얼\"",
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
      "[t] \"왼쪽 위 첨자\"; [n] text()",
      "self::*[@role=\"leftsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"왼쪽 위 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"왼쪽 아래 첨자\"; [n] text()",
      "self::*[@role=\"leftsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"왼쪽 아래 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsub\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"오른쪽 위 첨자\"; [n] text()",
      "self::*[@role=\"rightsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"오른쪽 위 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"rightsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"오른쪽 아래 첨자\"; [n] text()",
      "self::*[@role=\"rightsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"오른쪽 아래 첨자\"; [m] children/*",
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
      "[t] \"조합\"; [n] children/*[2] (grammar:combinatorics); [t] \"씨\"; [n] children/*[4] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"C\"]"
    ],
    [
      "Rule",
      "permute",
      "CombinationPermutation_ChoosePermute",
      "[t] \"순열\"; [n] children/*[2] (grammar:combinatorics); [t] \"피\"; [n] children/*[4] (grammar:combinatorics)",
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
      "[t] \"제곱\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=2]",
      "name(children/*[1])=\"identifier\"",
      "CQFisLengthUnit"
    ],
    [
      "Rule",
      "unit-cubic",
      "default",
      "[t] \"세제곱\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=3]",
      "name(children/*[1])=\"identifier\"",
      "CQFisLengthUnit"
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"역수\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "count(preceding-sibling::*)=0 or preceding-sibling::*[@role!=\"unit\"]"
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"퍼\"; [n] children/*[1] (grammar:singularUnit)",
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
      "[n] children/*[1]; [t] \"퍼\"; [n] children/*[2] (grammar:singularUnit)",
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
    ],
    [ //보류 (순서)
      "Rule",
      "enclose",
      "default",
      "[t] \"enclosed with\"; [t] @role (grammar:localEnclose); [n] children/*[1]",
      "self::enclose"
    ],
    [ //보류 (순서)
      "Rule",
      "enclose-end",
      "Enclosed_EndEnclose",
      "[t] \"enclosed with\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"end enclosed\"",
      "self::enclose"
    ],
    [
      "Aliases",
      "overscript",
      "self::enclose",
      "@role=\"top\""
    ],
    [
      "Aliases",
      "underscript",
      "self::enclose",
      "@role=\"bottom\""
    ],
    [
      "Rule",
      "leftbar",
      "default",
      "[t] \"세로선\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"세로선\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
      "[t] \"소거   ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"왼쪽 위 첨자\"; [n] text()",
      "self::*[@role=\"leftsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"왼쪽 위 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"왼쪽 아래 첨자\"; [n] text()",
      "self::*[@role=\"leftsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"왼쪽 아래 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsub\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"오른쪽 위 첨자\"; [n] text()",
      "self::*[@role=\"rightsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"오른쪽 위 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"rightsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"오른쪽 아래 첨자\"; [n] text()",
      "self::*[@role=\"rightsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"오른쪽 아래 첨자\"; [m] children/*",
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
      "[t] \"조합\"; [n] children/*[2] (grammar:combinatorics); [t] \"씨\"; [n] children/*[4] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"C\"]"
    ],
    [
      "Rule",
      "permute",
      "CombinationPermutation_ChoosePermute",
      "[t] \"순열\"; [n] children/*[2] (grammar:combinatorics); [t] \"피\"; [n] children/*[4] (grammar:combinatorics)",
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
      "[t] \"제곱\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=2]",
      "name(children/*[1])=\"identifier\"",
      "CQFisLengthUnit"
    ],
    [
      "Rule",
      "unit-cubic",
      "default",
      "[t] \"세제곱\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=3]",
      "name(children/*[1])=\"identifier\"",
      "CQFisLengthUnit"
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"역수\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "count(preceding-sibling::*)=0 or preceding-sibling::*[@role!=\"unit\"]"
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"퍼\"; [n] children/*[1] (grammar:singularUnit)",
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
      "[n] children/*[1]; [t] \"퍼\"; [n] children/*[2] (grammar:singularUnit)",
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
    ],
    [ //보류 (순서)
      "Rule",
      "enclose",
      "default",
      "[t] \"enclosed with\"; [t] @role (grammar:localEnclose); [n] children/*[1]",
      "self::enclose"
    ],
    [ //보류 (순서)
      "Rule",
      "enclose-end",
      "Enclosed_EndEnclose",
      "[t] \"enclosed with\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"end enclosed\"",
      "self::enclose"
    ],
    [
      "Aliases",
      "overscript",
      "self::enclose",
      "@role=\"top\""
    ],
    [
      "Aliases",
      "underscript",
      "self::enclose",
      "@role=\"bottom\""
    ],
    [
      "Rule",
      "leftbar",
      "default",
      "[t] \"세로선\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"세로선\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
   ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"왼쪽 위 첨자\"; [n] text()",
      "self::*[@role=\"leftsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-super",
      "default",
      "[t] \"왼쪽 위 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"왼쪽 아래 첨자\"; [n] text()",
      "self::*[@role=\"leftsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "left-sub",
      "default",
      "[t] \"왼쪽 아래 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"leftsub\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"오른쪽 위 첨자\"; [n] text()",
      "self::*[@role=\"rightsuper\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-super",
      "default",
      "[t] \"오른쪽 위 첨자\"; [m] children/*",
      "self::punctuated",
      "@role=\"rightsuper\"",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"오른쪽 아래 첨자\"; [n] text()",
      "self::*[@role=\"rightsub\"]",
      "not(contains(@grammar,\"combinatorics\"))"
    ],
    [
      "Rule",
      "right-sub",
      "default",
      "[t] \"오른쪽 아래 첨자\"; [m] children/*",
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
      "[t] \"조합\"; [n] children/*[2] (grammar:combinatorics); [t] \"씨\"; [n] children/*[4] (grammar:combinatorics)",
      "self::tensor",
      "name(children/*[3])=\"empty\"",
      "name(children/*[5])=\"empty\"",
      "children/*[1][text()=\"C\"]"
    ],
    [
      "Rule",
      "permute",
      "CombinationPermutation_ChoosePermute",
      "[t] \"순열\"; [n] children/*[2] (grammar:combinatorics); [t] \"피\"; [n] children/*[4] (grammar:combinatorics)",
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
      "[t] \"제곱\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=2]",
      "name(children/*[1])=\"identifier\"",
      "CQFisLengthUnit"
    ],
    [
      "Rule",
      "unit-cubic",
      "default",
      "[t] \"세제곱\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "children/*[2][text()=3]",
      "name(children/*[1])=\"identifier\"",
      "CQFisLengthUnit"
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"역수\"; [n] children/*[1]",
      "self::superscript[@role=\"unit\"]",
      "name(children/*[1])=\"identifier\"",
      "name(children/*[2])=\"prefixop\"",
      "children/*[2][@role=\"negative\"]",
      "children/*[2]/children/*[1][text()=1]",
      "count(preceding-sibling::*)=0 or preceding-sibling::*[@role!=\"unit\"]"
    ],
    [
      "Rule",
      "unit-reciprocal",
      "default",
      "[t] \"퍼\"; [n] children/*[1] (grammar:singularUnit)",
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
      "[n] children/*[1]; [t] \"퍼\"; [n] children/*[2] (grammar:singularUnit)",
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
    ],
    [ //보류 (순서)
      "Rule",
      "enclose",
      "default",
      "[t] \"enclosed with\"; [t] @role (grammar:localEnclose); [n] children/*[1]",
      "self::enclose"
    ],
    [ //보류 (순서)
      "Rule",
      "enclose-end",
      "Enclosed_EndEnclose",
      "[t] \"enclosed with\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"end enclosed\"",
      "self::enclose"
    ],
    [
      "Aliases",
      "overscript",
      "self::enclose",
      "@role=\"top\""
    ],
    [
      "Aliases",
      "underscript",
      "self::enclose",
      "@role=\"bottom\""
    ],
    [
      "Rule",
      "leftbar",
      "default",
      "[t] \"세로선\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"세로선\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
      "[t] \"소거된\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "crossout-end",
      "Enclosed_EndEnclose",
      "[t] \"소거 시작\"; [n] children/*[1]; [t] \"소거 끝\"",
      "self::enclose",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Rule",
      "cancel",
      "default",
      "[n] children/*[1]/children/*[1]; [t] \"소거된\"; [n] children/*[2]",
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
      "Aliases",
      "cancel",
      "self::overscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [
      "Aliases",
      "cancel",
      "self::underscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [ //보류
      "Rule",
      "cancel-end",
      "Enclosed_EndEnclose",
      "[t] \"crossed out\"; [n] children/*[1]/children/*[1]; [t] \"with\"; [n] children/*[2]; [t] \"end crossout\"",
      "self::overscore",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Aliases",
      "cancel-end",
      "self::underscore",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [
      "Aliases",
      "cancel-end",
      "self::overscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ],
    [
      "Aliases",
      "cancel-end",
      "self::underscore",
      "name(children/*[2])=\"enclose\"",
      "children/*[2][@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\"]"
    ]
  ],
  "annotators": [
    "simple",
    "unit"
  ]
}
