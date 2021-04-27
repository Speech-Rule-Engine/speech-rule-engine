//
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
 * @fileoverview Abstract class implementation of the walker interface.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AuditoryDescription} from '../audio/auditory_description';
import {AuralRendering} from '../audio/aural_rendering';
import * as DomUtil from '../common/dom_util';
import {KeyCode} from '../common/event_util';
import {Attribute} from '../enrich_mathml/enrich_mathml';
import {Highlighter} from '../highlighter/highlighter';
import * as Messages from '../l10n/messages';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SpeechGenerator} from '../speech_generator/speech_generator';
import * as SpeechGeneratorUtil from '../speech_generator/speech_generator_util';
import * as ClearspeakPreferencesExports from '../speech_rules/clearspeak_preferences';
import {ClearspeakPreferences} from '../speech_rules/clearspeak_preferences';

import {Focus} from './focus';
import {Levels} from './levels';
import {RebuildStree} from './rebuild_stree';
import * as WalkerExports from './walker';
import {Walker} from './walker';
import * as WalkerUtil from './walker_util';



/**
 * @param node The (rendered) node on which the walker is called.
 * @param generator The speech generator for
 *     this walker.
 * @param highlighter The currently active
 *     highlighter.
 * @param xml The original xml/mathml node on which the walker is
 *      called as a string.
 * @override
 */
export class AbstractWalker implements Walker {
  /**
   * Unique id counter for walkers. Needed to regain states on rerendering.
   */
  static ID_COUNTER: number = 0;


  /**
   * Attribute that saves the explorer id in a node when we have multiple
   * explorers.
   */
  static SRE_ID_ATTR: string = 'sre-explorer-id';


  findFocusOnLevel: any;


  initLevels: any;


  combineContentChildren: any;
  id: any;

  rootNode: Node;

  rootId: string;

  private xmlString_: string;

  // All of these fields are initialized later for lazy evaluation.
  /**
   * The original xml/mathml node on which the walker is called.
   */
  private xml_: Element = null;

  private rebuilt_: RebuildStree = null;

  /**
   * The node that currently inspected. Initially this is the entire math
   * expression.
   */
  private focus_: Focus = null;

  keyMapping: {[key: KeyCode]: () => any} = {};

  private active_: boolean = false;

  moved: WalkerExports.move;

  /**
   * Stack of virtual cursors.
   */
  cursors: WalkerExports.Cursor[] = [];
  levels: any;
  constructor<T>(
      public node: Node, public generator: SpeechGenerator,
      public highlighter: Highlighter, xml: string) {
    if (this.node.id) {
      this.id = this.node.id;
    } else if (this.node.hasAttribute(AbstractWalker.SRE_ID_ATTR)) {
      this.id = this.node.getAttribute(AbstractWalker.SRE_ID_ATTR);
    } else {
      this.node.setAttribute(
          AbstractWalker.SRE_ID_ATTR, AbstractWalker.ID_COUNTER);
      this.id = AbstractWalker.ID_COUNTER++;
    }
    /**
     * The span in the math expression that corresponds to the root of the
     * semantic tree.
     */
    this.rootNode = WalkerUtil.getSemanticRoot(node);
    /**
     * Id of the root element of the semantic tree.
     */
    this.rootId = this.rootNode.getAttribute(Attribute.ID);
    /**
     * The original XML string. Kept for lazy initialization.
     */
    this.xmlString_ = xml;
    // End of uninitialized fields.
    this.keyMapping[KeyCode.UP] = goog.bind(this.up, this);
    this.keyMapping[KeyCode.DOWN] = goog.bind(this.down, this);
    this.keyMapping[KeyCode.RIGHT] = goog.bind(this.right, this);
    this.keyMapping[KeyCode.LEFT] = goog.bind(this.left, this);
    this.keyMapping[KeyCode.TAB] = goog.bind(this.repeat, this);
    this.keyMapping[KeyCode.DASH] = goog.bind(this.expand, this);
    this.keyMapping[KeyCode.SPACE] = goog.bind(this.depth, this);
    this.keyMapping[KeyCode.HOME] = goog.bind(this.home, this);
    this.keyMapping[KeyCode.X] = goog.bind(this.summary, this);
    this.keyMapping[KeyCode.Z] = goog.bind(this.detail, this);
    this.keyMapping[KeyCode.V] = goog.bind(this.virtualize, this);
    this.keyMapping[KeyCode.P] = goog.bind(this.previous, this);
    this.keyMapping[KeyCode.U] = goog.bind(this.undo, this);
    this.keyMapping[KeyCode.LESS] = goog.bind(this.previousRules, this);
    this.keyMapping[KeyCode.GREATER] = goog.bind(this.nextRules, this);
    /**
     * Flag indicating whether the last move actually moved focus.
     */
    this.moved = WalkerExports.move.ENTER;
  }


