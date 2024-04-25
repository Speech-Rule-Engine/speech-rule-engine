"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLNode = exports.TextNode = exports.AbstractMmlEmptyNode = exports.AbstractMmlBaseNode = exports.AbstractMmlLayoutNode = exports.AbstractMmlTokenNode = exports.AbstractMmlNode = exports.indentAttributes = exports.MATHVARIANTS = exports.TEXCLASSNAMES = exports.TEXCLASS = void 0;
/**
 *  These are the TeX classes for spacing computations
 */
exports.TEXCLASS = {
    ORD: 0,
    OP: 1,
    BIN: 2,
    REL: 3,
    OPEN: 4,
    CLOSE: 5,
    PUNCT: 6,
    INNER: 7,
    NONE: -1
};
exports.TEXCLASSNAMES = ['ORD', 'OP', 'BIN', 'REL', 'OPEN', 'CLOSE', 'PUNCT', 'INNER'];
/**
 *  The spacing sizes used by the TeX spacing table below.
 */
var TEXSPACELENGTH = ['', 'thinmathspace', 'mediummathspace', 'thickmathspace'];
/**
 * See TeXBook Chapter 18 (p. 170)
 */
var TEXSPACE = [
    [0, -1, 2, 3, 0, 0, 0, 1], // ORD
    [-1, -1, 0, 3, 0, 0, 0, 1], // OP
    [2, 2, 0, 0, 2, 0, 0, 2], // BIN
    [3, 3, 0, 0, 3, 0, 0, 3], // REL
    [0, 0, 0, 0, 0, 0, 0, 0], // OPEN
    [0, -1, 2, 3, 0, 0, 0, 1], // CLOSE
    [1, 1, 0, 1, 1, 1, 1, 1], // PUNCT
    [1, -1, 2, 3, 1, 0, 1, 1] // INNER
];
/**
 * The valid mathvariants
 */
exports.MATHVARIANTS = new Set([
    'normal', 'bold', 'italic', 'bold-italic',
    'double-struck', 'fraktur', 'bold-fraktur', 'script', 'bold-script',
    'sans-serif', 'bold-sans-serif', 'sans-serif-italic', 'sans-serif-bold-italic',
    'monospace',
    'inital', 'tailed', 'looped', 'stretched'
]);
/**
 * Attributes used to determine indentation and shifting
 */
exports.indentAttributes = [
    'indentalign', 'indentalignfirst',
    'indentshift', 'indentshiftfirst'
];
/*****************************************************************/
/**
 *  The abstract MmlNode class (extends the AbstractNode class and implements
 *  the IMmlNode interface)
 */
