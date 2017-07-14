<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Constraint redesign</a>
<ul>
<li><a href="#sec-1-1">1.1. Purpose: to improve on the applicability tests</a></li>
<li><a href="#sec-1-2">1.2. Three types of constraints: Dynamic, Query, Boolean</a></li>
<li><a href="#sec-1-3">1.3. Changes for Dynamic Constraints:</a>
<ul>
<li><a href="#sec-1-3-1">1.3.1. Remain basically as is. Make testing more efficient.</a></li>
<li><a href="#sec-1-3-2">1.3.2. Can have a flexible number of axis.</a></li>
<li><a href="#sec-1-3-3">1.3.3. Comparison of Dynamic Constraints</a></li>
</ul>
</li>
<li><a href="#sec-1-4">1.4. Changes for Static constraints:</a>
<ul>
<li><a href="#sec-1-4-1">1.4.1. Query vs boolean constraints</a></li>
<li><a href="#sec-1-4-2">1.4.2. Query should be simplified, when possible, i.e. self::NAME</a></li>
<li><a href="#sec-1-4-3">1.4.3. Inspect and mark constraints when sorting into Trie. Maybe annotate Trie node?</a></li>
<li><a href="#sec-1-4-4">1.4.4. Ordering</a></li>
</ul>
</li>
<li><a href="#sec-1-5">1.5. Changes to constraints of simple store elements</a>
<ul>
<li><a href="#sec-1-5-1">1.5.1. Special constraints: For single string elements</a></li>
<li><a href="#sec-1-5-2">1.5.2. They only work on text nodes.</a></li>
<li><a href="#sec-1-5-3">1.5.3. Rewriting application tests:</a></li>
<li><a href="#sec-1-5-4">1.5.4. Again test speed trade-off!</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#sec-2">2. Trie design ideas:</a>
<ul>
<li><a href="#sec-2-1">2.1. Usage</a>
<ul>
<li><a href="#sec-2-1-1">2.1.1. Have on trie per rule store or per domain?</a></li>
<li><a href="#sec-2-1-2">2.1.2. When combining rule sets, combine tries or rather search through list of tries?</a></li>
<li><a href="#sec-2-1-3">2.1.3. What about the simple rule stores? Should we simply go back to using the dictionary lookup?</a></li>
</ul>
</li>
<li><a href="#sec-2-2">2.2. Design</a>
<ul>
<li><a href="#sec-2-2-1">2.2.1. Trie starting with dynamic constraint?</a></li>
<li><a href="#sec-2-2-2">2.2.2. Trie starting with query</a></li>
</ul>
</li>
<li><a href="#sec-2-3">2.3. DataStructure</a>
<ul>
<li><a href="#sec-2-3-1">2.3.1. Node with</a></li>
<li><a href="#sec-2-3-2">2.3.2. Should every node bring their own test? Or select test according to type?</a></li>
<li><a href="#sec-2-3-3">2.3.3. Children implemented as Object.&lt;string, node&gt; where the string is the actual content.</a></li>
<li><a href="#sec-2-3-4">2.3.4. Retrieval gets all leave node under the last matching node.</a></li>
<li><a href="#sec-2-3-5">2.3.5. Depth and balancing might be interesting.</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</div>
</div>



# Constraint redesign<a id="sec-1" name="sec-1"></a>

## Purpose: to improve on the applicability tests<a id="sec-1-1" name="sec-1-1"></a>

## Three types of constraints: Dynamic, Query, Boolean<a id="sec-1-2" name="sec-1-2"></a>

## Changes for Dynamic Constraints:<a id="sec-1-3" name="sec-1-3"></a>

### Remain basically as is. Make testing more efficient.<a id="sec-1-3-1" name="sec-1-3-1"></a>

### Can have a flexible number of axis.<a id="sec-1-3-2" name="sec-1-3-2"></a>

1.  However that number is fixed by the rule store (via the parser).

2.  Otherwise similar to what we had

### Comparison of Dynamic Constraints<a id="sec-1-3-3" name="sec-1-3-3"></a>

1.  DONE We need a parser to parse constraints from strings. This is specific to the rule store.

2.  TODO Value list for

3.  DONE Equality of constraints. This is a method of constraints.

4.  TODO Have a priority order to compare against. This can be done globally, i.e., each

    1.  Parser order can be different from priority order!
    
    2.  Reference constraint is the global dynamic constraint
    
        Example: mathspeak.brief  < mathspeak.default if
    
    3.  Compare method for ordering with respect to the global constraint.
    
        What flexibility do we allow for ordering? Is a simple order list of axis/attributes enough?
        Or an order list per axis.
    
    4.  Match method to determine if we have a rule that is to be considered.
    
        Allow sets of axis. 
        Example: mathspeak, [default, brief]
    
    5.  DO WE STILL WANT THE DEFAULT AS BOTTOM LINE?