  /**
   * @override
   */
  getXml() {
    if (!this.xml_) {
      this.xml_ = DomUtil.parseInput(this.xmlString_);
    }
    return this.xml_;
  }


  /**
   * @override
   */
  getRebuilt() {
    if (!this.rebuilt_) {
      this.rebuilt_ = this.rebuildStree();
    }
    return this.rebuilt_;
  }


  /**
   * @override
   */
  isActive() {
    return this.active_;
  }


  /**
   * Toggles the activity indicator of the walker.
   */
  private toggleActive_() {
    this.active_ = !this.active_;
  }


  /**
   * @override
   */
  activate() {
    if (this.isActive()) {
      return;
    }
    this.generator.start();
    this.toggleActive_();
  }


  /**
   * @override
   */
  deactivate() {
    if (!this.isActive()) {
      return;
    }
    WalkerExports.setState(this.id, this.primaryId());
    this.generator.end();
    this.toggleActive_();
  }


  /**
   * @override
   */
  getFocus(opt_update) {
    if (!this.focus_) {
      this.focus_ = Focus.factory(
          this.rootId, [this.rootId], this.getRebuilt(), this.node);
    }
    if (opt_update) {
      this.updateFocus();
    }
    return (this.focus_ as Focus);
  }


  /**
   * @override
   */
  setFocus(focus) {
    this.focus_ = focus;
  }


  /**
   * @override
   */
  getDepth() {
    return this.levels.depth() - 1;
  }


  /**
   * @return True if modality of walker's speech generator is speech.
   */
  isSpeech(): boolean {
    return this.generator.modality === Attribute.SPEECH;
  }


  /**
   * @override
   */
  speech() {
    let nodes = this.getFocus().getDomNodes();
    if (!nodes.length) {
      return '';
    }
    let special = this.specialMove();
    if (special !== null) {
      return special;
    }
    switch (this.moved) {
      case WalkerExports.move.DEPTH:
        return this.depth_();
      case WalkerExports.move.SUMMARY:
        return this.summary_();
      case WalkerExports.move.DETAIL:
        return this.detail_();
      default:
        let speech = [];
        let snodes = this.getFocus().getSemanticNodes();
        for (let i = 0, l = nodes.length; i < l; i++) {
          let node = nodes[i];
          let snode = (snodes[i] as SemanticNode);
          speech.push(
              node ? this.generator.getSpeech(node, this.getXml()) :
                     SpeechGeneratorUtil.recomputeMarkup(snode));
        }
        return this.mergePrefix_(speech);
    }
  }


  /**
   * Merges a prefix and possibly a postfix into a list of speech strings.
   * @param speech The speech strings.
   * @param opt_pre A list of strings that should precede the
   *     prefix.
   * @return The merged speech string.
   */
  private mergePrefix_(speech: string[], opt_pre?: string[]): string {
    let pre = opt_pre || [];
    let prefix = this.isSpeech() ? this.prefix_() : '';
    if (prefix) {
      speech.unshift(prefix);
    }
    let postfix = this.isSpeech() ? this.postfix_() : '';
    if (postfix) {
      speech.push(postfix);
    }
    let aural = AuralRendering.getInstance();
    return aural.finalize(aural.merge(pre.concat(speech)));
  }


