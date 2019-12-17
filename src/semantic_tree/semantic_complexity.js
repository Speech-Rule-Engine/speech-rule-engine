// Copyright 2019 Akashdeep Bansal
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
 * @fileoverview complexity on the basis of the semantic tree.
 *
 * @author akashdeep.bansal4@gmail.com (Akashdeep Bansal)
 */

goog.provide('sre.SemanticComplexity');

goog.require('sre.SemanticAnnotator')

sre.SemanticComplexity.complexity = function(node)	{
	let complexity = 0;
	switch (node.type)	{
		case sre.SemanticAttr.Type.INFIXOP:
			for (var i=0; i<node.childNodes.length; i++)
				complexity += node.childNodes[i].annotation.complexity[0];
			console.log(complexity)
			break;
		case sre.SemanticAttr.Type.PUNCTUATION:
			complexity = .2;
			break;
		case sre.SemanticAttr.Type.FENCE:
			complexity = .3;
			break;
		case sre.SemanticAttr.Type.NUMBER:
			complexity = .4;
			break;
		case sre.SemanticAttr.Type.IDENTIFIER:
			complexity = .5;
			break;
		case sre.SemanticAttr.Type.TEXT:
			complexity = .6;
			break;
		case sre.SemanticAttr.Type.OPERATOR:
			complexity = .7;
			break;
		case sre.SemanticAttr.Type.RELATION:
			complexity = .8;
			break;
		case sre.SemanticAttr.Type.LARGEOP:
			complexity = .9;
			break;
		case sre.SemanticAttr.Type.FUNCTION:
			complexity = 1;
			break;
		case sre.SemanticAttr.Type.ACCENT:
			complexity = 1.1;
			break;
		case sre.SemanticAttr.Type.FENCED:
			complexity = 1.2;
			break;
		case sre.SemanticAttr.Type.FRACTION:
			complexity = 1.3;
			break;
		case sre.SemanticAttr.Type.PUNCTUATED:
			complexity = 1.4;
			break;
		case sre.SemanticAttr.Type.RELSEQ:
			complexity = 1.5;
			break;
		case sre.SemanticAttr.Type.MULTIREL:
			complexity = 1.6;
			break;
		case sre.SemanticAttr.Type.PREFIXOP:
			complexity = 1.7;
			break;
		case sre.SemanticAttr.Type.POSTFIXOP:
			complexity = 1.8;
			break;
		case sre.SemanticAttr.Type.APPL:
			complexity = 1.9;
			break;
		case sre.SemanticAttr.Type.INTEGRAL:
			complexity = 2;
			break;
		case sre.SemanticAttr.Type.BIGOP:
			complexity = 2.1;
			break;
		case sre.SemanticAttr.Type.SQRT:
			complexity = 2.3;
			break;
		case sre.SemanticAttr.Type.ROOT:
			complexity = 2.4;
			break;
		case sre.SemanticAttr.Type.LIMUPPER:
			complexity = 2.5;
			break;
		case sre.SemanticAttr.Type.LIMLOWER:
			complexity = 2.6;
			break;
		case sre.SemanticAttr.Type.LIMBOTH:
			complexity = 2.7;
			break;
		case sre.SemanticAttr.Type.SUBSCRIPT:
			complexity = 2.8;
			break;
		case sre.SemanticAttr.Type.SUPERSCRIPT:
			complexity = 2.9;
			break;
		case sre.SemanticAttr.Type.UNDERSCORE:
			complexity = 3;
			break;
		case sre.SemanticAttr.Type.OVERSCORE:
			complexity = 3.1;
			break;
		case sre.SemanticAttr.Type.TENSOR:
			complexity = 3.2;
			break;
		case sre.SemanticAttr.Type.TABLE:
			complexity = 3.3;
			break;
		case sre.SemanticAttr.Type.MULTILINE:
			complexity = 3.4;
			break;
		case sre.SemanticAttr.Type.MATRIX:
			complexity = 3.5;
			break;
		case sre.SemanticAttr.Type.VECTOR:
			complexity = 3.6;
			break;
		case sre.SemanticAttr.Type.CASES:
			complexity = 3.7;
			break;
		case sre.SemanticAttr.Type.ROW:
			complexity = 3.8;
			break;
		case sre.SemanticAttr.Type.LINE:
			complexity = 3.9;
			break;
		case sre.SemanticAttr.Type.CELL:
			complexity = 4;
			break;
		case sre.SemanticAttr.Type.ENCLOSE:
			complexity = 4.1;
			break;
		case sre.SemanticAttr.Type.INFERENCE:
			complexity = 4.2;
			break;
		case sre.SemanticAttr.Type.RULELABEL:
			complexity = 4.3;
			break;
		case sre.SemanticAttr.Type.CONCLUSION:
			complexity = 4.4;
			break;
		case sre.SemanticAttr.Type.PREMISES:
			complexity = 4.5;
			break;
		case sre.SemanticAttr.Type.UNKNOWN:
			complexity = 4.6;
			break;
		case sre.SemanticAttr.Type.EMPTY:
			complexity = 4.7;
			break;
		default:
			complexity = 1;
	}
	return complexity;
};


