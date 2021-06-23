{
  "locale": "it",
  "modality": "summary",
  "rules": [
    [
      "Rule",
      "collapsed-masculine",
      "default.default",
      "[t] \"collassato\"",
      "self::*[@grammar]",
      "contains(@grammar, \"gender:male\")",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "SpecializedRule",
      "collapsed-masculine",
      "default.default",
      "mathspeak.brief"
    ],
    [
      "SpecializedRule",
      "collapsed-masculine",
      "default.default",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "collapsed-feminine",
      "default.default",
      "[t] \"collassata\"",
      "self::*[@grammar]",
      "contains(@grammar, \"gender:female\")",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "SpecializedRule",
      "collapsed-feminine",
      "default.default",
      "mathspeak.brief"
    ],
    [
      "SpecializedRule",
      "collapsed-feminine",
      "default.default",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "no-collapsed",
      "default.default",
      "[t] \"\"",
      "self::*[@grammar]",
      "contains(@grammar, \"gender\")",
      "not(contains(@grammar, \"collapsed\"))"
    ],
    [
      "SpecializedRule",
      "no-collapsed",
      "default.default",
      "mathspeak.brief"
    ],
    [
      "SpecializedRule",
      "no-collapsed",
      "default.default",
      "mathspeak.sbrief"
    ],
    [
      "Rule",
      "stree",
      "default.default",
      "[n] ./*[1]",
      "self::stree"
    ],
    [
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"identificatore lungo\"; [n] . (grammar:gender=\"male\")",
      "self::identifier",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-identifier",
      "default.default",
      "[t] \"identificatore\"; [n] . (grammar:gender=\"male\")",
      "self::identifier"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"intero lungo\"; [n] . (grammar:gender=\"male\")",
      "self::number",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-number",
      "default.default",
      "[t] \"numero\"; [n] . (grammar:gender=\"male\")",
      "self::number"
    ],
    [
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"numero misto lungo\"; [n] . (grammar:gender=\"male\")",
      "self::number",
      "@role=\"mixed\"",
      "contains(@grammar, \"collapsed\")"
    ],
    [
      "Rule",
      "abstr-mixed-number",
      "default.default",
      "[t] \"numero misto\"; [n] . (grammar:gender=\"male\")",
      "self::number",
      "@role=\"mixed\""
    ],
    [
      "Rule",
      "abstr-text",
      "default.default",
      "[t] \"testo\"; [n] . (grammar:gender=\"male\")",
      "self::text"
    ],
    [
      "Rule",
      "abstr-function",
      "default.default",
      "[t] \"espressione funzionale\"; [n] . (grammar:gender=\"female\")",
      "self::function"
    ],
    [
      "Rule",
      "abstr-function",
      "mathspeak.brief",
      "[t] \"funzione\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"funzione limite\"; [n] . (grammar:gender=\"female\")",
      "self::function",
      "@role=\"limit function\""
    ],
    [
      "Rule",
      "abstr-lim",
      "mathspeak.brief",
      "[t] \"limite\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"frazione\"; [n] . (grammar:gender=\"female\")",
      "self::fraction"
    ],
    [
      "Rule",
      "abstr-fraction",
      "mathspeak.brief",
      "[t] \"frazione\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"frazione continua\"; [n] . (grammar:gender=\"female\")",
      "self::fraction",
      "children/*[2]/descendant-or-self::*[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-continued-fraction",
      "mathspeak.brief",
      "[t] \"frazione continua\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"radice quadrata\"; [n] . (grammar:gender=\"female\")",
      "self::sqrt"
    ],
    [
      "Rule",
      "abstr-sqrt-nested",
      "default.default",
      "[t] \"radice quadrata doppia\"; [n] . (grammar:gender=\"female\")",
      "self::sqrt",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[t] \"radice di indice\"; [n] children/*[1] (engine:modality=speech); [t] \"indice finale\"; [n] . (grammar:gender=\"female\")",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root",
      "default.default",
      "[t] \"radice di indice\"; [n] children/*[1] (engine:modality=speech); [n] . (grammar:gender=\"female\")",
      "self::root"
    ],
    [
      "Rule",
      "abstr-root",
      "mathspeak.brief",
      "[t] \"radice \"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"radicale doppio di indice\"; [n] children/*[1] (engine:modality=speech); [t] \"indice finale\"; [n] . (grammar:gender=\"male\")",
      "self::root",
      "contains(@grammar, \"collapsed\")",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root",
      "following-sibling::* or ancestor::*/following-sibling::*"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "default.default",
      "[t] \"radicale doppio di indice\";  [n] children/*[1] (engine:modality=speech); [n] . (grammar:gender=\"male\")",
      "self::root",
      "children/*/descendant-or-self::sqrt or children/*/descendant-or-self::root"
    ],
    [
      "Rule",
      "abstr-root-nested",
      "mathspeak.brief",
      "[t] \"radicale doppio\"; [n] . (grammar:gender=\"male\")",
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
      "[t] \"potenza\"; [n] . (grammar:gender=\"female\")",
      "self::superscript"
    ],
    [
      "Rule",
      "abstr-subscript",
      "default.default",
      "[t] \"pedice\"; [n] . (grammar:gender=\"male\")",
      "self::subscript"
    ],
    [
      "Rule",
      "abstr-subsup",
      "default.default",
      "[t] \"potenza con pedice\"; [n] . (grammar:gender=\"female\")",
      "self::superscript",
      "name(children/*[1])=\"subscript\""
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"con\"; [t] count(./children/*); [t] \"elementi\"; [n] . (grammar:gender=\"male\")",
      "self::infixop"
    ],
    [
      "Rule",
      "abstr-infixop",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"con numero variabile di elementi\"; [n] . (grammar:gender=\"male\")",
      "self::infixop",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-infixop",
      "mathspeak.brief",
      "[t] @role (grammar:localRole); [n] . (grammar:gender=\"male\")",
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
      "[t] \"somma con\"; [t] count(./children/*); [t] \"addendi\"; [n] . (grammar:gender=\"female\")",
      "self::infixop",
      "@role=\"addition\""
    ],
    [
      "Rule",
      "abstr-addition",
      "mathspeak.brief",
      "[t] \"somma\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"somma con numero variabile di addendi\"; [n] . (grammar:gender=\"female\")",
      "self::infixop",
      "@role=\"addition\"",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-multiplication",
      "default.default",
      "[t] \"prodotto di\"; [t] count(./children/*); [t] \"fattori\"; [n] . (grammar:gender=\"male\")",
      "self::infixop",
      "@role=\"multiplication\""
    ],
    [
      "Rule",
      "abstr-multiplication",
      "mathspeak.brief",
      "[t] \"prodotto\"; [n] . (grammar:gender=\"male\")",
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
      "[t] \"prodotto con numero variabile di fattori\"; [n] . (grammar:gender=\"male\")",
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
      "[t] count(./children/*); [t] \"vettore dimensionale\"; [n] . (grammar:gender=\"male\")",
      "self::vector"
    ],
    [
      "Rule",
      "abstr-vector",
      "mathspeak.brief",
      "[t] \"vettore\"",
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
      "[t] \"vettore di dimensione n\"; [n] . (grammar:gender=\"male\")",
      "self::vector",
      "./children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-binomial",
      "default.default",
      "[t] \"binomiale\"; [n] . (grammar:gender=\"male\")",
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
      "[t] count(./children/*); [t] \"derminante dimensionale\"; [n] . (grammar:gender=\"male\")",
      "self::matrix",
      "@role=\"determinant\""
    ],
    [
      "Rule",
      "abstr-determinant",
      "mathspeak.brief",
      "[t] \"determinante\"; [n] . (grammar:gender=\"male\")",
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
      "[t] \"determinante di dimensione n\"; [n] . (grammar:gender=\"male\")",
      "self::matrix",
      "@role=\"determinant\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "default.default",
      "[t] count(./children/*); [t] \"matrice quadrata dimensionale\"; [n] . (grammar:gender=\"female\")",
      "self::matrix",
      "@role=\"squarematrix\""
    ],
    [
      "Rule",
      "abstr-squarematrix",
      "mathspeak.brief",
      "[t] \"matrice quadrata\"; [n] . (grammar:gender=\"female\")",
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
      "[t] count(./children/row/children/*); [t] \"vettore riga dimensionale\"; [n] . (grammar:gender=\"male\")",
      "self::matrix",
      "@role=\"rowvector\""
    ],
    [
      "Rule",
      "abstr-rowvector",
      "mathspeak.brief",
      "[t] \"vettore riga\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"vettore riga di dimensione n\"; [n] . (grammar:gender=\"female\")",
      "self::matrix",
      "@role=\"rowvector\"",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-matrix",
      "default.default",
      "[t] count(children/*); [t] \"per\"; [t] count(children/*[1]/children/*); [t] \"matrice\"; [n] . (grammar:gender=\"female\")",
      "self::matrix"
    ],
    [
      "Rule",
      "abstr-matrix",
      "mathspeak.brief",
      "[t] \"matrice\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"matrice dimensionale n pr m\"; [n] . (grammar:gender=\"female\")",
      "self::matrix",
      "./children/*/children/*/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-cases",
      "default.default",
      "[t] \"comando switch\"; [t] \"con\"; [t] count(children/*); [t] \"casi\"; [n] . (grammar:gender=\"male\")",
      "self::cases"
    ],
    [
      "Rule",
      "abstr-cases",
      "mathspeak.brief",
      "[t] \"comando switch\"; [n] . (grammar:gender=\"male\")",
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
      "[t] \"comando di switch con numero variabile di casi\"; [n] . (grammar:gender=\"male\")",
      "self::cases",
      "./children/row/children/cell/children/punctuation[@role=\"ellipsis\"]or ./children/line/children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "default.default",
      "[n] content/*[1]; [t] \"lista separata\"; [t] \"di lunghezza\"; [t] count(children/*) - count(content/*); [n] . (grammar:gender=\"female\")",
      "self::punctuated"
    ],
    [
      "Rule",
      "abstr-punctuated",
      "mathspeak.brief",
      "[n] content/*[1]; [t] \"lista separata\"; [n] . (grammar:gender=\"female\")",
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
      "[n] content/*[1]; [t] \"lista separata\"; [t] \"di lunghezza variabile\"; [n] . (grammar:gender=\"female\")",
      "self::punctuated",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-bigop",
      "default.default",
      "[n] content/*[1]; [n] . (grammar:gender=\"male\")",
      "self::bigop"
    ],
    [
      "Rule",
      "abstr-integral",
      "default.default",
      "[t] \"integrale\"; [n] . (grammar:gender=\"female\")",
      "self::*",
      "@role=\"integral\""
    ],
    [
      "Rule",
      "abstr-relation",
      "default.default",
      "[t] @role (grammar:localRole); [n] . (grammar:gender=\"male\")",
      "self::relseq",
      "count(./children/*)=2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "default.default",
      "[t] @role (grammar:localRole); [t] \"sequenza\"; [t] \"con\"; [t] count(./children/*); [t] \"elementi\"; [n] . (grammar:gender=\"female\")",
      "self::relseq",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-relation-seq",
      "mathspeak.brief",
      "[t] @role (grammar:localRole); [t] \"sequenza\"; [n] . (grammar:gender=\"female\")",
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
      "[t] @role (grammar:localRole); [t] \"sequenza\"; [t] \"con numero variabile di elementi\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"sequenza di relazione\"; [t] \"con\"; [t] count(./children/*); [t] \"elementi\"; [n] . (grammar:gender=\"female\")",
      "self::multirel",
      "count(./children/*)>2"
    ],
    [
      "Rule",
      "abstr-multirel",
      "mathspeak.brief",
      "[t] \"sequenza di relazione\"; [n] . (grammar:gender=\"female\")",
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
      "[t] \"sequenza di relazione con numero variabile di elementi\"; [n] . (grammar:gender=\"female\")",
      "self::multirel",
      "count(./children/*)>2",
      "./children/punctuation[@role=\"ellipsis\"]"
    ],
    [
      "Rule",
      "abstr-table",
      "default.default",
      "[t] \"tavola con\"; [t] count(children/*); [t] \"righe e\"; [t] count(children/*[1]/children/*); [t] \"colonne\"; [n] . (grammar:gender=\"female\")",
      "self::table"
    ],
    [
      "Rule",
      "abstr-line",
      "default.default",
      "[t] \"in\"; [t] @role (grammar:localRole); [n] . (grammar:gender=\"male\")",
      "self::line"
    ],
    [
      "Rule",
      "abstr-row",
      "default.default",
      "[t] \"in\"; [t] @role (grammar:localRole); [t] count(preceding-sibling::..); [t] \"con\"; [t] count(children/*); [t] \"colonne\"; [n] . (grammar:gender=\"female\")",
      "self::row"
    ],
    [
      "Rule",
      "abstr-cell",
      "default.default",
      "[t] \"in\"; [t] @role (grammar:localRole); [n] . (grammar:gender=\"female\")",
      "self::cell"
    ]
  ]
}