  /**
   * @return The prefix of the currently focused element.
   */
  private prefix_(): string {
    let nodes = this.getFocus().getDomNodes();
    let snodes = this.getFocus().getSemanticNodes();
    return nodes[0] ?
        WalkerUtil.getAttribute((nodes[0] as Node), Attribute.PREFIX) :
        SpeechGeneratorUtil.retrievePrefix(snodes[0]);
  }


  /**
   * @return The postfix of the currently focused element. Postfixes
   *    cannot be recomputed and therefore are only looked up on the actual
   * node.
   */
  private postfix_(): string {
    // TODO: Style this differently for usage with auditory markup.
    let nodes = this.getFocus().getDomNodes();
    return nodes[0] ?
        WalkerUtil.getAttribute((nodes[0] as Node), Attribute.POSTFIX) :
        '';
  }


  /**
   * @override
   */
  move(key) {
    let direction = this.keyMapping[key];
    if (!direction) {
      return null;
    }
    let focus = direction();
    if (!focus || focus === this.getFocus()) {
      return false;
    }
    this.setFocus(focus);
    if (this.moved === WalkerExports.move.HOME) {
      this.levels = this.initLevels();
    }
    return true;
  }


  /**
   * Moves up from the current node if possible.
   */
  protected up(): Focus|null {
    this.moved = WalkerExports.move.UP;
    return this.getFocus();
  }


  /**
   * Moves down from the current node if possible.
   */
  protected down(): Focus|null {
    this.moved = WalkerExports.move.DOWN;
    return this.getFocus();
  }


  /**
   * Moves left from the current node if possible.
   */
  protected left(): Focus|null {
    this.moved = WalkerExports.move.LEFT;
    return this.getFocus();
  }


  /**
   * Moves right from the current node if possible.
   */
  protected right(): Focus|null {
    this.moved = WalkerExports.move.RIGHT;
    return this.getFocus();
  }


  /**
   * Stays on the current node and repeats it.
   */
  protected repeat(): Focus|null {
    this.moved = WalkerExports.move.REPEAT;
    return this.getFocus().clone();
  }


  /**
   * Makes a depth announcement.
   */
  protected depth(): Focus|null {
    this.moved =
        this.isSpeech() ? WalkerExports.move.DEPTH : WalkerExports.move.REPEAT;
    return this.getFocus().clone();
  }


  /**
   * @return The depth announcement for the currently focused element.
   */
  private depth_(): string {
    let oldDepth = sre.Grammar.getInstance().getParameter('depth');
    sre.Grammar.getInstance().setParameter('depth', true);
    let primary = this.getFocus().getDomPrimary();
    let expand = this.expandable(primary) && [Messages.NAVIGATE.EXPANDABLE] ||
        this.collapsible(primary) && [Messages.NAVIGATE.COLLAPSIBLE] || [];
    let level = [AuralRendering.getInstance().markup([new AuditoryDescription({
      text: Messages.NAVIGATE.LEVEL + ' ' + this.getDepth(),
      personality: {}
    })])];
    let snodes = this.getFocus().getSemanticNodes();
    let prefix = SpeechGeneratorUtil.retrievePrefix(snodes[0]);
    let aural = AuralRendering.getInstance();
    if (prefix) {
      level.push(prefix);
    }
    sre.Grammar.getInstance().setParameter('depth', oldDepth);
    return aural.finalize(aural.merge(level.concat(expand)));
  }


  /**
   * Moving to the home position.
   */
  protected home(): Focus|null {
    this.moved = WalkerExports.move.HOME;
    let focus =
        Focus.factory(this.rootId, [this.rootId], this.getRebuilt(), this.node);
    return focus;
  }


  /**
   * Retrieves a node containing a given semantic id.
   * @param id The id of a semantic node.
   * @return The node for that id.
   */
  getBySemanticId(id: string): Node {
    return WalkerUtil.getBySemanticId(this.node, id);
  }


