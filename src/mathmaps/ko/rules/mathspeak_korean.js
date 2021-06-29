{
  "domain": "mathspeak",
  "locale": "ko",
  "modality": "speech",
  "rules": [
    [
      "Rule",
      "collapsed",
      "default",
      "[t] \"여닫기\"; [n] . (engine:modality=summary,grammar:collapsed)",
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
      "[n] text() (grammar:ignoreCaps=\"대문자\")",
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
      "\"\"=translate(text(), \"abcdefghijklmnopqrstuvwxyz慣棺款灌琯瓘管罐菅觀貫關館刮恝???곋궾꺩꾇끥녟눹댬덦BCDEFGHIJKLMNOPQRSTUVWXYZ?뫮믊벿붞빺뽏쀎샩쇡싋쎧쑳앂왥읦졢♂ＮＮㅞΞ┧㎺ⓑ?\", \"\")",
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
    [//보류
      "Rule",
      "german-font",
      "default",
      "[t] \"프락투어\"; [n] . (grammar:ignoreFont=@font)",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"fraktur\""
    ],
    [
      "Rule",
      "german-font",
      "default",
      "[t] \"진한 프락투어\"; [n] . (grammar:ignoreFont=@font)",
      "self::*",
      "@font",
      "not(contains(@grammar, \"ignoreFont\"))",
      "@font=\"bold-fraktur\""
    ],
    [
      "Rule",
      "number",
      "default",
      "[n] text()",
      "self::number"
    ],
    [//보류(문법)
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
      "self::number[@role=\"othernumber\"]",
      "\"\" != translate(text(), \"0123456789.,\", \"\")",
      "not(contains(@grammar, \"protected\"))"
    ],
    [
      "SpecializedRule",
      "number-with-chars",
      "default",
      "brief",
      "[t] \"수\"; [m] CQFspaceoutNumber (grammar:protected)"
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
      "[t] \"대문자 묶음\"; [t] CSFspaceoutText",
      "self::number[@role=\"othernumber\"]",
      "string-length(text())>1",
      "text()=translate(text(), \"abcdefghijklmnopqrstuvwxyz慣棺款灌琯瓘管罐菅觀貫關館刮恝???곋궾꺩꾇끥녟눹댬?\", \"ABCDEFGHIJKLMNOPQRSTUVWXYZ?뫮믊벿붞빺뽏쀎샩쇡싋쎧쑳앂왥읦졢♂ＮＮㅞΞ┧㎺ⓑ?\")",
      "\"\"=translate(text(), \"ABCDEFGHIJKLMNOPQRSTUVWXYZ?뫮믊벿붞빺뽏쀎샩쇡싋쎧쑳앂왥읦졢♂ＮＮㅞΞ┧㎺ⓑ?\",\"\")"
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
    [//보류 해석
      "Rule",
      "number-baseline",
      "default",
      "[t] \"Baseline\"; [n] . (grammar:baseline)",
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
      "[t] \"Base\"; [n] . (grammar:baseline)"
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
      "[t] \"Baseline\"; [t] @font; [n] . (grammar:ignoreFont=@font)",
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
      "[t] \"Base\"; [t] @font; [n] . (grammar:ignoreFont=@font)"
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
      "text()!=translate(text(), \"abcdefghijklmnopqrstuvwxyz慣棺款灌琯瓘管罐菅觀貫關館刮恝???곋궾꺩꾇끥녟눹댬덦BCDEFGHIJKLMNOPQRSTUVWXYZ?뫮믊벿붞빺뽏쀎샩쇡싋쎧쑳앂왥읦졢♂ＮＮㅞΞ┧㎺ⓑ?\", \"\")"
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
      "[t] \"마이너스\"; [n] children/*[1]",
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
    [ //보류 확인필요 (neg)
      "Rule",
      "negative",
      "default",
      "[t] \"빼기\"; [n] children/*[1]",
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
      "[n] children/*[1]; [t] \"나누기\"; [n] children/*[2]",
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
      "[m] children/* (separator:\"빼기\");",
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
      "[t] \"절댓값시작\"; [n] children/*[1]; [t] \"절댓값끝\"",
      "self::fenced",
      "@role=\"neutral\"",
      "content/*[1][text()]=\"|\" or content/*[1][text()]=\"?쓽\" or content/*[1][text()]=\"節?\" or content/*[1][text()]=\"?닧\""
    ],
    [
      "SpecializedRule",
      "fences-neutral",
      "default",
      "sbrief",
      "[t] \"절댓값\"; [n] children/*[1]; [t] \"절댓값끝\""
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
      "[t] \"공집합\"",
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
      "[t] \"집합시작\"; [n] children/*[1]; [t] \"집합끝\"",
      "self::fenced",
      "contains(@role,\"set \")",
      "not(name(../..)=\"appl\")"
    ],
    [
      "SpecializedRule",
      "fences-set",
      "default",
      "sbrief",
      "[t] \"집합\"; [n] children/*[1]; [t] \"집합끝\""
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
      "[t] \"팩토리얼\"",
      "self::punctuation",
      "text()=\"!\"",
      "name(preceding-sibling::*[1])!=\"text\""
    ],
    [
      "Rule",
      "minus",
      "default",
      "[t] \"빼기\"",
      "self::operator",
      "text()=\"-\""
    ],
    [ //보류 locale, mathspeak_util이랑 함께 수정 해야함, 
      "Rule",
      "fraction",
      "default",
      "[t] CSFopenFracVerbose; [n] children/*[2]; [t] CSFoverFracVerbose; [n] children/*[1]; [t] CSFcloseFracVerbose",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "brief",
      "[t] CSFopenFracBrief; [n] children/*[2]; [t] CSFoverFracVerbose; [n] children/*[1]; [t] CSFcloseFracBrief",
      "self::fraction"
    ],
    [
      "Rule",
      "fraction",
      "sbrief",
      "[t] CSFopenFracSbrief; [n] children/*[2]; [t] CSFoverFracSbrief; [n] children/*[1]; [t] CSFcloseFracSbrief",
      "self::fraction"
    ],
    [ //보류 서수안쓰게 수정
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
      "[t] \"연속분수\"; [n] children/*[2];[t] \"분의\"; [n] children/*[1]",
      "self::fraction",
      "not(ancestor::fraction)",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-outer",
      "default",
      "brief",
      "[t] \"연분수\"; [n] children/*[2];[t] \"분의\"; [n] children/*[1]"
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
      "[t] \"분수시작\"; [n] children/*[2];[t] \"분의\"; [n] children/*[1]",
      "self::fraction",
      "ancestor::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\" and not(following-sibling::*)]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-inner",
      "default",
      "brief",
      "[t] \"분수시작\"; [n] children/*[2];[t] \"분의\"; [n] children/*[1]"
    ],
    [
      "SpecializedRule",
      "continued-fraction-inner",
      "brief",
      "sbrief",
      "[t] \"분수\"; [n] children/*[2];[t] \"분의\"; [n] children/*[1]"
    ],
    [ //보류 locale, mathspeak_util이랑 함께 수정 해야함, 
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
    [ //보류 lim 위아래 둘다 있는 케이스
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
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];[t] CSFoverscript; [n] children/*[3]; [t] \"첨자끝\"",
      "self::limboth"
    ],
    [
      "Rule",
      "limlower-end",
      "default",
      "[n] children/*[1]; [t] CSFunderscript; [n] children/*[2]; [t] \"첨자끝\"",
      "self::limlower"
    ],
    [
      "Rule",
      "limupper-end",
      "default",
      "[n] children/*[1]; [t] CSFoverscript; [n] children/*[2]; [t] \"첨자끝\"",
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
      "[n] children/*[1]; [t] \"아래첨자\"; [n] children/*[2];[t] \"위첨자\"; [n] children/*[3]; [t] \"Baseline\";",
      "self::limboth",
      "@role=\"integral\""
    ],
    [
      "SpecializedRule",
      "integral",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"아래\"; [n] children/*[2];[t] \"위\"; [n] children/*[3]; [t] \"Base\";"
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
      "[n] children/*[1]; [t] \"제곱\"",
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
      "[n] children/*[1]; [t] \"세제곱\"",
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
      "4D",
      "default",
      "[n] children/*[1]; [t] \"네제곱\"",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=4]",
      "name(children/*[1])!=\"text\" or not(name(children/*[1])=\"text\" and (name(../../../punctuated[@role=\"text\"]/..)=\"stree\" or name(..)=\"stree\"))",
      "name(children/*[1])!=\"subscript\" or (name(children/*[1])=\"subscript\" and name(children/*[1]/children/*[1])=\"identifier\" and name(children/*[1]/children/*[2])=\"number\" and children/*[1]/children/*[2][@role!=\"mixed\"] and children/*[1]/children/*[2][@role!=\"othernumber\"])",
      "not(@embellished)"
    ],
    [
      "SpecializedRule",
      "4D",
      "default",
      "brief"
    ],
    [
      "SpecializedRule",
      "4D",
      "default",
      "sbrief"
    ],
    
    [
      "Aliases",
      "4D",
      "self::superscript",
      "children/*[2]",
      "children/*[2][text()=4]",
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
      "[t] \"더블 프라임\"",
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
      "[t] \"트리플 프라임\"",
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
      "[t] \"쿼드 프라임\"",
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
      "[t] count(children/*) (grammar:numbers2alpha); [t] \"프라임\"",
      "self::punctuated",
      "@role=\"prime\""
    ],
    [
      "Rule",
      "counted-prime",
      "default",
      "[t] string-length(text()) (grammar:numbers2alpha); [t] \"프라임\"",
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
      "[n] children/*[1]; [t] \"위에있는\"; [n] children/*[2]",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]"
    ],
    [
      "SpecializedRule",
      "overscore",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"위에\"; [n] children/*[2]"
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
      "[n] children/*[1]; [t] \"위에있는\"; [n] children/*[2]",
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
      "[n] children/*[1]; [t] \"위에\"; [n] children/*[2]"
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
      "[n] children/*[1]; [t] \"아래에있는\"; [n] children/*[2]",
      "self::underscore",
      "children/*[2][@role=\"underaccent\"]"
    ],
    [
      "SpecializedRule",
      "underscore",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"아래에\"; [n] children/*[2]"
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
      "[n] children/*[1]; [t] \"아래에있는\"; [n] children/*[2]",
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
      "[n] children/*[1]; [t] \"아래에\"; [n] children/*[2]"
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
      "[n] children/*[1]; [t] \"윗줄\"",
      "self::overscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"overaccent\"]",
      "children/*[2][text()=\"짱\" or text()=\"占?\" or text()=\"竊?\" or text()=\"_\" or text()=\"???\"]"
    ],
    [
      "SpecializedRule",
      "overbar",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"윗줄\""
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
      "[n] children/*[1]; [t] \"밑줄\"",
      "self::underscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"underaccent\"]",
      "children/*[2][text()=\"짱\" or text()=\"占?\" or text()=\"竊?\" or text()=\"_\" or text()=\"???\"]"
    ],
    [
      "SpecializedRule",
      "underbar",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"밑줄\""
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
      "[n] children/*[1]; [t] \"윗물결\"",
      "self::overscore",
      "children/*[2][@role=\"overaccent\"]",
      "contains(@role,\"letter\")",
      "children/*[2][text()=\"~\" or text()=\"??\" or text()=\"?댘\" or text()=\"節?\"]"
    ],
    [
      "SpecializedRule",
      "overtilde",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"윗물결\""
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
      "[n] children/*[1]; [t] \"밑물결\"",
      "self::underscore",
      "contains(@role,\"letter\")",
      "children/*[2][@role=\"underaccent\"]",
      "children/*[2][text()=\"~\" or text()=\"??\" or text()=\"?댘\" or text()=\"節?\"]"
    ],
    [
      "SpecializedRule",
      "undertilde",
      "default",
      "brief",
      "[n] children/*[1]; [t] \"밑물결\""
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
      "[t] count(children/*);  [t] \"곱하기\";[t] count(children/*[1]/children/*); [t] \"행렬시작\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"행렬끝\"",
      "self::matrix"
    ],
    [
      "Rule",
      "matrix",
      "sbrief",
      "[t] count(children/*);  [t] \"곱하기\";[t] count(children/*[1]/children/*); [t] \"행렬시작\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"행렬끝\"",
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
      "[m] children/* (ctxtFunc:CTFordinalCounter,context:\"열\", pause: 200)",
      "self::row"
    ],
    [
      "Rule",
      "row-with-label",
      "default",
      "[t] \"꼬리표시작\"; [n] content/*[1]; [t] \"꼬리표끝\" (pause: 200); [m] children/* (ctxtFunc:CTFordinalCounter,context:\"열\")",
      "self::row",
      "content"
    ],
    [
      "Rule",
      "row-with-label",
      "brief",
      "[t] \"꼬리표\"; [n] content/*[1]; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"열\")",
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
      "[t] \"꼬리표\"; [t] CSFRemoveParens;[m] children/* (ctxtFunc:CTFordinalCounter,context:\"열\")",
      "self::row",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-row",
      "default",
      "[t] \"빈칸\"",
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
      "[t] \"빈칸\" (pause: 300)",
      "self::cell",
      "count(children/*)=0"
    ],
    [
      "Rule",
      "determinant",
      "default",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열\";[t] \"행렬식시작\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"행렬식끝\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "SpecializedRule",
      "determinant",
      "default",
      "sbrief",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열\";[t] \"행렬식\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"행렬식끝\""
    ],
    [
      "Rule",
      "determinant-simple",
      "default",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열\";[t] \"행렬식시작\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"행\",grammar:simpleDet); [t] \"행렬식끝\"",
      "self::matrix",
      "@role=\"determinant\"",
      "CQFdetIsSimple"
    ],
    [
      "SpecializedRule",
      "determinant-simple",
      "default",
      "sbrief",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열\"; [t] \"행렬식\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"Row\",grammar:simpleDet); [t] \"행렬식끝\""
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
      "[t] \"배열시작\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"배열끝\"",
      "self::table"
    ],
    [
      "Rule",
      "layout",
      "sbrief",
      "[t] \"배열\"; [m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"배열끝\"",
      "self::table"
    ],
    [//보류
      "Rule",
      "binomial",
      "default",
      "[t] \"이항계수시작 조합\"; [n] children/*[1]/children/*[1]; [t] \"씨\"; [n] children/*[2]/children/*[1];  [t] \"이항계수끝\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "binomial",
      "sbrief",
      "[t] \"이항계수\"; [n] children/*[1]/children/*[1]; [t] \"씨\"; [n] children/*[2]/children/*[1];  [t] \"이항계수끝\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "Rule",
      "cases",
      "default",
      "[t] \"배열시작\"; [t] \"확장된\"; [n] content/*[1];[m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"배열끝\"",
      "self::cases"
    ],
    [
      "Rule",
      "cases",
      "sbrief",
      "[t] \"배열\"; [t] \"큰\"; [n] content/*[1];[m] children/* (ctxtFunc:CTFordinalCounter,context:\"행 \"); [t] \"배열끝\"",
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
      "[t] \"꼬리표시작\"; [n] content/*[1]; [t] \"꼬리표끝\" (pause: 200); [m] children/*",
      "self::line",
      "content"
    ],
    [
      "SpecializedRule",
      "line-with-label",
      "default",
      "brief",
      "[t] \"꼬리표\"; [n] content/*[1] (pause: 200); [m] children/*"
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
      "[t] \"꼬리표\"; [t] CSFRemoveParens; [m] children/*",
      "self::line",
      "content",
      "name(content/cell/children/*[1])=\"text\""
    ],
    [
      "Rule",
      "empty-line",
      "default",
      "[t] \"빈칸\"",
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
      "[t] \"꼬리표시작\"; [n] content/*[1]; [t] \"꼬리표끝\" (pause: 200); [t] \"빈칸\"",
      "self::line",
      "count(children/*)=0",
      "content"
    ],
    [
      "SpecializedRule",
      "empty-line-with-label",
      "default",
      "brief",
      "[t] \"꼬리표\"; [n] content/*[1] (pause: 200); [t] \"빈칸\""
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
      "[t] \"인클로즈시작\"; [t] @role (grammar:localEnclose); [n] children/*[1]; [t] \"인클로즈끝\"",
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
      "[t] \"수직 선\"; [n] children/*[1]",
      "self::enclose",
      "@role=\"left\""
    ],
    [
      "Rule",
      "rightbar",
      "default",
      "[n] children/*[1]; [t] \"수직 선\"",
      "self::enclose",
      "@role=\"right\""
    ],
    [
      "Rule",
      "crossout",
      "default",
      "[t] \"소거시작\"; [n] children/*[1]; [t] \"소거끝\"",
      "self::enclose",
      "@role=\"updiagonalstrike\" or @role=\"downdiagonalstrike\" or @role=\"horizontalstrike\""
    ],
    [//보류 을(를) 로/으로
      "Rule",
      "cancel",
      "default",
      "[t] \"소거\"; [n] children/*[1]/children/*[1]; [t] \"을(를)\"; [n] children/*[2]; [t] \"로(으로)\";[t] \"소거끝\"",
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
    [ //보류 언제 쓰이는지?
      "Rule",
      "cancel-reverse",
      "default",
      "[t] \"소거\"; [n] children/*[2]/children/*[1]; [t] \"을\"; [n] children/*[1]; [t] \"로 소거끝\"",
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
    [ //보류 서수 조정
      "Rule",
      "inference",
      "default",
      "[t] \"추론 규칙\"; [m] content/*; [t] \"결론은\"; [n] children/*[1]; [t] \"이고\"; [t] \"전제는\"; [t] count(children/*[2]/children/*); [t] \"개\"",
      "self::inference"
    ],
    [
      "Rule",
      "inference",
      "default",
      "[t] \"추론 규칙\"; ; [m] content/*; [t] \"결론은\"; [n] children/*[1]; [t] \"이고\"; [t] \"전제는\"; [t] count(children/*[2]/children/*); [t] \"개\"",
      "self::inference",
      "count(children/*[2]/children/*)<2"
    ],
    [
      "Rule",
      "premise",
      "default",
      "[m] children/* (ctxtFunc:CTFordinalCounter,context:\"전제 \");",
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
      "[t] \"레이블\"; [n] children/*[1]",
      "self::rulelabel"
    ],
    [
      "Rule",
      "axiom",
      "default",
      "[t] \"공리\"; [m] children/*[1];",
      "self::inference",
      "@role=\"axiom\""
    ],
    [
      "Rule",
      "axiom",
      "default",
      "[t] \"빈 공리\";",
      "self::empty",
      "@role=\"axiom\""
    ],
    [
      "Generator",
      "CGFtensorRules"
    ]
  ]
}
