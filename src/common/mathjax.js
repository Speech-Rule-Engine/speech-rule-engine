// Copyright 2014 Volker Sorge
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
 * @fileoverview Setup for loading the speech rule engine as MathJax extension.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Mathjax');

goog.require('sre.DirectSpeechGenerator');
goog.require('sre.Engine');
goog.require('sre.Engine.Mode');
goog.require('sre.SyntaxWalker');
goog.require('sre.System');


/**
 * Integration function into MathJax.
 * This is written in MathJax <=2.6 style.
 */
(function() {
  var ENGINE = sre.System.getInstance();
  var SIGNAL = MathJax.Callback.Signal('Sre');
  MathJax.Extension.Sre = {
    version: ENGINE.version,
    signal: SIGNAL,

    ConfigSre: function() {
      if (!sre.Engine.isReady()) {
        setTimeout(MathJax.Extension.Sre.ConfigSre, 500);
        return;
      }
      MathJax.Callback.Queue(
          // Wait until mml Jax is ready.
          // This is not strictly necessary for SRE but for the semantic lab.
          //
          MathJax.Hub.Register.StartupHook('mml Jax Ready', {}),
          ['Post', MathJax.Hub.Startup.signal, 'Sre Ready']
      );
    }
  };

  (sre.System.getInstance()).setupEngine(
      {mode: sre.Engine.Mode.HTTP,
        domain: 'mathspeak',
        style: 'default',
        semantics: 'true'}
  );

  MathJax.Extension.Sre.ConfigSre();

})();