  /**
   * @return The id of the primary node of the current focus.
   */
  primaryId(): string {
    return this.getFocus().getSemanticPrimary().id.toString();
  }


  /**
   * Expands or collapses a node if it is actionable.
   * @return New focus element if actionable. O/w old focus.
   */
  expand(): Focus {
    let primary = this.getFocus().getDomPrimary();
    let expandable = this.actionable_(primary);
    if (!expandable) {
      return this.getFocus();
    }
    this.moved = WalkerExports.move.EXPAND;
    expandable.dispatchEvent(new Event('click'));
    return this.getFocus().clone();
  }


  /**
   * Checks if a node is actionable, i.e., corresponds to an maction.
   * @param node The (rendered) node under consideration.
   * @return The node corresponding to an maction element.
   */
  private actionable_(node: Node): Node {
    return node && node.parentNode &&
            this.highlighter.isMactionNode(node.parentNode) ?
        node.parentNode :
        null;
  }


  /**
   * Checks if a node is expandable.
   * @param node The (rendered) node under consideration.
   * @return True if the node is expandable.
   */
  expandable(node: Node): boolean {
    let parent = !!this.actionable_(node);
    return parent && node.childNodes.length === 0;
  }


  /**
   * Checks if a node can be collapsed.
   * @param node The (rendered) node under consideration.
   * @return True if the node is collapsible.
   */
  collapsible(node: Node): boolean {
    let parent = !!this.actionable_(node);
    return parent && node.childNodes.length > 0;
  }


  /**
   * Restores the previous state for a node.
   */
  restoreState() {
    if (!this.highlighter) {
      return;
    }
    let state = WalkerExports.getState(this.id);
    if (!state) {
      return;
    }
    let node = this.getRebuilt().nodeDict[state];
    let path = [];
    while (node) {
      path.push(node.id);
      node = node.parent;
    }
    path.pop();
    while (path.length > 0) {
      this.down();
      let id = path.pop();
      let focus = this.findFocusOnLevel(id);
      if (!focus) {
        break;
      }
      this.setFocus(focus);
    }
    this.moved = WalkerExports.move.ENTER;
  }


  /**
   * Updates the walker's focus by recomputing the DOM elements.
   */
  updateFocus() {
    this.setFocus(Focus.factory(
        this.getFocus().getSemanticPrimary().id.toString(),
        this.getFocus().getSemanticNodes().map((x) => x.id), this.getRebuilt(),
        this.node));
  }


  /**
   * Rebuilds the semantic tree given in the input xml element fully connected
   * with maction elements.
   * @return The reconstructed semantic tree.
   */
  protected rebuildStree(): RebuildStree {
    let rebuilt = new RebuildStree(this.getXml());
    this.rootId = rebuilt.stree.root.id.toString();
    this.generator.setRebuilt(rebuilt);
    this.focus_ = Focus.factory(this.rootId, [this.rootId], rebuilt, this.node);
    this.levels = this.initLevels();
    SpeechGeneratorUtil.connectMactions(this.node, this.getXml(), rebuilt.xml);
    return rebuilt;
  }


  /**
   * Computes the previous level by Returning the id of the parent.
   * @return The previous level.
   */
  previousLevel(): string|null {
    let dnode = this.getFocus().getDomPrimary();
    return dnode ? WalkerUtil.getAttribute(dnode, Attribute.PARENT) :
                   this.getFocus().getSemanticPrimary().parent.id.toString();
  }


  /**
   * Computes the next lower level from children and content.
   * @return The next lower level.
   */
  nextLevel(): T[] {
    let dnode = this.getFocus().getDomPrimary();
    if (dnode) {
      let children = WalkerUtil.splitAttribute(
          WalkerUtil.getAttribute(dnode, Attribute.CHILDREN));
      let content = WalkerUtil.splitAttribute(
          WalkerUtil.getAttribute(dnode, Attribute.CONTENT));
      let type = WalkerUtil.getAttribute(dnode, Attribute.TYPE);
      let role = WalkerUtil.getAttribute(dnode, Attribute.ROLE);
      return this.combineContentChildren(
          (type as SemanticAttr.Type), (role as SemanticAttr.Role), content,
          children);
    }
    let toIds = function(x) {
      return x.id.toString();
    };
    let snode = this.getRebuilt().nodeDict[this.primaryId()];
    children = snode.childNodes.map(toIds);
    content = snode.contentNodes.map(toIds);
    if (children.length === 0) {
      return [];
    }
    return this.combineContentChildren(
        snode.type, snode.role, content, children);
  }


