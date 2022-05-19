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
 * @file Abstract class implementation of the walker interface.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description';
import * as AuralRendering from '../audio/aural_rendering';
import * as DomUtil from '../common/dom_util';
import * as EngineConst from '../common/engine_const';
import { setup as EngineSetup } from '../common/engine_setup';
import { KeyCode } from '../common/event_util';
import { Attribute } from '../enrich_mathml/enrich_attr';
import { Highlighter } from '../highlighter/highlighter';
import { LOCALE } from '../l10n/locale';
import { AxisMap } from '../rule_engine/dynamic_cstr';
import { Grammar } from '../rule_engine/grammar';
import { SemanticRole, SemanticType } from '../semantic_tree/semantic_meaning';
import { SemanticNode } from '../semantic_tree/semantic_node';
import { SemanticSkeleton } from '../semantic_tree/semantic_skeleton';
import { SpeechGenerator } from '../speech_generator/speech_generator';
import * as SpeechGeneratorFactory from '../speech_generator/speech_generator_factory';
import * as SpeechGeneratorUtil from '../speech_generator/speech_generator_util';
import { ClearspeakPreferences } from '../speech_rules/clearspeak_preferences';
import { Focus } from './focus';
import { Levels } from './levels';
import { RebuildStree } from './rebuild_stree';
import { Walker, WalkerMoves, WalkerState } from './walker';
import * as WalkerUtil from './walker_util';

import * as XpathUtil from '../common/xpath_util';

/**
 * The abstract walker class.
 *
 * @template T
 */
export abstract class AbstractWalker<T> implements Walker {
  /**
   * Unique id counter for walkers. Needed to regain states on rerendering.
   */
  public static ID_COUNTER = 0;

  /**
   * Attribute that saves the explorer id in a node when we have multiple
   * explorers.
   */
  public static SRE_ID_ATTR = 'sre-explorer-id';

  public modifier = false;

  public id: any;

  public rootNode: Element;

  public rootId: string;
  // End of uninitialized fields.

  public skeleton: SemanticSkeleton;

  public keyMapping: Map<KeyCode, () => any> = new Map([
    [KeyCode.UP, this.up.bind(this)],
    [KeyCode.DOWN, this.down.bind(this)],
    [KeyCode.RIGHT, this.right.bind(this)],
    [KeyCode.LEFT, this.left.bind(this)],
    [KeyCode.TAB, this.repeat.bind(this)],
    [KeyCode.DASH, this.expand.bind(this)],
    [KeyCode.SPACE, this.depth.bind(this)],
    [KeyCode.HOME, this.home.bind(this)],
    [KeyCode.X, this.summary.bind(this)],
    [KeyCode.Z, this.detail.bind(this)],
    [KeyCode.V, this.virtualize.bind(this)],
    [KeyCode.P, this.previous.bind(this)],
    [KeyCode.U, this.undo.bind(this)],
    [KeyCode.LESS, this.previousRules.bind(this)],
    [KeyCode.GREATER, this.nextRules.bind(this)]
  ]);

  public moved: WalkerMoves;

  /**
   * Stack of virtual cursors.
   */
  public cursors: { focus: Focus; levels: Levels<T>; undo: boolean }[] = [];

  public levels: any;

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

  private active_ = false;

  /**
   * Finds the focus on the current level for a given semantic node id.
   *
   * @param id The id number.
   * @returns The focus on a particular level.
   */
  public abstract findFocusOnLevel(id: number): Focus;

  /**
   * Returns a new, initialised level structure suitable for the walker.
   *
   * @returns The new level structure initialised with root focus.
   */
  public abstract initLevels(): Levels<T>;

  /**
   * Combines content and children lists depending on semantic type and role.
   *
   * @param type The semantic type.
   * @param role The semantic role.
   * @param content The list of content nodes.
   * @param children The list of child nodes.
   * @returns The list of focus elements.
   */
  public abstract combineContentChildren(
    type: SemanticType,
    role: SemanticRole,
    content: string[],
    children: string[]
  ): T[];

