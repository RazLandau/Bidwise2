import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { dataHook, eventually } from '../test-common';
import { ApiInterceptor, ApiInterceptorResult } from './api-interceptor';
import { getDefaultApiMocks } from './api-mocks.builder';
import { Dependencies, withProviders } from '../../src/providers';
import { getDefaultDependencies } from './dependencies.builder';

export class BaseDriver<Props = {}> {
  protected component: ReactWrapper;
  protected componentData: Props;
  protected dependencies: Dependencies;
  protected isRendered: boolean;
  protected attachedToDOM: boolean;
  protected apiMocks: ApiInterceptorResult[];

  constructor(component?: ReactWrapper) {
    this.component = component;

    this.componentData = {} as Props;
    this.dependencies = getDefaultDependencies();
    this.isRendered = false;
    this.attachedToDOM = false;
    this.apiMocks = getDefaultApiMocks();
  }

  givenProp<T extends keyof Props>(key: T, value: Props[T]) {
    this.componentData[key] = value;
    return this;
  }

  getProp<T extends keyof Props>(key: T): Props[T] {
    return this.componentData[key];
  }

  givenDependency<T extends keyof Dependencies>(
    key: T,
    value: Dependencies[T],
  ) {
    this.dependencies[key] = value;
    return this;
  }

  givenApiMock(interceptionResult: ApiInterceptorResult) {
    this.apiMocks.push(interceptionResult);

    if (this.isRendered) {
      this.mockRequests();
    }
    return this;
  }

  async render(
    component: React.ComponentType,
    options = { attachToDOM: false },
  ) {
    this.isRendered = true;
    this.attachedToDOM = options.attachToDOM;

    const element = React.createElement(component, this.componentData);
    const wrappedComponent = withProviders(this.dependencies)(element);

    this.mockRequests();

    this.component = mount(wrappedComponent, {
      attachTo: options.attachToDOM
        ? document.body.appendChild(document.createElement('div'))
        : undefined,
    });

    return eventually(() =>
      expect(this.getByDataHook('is-loading').exists()).to.equal(false),
    );
  }

  mockRequests() {
    ApiInterceptor.apply(this.apiMocks);
    return this;
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