  /**
   * Creates a simple focus for a solitary node.
   * @param id The semantic id of the focus node.
   * @return A focus containing only this node and the other
   *     properties of the old focus.
   */
  singletonFocus(id: string): Focus {
    return this.focusFromId(id, [id]);
  }


  /**
   * Makes a focus for a primary node and a node list, all given by their ids.
   * @param id The semantic id of the primary node.
   * @param ids The semantic id of the node list.
   * @return The new focus.
   */
  focusFromId(id: string, ids: string[]): Focus {
    return Focus.factory(id, ids, this.getRebuilt(), this.node);
  }


  /**
   * Voicing a virtual summary.
   */
  protected summary(): Focus|null {
    this.moved = this.isSpeech() ? WalkerExports.move.SUMMARY :
                                   WalkerExports.move.REPEAT;
    return this.getFocus().clone();
  }


  /**
   * @return The virtual summary of an element.
   */
  private summary_(): string {
    let sprimary = this.getFocus().getSemanticPrimary();
    let sid = sprimary.id.toString();
    let snode = this.getRebuilt().xml.getAttribute('id') === sid ?
        this.getRebuilt().xml :
        DomUtil.querySelectorAllByAttrValue(
            this.getRebuilt().xml, 'id', sid)[0];
    let summary = SpeechGeneratorUtil.retrieveSummary(snode);
    let speech = this.mergePrefix_([summary]);
    return speech;
  }


  /**
   * Voices details of a collapsed element without expansion.
   */
  protected detail(): Focus|null {
    this.moved =
        this.isSpeech() ? WalkerExports.move.DETAIL : WalkerExports.move.REPEAT;
    return this.getFocus().clone();
  }


  /**
   * @return The virtual detail of a collapsed element.
   */
  private detail_(): string {
    let sprimary = this.getFocus().getSemanticPrimary();
    let sid = sprimary.id.toString();
    let snode = this.getRebuilt().xml.getAttribute('id') === sid ?
        this.getRebuilt().xml :
        DomUtil.querySelectorAllByAttrValue(
            this.getRebuilt().xml, 'id', sid)[0];
    let oldAlt = snode.getAttribute('alternative');
    snode.removeAttribute('alternative');
    let detail = SpeechGeneratorUtil.computeMarkup((snode as Node));
    let speech = this.mergePrefix_([detail]);
    snode.setAttribute('alternative', oldAlt);
    return speech;
  }


  /**
   * This methods can contain special moves for specialised walkers.
   * @return The result of the special move.
   */
  protected specialMove(): string|null {
    return null;
  }


  // Virtual Cursors:
  /**
   * Initialises a new virtual cursor.
   * @param opt_undo Flag specifying if this is an undo jump point.
   * @return The new focus.
   */
  virtualize(opt_undo?: boolean): Focus {
    this.cursors.push({
      focus: this.getFocus(),
      levels: this.levels,
      undo: opt_undo || !this.cursors.length
    });
    this.levels = this.levels.clone();
    return this.getFocus().clone();
  }


  /**
   * Returns to previous cursor setting.
   * @return The previous focus.
   */
  previous(): Focus {
    let previous = this.cursors.pop();
    if (!previous) {
      return this.getFocus();
    }
    this.levels = previous.levels;
    return previous.focus;
  }


  /**
   * Undoes a series of virtual cursor generations.
   * @return A previous focus.
   */
  undo(): Focus {
    do {
      let previous = this.cursors.pop();
    } while (previous && !previous.undo);
    if (!previous) {
      return this.getFocus();
    }
    this.levels = previous.levels;
    return previous.focus;
  }