sre.SemanticComplexity.streeComplexity = function() {
	return new sre.SemanticAnnotator(
		'complexity',
		function(node) {
			return sre.SemanticComplexity.complexity(node);});
};

sre.SemanticComplexity.height = function(node)	{
	let subtreeHeight = 0;
	var height = 0;
	if (node.childNodes.length < 1)
		subtreeHeight = 1;
	else {
		for (var i=0; i<node.childNodes.length; i++) {
			height = node.childNodes[i].annotation.subtreeHeight[0];
			if (height > subtreeHeight)
				subtreeHeight = height+1;
	}};
	return subtreeHeight;
};

sre.SemanticComplexity.subtreeHeight = function() {
	return new sre.SemanticAnnotator(
		'subtreeHeight',
		function(node) {
			return sre.SemanticComplexity.height(node);});
};

sre.SemanticComplexity.nodeCount = function(node)	{
	var subtreeNodeCount = 0;
	var nodeCount = 0;
	if (node.childNodes.length < 1)
		subtreeNodeCount = 1;
	else {
		for (var i=0; i<node.childNodes.length; i++){
			nodeCount += node.childNodes[i].annotation.subtreeNodeCount[0];};
		subtreeNodeCount = nodeCount+1;
	};
	return subtreeNodeCount;
};

sre.SemanticComplexity.subtreeNodeCount = function() {
	return new sre.SemanticAnnotator(
		'subtreeNodeCount',
		function(node) {
			return sre.SemanticComplexity.nodeCount(node);});
};

sre.SemanticComplexity.termsHeight = function(node)	{
	let subtreeTermsHeight = 0;
	var termsHeight = 0;
	if (node.childNodes.length < 1)
		subtreeTermsHeight = 1;
	else {
		for (var i=0; i<node.childNodes.length; i++) {
			termsHeight = node.childNodes[i].annotation.subtreeTermsHeight[0];
			if (termsHeight > subtreeTermsHeight) {
				if (node.type === sre.SemanticAttr.Type.INFIXOP && node.role === 'implicit')
					subtreeTermsHeight = termsHeight;
				else
					subtreeTermsHeight = termsHeight+1;
			};
	}};
	return subtreeTermsHeight;
};

sre.SemanticComplexity.subtreeTermsHeight = function() {
	return new sre.SemanticAnnotator(
		'subtreeTermsHeight',
		function(node) {
			return sre.SemanticComplexity.termsHeight(node);});
};

sre.SemanticComplexity.termsNodeCount = function(node)	{
	var subtreeTermsNodeCount = 0;
	var termsNodeCount = 0;
	if (node.childNodes.length < 1)
		subtreeTermsNodeCount = 1;
	else if (node.type === sre.SemanticAttr.Type.INFIXOP && node.role === 'implicit')
		subtreeTermsNodeCount = 1;
	else {
		for (var i=0; i<node.childNodes.length; i++){
			termsNodeCount += node.childNodes[i].annotation.subtreeTermsNodeCount[0];};
		subtreeTermsNodeCount = termsNodeCount+1;
	};
	return subtreeTermsNodeCount;
};

sre.SemanticComplexity.subtreeTermsNodeCount = function() {
	return new sre.SemanticAnnotator(
		'subtreeTermsNodeCount',
		function(node) {
			return sre.SemanticComplexity.termsNodeCount(node);});
};