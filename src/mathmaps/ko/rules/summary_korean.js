{
  "locale": "ko",
  "modality": "summary",
  "rules": [
    [//보류
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"긴 변수\"",
      "self::identifier",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"변수\"",
      "self::identifier"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"긴 수\"",
      "self::number",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"수\"",
      "self::number"
    ],
    [//보류(long)
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"긴 대분수\"",
      "self::number",
      "@role=\"mixed\"",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"대분수\"",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "abstr-text",
      "default.default",
      "[t] \"문자\"",
      "self::text"
    ],
    [
      "Rule",
      "abstr-function",
      "default.default",
      "[t] \"함수\"",
      "self::function"
    ],
    [
      "Rule",
      "abstr-function",
      "mathspeak.brief",
      "[t] \"함수\"",
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
      "[t] \"리미트\"",
      "self::function",
      "@role=\"limit function\""
    ],
    [
      "Rule",
      "abstr-lim",
      "mathspeak.brief",
      "[t] \"리미트\"",
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
      "[t] \"분수\"",
      "self::fraction"
    ],
    [
      "Rule",
      "abstr-fraction",
      "mathspeak.brief",
      "[t] \"분수\"",
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
      "[t] \"연분수\"",
      "self::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-continued-fraction",
      "mathspeak.brief",
      "[t] \"연분수\"",
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
      "[t] \"루트\"",
      "self::sqrt"
    ],
    [//보류(nested square root)
      "Rule",
      "abstr-sqrt-nested",
      "default.default",
      "[t] \"중첩 루트\"",
      "self::sqrt",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[t] \"루트의 제곱근 시작\"; [n] children/*[1] (engine:modality=\"speech\"); [t] \"제곱근 끝\"",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[n] children/*[1] (engine:modality=\"speech\"); [t] \"제곱근\"",
      "self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "mathspeak.brief",
      "[t] \"루트\"",
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
      "[t] \"중첩 루트의 제곱근 시작\"; [n] children/*[1] (engine:modality=\"speech\"); [t] \"제곱근 끝\"",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "default.default",
      "[t] \"중첩 루트의\"; [n] children/*[1] (engine:modality=\"speech\"); [t] \"제곱근\"",
      "self::root",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "mathspeak.brief",
      "[t] \"중첩 루트\"",
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
      "[t] \"제곱\"",
      "self::superscript"
    ],
    [
      "Rule",
      "abstr-subscript",
      "default.default",
      "[t] \"아래 첨자\"",
      "self::subscript"
    ],
    [
      "Rule",
      "abstr-subsup",
      "default.default",
      "[t] \"제곱과 아래 첨자\"",
      "self::superscript",
      "name(children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] count(./children/*); [t] \"개의 원소로 이루어진\"; [t] @role (grammar:localRole); ",
      "self::infixop"
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] \"여러 개의 원소로 이루어진\"; [t] @role (grammar:localRole);",
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
      "[t] count(./children/*); [t] \"피가수의 합\"",
      "self::infixop",
      "@role=\"addition\""
    ],
    [
      "Rule",
      "abstr-addition",
      "mathspeak.brief",
      "[t] \"합\"",
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
      "[t] \"여러 개의 피가수의 합\"",
      "self::infixop",
      "@role=\"addition\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-multiplication",
      "default.default",
      "[t] count(./children/*); [t] \"개의 피연산자의 곱\"",
      "self::infixop",
      "@role=\"multiplication\""
    ],
    [
      "Rule",
      "abstr-multiplication",
      "mathspeak.brief",
      "[t] \"곱\"",
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
      "[t] \"여러 개의 피연산자의 곱\"",
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
      "[t] count(./children/*) ; [t] \"차원 벡터\"",
      "self::vector"
    ],
    [
      "Rule",
      "abstr-vector",
      "mathspeak.brief",
      "[t] \"벡터\"",
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
      "[t] \"n 차원 벡터\"",
      "self::vector",
      "./children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-binomial",
      "default.default",
      "[t] \"이항식\"",
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
      "[t] count(./children/*); [t] \"차원 행렬식\"",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "Rule",
      "abstr-determinant",
      "mathspeak.brief",
      "[t] \"행렬식\"",
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
      "[t] \"n 차원 행렬식\"",
      "self::matrix",
      "@role=\"determinant\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "default.default",
      "[t] count(./children/*); [t] \"차원 정사각행렬\"",
      "self::matrix",
      "@role=\"squarematrix\""
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "mathspeak.brief",
      "[t] \"정사각행렬\"",
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
      "[t] count(./children/row/children/*); [t] \"차원 행 벡터\"",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "Rule",
      "abstr-rowvector",
      "mathspeak.brief",
      "[t] \"행 벡터\"",
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
      "[t] \"n 차원 행 벡터\"",
      "self::matrix",
      "@role=\"rowvector\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-matrix",
      "default.default",
      "[t] count(children/*);  [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열의 행렬\"",
      "self::matrix"
    ],
    [
      "Rule",
      "abstr-matrix",
      "mathspeak.brief",
      "[t] \"행렬\"",
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
      "[t] \"n 행 m 열의 행렬\"",
      "self::matrix",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-cases",
      "default.default",
      "[t] \"총 케이스 수\"; [t] count(children/*); [t] \"으로 이루어진 조건문\"",
      "self::cases"
    ],
    [
      "Rule",
      "abstr-cases",
      "mathspeak.brief",
      "[t] \"조건문\"",
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
      "[t] \"여러 개의 케이스로 이루어진 조건문\"",
      "self::cases",
      "./children/row/children/cell/children/punctuation[@role=\"ellipsis\"]or ./children/line/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "default.default",
      "[n] content/*[1]; [t] \"로 나누어진\"; [t] \"총 요소의 갯수가\"; [t] count(children/*) - count(content/*); [t] \"인 리스트\";",
      "self::punctuated"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "mathspeak.brief",
      "[n] content/*[1]; [t] \"로 나누어진 리스트\"",
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
      "[t] \"여러 개의 요소가\"; [n] content/*[1]; [t] \"로 나누어진 리스트\"",
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
      "[t] \"적분\"",
      "self::*",
      "@role=\"integral\""
    ],
    [
      "Rule",
      "abstr-relation",
      "default.default",
      "[t] @role (grammar:localRole);",
      "self::relseq",
      "count(./children/*)=2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "default.default",
      "[t] count(./children/*)-1; [t] \"개의 연속된\"; [t] @role (grammar:localRole);",
      "self::relseq",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "mathspeak.brief",
      "[t] \"연속된\"; [t] @role (grammar:localRole);",
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
      "[t] \"여러 개의 연속된\"; [t] @role (grammar:localRole);",
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
      "[t] count(./children/*)-1; [t] \"의 연속된 관계식\"",
      "self::multirel",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-multirel",
      "mathspeak.brief",
      "[t] \"연속된 관계식\"",
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
      "[t] \"여러 개의 연속된 관계식식\"",
      "self::multirel",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-table",
      "default.default",
      "[t] count(children/*); [t] \"행\";[t] count(children/*[1]/children/*); [t] \"열로 이루어진 표\"",
      "self::table"
    ],
    [//보류 (순서)
      "Rule",
      "abstr-line",
      "default.default",
      "",
      "self::line"
    ],
    [//보류 (순서)
      "Rule",
      "abstr-row",
      "default.default",
      "",
      "self::row"
    ],
    [//보류 (순서)
      "Rule",
      "abstr-cell",
      "default.default",
      "",
      "self::cell"
    ]
  ]
}