  /**
   * @override
   */
  update(options) {
    this.generator.setOptions(options);
    sre.System.getInstance().setupEngine(options);
    sre.SpeechGeneratorFactory.generator('Tree').getSpeech(
        this.node, this.getXml());
  }


  // Facilities for keyboard driven rules cycling.
  // TODO: Refactor this into the speech generators.
  /**
   * Cycles to next speech rule set if possible.
   * @return The current focus. Either the old one or if cycling was
   *     possible a cloned focus.
   */
  nextRules(): Focus {
    let options = this.generator.getOptions();
    if (options.modality !== 'speech') {
      return this.getFocus();
    }
    // TODO: Check if domains exist for the current locale.
    sre.Engine.DOMAIN_TO_STYLES[options.domain] = options.style;
    options.domain =
        options.domain === 'mathspeak' ? 'clearspeak' : 'mathspeak';
    options.style = sre.Engine.DOMAIN_TO_STYLES[options.domain];
    this.update(options);
    this.moved = WalkerExports.move.REPEAT;
    return this.getFocus().clone();
  }


  /**
   * Cycles to next style or preference of the speech rule set if possible.
   * @param domain The current speech rule set name.
   * @param style The current style name.
   * @return The new style name.
   */
  nextStyle(domain: string, style: string): string {
    if (domain === 'mathspeak') {
      let styles = ['default', 'brief', 'sbrief'];
      let index = styles.indexOf(style);
      if (index === -1) {
        return style;
      }
      return index >= styles.length - 1 ? styles[0] : styles[index + 1];
    }
    if (domain === 'clearspeak') {
      let prefs = ClearspeakPreferences.getLocalePreferences();
      let loc = prefs['en'];
      // TODO: use correct locale.
      if (!loc) {
        return 'default';
      }
      // TODO: return the previous one?
      let smart = ClearspeakPreferences.relevantPreferences(
          this.getFocus().getSemanticPrimary());
      let current = ClearspeakPreferences.findPreference(style, smart);
      let options = loc[smart].map(function(x) {
        return x.split('_')[1];
      });
      let index = options.indexOf(current);
      if (index === -1) {
        return style;
      }
      let next = index >= options.length - 1 ? options[0] : options[index + 1];
      let result = ClearspeakPreferences.addPreference(style, smart, next);
      return result;
    }
    return style;
  }


  /**
   * Cycles to previous speech rule set if possible.
   * @return The current focus. Either the old one or if cycling was
   *     possible a cloned focus.
   */
  previousRules(): Focus {
    let options = this.generator.getOptions();
    if (options.modality !== 'speech') {
      return this.getFocus();
    }
    options.style = this.nextStyle(options.domain, options.style);
    this.update(options);
    this.moved = WalkerExports.move.REPEAT;
    return this.getFocus().clone();
  }


  /**
   * Refocuses in case levels have been altered outside the walker's control.
   */
  refocus() {
    let focus = this.getFocus();
    while (!focus.getNodes().length) {
      let last = this.levels.peek();
      let up = this.up();
      if (!up) {
        break;
      }
      this.setFocus(up);
      focus = this.getFocus(true);
    }
    this.levels.push(last);
    this.setFocus(focus);
  }
}
/**
 * Finds the focus on the current level for a given semantic node id.
 * @param id The id number.
 * @return The focus on a particular level.
 */
AbstractWalker.prototype.findFocusOnLevel = goog.abstractMethod;
/**
 * Returns a new, initialised level structure suitable for the walker.
 * @return The new level structure initialised with root focus.
 */
AbstractWalker.prototype.initLevels = goog.abstractMethod;
/**
 * Combines content and children lists depending on semantic type and role.
 * @param type The semantic type.
 * @param role The semantic role.
 * @param content The list of content nodes.
 * @param children The list of child nodes.
 * @return The list of focus elements.
 */
AbstractWalker.prototype.combineContentChildren = goog.abstractMethod;
