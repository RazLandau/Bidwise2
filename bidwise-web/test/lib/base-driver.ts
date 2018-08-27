import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { dataHook, eventually } from '../test-common';

export class BaseDriver<Props = {}> {
  protected component: ReactWrapper;
  protected componentData: Props;
  protected isRendered: boolean;
  protected attachedToDOM: boolean;

  constructor(component?: ReactWrapper) {
    this.component = component;
    this.componentData = {} as Props;
    this.isRendered = false;
    this.attachedToDOM = false;
  }

  givenProp<T extends keyof Props>(key: T, value: Props[T]) {
    this.componentData[key] = value;
    return this;
  }

  getProp<T extends keyof Props>(key: T): Props[T] {
    return this.componentData[key];
  }

  async render(
    component: React.ComponentType,
    options = { attachToDOM: false },
  ) {
    this.isRendered = true;
    this.attachedToDOM = options.attachToDOM;
    const element = React.createElement(component, this.componentData);
    this.component = mount(element, {
      attachTo: options.attachToDOM
        ? document.body.appendChild(document.createElement('div'))
        : undefined,
    });
    return eventually(() =>
      expect(this.getByDataHook('is-loading').exists()).to.equal(false),
    );
  }

  getByDataHook(
    hook: string,
    component: ReactWrapper = this.component,
  ): ReactWrapper {
    return component.find(dataHook(hook));
  }

  cleanup() {
    if (!this.component) {
      return;
    }
    if (this.attachedToDOM) {
      this.component.detach();
    } else {
      this.component.unmount();
    }
  }

  exists() {
    return this.component.exists();
  }
}
