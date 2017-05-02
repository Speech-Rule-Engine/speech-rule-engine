# Diagram Project Report 

The main aim of our project was to enhance some of the
[Speech Rule Engine's (SRE)](https://github.com/zorkow/speech-rule-engine)
infrastructure in order to support the longer term aims of developing different
rule sets and modalities such as ClearSpeak, Nemeth Braille etc., by
implementing better treatment for two-dimensional structures, multi-modality and
voice modulation.
    

## Original Goals and Project Outputs

We had defined four concrete aims which we will briefly review here and detail
how they have been realised.


1. The extension of the SRE for improved support of two-dimensional Mathematical
expressions such as matrices, multi-line equations, etc. was realised by

    * Providing treatment heuristics of the recognition of different types of
      multi-line formuals, such as equation sequences, inequality tabes, etc.,
      and representing them with new, dedicated semantic categories.

    * Implementing a recognition procedure and clear semantic treatment of
      labels and interspersed text and

    * Offering dedicated speech rules that allow voicing of labels in different
      verbosity.

    * Implementing improved navigation facilities for tabular expressions, such
      as matrices, equation systems, etc. that allow vertical and horizontal
      table cell navigation and direct jump to table cells, for use in
      interactive exploration, for example in SRE's MathJax embedding.

1. Generalization of SRE's prosody support (e.g. speech rate, changes in pitch)
to allow more screen readers and technology systems to improve the voicing of
mathematics:
   
     * We have implemented a new data structure for holding a generic
       representation of text and prosody annotations as an intermediary for the
       generation of speech expressions.
   
     * This new intermediate format is the basis of a collection of output driver
       classes that provide translation of rendered text into a number of speech
       prosody languages. In particular we have implemented the following output
       formats:

       [Sable](http://clas.mq.edu.au/speech/synthesis/sable/sabpap.html): An
             XML markup language implemented by TTS systems like
             [Festival](https://en.wikipedia.org/wiki/Festival_Speech_Synthesis_System).
       
       [SSML](https://www.w3.org/TR/speech-synthesis/): A W3C
         recommentation for a speech synthesis markup language that is
         understood by screen readers like NVDA but also personal assistant
         systems like Amazon Echo or IBM's Watson.
       
       [VoiceXML](https://www.w3.org/TR/voicexml20/): Another W3C
         recommendation for a extensible voice markup languages that is closely
         related to SSML.
         
       [Aural CSS](https://www.w3.org/TR/CSS21/aural.html) A W3C extension
         for Cascading Style Sheets that allow the annotation of web content
         with speech rendering information. A system that actual implements a
         versin of ACSS is [Emacspeak](https://en.wikipedia.org/wiki/Emacspeak).
       

1. Integration of the prosody output with existing open source
   technologies. Here we did a number of experiments:

    * We successfully generated sound files via server-side pre-rendering of SRE
      output. In particular we generated sound files via
      [Festival](https://en.wikipedia.org/wiki/Festival_Speech_Synthesis_System)
      that understands Sable markup in a batch process as well as with the web
      API of [IBM's Watson system](https://text-to-speech-demo.mybluemix.net/)
      that can exploit SSML syntax. The results are collated at
      [http://zorkow.github.io/speech-rule-engine/www/](http://zorkow.github.io/speech-rule-engine/www/)

    * We had plannedto implement browser-based prosody rendering by using the
      SpeechSynthesis API directly from SRE's MathJax integration employing SSML
      markup. However, our experiments revealed, that despite claims otherwise
      none of the modern browsers that implement the API actually support
      recognition of SSML expressions. Hence this part of the project was
      unsuccessful, due to lack of browser support.

    * In lieu of browser-based rendering we experimented with
      [Emacspeak](https://en.wikipedia.org/wiki/Emacspeak) which offers a
      complete audio desktop based on the Emacs editor. It supports web browsing
      but also document generation in LaTeX, use of Emacs's symbols calculator,
      etc.  We have successfully integrated SRE into all these functionalities,
      exploiting prosody via the Aural CSS output driver. This implemention is
      already part of Emacspeaks'
      [v46.0 release](http://emacspeak.sourceforge.net/releases/release-46.0.html).


1. Quality assurance of the new developments has been performed by 

    * Adding around 30 new unit tests to the existing corpus of tests in SRE.

    * Performing two rounds of user testing. The results of these tests are
      presented in more detail in the next section.


## Results of User testing

User tests were structured to investigate the following questions:
    1. How usable is the navigation currently offered by SRE for understanding complex expressions?
    2. What is the impact of prosody changes for the understanding of tabular structures?

For (1) we employed two rounds of tests with power users.  Results of the first
test were used to inform further development.  In particular, the initial user
test did not only provide valuable feedback for adapting speech rules for
tabular structures, but has also lead to a number of additional features and
improvements of SRE that went beyond the original project plan. In particular,
we followed the user request to implement functionality for navigation, such as
direct cell access in mathematical tables and structures, summarisation of
sub-expressions without the need for triggering visual collapse, and cursor
virtualisation that allows users to pursue multiple strands of exploration,
while retaining previous positions.

Interestingly enough, in the second round of testing, users complained that
there might be two many key options available. This has lead to a restructuring
of keys into three categories: basic navigation, advanced navigation and table
navigation, where the latter two are optional. 

Other noteworthy observations were:
    * Difficulties to navigate between parent/children in the tree structure. An
      option for providing a high-level overview and positioning might help here.
	* The granularity that would allow readers to step through expressions
      character by character would be desirable.
	* Reproducing visual representation can be confusing for screen readers. For
      example, text accompanying expressions such as descriptions of arithmetic
      manipulations, if often given after the relevant formula only. This is due
      to speech rules such as MathSpeak faithfully following the visual layout,
      which is not necessarily the best option. In many cases accompanying text
      should be spoken before the equation. This can be achieved in SRE by
      marking interspersed explanations as explit labels.

Tests for prosody were carried out by presenting readers with Audio files
generated via Festival and Watson (due to the problems with the SpeechSynthesis
API mentioned above). The results of the tests can be summarised as follows:

   * Although prosody is critical for supporting additional rule sets that
     require tweaks to rate, pitch or pausing (e.g., ClearSpeak) it is not clear
     that this does indeed help understanding without more research about
     efficacy. Prosody tweaks can appear arbitrary and are therefore hard to
     test. Also depending on the TTS engine used the impact of prosody chnage
     can vary significantly, which makes it difficult to generate reproducible
     results.

    * Preliminary interviews with math teachers yielded, that providing
      supplemental audio files will likely be helpful for certain student
      demographics (i.e., non-native speakers, students with cognitive
      disabilities or learning disabilities).


## Next Steps and Future Work

The work in this project will be a basis for some of the next steps in the
development of SRE that are currently being undertaken or are planned.

* SRE is currently being funded by a Mozilla Open Software Support to implement
  the ClearSpeak rule set. Work on this should be finished by end of August.

* The Big10 Academic Alliance has provided some funds for a partial Nemeth
  implementation in SRE. Work on this project should begin by the end of the
  year.

* There are currently negotations with TextHelp to possibly provide a
  localisation into Spanish.

In addition to these projects, we have also identified a number of lines of work
that should be part of future projects:

* User testing has demonstrated that there is a demand for exploring
  mathematical expressions at a "character" level, that is stepping through the
  expression linearly. Currently SRE provides a tree based exploration model,
  only. Linearisation would need to be implemented by providing a second,
  parallel representation of speech that would interlink sub-expressions with
  parts of the speech string.
  
* A linear relation of this nature could also be exploited for advanced Braille
  support to allow readers to move backwards and forwards through expressions on
  a Braille display.

* Additional tests to investigate whether provision of audio files are helpful
  for students with learning disabilities, such as dyslexia, even without
  synchronised highlighting.
  
* Experiments into whether linearised text structures (as described above) could
  be employed for synchronising pre-rendered speech and online highlighting.

* Providing facilities for server-side and offline rendering of audio files,
  either using TTS systems like Festival or APIs for TTS web services.

* Direct integration with screen readers such as NVDA to exploit their ability
  to provide prosody rich aural rendering for mathematics as well as voicing of
  mathematics outside of browsers.
  
* Advanced structural summarisation could provide a high level overview over the
  entire structure of an expression, as well allow for better orientation in the
  expression during exploration. For example, the summary "square root over a
  sum" would be more informative than simply "square root".


## Project Resources
  
  * Speech Rule Engine (SRE):
      * [Code and documentation](https://github.com/zorkow/speech-rule-engine): 
      * [Keybindings overview](http://zorkow.github.io/speech-rule-engine/www/keybindings.html) 

  * User Testing Resources:
      * [First User Test](http://zorkow.github.io/speech-rule-engine/www/tests1)
      * [Second User Test](http://zorkow.github.io/speech-rule-engine/www/)
      * [Sound Files](http://zorkow.github.io/speech-rule-engine/www/)  generated with Festival and Watson
        
  * [SRE integration into MathJax](https://github.com/mathjax/MathJax-a11y)
      * [Release notes](https://www.mathjax.org/mathjax-accessibility-extensions-v1-now-available/)
      * [Details on interactive exploration](https://github.com/mathjax/MathJax-a11y/blob/master/docs/README.md)
      * [Support matrix](https://github.com/mathjax/MathJax-a11y/blob/master/docs/README.md#support)
        by operating system, browser and screen reader.
  
  * [Emacspeak Integration](https://github.com/zorkow/emacs-math-speak)
 

