// Copyright 2020 Volker Sorge
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
 * @file Button handling for fire tests.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { FireTest } from '../firebase/fire_test.js';

class Buttons {
  /** The container span for buttons  */
  public span = Buttons.createElement('btns');
  /** The forward button */
  public f = Buttons.createElement('btn f', this.direction + ' ' + 'element');
  /** The fast forward button */
  public ff = Buttons.createElement(
    'btn ff',
    this.direction + ' ' + 'unchanged element'
  );
  /** The faster forward button */
  public fff = Buttons.createElement(
    'btn fff',
    this.direction + ' ' + 'unviewed element'
  );

  /**
   * Creates a span element.
   *
   * @param cls Class name.
   * @param title Optional title/aria-label string.
   * @returns The newly created element.
   */
  public static createElement(cls: string, title = ''): Element {
    const element = document.createElement('span');
    element.className = cls;
    if (title) {
      element.title = title;
      element.setAttribute('aria-label', title);
    }
    return element;
  }

  constructor(public direction: string) {
    this.span.id = direction;
    const order =
      direction === 'next'
        ? [this.f, this.ff, this.fff]
        : [this.fff, this.ff, this.f];
    for (const span of order) {
      span.classList.add(direction);
      span.setAttribute('tabindex', '0');
      this.span.appendChild(span);
    }
    this.hide();
  }

  public show() {
    this.f.classList.remove('hidden');
    this.ff.classList.remove('hidden');
    this.fff.classList.remove('hidden');
  }

  public hide() {
    this.f.classList.add('hidden');
    this.ff.classList.add('hidden');
    this.fff.classList.add('hidden');
  }
}

class Access {
  public anchor = Buttons.createElement('btn center', 'access');
  private select: HTMLSelectElement = document.createElement('select');
  private test: FireTest;

  public constructor() {
    this.select.id = 'access';
    this.select.classList.add('access');
    this.anchor.appendChild(this.select);
  }

  public init(test: FireTest) {
    this.test = test;
    this.select.addEventListener('change', (e: any) => {
      this.test.goTest(e.target.value);
    });
    for (const name of this.test.order) {
      const option = document.createElement('option');
      option.setAttribute('value', name);
      option.classList.add('access');
      option.textContent = name;
      this.select.appendChild(option);
    }
    this.update();
  }

  public update() {
    this.select.value = this.test.currentTest().name;
  }
}

export const forwardBtn = new Buttons('next');
export const backwardBtn = new Buttons('previous');
export const access = new Access();

/**
 * @param button
 * @param method
 */
function addListener(button: Element, method: EventListener) {
  button.addEventListener('click', method);
  button.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      method(e);
    }
  });
}

/**
 * @param test
 */
function addListeners(test: FireTest) {
  addListener(backwardBtn.f, async () => await test.cycleTests(false));
  addListener(
    backwardBtn.ff,
    async () => await test.cycleUnchangedTests(false)
  );
  addListener(backwardBtn.fff, async () => await test.cycleNewTests(false));
  addListener(forwardBtn.f, async () => await test.cycleTests(true));
  addListener(forwardBtn.ff, async () => await test.cycleUnchangedTests(true));
  addListener(forwardBtn.fff, async () => await test.cycleNewTests(true));
}

/**
 * @param test
 */
export function updateAccess() {
  access.update();
}

/**
 * @param test
 */
export function init(test: FireTest) {
  addListeners(test);
  const div = document.createElement('div');
  div.classList.add('btns');
  document.body.appendChild(div);
  div.appendChild(backwardBtn.span);
  backwardBtn.show();
  access.init(test);
  div.appendChild(access.anchor);
  const up = Buttons.createElement('btn center', 'selection');
  up.textContent = 'Selection';
  up.setAttribute('tabindex', '0');
  addListener(up, () => {
    test.saveTest(test.getTest());
    window.location.assign('selection.html');
  });
  div.appendChild(up);
  div.appendChild(forwardBtn.span);
  forwardBtn.show();
}

/**
 * @param test
 * @param clear
 */
export function harvest(test: FireTest, clear = () => {}) {
  addListeners(test);
  const div = document.createElement('div');
  div.classList.add('btns');
  document.body.appendChild(div);
  div.appendChild(backwardBtn.span);
  backwardBtn.show();
  access.init(test);
  div.appendChild(access.anchor);
  const up = Buttons.createElement('btn center', 'selection');
  up.textContent = 'Save';
  up.setAttribute('tabindex', '0');
  addListener(up, () => {
    test.saveTest(test.getTest());
    clear();
  });
  div.appendChild(up);
  div.appendChild(forwardBtn.span);
  forwardBtn.show();
}
