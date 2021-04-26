{
  "locale": "hi",
  "modality": "summary",
  "rules": [
    [
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"दीर्घ तत्समक\"",
      "self::identifier",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"तत्समक\"",
      "self::identifier"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"दीर्घ संख्या\"",
      "self::number",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"संख्या\"",
      "self::number"
    ],
    [
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"दीर्घ मिश्र संख्या\"",
      "self::number",
      "@role=\"mixed\"",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"मिश्र संख्या\"",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "abstr-text",
      "default.default",
      "[t] \"पाठ\"",
      "self::text"
    ],
    [
      "Rule",
      "abstr-function",
      "default.default",
      "[t] \"फलन व्यंजक\"",
      "self::function"
    ],
    [
      "Rule",
      "abstr-function",
      "mathspeak.brief",
      "[t] \"फलन\"",
      "self::function"
    ],
    [
      "SpecializedRule",
      "abstr-function",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-lim",
      "default.default",
      "[t] \"फलन सीमा\"",
      "self::function",
      "@role=\"limit function\""
    ],
    [
      "Rule",
      "abstr-lim",
      "mathspeak.brief",
      "[t] \"सीमा\"",
      "self::function",
      "@role=\"limit function\""
    ],
    [
      "SpecializedRule",
      "abstr-lim",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-fraction",
      "default.default",
      "[t] \"भिन्न\"",
      "self::fraction"
    ],
    [
      "Rule",
      "abstr-fraction",
      "mathspeak.brief",
      "[t] \"अपूर्णांश\"",
      "self::fraction"
    ],
    [
      "SpecializedRule",
      "abstr-fraction",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-continued-fraction",
      "default.default",
      "[t] \"सतत भिन्न\"",
      "self::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-continued-fraction",
      "mathspeak.brief",
      "[t] \"सतत अपूर्णांश\"",
      "self::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\"]"
    ],
    [
      "SpecializedRule",
      "abstr-continued-fraction",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-sqrt",
      "default.default",
      "[t] \"वर्ग मूल\"",
      "self::sqrt"
    ],
    [
      "Rule",
      "abstr-sqrt-nested",
      "default.default",
      "[t] \"नीड़ित वर्ग मूल\"",
      "self::sqrt",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[t] \"वां मूल\"; [n] children/*[1] (engine:modality=\"speech\"); [t] \"मूलांक समाप्त\"",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[t] \"वां मूल\"; [n] children/*[1] (engine:modality=\"speech\")",
      "self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "mathspeak.brief",
      "[t] \"मूल\"",
      "self::root"
    ],
    [
      "SpecializedRule",
      "abstr-root",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "default.default",
      "[t] \"नीड़ित मूल्यांक\"; [n] children/*[1] (engine:modality=\"speech\"); [t] \"मूलांक समाप्त\"",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "default.default",
      "[t] \"नीड़ित मूल्यांक\"; [n] children/*[1] (engine:modality=\"speech\")",
      "self::root",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "mathspeak.brief",
      "[t] \"नीड़ित मूल\"",
      "self::root",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "SpecializedRule",
      "abstr-root-nested",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-superscript",
      "default.default",
      "[t] \"घातांक\"",
      "self::superscript"
    ],
    [
      "Rule",
      "abstr-subscript",
      "default.default",
      "[t] \"पादांक (when a number)\"",
      "self::subscript"
    ],
    [
      "Rule",
      "abstr-subsup",
      "default.default",
      "[t] \"पादांक वाला घातांक\"",
      "self::superscript",
      "name(children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"के साथ\"; [t] count(./children/*); [t] \"अवयव\"",
      "self::infixop"
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"चल तादात के अवयवों के साथ\"",
      "self::infixop",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-infixop",
      "mathspeak.brief",
      "[t] @role (grammar:localRole)",
      "self::infixop"
    ],
    [
      "SpecializedRule",
      "abstr-infixop",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-addition",
      "default.default",
      "[t] \"के साथ योग\"; [t] count(./children/*); [t] \"पद\"",
      "self::infixop",
      "@role=\"addition\""
    ],
    [
      "Rule",
      "abstr-addition",
      "mathspeak.brief",
      "[t] \"योग\"",
      "self::infixop",
      "@role=\"addition\""
    ],
    [
      "SpecializedRule",
      "abstr-addition",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-addition",
      "default.default",
      "[t] \"चल तादात के पदों का योग\"",
      "self::infixop",
      "@role=\"addition\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-multiplication",
      "default.default",
      "[t] \"के साथ गुणनफल\"; [t] count(./children/*); [t] \"गुणनखंड\"",
      "self::infixop",
      "@role=\"multiplication\""
    ],
    [
      "Rule",
      "abstr-multiplication",
      "mathspeak.brief",
      "[t] \"गुणनफल\"",
      "self::infixop",
      "@role=\"multiplication\""
    ],
    [
      "SpecializedRule",
      "abstr-multiplication",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Aliases",
      "abstr-multiplication",
      "self::infixop",
      "@role=\"implicit\""
    ],
    [
      "Rule",
      "abstr-var-multiplication",
      "default.default",
      "[t] \"चल तादात के गुणनखंडो का गुणनफल\"",
      "self::infixop",
      "@role=\"multiplication\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Aliases",
      "abstr-var-multiplication",
      "self::infixop",
      "@role=\"implicit\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-vector",
      "default.default",
      "[t] count(./children/*); [t] \"विमीय सदिश\"",
      "self::vector"
    ],
    [
      "Rule",
      "abstr-vector",
      "mathspeak.brief",
      "[t] \"सदिश\"",
      "self::vector"
    ],
    [
      "SpecializedRule",
      "abstr-vector",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-vector",
      "default.default",
      "[t] \"एन विमीय सदिश\"",
      "self::vector",
      "./children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-binomial",
      "default.default",
      "[t] \"द्विपद\"",
      "self::vector",
      "@role=\"binomial\""
    ],
    [
      "SpecializedRule",
      "abstr-binomial",
      "default.default",
      "mathspeak.brief"
    ],
    [
      "SpecializedRule",
      "abstr-binomial",
      "default.default",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-determinant",
      "default.default",
      "[t] count(./children/*); [t] \"विमीय सारणिक\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "Rule",
      "abstr-determinant",
      "mathspeak.brief",
      "[t] \"सारणिक\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "SpecializedRule",
      "abstr-determinant",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-determinant",
      "default.default",
      "[t] \"एन विमीय सारणिक\"",
      "self::matrix",
      "@role=\"determinant\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "default.default",
      "[t] count(./children/*); [t] \"विमीय वर्ग आव्यूह\"",
      "self::matrix",
      "@role=\"squarematrix\""
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "mathspeak.brief",
      "[t] \"वर्ग आव्यूह\"",
      "self::matrix",
      "@role=\"squarematrix\""
    ],
    [
      "SpecializedRule",
      "abstr-squarematrix",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-rowvector",
      "default.default",
      "[t] count(./children/row/children/*); [t] \"विमीय पंक्ति सदिश\"",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "Rule",
      "abstr-rowvector",
      "mathspeak.brief",
      "[t] \"पंक्ति सदिश\"",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "SpecializedRule",
      "abstr-rowvector",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-matrix",
      "default.default",
      "[t] \"एन विमीय पंक्ति सदिश\"",
      "self::matrix",
      "@role=\"rowvector\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-matrix",
      "default.default",
      "[t] count(children/*); [t] \"गुणा\"; [t] count(children/*[1]/children/*); [t] \"आव्यूह\"",
      "self::matrix"
    ],
    [
      "Rule",
      "abstr-matrix",
      "mathspeak.brief",
      "[t] \"आव्यूह\"",
      "self::matrix"
    ],
    [
      "SpecializedRule",
      "abstr-matrix",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-matrix",
      "default.default",
      "[t] \"एन गुणा एम आव्यूह\"",
      "self::matrix",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-cases",
      "default.default",
      "[t] \"फलन उपशर्त कथन\"; [t] \"के साथ\"; [t] count(children/*); [t] \"फलन उपशर्त\"",
      "self::cases"
    ],
    [
      "Rule",
      "abstr-cases",
      "mathspeak.brief",
      "[t] \"फलन उपशर्त कथन\"",
      "self::cases"
    ],
    [
      "SpecializedRule",
      "abstr-cases",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-cases",
      "default.default",
      "[t] \"चल तादात की फलन उपशर्तों वाला फलन उपशर्त कथन\"",
      "self::cases",
      "./children/row/children/cell/children/punctuation[@role=\"ellipsis\"]or ./children/line/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "default.default",
      "[n] content/*[1]; [t] \"विभाजित सूचि\"; [t] \"लम्बाई का\"; [t] count(children/*) - count(content/*)",
      "self::punctuated"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "mathspeak.brief",
      "[n] content/*[1]; [t] \"विभाजित सूचि\"",
      "self::punctuated"
    ],
    [
      "SpecializedRule",
      "abstr-punctuated",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-punctuated",
      "default.default",
      "[n] content/*[1]; [t] \"विभाजित सूचि\"; [t] \"चल लम्बाई का\"",
      "self::punctuated",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-bigop",
      "default.default",
      "[n] content/*[1]",
      "self::bigop"
    ],
    [
      "Rule",
      "abstr-integral",
      "default.default",
      "[t] \"समाकल\"",
      "self::*",
      "@role=\"integral\""
    ],
    [
      "Rule",
      "abstr-relation",
      "default.default",
      "[t] @role (grammar:localRole)",
      "self::relseq",
      "count(./children/*)=2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"अनुक्रम\"; [t] \"के साथ\"; [t] count(./children/*); [t] \"अवयव\"",
      "self::relseq",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "mathspeak.brief",
      "[t] @role (grammar:localRole); [t] \"अनुक्रम\"",
      "self::relseq",
      "count(./children/*)>2"
    ],
    [
      "SpecializedRule",
      "abstr-relation-seq",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-relation",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"अनुक्रम\"; [t] \"चल तादात के अवयवों के साथ\"",
      "self::relseq",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "UniqueAlias",
      "abstr-relation",
      "default.default",
      "self::multirel",
      "@role!=\"unknown\"",
      "count(./children/*)>2"
    ],
    [
      "Aliases",
      "abstr-var-relation",
      "self::multirel",
      "@role!=\"unknown\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-multirel",
      "default.default",
      "[t] \"संबंधानुक्रम\"; [t] \"के साथ\"; [t] count(./children/*); [t] \"अवयव\"",
      "self::multirel",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-multirel",
      "mathspeak.brief",
      "[t] \"संबंधानुक्रम\"",
      "self::multirel",
      "count(./children/*)>2"
    ],
    [
      "SpecializedRule",
      "abstr-multirel",
      "mathspeak.brief",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "abstr-var-multirel",
      "default.default",
      "[t] \"चल तादात के अवयवों का संबंधानुक्रम\"",
      "self::multirel",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-table",
      "default.default",
      "[t] \"के साथ सारणी\"; [t] count(children/*); [t] \"पक्तियां और\"; [t] count(children/*[1]/children/*); [t] \"स्तंभ\"",
      "self::table"
    ],
    [
      "Rule",
      "abstr-line",
      "default.default",
      "[t] \"में\"; [t] @role (grammar:localRole)",
      "self::line"
    ],
    [
      "Rule",
      "abstr-row",
      "default.default",
      "[t] \"में\"; [t] @role (grammar:localRole); [t] count(preceding-sibling::..); [t] \"के साथ\"; [t] count(children/*); [t] \"स्तंभ\"",
      "self::row"
    ],
    [
      "Rule",
      "abstr-cell",
      "default.default",
      "[t] \"में\"; [t] @role (grammar:localRole)",
      "self::cell"
    ]
  ]
}
