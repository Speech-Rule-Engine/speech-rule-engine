/*************************************************************
 *
 *  Copyright (c) 2018-2023 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  Loads all the TeX extensions
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import '#mathjax/input/tex/base/BaseConfiguration.js';
import '#mathjax/input/tex/action/ActionConfiguration.js';
import '#mathjax/input/tex/ams/AmsConfiguration.js';
import '#mathjax/input/tex/amscd/AmsCdConfiguration.js';
import '#mathjax/input/tex/bbox/BboxConfiguration.js';
import '#mathjax/input/tex/boldsymbol/BoldsymbolConfiguration.js';
import '#mathjax/input/tex/braket/BraketConfiguration.js';
import '#mathjax/input/tex/bussproofs/BussproofsConfiguration.js';
import '#mathjax/input/tex/cancel/CancelConfiguration.js';
import '#mathjax/input/tex/cases/CasesConfiguration.js';
import '#mathjax/input/tex/centernot/CenternotConfiguration.js';
import '#mathjax/input/tex/color/ColorConfiguration.js';
import '#mathjax/input/tex/colorv2/ColorV2Configuration.js';
import '#mathjax/input/tex/colortbl/ColortblConfiguration.js';
import '#mathjax/input/tex/configmacros/ConfigMacrosConfiguration.js';
import '#mathjax/input/tex/empheq/EmpheqConfiguration.js';
import '#mathjax/input/tex/enclose/EncloseConfiguration.js';
import '#mathjax/input/tex/extpfeil/ExtpfeilConfiguration.js';
import '#mathjax/input/tex/gensymb/GensymbConfiguration.js';
import '#mathjax/input/tex/html/HtmlConfiguration.js';
import '#mathjax/input/tex/mathtools/MathtoolsConfiguration.js';
import '#mathjax/input/tex/mhchem/MhchemConfiguration.js';
import '#mathjax/input/tex/newcommand/NewcommandConfiguration.js';
import '#mathjax/input/tex/noerrors/NoErrorsConfiguration.js';
import '#mathjax/input/tex/noundefined/NoUndefinedConfiguration.js';
import '#mathjax/input/tex/physics/PhysicsConfiguration.js';
import '#mathjax/input/tex/setoptions/SetOptionsConfiguration.js';
import '#mathjax/input/tex/tagformat/TagFormatConfiguration.js';
import '#mathjax/input/tex/texhtml/TexHtmlConfiguration.js';
import '#mathjax/input/tex/textcomp/TextcompConfiguration.js';
import '#mathjax/input/tex/textmacros/TextMacrosConfiguration.js';
import '#mathjax/input/tex/upgreek/UpgreekConfiguration.js';
import '#mathjax/input/tex/unicode/UnicodeConfiguration.js';
import '#mathjax/input/tex/verb/VerbConfiguration.js';

declare const MathJax: any;
if (typeof MathJax !== 'undefined' && MathJax.loader) {
  MathJax.loader.preLoad(
    '[tex]/action',
    '[tex]/ams',
    '[tex]/amscd',
    '[tex]/bbox',
    '[tex]/boldsymbol',
    '[tex]/braket',
    '[tex]/bussproofs',
    '[tex]/cancel',
    '[tex]/cases',
    '[tex]/centernot',
    '[tex]/color',
    '[tex]/colorv2',
    '[tex]/colortbl',
    '[tex]/empheq',
    '[tex]/enclose',
    '[tex]/extpfeil',
    '[tex]/gensymb',
    '[tex]/html',
    '[tex]/mathtools',
    '[tex]/mhchem',
    '[tex]/newcommand',
    '[tex]/noerrors',
    '[tex]/noundefined',
    '[tex]/physics',
    '[tex]/upgreek',
    '[tex]/unicode',
    '[tex]/verb',
    '[tex]/configmacros',
    '[tex]/tagformat',
    '[tex]/texhtml',
    '[tex]/textcomp',
    '[tex]/textmacros',
    '[tex]/setoptions',
  );
}

export const AllPackages: string[] = [
  'base',
  'action',
  'ams',
  'amscd',
  'bbox',
  'boldsymbol',
  'braket',
  'bussproofs',
  'cancel',
  'cases',
  'centernot',
  'color',
  'colortbl',
  'empheq',
  'enclose',
  'extpfeil',
  'gensymb',
  'html',
  'mathtools',
  'mhchem',
  'newcommand',
  'noerrors',
  'noundefined',
  'upgreek',
  'unicode',
  'verb',
  'configmacros',
  'tagformat',
  'texhtml',
  'textcomp',
  'textmacros'
];
