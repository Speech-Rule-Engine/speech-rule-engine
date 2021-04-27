// Copyright 2015-21 Volker Sorge
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
 * @fileoverview External declarations for parts of the SVG API, partially taken
 *     from https://closureidl.googlecode.com/files/svg.js
 *
 * @externs
 * @author volker.sorge@gmail.com (Volker Sorge)
 */



/**
 * @constructor
 */
function SVGRect() {}


/**
 * @type {number}
 */
SVGRect.prototype.x;


/**
 * @type {number}
 */
SVGRect.prototype.y;


/**
 * @type {number}
 */
SVGRect.prototype.width;


/**
 * @type {number}
 */
SVGRect.prototype.height;



/**
 * @constructor
 */
function SVGAnimatedRect() {}


/**
 * @type {!SVGRect}
 */
SVGAnimatedRect.prototype.baseVal;


/**
 * @type {!SVGRect}
 */
SVGAnimatedRect.prototype.animVal;



/**
 * @constructor
 */
function SVGLength() {}


/**
 * @type {number}
 */
SVGLength.prototype.value;


/**
 * @type {number}
 */
SVGLength.prototype.valueInSpecifiedUnits;


/**
 * @type {string}
 */
SVGLength.prototype.valueAsString;



/**
 * @constructor
 */
function SVGAnimatedLength() {}


/**
 * @type {!SVGLength}
 */
SVGAnimatedLength.prototype.baseVal;


/**
 * @type {!SVGLength}
 */
SVGAnimatedLength.prototype.animVal;



/**
 * @constructor
 */
function SVGAnimatedString() {}


/**
 * @type {string}
 */
SVGAnimatedString.prototype.baseVal;


/**
 * @type {string}
 */
SVGAnimatedString.prototype.animVal;



/**
 * @constructor
 * @extends {Element}
 * This is simplified, omitting the intermediate SVGElement class!
 */
function SVGSVGElement() {}


/**
 * @type {!SVGAnimatedLength}
 */
SVGSVGElement.prototype.x;


/**
 * @type {!SVGAnimatedLength}
 */
SVGSVGElement.prototype.y;


/**
 * @type {!SVGAnimatedLength}
 */
SVGSVGElement.prototype.width;


/**
 * @type {!SVGAnimatedLength}
 */
SVGSVGElement.prototype.height;


/**
 * @type {!SVGAnimatedRect}
 */
SVGSVGElement.prototype.viewBox;


/**
 * @override
 */
SVGSVGElement.prototype.classList;


/**
 * @return {!SVGRect}
 */
SVGSVGElement.prototype.getBBox = function() {};


/**
 * @param {string} id
 * @return {!SVGSVGElement}
 */
SVGSVGElement.prototype.getElementById;


Node.prototype.bbox;
