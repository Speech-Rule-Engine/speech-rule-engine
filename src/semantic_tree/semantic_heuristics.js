// Copyright 2014-20 Volker Sorge
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
 * @fileoverview Outsourcing of heuristics that the processor can call depending
 *     on the selected settings. This is effectively a namespace for optional
 *     heuristics.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticHeuristic');
goog.provide('sre.SemanticHeuristics');

goog.require('sre.SemanticAttr');
goog.require('sre.SemanticNodeFactory');
goog.require('sre.SemanticPred');



/**
 * @constructor
 */
sre.SemanticHeuristics = function() {

  /**
   * @type {sre.SemanticNodeFactory}
   */
  this.factory = null;


  /**
   * @type {Object.<sre.SemanticHeuristic>}
   */
  this.heuristics = { };


  /**
   * @type {Object.<boolean>}
   */
  this.flags = {
    juxtaposition: true,
    multioperator: true
  };

};
goog.addSingletonGetter(sre.SemanticHeuristics);


/**
 * Register a heuristic with the handler.
 * @param {string} name The name of the heuristic.
 * @param {sre.SemanticHeuristic} heuristic The heuristic.
 */
sre.SemanticHeuristics.add = function(name, heuristic) {
  sre.SemanticHeuristics.getInstance().heuristics[name] = heuristic;
  // Registered switched off, unless it is set by default.
  if (!sre.SemanticHeuristics.getInstance().flags[name]) {
    sre.SemanticHeuristics.getInstance().flags[name] = false;
  }
};


/**
 * Runs a heuristic if its predicate evaluates to true.
 * @param {string} name The name of the heuristic.
 * @param {!sre.SemanticNode} root The root node of the subtree.
 * @param {(function(!sre.SemanticNode): !sre.SemanticNode)=} opt_alternative An
 *       optional method to run if the heuristic is not applicable.
 * @return {!sre.SemanticNode} The resulting subtree.
 */
sre.SemanticHeuristics.run = function(name, root, opt_alternative) {
  var heuristic = sre.SemanticHeuristics.lookup(name);
  return heuristic &&
      (sre.SemanticHeuristics.getInstance().flags[name] ||
       heuristic.applicable(root)) ?
      heuristic.apply(root) :
      (opt_alternative ? opt_alternative(root) : root);
};


/**
 * Looks up the named heuristic.
 * @param {string} name The name of the heuristic.
 * @return {sre.SemanticHeuristic} The heuristic.
 */
sre.SemanticHeuristics.lookup = function(name) {
  return sre.SemanticHeuristics.getInstance().heuristics[name];
};



//
// TODO: Heuristic paths have to be included in the tests.
//
/**
 * All heuristic methods get a root of a subtree and have a predicate that
 * either switches them on automatically (e.g., on selection of a domain), or
 * they can be switched on manually via a flag. Currently these flags are hard
 * coded.
 * @constructor
 * @param {{predicate: ((function(sre.SemanticNode): boolean)|undefined),
 *          method: function(sre.SemanticNode): sre.SemanticNode} } heuristic
 *          The predicate and method of the heuristic
 */
sre.SemanticHeuristic = function(
    {predicate: predicate = function(node) {return false;}, method: method}) {

  this.apply = method;

  this.applicable = predicate;

};


/**
 * Create a branching node for an implicit operation, currently assumed to be of
 * multiplicative type. Recursively combines implicit nodes for the given root
 * node of a subtree.
 */
sre.SemanticHeuristics.add(
  'juxtaposition',
  new sre.SemanticHeuristic(
  {method: function(root) {
    for (var i = root.childNodes.length - 1, child;
         child = root.childNodes[i]; i--) {
      if (child.type !== sre.SemanticAttr.Type.INFIXOP ||
          child.role !== sre.SemanticAttr.Role.IMPLICIT) {
        continue;
      }
      root.childNodes.splice.apply(root.childNodes, [i, 1].concat(child.childNodes));
      root.contentNodes.splice.apply(root.contentNodes, [i, 1].concat(child.contentNodes));
      child.childNodes.concat(child.contentNodes).forEach(
        function(x) {x.parentNode = root;}
      );
      root.addMathmlNodes(child.mathml);
    }
    return root;
  }
  }));



/**
 * Finds composed functions, i.e., simple functions that are either composed
 * with an infix operation or fraction and rewrites their role accordingly.
 * Currently restricted to Clearspeak!
 */
sre.SemanticHeuristics.add(
  'propagateSimpleFunction',
  new sre.SemanticHeuristic({
    predicate: function(node) {
      return sre.Engine.getInstance().domain === 'clearspeak';
    },
    method: function(node) {
      if ((node.type === sre.SemanticAttr.Type.INFIXOP ||
           node.type === sre.SemanticAttr.Type.FRACTION) &&
          node.childNodes.every(sre.SemanticPred.isSimpleFunction)) {
        node.role = sre.SemanticAttr.Role.COMPFUNC;
      }
      return node;
    }
  }));


/**
 * Naive name based heuristic for identifying simple functions. This is used in
 * clearspeak only.
 */
sre.SemanticHeuristics.add(
  'simpleNamedFunction',
  new sre.SemanticHeuristic({
    predicate: function(node) {
      return sre.Engine.getInstance().domain === 'clearspeak';
    },
    method: function(node) {
      var specialFunctions = ['f', 'g', 'h', 'F', 'G', 'H'];
      if (node.role !== sre.SemanticAttr.Role.UNIT &&
          specialFunctions.indexOf(node.textContent) !== -1) {
        node.role = sre.SemanticAttr.Role.SIMPLEFUNC;
      }
      return node;
    }}));


/**
 * Propagates the role of composed function to surrounding fences.
 * Currently restricted to Clearspeak!
 */
sre.SemanticHeuristics.add(
  'propagateComposedFunction',
  new sre.SemanticHeuristic({
    predicate: function(node) {
      return sre.Engine.getInstance().domain === 'clearspeak';
    },
    method: function(node) {
      if (node.type === sre.SemanticAttr.Type.FENCED &&
          node.childNodes[0].role === sre.SemanticAttr.Role.COMPFUNC) {
        node.role = sre.SemanticAttr.Role.COMPFUNC;
      }
      return node;
    }
  }));


sre.SemanticHeuristics.add(
  'multioperator',
  new sre.SemanticHeuristic({
    method: function(node) {
      if (node.role !== sre.SemanticAttr.Role.UNKNOWN ||
          node.textContent.length <= 1) {
        return;
      }
      // TODO: Combine with lines in numberRole_/exprFont_?
      var content = sre.SemanticUtil.splitUnicode(node.textContent);
      var meaning = content.map(sre.SemanticAttr.lookupMeaning);
      var singleRole = meaning.reduce(
        function(prev, curr) {
          if (!prev || !curr.role ||
              curr.role === sre.SemanticAttr.Role.UNKNOWN ||
              curr.role === prev) {
            return prev;
          }
          if (prev === sre.SemanticAttr.Role.UNKNOWN) {
            return curr.role;
          }
          return null;
        },
        sre.SemanticAttr.Role.UNKNOWN);
      if (singleRole) {
        node.role = singleRole;
      }
    }})
);