## Changes for Static constraints:<a id="sec-1-4" name="sec-1-4"></a>

### Query vs boolean constraints<a id="sec-1-4-1" name="sec-1-4-1"></a>

### Query should be simplified, when possible, i.e. self::NAME<a id="sec-1-4-2" name="sec-1-4-2"></a>

1.  Markup as different forms

    1.  If query is of the form self::TAGNAME
    
        Mark as 'tag' and test with node.tagname
        Take care of self::\*!
        Take care of namespaces (e.g., self::mathml:math)
    
    2.  If query is of the form @attr
    
        Mark as 'attr' and test with hasAttribute.
    
    3.  If query is of the form @attr="something"
    
        Mark as 'attrEQ' and test with hasAttribute & getAttribute= 
    
    4.  If query is of the form @attr!="something"
    
        Mark as 'attrNEQ' and test with !hasAttribute || getAttribute!=
    
    5.  Test speed of the above against XPATH first!

2.  Other speedup potential

    1.  count(children/\*)=n
    
    2.  Usage of Xpath in postconditions

### Inspect and mark constraints when sorting into Trie. Maybe annotate Trie node?<a id="sec-1-4-3" name="sec-1-4-3"></a>

### Ordering<a id="sec-1-4-4" name="sec-1-4-4"></a>

1.  Currently only by number.

2.  Is there a better way?

    Priorities?
    Explicit ordering by name? Can be problematic as there can be multiple
    rules with the same name.
    If done by name, we could have an explicit order definition statement in a
    rule store that would need to be collected and applied by a comparator.

3.  Again ordering is independent of the Trie

## Changes to constraints of simple store elements<a id="sec-1-5" name="sec-1-5"></a>

### Special constraints: For single string elements<a id="sec-1-5-1" name="sec-1-5-1"></a>

### They only work on text nodes.<a id="sec-1-5-2" name="sec-1-5-2"></a>

### Rewriting application tests:<a id="sec-1-5-3" name="sec-1-5-3"></a>

1.  recognise the query self::text() and combine with boolean query.

2.  Immediately do this when sorting into Trie

3.  Stop building a "rule" query and instead have trie subtype that specialised on simple stores.

### Again test speed trade-off!<a id="sec-1-5-4" name="sec-1-5-4"></a>

# Trie design ideas:<a id="sec-2" name="sec-2"></a>

## Usage<a id="sec-2-1" name="sec-2-1"></a>

### Have on trie per rule store or per domain?<a id="sec-2-1-1" name="sec-2-1-1"></a>

### When combining rule sets, combine tries or rather search through list of tries?<a id="sec-2-1-2" name="sec-2-1-2"></a>

The former is probably too expensive and also might not make sense when swapping rule sets regularly.
Is that a use case? How often would we swap rule sets?

### What about the simple rule stores? Should we simply go back to using the dictionary lookup?<a id="sec-2-1-3" name="sec-2-1-3"></a>

## Design<a id="sec-2-2" name="sec-2-2"></a>

### Trie starting with dynamic constraint?<a id="sec-2-2-1" name="sec-2-2-1"></a>

### Trie starting with query<a id="sec-2-2-2" name="sec-2-2-2"></a>

## DataStructure<a id="sec-2-3" name="sec-2-3"></a>

### Node with<a id="sec-2-3-1" name="sec-2-3-1"></a>

1.  Type (root, dynamic, query, boolean, rule = leaf?)

    1.  We should probably have a class per node type.

2.  SubType (string)

    1.  Dynamic: The axis name
    
    2.  Static: the form or xpath
    
    3.  Rule: name

3.  The actual content (string)

    1.  Dynamic: value of axis
    
    2.  Static: xpath expression
    
    3.  Rule: postcondition or full rule object

4.  Auxiliary content (static only) (string)

    1.  The comparison string or empty if none is necessary.

### Should every node bring their own test? Or select test according to type?<a id="sec-2-3-2" name="sec-2-3-2"></a>

Probably better the former, but has to be a static function! 
Should be assigned during sub-type computation.
For dynamic computation that will be a bit problematic!
Dynamic match needs to use the global comparator.

### Children implemented as Object.<string, node> where the string is the actual content.<a id="sec-2-3-3" name="sec-2-3-3"></a>

### Retrieval gets all leave node under the last matching node.<a id="sec-2-3-4" name="sec-2-3-4"></a>

### Depth and balancing might be interesting.<a id="sec-2-3-5" name="sec-2-3-5"></a>

We could effectively invert order of dynamic and static constraints. Not sure if that makes any sense.


