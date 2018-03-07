Improve:
\textrm{exp}(A)=I+A+A^2/2!+A^3/3!+\dots

## Second semantic phase

* Semantic ordering: Decides when a type/role combination is stronger than
  another on the seame symbols.
* Semantic postprocessor: Combines a semantic ordering with a method that
  restructures the tree.


* __Alternative:__ We could in some instances just reparse the tree, and make
  decisions on role/type wrt. to the already propagated semantic table. 
* Only if the semantic table contains twice the same expression with different
  semantic assignment.
  
* Leaf map: id to node, symbol to ids? Maybe directly: Symbol to nodes?
* Branch map: basic string to nodes.  Here base string is the xml string without
  attributes.  *Does that make sense?*

* Maps are stored in the factory.

### Semantic Defaults

Default mapping for looking up the semantics of elements. That should overwrite
the standard intepretations.

  * Map symbol to type/role.
  * What about fonts? We map symbol + font to what?
  * Generate defaults from multi-valued mappings.

Three parts: default, collator, ordering

  * Collator collects semantic meanings per node.
  * Orderings collapse them into a default.
  * Default is used to either rewrite a tree or to be used for a parse.


  * Defaults can also be pre-filled. 
  * We need to extend the semantic parser to allow for defaults.


# Continued Fraction notations!

Push info through from cfrac macro.

https://tex.stackexchange.com/questions/73195/how-to-typeset-a-continued-fraction-in-the-following-format

https://tex.stackexchange.com/questions/196574/a-notation-for-continued-fractions


# Function composition vs implicit multiplication.

    * Work out the cases for implicit function compoistion.
    * Add some appropriate meaning element. (general?)
    * Get feedback loop if a function occurs in operation with other clearly non-functions
      (e.g., Clearspeak ). This would need a branch node lookup/comparison.
