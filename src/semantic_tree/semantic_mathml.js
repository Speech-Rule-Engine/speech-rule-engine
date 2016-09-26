// Copyright 2014-16 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A mathml parser for building semantic trees.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathml');

goog.require('sre.SemanticAbstractParser');
goog.require('sre.SemanticNode');
goog.require('sre.SemanticNodeFactory');
goog.require('sre.SemanticParser');
goog.require('sre.SemanticProcessor');



/**
 * @constructor
 * @extends {sre.SemanticAbstractParser}
 * @implements {sre.SemanticParser<Element>}
 */
sre.SemanticMathml = function() {
  sre.SemanticMathml.base(this, 'constructor', 'MathML');
};
goog.inherits(sre.SemanticMathml, sre.SemanticAbstractParser);



/**
 * @override
 */
sre.SemanticMathml.prototype.parse = function(mml) {
  sre.SemanticProcessor.getInstance().setNodeFactory(this.getFactory());
  var children = sre.DomUtil.toArray(mml.childNodes);
  var newNode;
  switch (sre.DomUtil.tagName(mml)) {
    case 'SEMANTICS':
      if (children.length > 0) {
        newNode = this.parse(/** @type {!Element} */(children[0]));
        break;
      }
    case 'MATH':
    case 'MROW':
    case 'MPADDED':
    case 'MSTYLE':
      children = sre.SemanticUtil.purgeNodes(children);
      // Single child node, i.e. the row is meaningless.
      if (children.length === 1) {
        newNode = this.parse(/** @type {!Element} */(children[0]));
      } else {
        // Case of a 'meaningful' row, even if they are empty.
        newNode = sre.SemanticProcessor.getInstance().row(
            this.parseNodes_(children));
      }
      newNode.mathml.unshift(mml);
      return newNode;
    case 'MFRAC':
      newNode = sre.SemanticProcessor.getInstance().fractionLikeNode(
          mml.getAttribute('linethickness'),
          this.parse(children[0]),
          this.parse(children[1]));
      break;
    case 'MSUB':
    case 'MSUP':
    case 'MSUBSUP':
    case 'MOVER':
    case 'MUNDER':
    case 'MUNDEROVER':
      newNode = sre.SemanticProcessor.getInstance().limitNode(
          sre.DomUtil.tagName(mml),
          this.parseNodes_(children));
      break;
    case 'MROOT':
      newNode = this.getFactory().makeBranchNode(
          sre.SemanticAttr.Type.ROOT,
          [this.parse(children[1]),
           this.parse(children[0])],
          []);
      break;
    case 'MSQRT':
      children = this.parseNodes_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = this.getFactory().makeBranchNode(
          sre.SemanticAttr.Type.SQRT,
          [sre.SemanticProcessor.getInstance().row(children)], []);
      break;
    case 'MTABLE':
      newNode = this.getFactory().makeBranchNode(
          sre.SemanticAttr.Type.TABLE,
          this.parseNodes_(children), []);
      if (sre.SemanticPred.tableIsMultiline(newNode)) {
        sre.SemanticProcessor.tableToMultiline(newNode);
      }
      break;
    case 'MTR':
      newNode = this.getFactory().makeBranchNode(
          sre.SemanticAttr.Type.ROW,
          this.parseNodes_(children), []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      break;
    case 'MTD':
      children = this.parseNodes_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = this.getFactory().makeBranchNode(
          sre.SemanticAttr.Type.CELL,
          [sre.SemanticProcessor.getInstance().row(children)], []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      break;
    case 'MS':
    case 'MTEXT':
    case 'ANNOTATION-XML':
    newNode = sre.SemanticProcessor.getInstance().text(
      mml.textContent,
      /** @type {sre.SemanticAttr.Font} */(mml.getAttribute('mathvariant')),
      sre.DomUtil.tagName(mml));
      break;
    // TODO (sorge) Role and font of multi-character and digits unicode strings.
    // TODO (sorge) Reclassify wrongly tagged numbers or identifiers more
    //              systematically.
    // TODO (sorge) Put this all in a single clean reclassification method.
    case 'MI':
      newNode = this.parseIdentifierNode_(mml);
      break;
    case 'MN':
      newNode = this.parseLeafNode_(mml);
      sre.SemanticProcessor.number(newNode);
      break;
    case 'MO':
      newNode = this.parseLeafNode_(mml);
      if (newNode.type === sre.SemanticAttr.Type.UNKNOWN) {
        newNode.type = sre.SemanticAttr.Type.OPERATOR;
      }
      break;
    case 'MFENCED':
      newNode = this.parseMfenced_(
          mml, this.parseNodes_(
          sre.SemanticUtil.purgeNodes(children)));
      var nodes = sre.SemanticProcessor.getInstance().tablesInRow([newNode]);
      newNode = nodes[0];
      break;
    case 'MENCLOSE':
      children = this.parseNodes_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = this.getFactory().makeBranchNode(
          sre.SemanticAttr.Type.ENCLOSE,
          [sre.SemanticProcessor.getInstance().row(children)], []);
      newNode.role =
          /** @type {!sre.SemanticAttr.Role} */(mml.getAttribute('notation')) ||
          sre.SemanticAttr.Role.UNKNOWN;
      break;
    case 'MMULTISCRIPTS':
      newNode = this.parseMultiScript_(children);
      break;
    case 'ANNOTATION':
    case 'NONE':
      newNode = this.getFactory().makeEmptyNode();
      break;
    case 'MACTION':
      // This here is currently geared towards our collapse actions!
      if (children.length > 1) {
        newNode = this.parse(children[1]);
      } else {
        newNode = this.getFactory().makeUnprocessed(mml);
      }
      break;
    // TODO (sorge) Do something useful with error and phantom symbols.
    default:
      // Ordinarilly at this point we should not get any other tag.
      newNode = this.getFactory().makeUnprocessed(mml);
      break;
  }
  newNode.mathml.unshift(mml);
  newNode.mathmlTree = mml;
  return newNode;
};


/**
 * Parse a list of MathML nodes into a list of semantic nodes.
 * @param {Array.<Element>} mmls A list of MathML nodes.
 * @return {!Array.<sre.SemanticNode>} The list of resulting semantic
 *     node.
 * @private
 */
sre.SemanticMathml.prototype.parseNodes_ = function(mmls) {
  var result = [];
  for (var i = 0, mml; mml = mmls[i]; i++) {
    result.push(this.parse(mml));
  }
  return result;
};


/**
 * Creates a leaf node fro MathML node.
 * @param {Node} mml The MathML tree.
 * @return {!sre.SemanticNode} The new node.
 * @private
 */
sre.SemanticMathml.prototype.parseLeafNode_ = function(mml) {
  return this.getFactory().makeLeafNode(mml.textContent,
                                        mml.getAttribute('mathvariant'));
};


/**
 * Create an identifier node, with particular emphasis on font disambiguation.
 * @param {Node} mml The MathML MI node.
 * @return {!sre.SemanticNode} The new semantic identifier node.
 * @private
 */
sre.SemanticMathml.prototype.parseIdentifierNode_ = function(mml) {
  return sre.SemanticProcessor.getInstance().identifierNode(
      mml.textContent,
      mml.getAttribute('mathvariant'),
      mml.getAttribute('class'));
};


/**
 * Process an mfenced node.
 * @param {!Element} mfenced The Mfenced node.
 * @param {!Array.<sre.SemanticNode>} children List of already translated
 *     children.
 * @return {!sre.SemanticNode} The semantic node.
 * @private
 */
sre.SemanticMathml.prototype.parseMfenced_ = function(mfenced, children) {
  var sepValue = sre.SemanticMathml.getAttribute_(mfenced, 'separators', ',');
  var open = sre.SemanticMathml.getAttribute_(mfenced, 'open', '(');
  var close = sre.SemanticMathml.getAttribute_(mfenced, 'close', ')');
  return sre.SemanticProcessor.getInstance().mfenced(
      open, close, sepValue, children);
};


/**
 * Processes a mmultiscript node into a tensor representation.
 * @param {!Array.<Element>} children The nodes children.
 * @return {!sre.SemanticNode} The semantic tensor node.
 * @private
 */
sre.SemanticMathml.prototype.parseMultiScript_ = function(children) {
  // Empty node. Illegal MathML markup, but valid in MathJax.
  if (!children.length) {
    return this.getFactory().makeEmptyNode();
  }
  var base = this.parse(
      /** @type {!Element} */(children.shift()));
  if (!children.length) {
    return base;
  }
  var lsup = [];
  var lsub = [];
  var rsup = [];
  var rsub = [];
  var prescripts = false;
  var scriptcount = 0;
  for (var i = 0, child; child = children[i]; i++) {
    if (sre.DomUtil.tagName(child) === 'MPRESCRIPTS') {
      prescripts = true;
      scriptcount = 0;
      continue;
    }
    prescripts ?
        (scriptcount & 1 ? lsup.push(child) : lsub.push(child)) :
        (scriptcount & 1 ? rsup.push(child) : rsub.push(child));
    scriptcount++;
  }
  // This is the pathological msubsup case.
  //
  // We retain NONE nodes if necessary, i.e., in a non-empty sub- or
  // superscript.
  if (!sre.SemanticUtil.purgeNodes(lsup).length &&
      !sre.SemanticUtil.purgeNodes(lsub).length) {
    return sre.SemanticProcessor.getInstance().pseudoTensor(
        base,
        this.parseNodes_(rsub),
        this.parseNodes_(rsup));
  }
  // We really deal with a multiscript tensor.
  //
  return sre.SemanticProcessor.getInstance().tensor(
      base,
      this.parseNodes_(lsub),
      this.parseNodes_(lsup),
      this.parseNodes_(rsub),
      this.parseNodes_(rsup));
};


/**
 * Get an attribute from a node and provide a default if it does not exist.  It
 * returns null if attribute is empty string or whitespace only.
 * @param {!Element} node The node from which to retrieve the attribute.
 * @param {string} attr The attribute.
 * @param {string} def The default return value.
 * @return {?string} The value of the attribute or null.
 * @private
 */
sre.SemanticMathml.getAttribute_ = function(node, attr, def) {
  if (!node.hasAttribute(attr)) {
    return def;
  }
  var value = node.getAttribute(attr);
  if (value.match(/^\s*$/)) {
    return null;
  }
  return value;
};


// '<math><mo>(</mo><mi>x</mi><msup><munder><msub><mover><mo>)</mo><mn>4</mn></mover><mn>2</mn></msub><mn>3</mn></munder><mn>1</mn></msup></math>'
// '<math><mo>(</mo><mi>x</mi><msup><munder><msub><mo>)</mo><mn>2</mn></msub><mn>3</mn></munder><mn>1</mn></msup></math>'
//  '<math><mo>(</mo><mi>x</mi><msub><munder><msup><mo>)</mo><mn>2</mn></msup><mn>3</mn></munder><mn>1</mn></msub></math>'
//  '<math><mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>2</mn></msup></math>'
//  '<math><mo>(</mo><mi>x</mi><msub><msup><mo>)</mo><mn>2</mn></msup><mn>1</mn></msub></math>'