var AbstractMmlNode = /** @class */ (function (_super) {
    __extends(AbstractMmlNode, _super);
    /**
     *  Create an MmlNode:
     *    If the arity is -1, add the inferred row (created by the factory)
     *    Add the children, if any
     *    Create the Attribute object from the class defaults and the global defaults (the math node defaults)
     *
     *  @override
     */
    function AbstractMmlNode(factory, attributes, children) {
        if (attributes === void 0) { attributes = {}; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this, factory) || this;
        /*
         * These default to being unset (the node doesn't participate in spacing calculations).
         * The correct values are produced when the setTeXclass() method is called on the tree.
         */
        /**
         * The TeX class for the preceding node
         */
        _this.prevClass = null;
        /**
         * The scriptlevel of the preceding node
         */
        _this.prevLevel = null;
        /**
         * The TeX class of this node (obtained via texClass below)
         */
        _this.texclass = null;
        if (_this.arity < 0) {
            _this.childNodes = [factory.create('inferredMrow')];
            _this.childNodes[0].parent = _this;
        }
        _this.setChildren(children);
        _this.attributes = new Attributes(factory.getNodeClass(_this.kind).defaults, factory.getNodeClass('math').defaults);
        _this.attributes.setList(attributes);
        return _this;
    }
    /**
     * @override
     *
     * @param {boolean} keepIds   True to copy id attributes, false to skip them.
     * @return {AbstractMmlNode}  The copied node tree.
     */
    AbstractMmlNode.prototype.copy = function (keepIds) {
        if (keepIds === void 0) { keepIds = false; }
        var node = this.factory.create(this.kind);
        node.properties = __assign({}, this.properties);
        if (this.attributes) {
            var attributes = this.attributes.getAllAttributes();
            for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                if (name_1 !== 'id' || keepIds) {
                    node.attributes.set(name_1, attributes[name_1]);
                }
            }
        }
        if (this.childNodes && this.childNodes.length) {
            var children = this.childNodes;
            if (children.length === 1 && children[0].isInferred) {
                children = children[0].childNodes;
            }
            for (var _b = 0, children_1 = children; _b < children_1.length; _b++) {
                var child = children_1[_b];
                if (child) {
                    node.appendChild(child.copy());
                }
                else {
                    node.childNodes.push(null);
                }
            }
        }
        return node;
    };
    Object.defineProperty(AbstractMmlNode.prototype, "texClass", {
        /**
         * The TeX class for this node
         */
        get: function () {
            return this.texclass;
        },
        /**
         * The TeX class for this node
         */
        set: function (texClass) {
            this.texclass = texClass;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isToken", {
        /**
         * @return {boolean}  true if this is a token node
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isEmbellished", {
        /**
         * @return {boolean}  true if this is an embellished operator
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isSpacelike", {
        /**
         * @return {boolean}  true if this is a space-like node
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "linebreakContainer", {
        /**
         * @return {boolean}  true if this is a node that supports linebreaks in its children
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "linebreakAlign", {
        /**
         * @return {string}  the attribute used to seed the indentalign value in
         *                   linebreak containers (overridden in subclasses when needed)
         */
        get: function () {
            return 'data-align';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "arity", {
        /**
         * @return {number}  The number of children allowed, or Infinity for any number,
         *                   or -1 for when an inferred row is needed for the children.
         *                   Special case is 1, meaning at least one (other numbers
         *                   mean exactly that many).
         */
        get: function () {
            return Infinity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isInferred", {
        /**
         * @return {boolean}  true if this is an inferred mrow
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "Parent", {
        /**
         * @return {MmlNode}  The logical parent of this node (skipping over inferred rows
         *                      some other node types)
         */
        get: function () {
            var parent = this.parent;
            while (parent && parent.notParent) {
                parent = parent.Parent;
            }
            return parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "notParent", {
        /**
         * @return {boolean}  true if this is a node that doesn't count as a parent node in Parent()
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * If there is an inferred row, the the children of that instead
     *
     * @override
     */
    AbstractMmlNode.prototype.setChildren = function (children) {
        if (this.arity < 0) {
            return this.childNodes[0].setChildren(children);
        }
        return _super.prototype.setChildren.call(this, children);
    };
    /**
     * If there is an inferred row, append to that instead.
     * If a child is inferred, append its children instead.
     *
     * @override
     */
    AbstractMmlNode.prototype.appendChild = function (child) {
        var _this = this;
        if (this.arity < 0) {
            this.childNodes[0].appendChild(child);
            return child;
        }
        if (child.isInferred) {
            //
            //  If we can have arbitrary children, remove the inferred mrow
            //  (just add its children).
            //
            if (this.arity === Infinity) {
                child.childNodes.forEach(function (node) { return _super.prototype.appendChild.call(_this, node); });
                return child;
            }
            //
            //  Otherwise, convert the inferred mrow to an explicit mrow
            //
            var original = child;
            child = this.factory.create('mrow');
            child.setChildren(original.childNodes);
            child.attributes = original.attributes;
            for (var _i = 0, _a = original.getPropertyNames(); _i < _a.length; _i++) {
                var name_2 = _a[_i];
                child.setProperty(name_2, original.getProperty(name_2));
            }
        }
        return _super.prototype.appendChild.call(this, child);
    };
    /**
     * If there is an inferred row, remove the child from there
     *
     * @override
     */
    AbstractMmlNode.prototype.replaceChild = function (newChild, oldChild) {
        if (this.arity < 0) {
            this.childNodes[0].replaceChild(newChild, oldChild);
            return newChild;
        }
        return _super.prototype.replaceChild.call(this, newChild, oldChild);
    };
    /**
     * @override
     */
    AbstractMmlNode.prototype.core = function () {
        return this;
    };
    /**
     * @override
     */
    AbstractMmlNode.prototype.coreMO = function () {
        return this;
    };
    /**
     * @override
     */
    AbstractMmlNode.prototype.coreIndex = function () {
        return 0;
    };
    /**
     * @override
     */
    AbstractMmlNode.prototype.childPosition = function () {
        var child = this;
        var parent = child.parent;
        while (parent && parent.notParent) {
            child = parent;
            parent = parent.parent;
        }
        if (parent) {
            var i = 0;
            for (var _i = 0, _a = parent.childNodes; _i < _a.length; _i++) {
                var node = _a[_i];
                if (node === child) {
                    return i;
                }
                i++;
            }
        }
        return null;
    };
    /**
     * @override
     */
    AbstractMmlNode.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        return (this.texClass != null ? this : prev);
    };
    /**
     * For embellished operators, get the data from the core and clear the core
     *
     * @param {MmlNode} core  The core <mo> for this node
     */
    AbstractMmlNode.prototype.updateTeXclass = function (core) {
        if (core) {
            this.prevClass = core.prevClass;
            this.prevLevel = core.prevLevel;
            core.prevClass = core.prevLevel = null;
            this.texClass = core.texClass;
        }
    };
    /**
     * Get the previous element's texClass and scriptlevel
     *
     * @param {MmlNode} prev  The previous node to this one
     */
    AbstractMmlNode.prototype.getPrevClass = function (prev) {
        if (prev) {
            this.prevClass = prev.texClass;
            this.prevLevel = prev.attributes.get('scriptlevel');
        }
    };
    /**
     * @return {string}  returns the spacing to use before this node
     */
    AbstractMmlNode.prototype.texSpacing = function () {
        var prevClass = (this.prevClass != null ? this.prevClass : exports.TEXCLASS.NONE);
        var texClass = this.texClass || exports.TEXCLASS.ORD;
        if (prevClass === exports.TEXCLASS.NONE || texClass === exports.TEXCLASS.NONE) {
            return '';
        }
        var space = TEXSPACE[prevClass][texClass];
        if ((this.prevLevel > 0 || this.attributes.get('scriptlevel') > 0) && space >= 0) {
            return '';
        }
        return TEXSPACELENGTH[Math.abs(space)];
    };
    /**
     * @return {boolean}  The core mo element has an explicit 'form' attribute
     */
    AbstractMmlNode.prototype.hasSpacingAttributes = function () {
        return this.isEmbellished && this.coreMO().hasSpacingAttributes();
    };
    /**
     * Sets the inherited propertis for this node, and pushes inherited properties to the children
     *
     *   For each inheritable attribute:
     *     If the node has a default for this attribute, try to inherit it
     *       but check if the noInherit object prevents that.
     *   If the node doesn't have an explicit displaystyle, inherit it
     *   If the node doesn't have an explicit scriptstyle, inherit it
     *   If the prime style is true, set it as a property (it is not a MathML attribute)
     *   Check that the number of children is correct
     *   Reset the indent attributes for linebreak containers
     *   Finally, push any inherited attributes to the children.
     *
     * @override
     */
    AbstractMmlNode.prototype.setInheritedAttributes = function (attributes, display, level, prime) {
        var _a, _b, _c;
        if (attributes === void 0) { attributes = {}; }
        if (display === void 0) { display = false; }
        if (level === void 0) { level = 0; }
        if (prime === void 0) { prime = false; }
        var defaults = this.attributes.getAllDefaults();
        for (var _i = 0, _d = Object.keys(attributes); _i < _d.length; _i++) {
            var key = _d[_i];
            if (defaults.hasOwnProperty(key) || AbstractMmlNode.alwaysInherit.hasOwnProperty(key)) {
                var _e = attributes[key], node = _e[0], value = _e[1];
                !((_b = (_a = AbstractMmlNode.noInherit[node]) === null || _a === void 0 ? void 0 : _a[this.kind]) === null || _b === void 0 ? void 0 : _b[key]) && this.attributes.setInherited(key, value);
            }
            if ((_c = AbstractMmlNode.stopInherit[this.kind]) === null || _c === void 0 ? void 0 : _c[key]) {
                attributes = __assign({}, attributes);
                delete attributes[key];
            }
        }
        var displaystyle = this.attributes.getExplicit('displaystyle');
        if (displaystyle === undefined) {
            this.attributes.setInherited('displaystyle', display);
        }
        var scriptlevel = this.attributes.getExplicit('scriptlevel');
        if (scriptlevel === undefined) {
            this.attributes.setInherited('scriptlevel', level);
        }
        if (prime) {
            this.setProperty('texprimestyle', prime);
        }
        var arity = this.arity;
        if (arity >= 0 && arity !== Infinity && ((arity === 1 && this.childNodes.length === 0) ||
            (arity !== 1 && this.childNodes.length !== arity))) {
            //
            //  Make sure there are the right number of child nodes
            //  (trim them or add empty mrows)
            //
            if (arity < this.childNodes.length) {
                this.childNodes = this.childNodes.slice(0, arity);
            }
            else {
                while (this.childNodes.length < arity) {
                    this.appendChild(this.factory.create('mrow'));
                }
            }
        }
        //
        //  If this is a linebreak container, reset the indent attributes
        //
        if (this.linebreakContainer && !this.isEmbellished) {
            var align = this.linebreakAlign;
            if (align) {
                var indentalign = this.attributes.get(align) || 'left';
                attributes = this.addInheritedAttributes(attributes, {
                    indentalign: indentalign,
                    indentshift: '0',
                    indentalignfirst: indentalign, indentshiftfirst: '0',
                    indentalignlast: 'indentalign', indentshiftlast: 'indentshift'
                });
            }
        }
        this.setChildInheritedAttributes(attributes, display, level, prime);
    };
    /**
     * Apply inherited attributes to all children
     * (Some classes override this to handle changes in displaystyle and scriptlevel)
     *
     * @param {AttributeList} attributes  The list of inheritable attributes (with the node kinds
     *                                    from which they came)
     * @param {boolean} display           The displaystyle to inherit
     * @param {number} level              The scriptlevel to inherit
     * @param {boolean} prime             The TeX prime style to inherit (T vs. T', etc).
     */
    AbstractMmlNode.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        for (var _i = 0, _a = this.childNodes; _i < _a.length; _i++) {
            var child = _a[_i];
            child.setInheritedAttributes(attributes, display, level, prime);
        }
    };
    /**
     * Used by subclasses to add their own attributes to the inherited list
     * (e.g., mstyle uses this to augment the inherited attibutes)
     *
     * @param {AttributeList} current    The current list of inherited attributes
     * @param {PropertyList} attributes  The new attributes to add into the list
     */
    AbstractMmlNode.prototype.addInheritedAttributes = function (current, attributes) {
        var updated = __assign({}, current);
        for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
            var name_3 = _a[_i];
            if (name_3 !== 'displaystyle' && name_3 !== 'scriptlevel' && name_3 !== 'style') {
                updated[name_3] = [this.kind, attributes[name_3]];
            }
        }
        return updated;
    };
    /**
     * Set the nodes inherited attributes based on the attributes of the given node
     *   (used for creating extra nodes in the tree after setInheritedAttributes has already run)
     *
     * @param {MmlNode} node   The node whose attributes are to be used as a template
     */
    AbstractMmlNode.prototype.inheritAttributesFrom = function (node) {
        var attributes = node.attributes;
        var display = attributes.get('displaystyle');
        var scriptlevel = attributes.get('scriptlevel');
        var defaults = (!attributes.isSet('mathsize') ? {} : {
            mathsize: ['math', attributes.get('mathsize')]
        });
        var prime = node.getProperty('texprimestyle') || false;
        this.setInheritedAttributes(defaults, display, scriptlevel, prime);
    };
    /**
     * Verify the attributes, and that there are the right number of children.
     * Then verify the children.
     *
     * @param {PropertyList} options   The options telling how much to verify
     */
    AbstractMmlNode.prototype.verifyTree = function (options) {
        if (options === void 0) { options = null; }
        if (options === null) {
            return;
        }
        this.verifyAttributes(options);
        var arity = this.arity;
        if (options['checkArity']) {
            if (arity >= 0 && arity !== Infinity &&
                ((arity === 1 && this.childNodes.length === 0) ||
                    (arity !== 1 && this.childNodes.length !== arity))) {
                this.mError('Wrong number of children for "' + this.kind + '" node', options, true);
            }
        }
        this.verifyChildren(options);
    };
    /**
     * Verify that all the attributes are valid (i.e., have defaults)
     *
     * @param {PropertyList} options   The options telling how much to verify
     */
    AbstractMmlNode.prototype.verifyAttributes = function (options) {
        if (options.checkAttributes) {
            var attributes = this.attributes;
            var bad = [];
            for (var _i = 0, _a = attributes.getExplicitNames(); _i < _a.length; _i++) {
                var name_4 = _a[_i];
                if (name_4.substring(0, 5) !== 'data-' && attributes.getDefault(name_4) === undefined &&
                    !name_4.match(/^(?:class|style|id|(?:xlink:)?href)$/)) {
                    // FIXME: provide a configurable checker for names that are OK
                    bad.push(name_4);
                }
                // FIXME: add ability to check attribute values?
            }
            if (bad.length) {
                this.mError('Unknown attributes for ' + this.kind + ' node: ' + bad.join(', '), options);
            }
        }
        if (options.checkMathvariants) {
            var variant = this.attributes.getExplicit('mathvariant');
            if (variant && !exports.MATHVARIANTS.has(variant) && !this.getProperty('ignore-variant')) {
                this.mError("Invalid mathvariant: ".concat(variant), options, true);
            }
        }
    };
    /**
     * Verify the children.
     *
     * @param {PropertyList} options   The options telling how much to verify
     */
    AbstractMmlNode.prototype.verifyChildren = function (options) {
        for (var _i = 0, _a = this.childNodes; _i < _a.length; _i++) {
            var child = _a[_i];
            child.verifyTree(options);
        }
    };
    /**
     * Replace the current node with an error message (or the name of the node)
     *
     * @param {string} message         The error message to use
     * @param {PropertyList} options   The options telling how much to verify
     * @param {boolean} short          True means use just the kind if not using full errors
     * @return {MmlNode}               The constructed merror
     */
    AbstractMmlNode.prototype.mError = function (message, options, short) {
        if (short === void 0) { short = false; }
        if (this.parent && this.parent.isKind('merror')) {
            return null;
        }
        var merror = this.factory.create('merror');
        merror.attributes.set('data-mjx-message', message);
        if (options.fullErrors || short) {
            var mtext = this.factory.create('mtext');
            var text = this.factory.create('text');
            text.setText(options.fullErrors ? message : this.kind);
            mtext.appendChild(text);
            merror.appendChild(mtext);
            this.parent.replaceChild(merror, this);
            if (!options.fullErrors) {
                merror.attributes.set('title', message);
            }
        }
        else {
            this.parent.replaceChild(merror, this);
            merror.appendChild(this);
        }
        return merror;
    };
    /**
     * The properties common to all MathML nodes
     */
    AbstractMmlNode.defaults = {
        mathbackground: INHERIT,
        mathcolor: INHERIT,
        mathsize: INHERIT, // technically only for token elements, but <mstyle mathsize="..."> should
        //    scale all spaces, fractions, etc.
        dir: INHERIT
    };
    /**
     *  This lists properties that do NOT get inherited between specific kinds
     *  of nodes.  The outer keys are the node kinds that are being inherited FROM,
     *  while the second level of keys are the nodes that INHERIT the values.  Any
     *  property appearing in the innermost list is NOT inherited by the pair.
     *
     *  For example, an mpadded element will not inherit a width attribute from an mstyle node.
     */
    AbstractMmlNode.noInherit = {
        mstyle: {
            mpadded: { width: true, height: true, depth: true, lspace: true, voffset: true },
            mtable: { width: true, height: true, depth: true, align: true }
        },
        maligngroup: {
            mrow: { groupalign: true },
            mtable: { groupalign: true }
        },
        mtr: {
            msqrt: { 'data-vertical-align': true },
            mroot: { 'data-vertical-align': true }
        },
        mlabeledtr: {
            msqrt: { 'data-vertical-align': true },
            mroot: { 'data-vertical-align': true }
        }
    };
    /**
     * This lists the attributes that should not be propagated to child nodes of the
     *   given kind of node (so that table attributes don't bleed through to nested
     *   tables -- see issue mathjax/MathJax#2890).
     */
    AbstractMmlNode.stopInherit = {
        mtd: { columnalign: true, rowalign: true, groupalign: true }
    };
    /**
     * This lists the attributes that should always be inherited,
     *   even when there is no default value for the attribute.
     */
    AbstractMmlNode.alwaysInherit = {
        scriptminsize: true,
        scriptsizemultiplier: true,
        infixlinebreakstyle: true
    };
    /**
     * This is the list of options for the verifyTree() method
     */
    AbstractMmlNode.verifyDefaults = {
        checkArity: true,
        checkAttributes: false,
        checkMathvariants: true,
        fullErrors: false,
        fixMmultiscripts: true,
        fixMtables: true
    };
    return AbstractMmlNode;
}(AbstractNode));
exports.AbstractMmlNode = AbstractMmlNode;
/*****************************************************************/
/**
 *  The abstract MmlNode Token node class (extends the AbstractMmlNode)
 */
var AbstractMmlTokenNode = /** @class */ (function (_super) {
    __extends(AbstractMmlTokenNode, _super);
    function AbstractMmlTokenNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlTokenNode.prototype, "isToken", {
        /**
         * @override
         */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the text of the token node (skipping mglyphs, and combining
     *   multiple text nodes)
     */
    AbstractMmlTokenNode.prototype.getText = function () {
        var text = '';
        for (var _i = 0, _a = this.childNodes; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child instanceof TextNode) {
                text += child.getText();
            }
            else if ('textContent' in child) {
                text += child.textContent();
            }
        }
        return text;
    };
    /**
     * Only inherit to child nodes that are AbstractMmlNodes (not TextNodes)
     *
     * @override
     */
    AbstractMmlTokenNode.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        for (var _i = 0, _a = this.childNodes; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child instanceof AbstractMmlNode) {
                child.setInheritedAttributes(attributes, display, level, prime);
            }
        }
    };
    /**
     * Only step into children that are AbstractMmlNodes (not TextNodes)
     * @override
     */
    AbstractMmlTokenNode.prototype.walkTree = function (func, data) {
        func(this, data);
        for (var _i = 0, _a = this.childNodes; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child instanceof AbstractMmlNode) {
                child.walkTree(func, data);
            }
        }
        return data;
    };
    /**
     * Add the attributes common to all token nodes
     */
    AbstractMmlTokenNode.defaults = __assign(__assign({}, AbstractMmlNode.defaults), { mathvariant: 'normal', mathsize: INHERIT });
    return AbstractMmlTokenNode;
}(AbstractMmlNode));
exports.AbstractMmlTokenNode = AbstractMmlTokenNode;
/*****************************************************************/
/**
 *  The abstract MmlNode Layout class (extends the AbstractMmlNode)
 *
 *  These have inferred mrows (so only one child) and can be
 *  spacelike or embellished based on their contents.
 */
var AbstractMmlLayoutNode = /** @class */ (function (_super) {
    __extends(AbstractMmlLayoutNode, _super);
    function AbstractMmlLayoutNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlLayoutNode.prototype, "isSpacelike", {
        /**
         * @override
         */
        get: function () {
            return this.childNodes[0].isSpacelike;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlLayoutNode.prototype, "isEmbellished", {
        /**
         * @override
         */
        get: function () {
            return this.childNodes[0].isEmbellished;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlLayoutNode.prototype, "arity", {
        /**
         * @override
         */
        get: function () {
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @override
     */
    AbstractMmlLayoutNode.prototype.core = function () {
        return this.childNodes[0];
    };
    /**
     * @override
     */
    AbstractMmlLayoutNode.prototype.coreMO = function () {
        return this.childNodes[0].coreMO();
    };
    /**
     * @override
     */
    AbstractMmlLayoutNode.prototype.setTeXclass = function (prev) {
        prev = this.childNodes[0].setTeXclass(prev);
        this.updateTeXclass(this.childNodes[0]);
        return prev;
    };
    /**
     * Use the same defaults as AbstractMmlNodes
     */
    AbstractMmlLayoutNode.defaults = AbstractMmlNode.defaults;
    return AbstractMmlLayoutNode;
}(AbstractMmlNode));
exports.AbstractMmlLayoutNode = AbstractMmlLayoutNode;
/*****************************************************************/
/**
 *  The abstract MmlNode-with-base-node Class (extends the AbstractMmlNode)
 *
 *  These have a base element and other elemetns, (e.g., script elements for msubsup).
 *  They can be embellished (if their base is), and get their TeX classes
 *    from their base with their scripts being handled as separate math lists.
 */
var AbstractMmlBaseNode = /** @class */ (function (_super) {
    __extends(AbstractMmlBaseNode, _super);
    function AbstractMmlBaseNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlBaseNode.prototype, "isEmbellished", {
        /**
         * @override
         */
        get: function () {
            return this.childNodes[0].isEmbellished;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @override
     */
    AbstractMmlBaseNode.prototype.core = function () {
        return this.childNodes[0];
    };
    /**
     * @override
     */
    AbstractMmlBaseNode.prototype.coreMO = function () {
        return this.childNodes[0].coreMO();
    };
    /**
     * @override
     */
    AbstractMmlBaseNode.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        this.texClass = exports.TEXCLASS.ORD;
        var base = this.childNodes[0];
        if (base) {
            if (this.isEmbellished || base.isKind('mi')) {
                prev = base.setTeXclass(prev);
                this.updateTeXclass(this.core());
            }
            else {
                base.setTeXclass(null);
                prev = this;
            }
        }
        else {
            prev = this;
        }
        for (var _i = 0, _a = this.childNodes.slice(1); _i < _a.length; _i++) {
            var child = _a[_i];
            if (child) {
                child.setTeXclass(null);
            }
        }
        return prev;
    };
    /**
     * Use the same defaults as AbstractMmlNodes
     */
    AbstractMmlBaseNode.defaults = AbstractMmlNode.defaults;
    return AbstractMmlBaseNode;
}(AbstractMmlNode));
exports.AbstractMmlBaseNode = AbstractMmlBaseNode;
/*****************************************************************/
/**
 *  The abstract MmlNode Empty Class (extends AbstractEmptyNode, implements MmlNode)
 *
 *  These have no children and no attributes (TextNode and XMLNode), so we
 *  override all the methods dealing with them, and with the data that usually
 *  goes with an MmlNode.
 */
var AbstractMmlEmptyNode = /** @class */ (function (_super) {
    __extends(AbstractMmlEmptyNode, _super);
    function AbstractMmlEmptyNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isToken", {
        /**
         * @return {boolean}  Not a token element
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isEmbellished", {
        /**
         * @return {boolean}  Not embellished
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isSpacelike", {
        /**
         * @return {boolean}  Not space-like
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "linebreakContainer", {
        /**
         * @return {boolean}  Not a container of any kind
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "linebreakAlign", {
        /**
         * @return {string}  Don't set the indentalign and indentshift attributes in this case
         */
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "arity", {
        /**
         * @return {number}  No children
         */
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isInferred", {
        /**
         * @return {boolean}  Is not an inferred row
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "notParent", {
        /**
         * @return {boolean}  Is not a container element
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "Parent", {
        /**
         * @return {MmlNode}  Parent is the actual parent
         */
        get: function () {
            return this.parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "texClass", {
        /**
         * @return {number}  No TeX class
         */
        get: function () {
            return exports.TEXCLASS.NONE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "prevClass", {
        /**
         * @return {number}  No previous element
         */
        get: function () {
            return exports.TEXCLASS.NONE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "prevLevel", {
        /**
         * @return {number}  No previous element
         */
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @return {boolean}  The core mo element has an explicit 'form' attribute
     */
    AbstractMmlEmptyNode.prototype.hasSpacingAttributes = function () {
        return false;
    };
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "attributes", {
        /**
         * return {Attributes}  No attributes, so don't store one
         */
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @override
     */
    AbstractMmlEmptyNode.prototype.core = function () {
        return this;
    };
    /**
     * @override
     */
    AbstractMmlEmptyNode.prototype.coreMO = function () {
        return this;
    };
    /**
     * @override
     */
    AbstractMmlEmptyNode.prototype.coreIndex = function () {
        return 0;
    };
    /**
     * @override
     */
    AbstractMmlEmptyNode.prototype.childPosition = function () {
        return 0;
    };
    /**
     * @override
     */
    AbstractMmlEmptyNode.prototype.setTeXclass = function (prev) {
        return prev;
    };
    /**
     * @override
     */
    AbstractMmlEmptyNode.prototype.texSpacing = function () {
        return '';
    };
    /**
     * No children or attributes, so ignore this call.
     *
     * @override
     */
    AbstractMmlEmptyNode.prototype.setInheritedAttributes = function (_attributes, _display, _level, _prime) { };
    /**
     * No children or attributes, so ignore this call.
     *
     * @override
     */
    AbstractMmlEmptyNode.prototype.inheritAttributesFrom = function (_node) { };
    /**
     * No children or attributes, so ignore this call.
     *
     * @param {PropertyList} options  The options for the check
     */
    AbstractMmlEmptyNode.prototype.verifyTree = function (_options) { };
    /**
     *  @override
     */
    AbstractMmlEmptyNode.prototype.mError = function (_message, _options, _short) {
        if (_short === void 0) { _short = false; }
        return null;
    };
    return AbstractMmlEmptyNode;
}(AbstractEmptyNode));
exports.AbstractMmlEmptyNode = AbstractMmlEmptyNode;
/*****************************************************************/
/**
 *  The TextNode Class (extends AbstractMmlEmptyNode)
 */
var TextNode = /** @class */ (function (_super) {
    __extends(TextNode, _super);
    function TextNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The text for this node
         */
        _this.text = '';
        return _this;
    }
    Object.defineProperty(TextNode.prototype, "kind", {
        /**
         * @override
         */
        get: function () {
            return 'text';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @return {string}  Return the node's text
     */
    TextNode.prototype.getText = function () {
        return this.text;
    };
    /**
     * @param {string} text  The text to use for the node
     * @return {TextNode}  The text node (for chaining of method calls)
     */
    TextNode.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    /**
     * @override
     */
    TextNode.prototype.copy = function () {
        return this.factory.create(this.kind).setText(this.getText());
    };
    /**
     * Just use the text
     */
    TextNode.prototype.toString = function () {
        return this.text;
    };
    return TextNode;
}(AbstractMmlEmptyNode));
exports.TextNode = TextNode;
/*****************************************************************/
/**
 *  The XMLNode Class (extends AbstractMmlEmptyNode)
 */
var XMLNode = /** @class */ (function (_super) {
    __extends(XMLNode, _super);
    function XMLNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The XML content for this node
         */
        _this.xml = null;
        /**
         * DOM adaptor for the content
         */
        _this.adaptor = null;
        return _this;
    }
    Object.defineProperty(XMLNode.prototype, "kind", {
        /**
         * @override
         */
        get: function () {
            return 'XML';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @return {Object}  Return the node's XML content
     */
    XMLNode.prototype.getXML = function () {
        return this.xml;
    };
    /**
     * @param {object} xml  The XML content to be saved
     * @param {DOMAdaptor} adaptor DOM adaptor for the content
     * @return {XMLNode}  The XML node (for chaining of method calls)
     */
    XMLNode.prototype.setXML = function (xml, adaptor) {
        if (adaptor === void 0) { adaptor = null; }
        this.xml = xml;
        this.adaptor = adaptor;
        return this;
    };
    /**
     * @return {string}  The serialized XML content
     */
    XMLNode.prototype.getSerializedXML = function () {
        return this.adaptor.serializeXML(this.xml);
    };
    /**
     * @override
     */
    XMLNode.prototype.copy = function () {
        return this.factory.create(this.kind).setXML(this.adaptor.clone(this.xml));
    };
    /**
     * Just indicate that this is XML data
     */
    XMLNode.prototype.toString = function () {
        return 'XML data';
    };
    return XMLNode;
}(AbstractMmlEmptyNode));
exports.XMLNode = XMLNode;
