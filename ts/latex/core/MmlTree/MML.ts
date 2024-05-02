/*************************************************************
 *
 *  Copyright (c) 2017-2024 The MathJax Consortium
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
 * @fileoverview  An object listing all the MathML node types
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {MmlNode, TextNode, XMLNode} from './MmlNode.js';
import {MmlFactory} from './MmlFactory.js';
import {PropertyList} from '../Tree/Node.js';

import {MmlMath}      from './MmlNodes/math.js';

import {MmlMi}        from './MmlNodes/mi.js';
import {MmlMn}        from './MmlNodes/mn.js';
import {MmlMo}        from './MmlNodes/mo.js';
import {MmlMtext}     from './MmlNodes/mtext.js';
import {MmlMspace}    from './MmlNodes/mspace.js';
import {MmlMs}        from './MmlNodes/ms.js';

import {MmlMrow, MmlInferredMrow} from './MmlNodes/mrow.js';
import {MmlMfrac}     from './MmlNodes/mfrac.js';
import {MmlMsqrt}     from './MmlNodes/msqrt.js';
import {MmlMroot}     from './MmlNodes/mroot.js';
import {MmlMstyle}    from './MmlNodes/mstyle.js';
import {MmlMerror}    from './MmlNodes/merror.js';
import {MmlMpadded}   from './MmlNodes/mpadded.js';
import {MmlMphantom}  from './MmlNodes/mphantom.js';
import {MmlMfenced}   from './MmlNodes/mfenced.js';
import {MmlMenclose}  from './MmlNodes/menclose.js';

import {MmlMaction}   from './MmlNodes/maction.js';

import {MmlMsubsup, MmlMsub, MmlMsup}       from './MmlNodes/msubsup.js';
import {MmlMunderover, MmlMunder, MmlMover} from './MmlNodes/munderover.js';
import {MmlMmultiscripts, MmlMprescripts, MmlNone} from './MmlNodes/mmultiscripts.js';

import {MmlMtable}      from './MmlNodes/mtable.js';
import {MmlMtr, MmlMlabeledtr} from './MmlNodes/mtr.js';
import {MmlMtd}         from './MmlNodes/mtd.js';
import {MmlMaligngroup} from './MmlNodes/maligngroup.js';
import {MmlMalignmark}  from './MmlNodes/malignmark.js';

import {MmlMglyph}      from './MmlNodes/mglyph.js';

import {MmlSemantics, MmlAnnotation, MmlAnnotationXML} from './MmlNodes/semantics.js';

import {TeXAtom} from './MmlNodes/TeXAtom.js';
import {MathChoice} from './MmlNodes/mathchoice.js';


/************************************************************************/
/**
 *  This object collects all the MathML node types together so that
 *  they can be used to seed an MmlNodeFactory.  One could copy this
 *  object to override existing classes with subclasses, or to add new
 *  classes as necessary.
 */

export let MML: {[kind: string]: new (factory: MmlFactory, attributes?: PropertyList, children?: MmlNode[]) => MmlNode} = {
  [MmlMath.kind]: MmlMath,

  [MmlMi.kind]: MmlMi,
  [MmlMn.kind]: MmlMn,
  [MmlMo.kind]: MmlMo,
  [MmlMtext.kind]: MmlMtext,
  [MmlMspace.kind]: MmlMspace,
  [MmlMs.kind]: MmlMs,

  [MmlMrow.kind]: MmlMrow,
  [MmlInferredMrow.kind]: MmlInferredMrow,
  [MmlMfrac.kind]: MmlMfrac,
  [MmlMsqrt.kind]: MmlMsqrt,
  [MmlMroot.kind]: MmlMroot,
  [MmlMstyle.kind]: MmlMstyle,
  [MmlMerror.kind]: MmlMerror,
  [MmlMpadded.kind]: MmlMpadded,
  [MmlMphantom.kind]: MmlMphantom,
  [MmlMfenced.kind]: MmlMfenced,
  [MmlMenclose.kind]: MmlMenclose,

  [MmlMaction.kind]: MmlMaction,

  [MmlMsub.kind]: MmlMsub,
  [MmlMsup.kind]: MmlMsup,
  [MmlMsubsup.kind]: MmlMsubsup,
  [MmlMunder.kind]: MmlMunder,
  [MmlMover.kind]: MmlMover,
  [MmlMunderover.kind]: MmlMunderover,
  [MmlMmultiscripts.kind]: MmlMmultiscripts,
  [MmlMprescripts.kind]: MmlMprescripts,
  [MmlNone.kind]: MmlNone,

  [MmlMtable.kind]: MmlMtable,
  [MmlMlabeledtr.kind]: MmlMlabeledtr,
  [MmlMtr.kind]: MmlMtr,
  [MmlMtd.kind]: MmlMtd,
  [MmlMaligngroup.kind]: MmlMaligngroup,
  [MmlMalignmark.kind]: MmlMalignmark,

  [MmlMglyph.kind]: MmlMglyph,

  [MmlSemantics.kind]: MmlSemantics,
  [MmlAnnotation.kind]: MmlAnnotation,
  [MmlAnnotationXML.kind]: MmlAnnotationXML,

  [TeXAtom.kind]: TeXAtom,
  [MathChoice.kind]: MathChoice,

  [TextNode.kind]: TextNode,
  [XMLNode.kind]: XMLNode,
};
