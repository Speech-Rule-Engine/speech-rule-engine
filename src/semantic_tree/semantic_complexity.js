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

///**
// * A function which computes the complexity at a node on the basis of the //various
// * parameters such as nodeType, nodeHeight, nodeCount, nodeTermsHeight, 
// * nodeTermsCount, speechLegth, No. of different types of operators in the
// * subtree, etc.
// * @param (sre.SemanticNode) node The semantic node.
// * @return (Integer) A numerical value representing the relative complexity at
// * the given node.
// */
 
sre.SemanticComplexity.complexity = function(node)	{
	let complexity = 0;
	switch (node.type)	{
		case sre.SemanticAttr.Type.INFIXOP:
			for (var i=0; i<node.childNodes.length; i++)
				complexity += node.childNodes[i].annotation.complexity[0];
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

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for complexity function.
 */

sre.SemanticComplexity.streeComplexity = function() {
	return new sre.SemanticAnnotator(
		'complexity',
		function(node) {
			return sre.SemanticComplexity.complexity(node);});
};

///**
// * A function to compute height of the given node.
// * @param (sre.SemanticNode) node A semantic node.
// * @return (Integer) Height of the given node.
// */
 
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

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for height function.
 */

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

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for nodeCount function.
 */

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

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for termsHeight function.
 */

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

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for termsNodeCount
 * function.
 */

sre.SemanticComplexity.subtreeTermsNodeCount = function() {
	return new sre.SemanticAnnotator(
		'subtreeTermsNodeCount',
		function(node) {
			return sre.SemanticComplexity.termsNodeCount(node);});
};

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for speech function.
 */

sre.SemanticComplexity.speech = function() {
	return new sre.SemanticAnnotator(
		'speech',
		function(node) {
			var xml = sre.DomUtil.parseInput('<stree></stree>');
			var xmlRoot = node.xml(xml.ownerDocument);
	        var descrs = sre.SpeechGeneratorUtil.computeSpeech(/**@type{!Node}*/(xmlRoot));
			var aural = sre.AuralRendering.getInstance();
			var text = aural.finalize(aural.markup(descrs));
			return text;
		})};

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for word count in the 
 * speech string.
 */
		
sre.SemanticComplexity.speechWordCount = function() {
	return new sre.SemanticAnnotator(
		'SpeechWordCount',
		function(node) {
			const len = node.annotation.speech[0].split(' ').length;
			return len;
		})
};

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for word count in the 
 * speech string.
 */
		
sre.SemanticComplexity.speechOperatorCounter = function() {
	return new sre.SemanticAnnotator(
		'OperatorCounters',
		function(node) {
			const words = node.annotation.speech[0].split(' ');
			var PlusCounter = 0;
			var MinusCounter = 0;
			var SupCounter = 0;
			var SquCounter = 0;
			var CubeCounter = 0;
			var FracCounter = 0;
      var SlashCounter = 0;
			var RootCounter = 0;
			var BracketCounter = 0;
			var BraceCounter = 0;
			var ParenthesisCounter = 0;
			var ImplicitMultiCounter = 0;
			var ExplicitMultiCounter = 0;
			var ChancesOfError = 0;
			for(var i=0; i < words.length; i++){
				switch (words[i]){
					case 'plus':
						PlusCounter += 1;
						break;
					case 'minus':
						MinusCounter += 1;
						break;
					case 'negative':
						MinusCounter += 1;
						break;
					case 'StartFraction':
						FracCounter += 1;
						break;
          case 'slash':
            SlashCounter += 1;
            break;
					case 'StartRoot':
						RootCounter += 1;
						break;
					case 'Baseline':
						ChancesOfError += 1;
						break;
					case 'Superscript':
						SupCounter += 1;
						break;
					case 'squared':
						SquCounter += 1;
						break;
					case 'cubed':
						CubeCounter += 1;
						break;
					case 'left-bracket':
						BracketCounter += 1;
						break;
					case 'left-brace':
						BraceCounter += 1;
						break;
					case 'left-parenthesis':
						ParenthesisCounter += 1;
						break;
					case 'times':
						ExplicitMultiCounter += 1;
						break;
					default:
						if (i < (words.length)-1){
							if ((words[i]).length === 1){
								if ((words[i+1]).length === 1)
									ImplicitMultiCounter += 1;
							}}};//paranthesis and Chances of Errors
			};
			return [PlusCounter, MinusCounter, FracCounter, RootCounter, ChancesOfError, SupCounter, SquCounter+CubeCounter, ExplicitMultiCounter, BracketCounter, BraceCounter, ParenthesisCounter, ImplicitMultiCounter, SlashCounter, FracCounter+SlashCounter];
		})
};