  /**
   * @param node The (rendered) node on which the walker is called.
   * @param generator The speech generator for
   *     this walker.
   * @param highlighter The currently active
   *     highlighter.
   * @param xml The original xml/mathml node on which the walker is
   *      called as a string.
   */
  constructor(
    public node: Element,
    public generator: SpeechGenerator,
    public highlighter: Highlighter,
    xml: string
  ) {
    if (this.node.id) {
      this.id = this.node.id;
    } else if (this.node.hasAttribute(AbstractWalker.SRE_ID_ATTR)) {
      this.id = this.node.getAttribute(AbstractWalker.SRE_ID_ATTR);
    } else {
      this.node.setAttribute(
        AbstractWalker.SRE_ID_ATTR,
        AbstractWalker.ID_COUNTER.toString()
      );
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
    /**
     * Flag indicating whether the last move actually moved focus.
     */
    this.moved = WalkerMoves.ENTER;
  }

  /**
   * @override
   */
  public getXml() {
    if (!this.xml_) {
      this.xml_ = DomUtil.parseInput(this.xmlString_);
    }
    return this.xml_;
  }

  /**
   * @override
   */
  public getRebuilt() {
    if (!this.rebuilt_) {
      this.rebuildStree();
    }
    return this.rebuilt_;
  }

  /**
   * @override
   */
  public isActive() {
    return this.active_;
  }

  /**
   * @override
   */
  public activate() {
    if (this.isActive()) {
      return;
    }
    this.generator.start();
    this.toggleActive_();
  }

  /**
   * @override
   */
  public deactivate() {
    if (!this.isActive()) {
      return;
    }
    WalkerState.setState(this.id, this.primaryId());
    this.generator.end();
    this.toggleActive_();
  }

  /**
   * @override
   */
  public getFocus(update = false) {
    if (!this.focus_) {
      this.focus_ = this.singletonFocus(this.rootId);
    }
    if (update) {
      this.updateFocus();
    }
    return this.focus_;
  }

  /**
   * @override
   */
  public setFocus(focus: Focus) {
    this.focus_ = focus;
  }

  /**
   * @override
   */
  public getDepth() {
    return this.levels.depth() - 1;
  }

  /**
   * @returns True if modality of walker's speech generator is speech.
   */
  public isSpeech(): boolean {
    return this.generator.modality === Attribute.SPEECH;
  }

  public focusDomNodes() {
    return this.getFocus().getDomNodes();
  }

  public focusSemanticNodes() {
    return this.getFocus().getSemanticNodes();
  }

  /**
   * @override
   */
  public speech() {
    const nodes = this.focusDomNodes();
    if (!nodes.length) {
      return '';
    }
    const special = this.specialMove();
    if (special !== null) {
      return special;
    }
    switch (this.moved) {
      case WalkerMoves.DEPTH:
        return this.depth_();
      case WalkerMoves.SUMMARY:
        return this.summary_();
      case WalkerMoves.DETAIL:
        return this.detail_();
      default: {
        const speech = [];
        const snodes = this.focusSemanticNodes();
        for (let i = 0, l = nodes.length; i < l; i++) {
          const node = nodes[i];
          const snode = snodes[i] as SemanticNode;
          speech.push(
            node
              ? this.generator.getSpeech(node, this.getXml())
              : SpeechGeneratorUtil.recomputeMarkup(snode)
          );
        }
        return this.mergePrefix_(speech);
      }
    }
  }

  /**
   * @override
   */
  public move(key: KeyCode) {
    const direction = this.keyMapping.get(key);
    if (!direction) {
      return null;
    }
    const focus = direction();
    if (!focus || focus === this.getFocus()) {
      return false;
    }
    this.setFocus(focus);
    if (this.moved === WalkerMoves.HOME) {
      this.levels = this.initLevels();
    }
    return true;
  }

  /**
   * Moves up from the current node if possible.
   *
   * @returns The new focus.
   */
  protected up(): Focus | null {
    this.moved = WalkerMoves.UP;
    return this.getFocus();
  }

  /**
   * Moves down from the current node if possible.
   *
   * @returns The new focus.
   */
  protected down(): Focus | null {
    this.moved = WalkerMoves.DOWN;
    return this.getFocus();
  }

  /**
   * Moves left from the current node if possible.
   *
   * @returns The new focus.
   */
  protected left(): Focus | null {
    this.moved = WalkerMoves.LEFT;
    return this.getFocus();
  }

  /**
   * Moves right from the current node if possible.
   *
   * @returns The new focus.
   */
  protected right(): Focus | null {
    this.moved = WalkerMoves.RIGHT;
    return this.getFocus();
  }

  /**
   * Stays on the current node and repeats it.
   *
   * @returns The cloned focus.
   */
  protected repeat(): Focus | null {
    this.moved = WalkerMoves.REPEAT;
    return this.getFocus().clone();
  }

  /**
   * Makes a depth announcement.
   *
   * @returns The cloned focus.
   */
  protected depth(): Focus | null {
    this.moved = this.isSpeech() ? WalkerMoves.DEPTH : WalkerMoves.REPEAT;
    return this.getFocus().clone();
  }

  /**
   * Moving to the home position.
   *
   * @returns The new focus.
   */
  protected home(): Focus | null {
    this.moved = WalkerMoves.HOME;
    const focus = this.singletonFocus(this.rootId);
    return focus;
  }

  /**
   * Retrieves a node containing a given semantic id.
   *
   * @param id The id of a semantic node.
   * @returns The node for that id.
   */
  public getBySemanticId(id: string): Element {
    return WalkerUtil.getBySemanticId(this.node, id);
  }

  /**
   * @returns The id of the primary node of the current focus.
   */
  public primaryId(): string {
    return this.getFocus().getSemanticPrimary().id.toString();
  }

  /**
   * Expands or collapses a node if it is actionable.
   *
   * @returns New focus element if actionable. O/w old focus.
   */
  public expand(): Focus {
    const primary = this.getFocus().getDomPrimary();
    const expandable = this.actionable_(primary);
    if (!expandable) {
      return this.getFocus();
    }
    this.moved = WalkerMoves.EXPAND;
    expandable.dispatchEvent(new Event('click'));
    return this.getFocus().clone();
  }

  /**
   * Checks if a node is expandable.
   *
   * @param node The (rendered) node under consideration.
   * @returns True if the node is expandable.
   */
  public expandable(node: Element): boolean {
    const parent = !!this.actionable_(node);
    return parent && node.childNodes.length === 0;
  }

  /**
   * Checks if a node can be collapsed.
   *
   * @param node The (rendered) node under consideration.
   * @returns True if the node is collapsible.
   */
  public collapsible(node: Element): boolean {
    const parent = !!this.actionable_(node);
    return parent && node.childNodes.length > 0;
  }

  /**
   * Restores the previous state for a node.
   */
  public restoreState() {
    if (!this.highlighter) {
      return;
    }
    const state = WalkerState.getState(this.id);
    if (!state) {
      return;
    }
    let node = this.getRebuilt().nodeDict[state];
    const path = [];
    while (node) {
      path.push(node.id);
      node = node.parent;
    }
    path.pop();
    while (path.length > 0) {
      this.down();
      const id = path.pop();
      const focus = this.findFocusOnLevel(id);
      if (!focus) {
        break;
      }
      this.setFocus(focus);
    }
    this.moved = WalkerMoves.ENTER;
  }

  /**
   * Updates the walker's focus by recomputing the DOM elements.
   */
  public updateFocus() {
    this.setFocus(
      Focus.factory(
        this.getFocus().getSemanticPrimary().id.toString(),
        this.getFocus()
          .getSemanticNodes()
          .map((x) => x.id.toString()),
        this.getRebuilt(),
        this.node
      )
    );
  }

  /**
   * Rebuilds the semantic tree given in the input xml element fully connected
   * with maction elements.
   */
  protected rebuildStree() {
    this.rebuilt_ = new RebuildStree(this.getXml());
    this.rootId = this.rebuilt_.stree.root.id.toString();
    this.generator.setRebuilt(this.rebuilt_);
    this.skeleton = SemanticSkeleton.fromTree(this.rebuilt_.stree);
    this.skeleton.populate();
    this.focus_ = this.singletonFocus(this.rootId);
    this.levels = this.initLevels();
    SpeechGeneratorUtil.connectMactions(
      this.node,
      this.getXml(),
      this.rebuilt_.xml
    );
  }

  /**
   * Computes the previous level by Returning the id of the parent.
   *
   * @returns The previous level.
   */
  public previousLevel(): string | null {
    const dnode = this.getFocus().getDomPrimary();
    return dnode
      ? WalkerUtil.getAttribute(dnode, Attribute.PARENT)
      : this.getFocus().getSemanticPrimary().parent.id.toString();
  }

  /**
   * Computes the next lower level from children and content.
   *
   * @returns The next lower level.
   */
  public nextLevel(): T[] {
    const dnode = this.getFocus().getDomPrimary();
    let children;
    let content;
    if (dnode) {
      children = WalkerUtil.splitAttribute(
        WalkerUtil.getAttribute(dnode, Attribute.CHILDREN)
      );
      content = WalkerUtil.splitAttribute(
        WalkerUtil.getAttribute(dnode, Attribute.CONTENT)
      );
      const type = WalkerUtil.getAttribute(dnode, Attribute.TYPE);
      const role = WalkerUtil.getAttribute(dnode, Attribute.ROLE);
      return this.combineContentChildren(
        type as SemanticType,
        role as SemanticRole,
        content,
        children
      );
    }
    const toIds = (x: SemanticNode) => x.id.toString();
    const snode = this.getRebuilt().nodeDict[this.primaryId()];
    children = snode.childNodes.map(toIds);
    content = snode.contentNodes.map(toIds);
    if (children.length === 0) {
      return [];
    }
    return this.combineContentChildren(
      snode.type,
      snode.role,
      content,
      children
    );
  }

  /**
   * Creates a simple focus for a solitary node.
   *
   * @param id The semantic id of the focus node.
   * @returns A focus containing only this node and the other
   *     properties of the old focus.
   */
  public singletonFocus(id: string): Focus {
    this.getRebuilt();
    const ids = this.retrieveVisuals(id);
    return this.focusFromId(id, ids);
  }

  /**
   * Retrieves all root nodes of the visual subtrees.
   *
   * @param id The id of the root node.
   * @returns The list of ids.
   */
  private retrieveVisuals(id: string): string[] {
    if (!this.skeleton) {
      return [id];
    }
    const num = parseInt(id, 10);
    const semStree = this.skeleton.subtreeNodes(num);
    if (!semStree.length) {
      return [id];
    }
    semStree.unshift(num);
    const mmlStree: { [num: number]: boolean } = {};
    const result = [];
    XpathUtil.updateEvaluator(this.getXml());
    for (const child of semStree) {
      if (mmlStree[child]) {
        continue;
      }
      result.push(child.toString());
      mmlStree[child] = true;
      this.subtreeIds(child, mmlStree);
    }
    return result;
  }

  /**
   * Find all ids in the subtree spanned at a node and register them.
   *
   * @param id The root id of the subtree.
   * @param nodes The accumulator collecting the nodes.
   */
  private subtreeIds(id: number, nodes: { [num: number]: boolean }) {
    const xmlRoot = XpathUtil.evalXPath(
      `//*[@data-semantic-id="${id}"]`,
      this.getXml()
    );
    const xpath = XpathUtil.evalXPath('*//@data-semantic-id', xmlRoot[0]);
    xpath.forEach((x) => (nodes[parseInt(x.textContent, 10)] = true));
  }

  /**
   * Makes a focus for a primary node and a node list, all given by their ids.
   *
   * @param id The semantic id of the primary node.
   * @param ids The semantic id of the node list.
   * @returns The new focus.
   */
  public focusFromId(id: string, ids: string[]): Focus {
    return Focus.factory(id, ids, this.getRebuilt(), this.node);
  }

  /**
   * Voicing a virtual summary.
   *
   * @returns The cloned focus.
   */
  protected summary(): Focus | null {
    this.moved = this.isSpeech() ? WalkerMoves.SUMMARY : WalkerMoves.REPEAT;
    return this.getFocus().clone();
  }

  /**
   * Voices details of a collapsed element without expansion.
   *
   * @returns The cloned focus.
   */
  protected detail(): Focus | null {
    this.moved = this.isSpeech() ? WalkerMoves.DETAIL : WalkerMoves.REPEAT;
    return this.getFocus().clone();
  }

  /**
   * This methods can contain special moves for specialised walkers.
   *
   * @returns The result of the special move.
   */
  protected specialMove(): string | null {
    return null;
  }

  // Virtual Cursors:
  /**
   * Initialises a new virtual cursor.
   *
   * @param opt_undo Flag specifying if this is an undo jump point.
   * @returns The new focus.
   */
  public virtualize(opt_undo?: boolean): Focus {
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
   *
   * @returns The previous focus.
   */
  public previous(): Focus {
    const previous = this.cursors.pop();
    if (!previous) {
      return this.getFocus();
    }
    this.levels = previous.levels;
    return previous.focus;
  }

  /**
   * Undoes a series of virtual cursor generations.
   *
   * @returns A previous focus.
   */
  public undo(): Focus {
    let previous;
    do {
      previous = this.cursors.pop();
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
  public update(options: AxisMap) {
    this.generator.setOptions(options);
    EngineSetup(options).then(() =>
      SpeechGeneratorFactory.generator('Tree').getSpeech(
        this.node,
        this.getXml()
      )
    );
  }

  // Facilities for keyboard driven rules cycling.
  // TODO: Refactor this into the speech generators.
  /**
   * Cycles to next speech rule set if possible.
   *
   * @returns The current focus. Either the old one or if cycling was
   *     possible a cloned focus.
   */
  public nextRules(): Focus {
    const options = this.generator.getOptions();
    if (options.modality !== 'speech') {
      return this.getFocus();
    }
    // TODO: Check if domains exist for the current locale.
    EngineConst.DOMAIN_TO_STYLES[options.domain] = options.style;
    options.domain =
      options.domain === 'mathspeak' ? 'clearspeak' : 'mathspeak';
    options.style = EngineConst.DOMAIN_TO_STYLES[options.domain];
    this.update(options);
    this.moved = WalkerMoves.REPEAT;
    return this.getFocus().clone();
  }

  /**
   * Cycles to next style or preference of the speech rule set if possible.
   *
   * @param domain The current speech rule set name.
   * @param style The current style name.
   * @returns The new style name.
   */
  public nextStyle(domain: string, style: string): string {
    if (domain === 'mathspeak') {
      const styles = ['default', 'brief', 'sbrief'];
      const index = styles.indexOf(style);
      if (index === -1) {
        return style;
      }
      return index >= styles.length - 1 ? styles[0] : styles[index + 1];
    }
    if (domain === 'clearspeak') {
      const prefs = ClearspeakPreferences.getLocalePreferences();
      const loc = prefs['en'];
      // TODO: use correct locale.
      if (!loc) {
        return 'default';
      }
      // TODO: return the previous one?
      const smart = ClearspeakPreferences.relevantPreferences(
        this.getFocus().getSemanticPrimary()
      );
      const current = ClearspeakPreferences.findPreference(style, smart);
      const options = loc[smart].map(function (x) {
        return x.split('_')[1];
      });
      const index = options.indexOf(current);
      if (index === -1) {
        return style;
      }
      const next =
        index >= options.length - 1 ? options[0] : options[index + 1];
      const result = ClearspeakPreferences.addPreference(style, smart, next);
      return result;
    }
    return style;
  }

  /**
   * Cycles to previous speech rule set if possible.
   *
   * @returns The current focus. Either the old one or if cycling was
   *     possible a cloned focus.
   */
  public previousRules(): Focus {
    const options = this.generator.getOptions();
    if (options.modality !== 'speech') {
      return this.getFocus();
    }
    options.style = this.nextStyle(options.domain, options.style);
    this.update(options);
    this.moved = WalkerMoves.REPEAT;
    return this.getFocus().clone();
  }

  /**
   * @override
   */
  public refocus() {
    let focus = this.getFocus();
    let last;
    while (!focus.getNodes().length) {
      last = this.levels.peek();
      const up = this.up();
      if (!up) {
        break;
      }
      this.setFocus(up);
      focus = this.getFocus(true);
    }
    this.levels.push(last);
    this.setFocus(focus);
  }

  /**
   * Toggles the activity indicator of the walker.
   */
  private toggleActive_() {
    this.active_ = !this.active_;
  }

  /**
   * Merges a prefix and possibly a postfix into a list of speech strings.
   *
   * @param speech The speech strings.
   * @param pre An optional list of strings that should precede the prefix.
   * @returns The merged speech string.
   */
  private mergePrefix_(speech: string[], pre: string[] = []): string {
    const prefix = this.isSpeech() ? this.prefix_() : '';
    if (prefix) {
      speech.unshift(prefix);
    }
    const postfix = this.isSpeech() ? this.postfix_() : '';
    if (postfix) {
      speech.push(postfix);
    }
    return AuralRendering.finalize(
      AuralRendering.merge(pre.concat(speech) as any)
    );
    // TODO: string vs Span problem.
  }

  /**
   * @returns The prefix of the currently focused element.
   */
  private prefix_(): string {
    const nodes = this.getFocus().getDomNodes();
    const snodes = this.getFocus().getSemanticNodes();
    return nodes[0]
      ? WalkerUtil.getAttribute(nodes[0] as Element, Attribute.PREFIX)
      : SpeechGeneratorUtil.retrievePrefix(snodes[0]);
  }

  /**
   * @returns The postfix of the currently focused element. Postfixes
   *    cannot be recomputed and therefore are only looked up on the actual
   * node.
   */
  private postfix_(): string {
    // TODO: Style this differently for usage with auditory markup.
    const nodes = this.getFocus().getDomNodes();
    return nodes[0]
      ? WalkerUtil.getAttribute(nodes[0] as Element, Attribute.POSTFIX)
      : '';
  }

  /**
   * @returns The depth announcement for the currently focused element.
   */
  private depth_(): string {
    const oldDepth = Grammar.getInstance().getParameter('depth');
    Grammar.getInstance().setParameter('depth', true);
    const primary = this.getFocus().getDomPrimary();
    const expand = this.expandable(primary)
      ? LOCALE.MESSAGES.navigate.EXPANDABLE
      : this.collapsible(primary)
      ? LOCALE.MESSAGES.navigate.COLLAPSIBLE
      : '';
    const level = LOCALE.MESSAGES.navigate.LEVEL + ' ' + this.getDepth();
    const snodes = this.getFocus().getSemanticNodes();
    const prefix = SpeechGeneratorUtil.retrievePrefix(snodes[0]);
    const audio = [
      new AuditoryDescription({ text: level, personality: {} }),
      new AuditoryDescription({ text: prefix, personality: {} }),
      new AuditoryDescription({ text: expand, personality: {} })
    ];
    Grammar.getInstance().setParameter('depth', oldDepth);
    // TODO (TS): Make sure this is really a string to span.
    return AuralRendering.finalize(AuralRendering.markup(audio));
  }

  /**
   * Checks if a node is actionable, i.e., corresponds to an maction.
   *
   * @param node The (rendered) node under consideration.
   * @returns The node corresponding to an maction element.
   */
  private actionable_(node: Element): Element {
    const parent = node?.parentNode as Element;
    return parent && this.highlighter.isMactionNode(parent) ? parent : null;
  }

  /**
   * @returns The virtual summary of an element.
   */
  private summary_(): string {
    const sprimary = this.getFocus().getSemanticPrimary();
    const sid = sprimary.id.toString();
    const snode =
      this.getRebuilt().xml.getAttribute('id') === sid
        ? this.getRebuilt().xml
        : DomUtil.querySelectorAllByAttrValue(
            this.getRebuilt().xml,
            'id',
            sid
          )[0];
    const summary = SpeechGeneratorUtil.retrieveSummary(snode);
    const speech = this.mergePrefix_([summary]);
    return speech;
  }

  /**
   * @returns The virtual detail of a collapsed element.
   */
  private detail_(): string {
    const sprimary = this.getFocus().getSemanticPrimary();
    const sid = sprimary.id.toString();
    const snode =
      this.getRebuilt().xml.getAttribute('id') === sid
        ? this.getRebuilt().xml
        : DomUtil.querySelectorAllByAttrValue(
            this.getRebuilt().xml,
            'id',
            sid
          )[0];
    const oldAlt = snode.getAttribute('alternative');
    snode.removeAttribute('alternative');
    const detail = SpeechGeneratorUtil.computeMarkup(snode as Element);
    const speech = this.mergePrefix_([detail]);
    snode.setAttribute('alternative', oldAlt);
    return speech;
  }
}
