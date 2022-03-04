/* eslint-disable  no-return-await */
/* eslint-disable  no-promise-executor-return */
import EE from '@antv/event-emitter';
import { Canvas } from '@antv/g-canvas';

import {
  Store,
  S2Options,
  SpreadSheet,
  BaseTooltip,
  customMerge,
  DEFAULT_OPTIONS,
  RootInteraction,
} from '@antv/s2';


export const getContainer = () => {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('style', 'margin-left: 32px');
  document.body.appendChild(rootContainer);
  return rootContainer;
};

export const sleep = async (timeout = 0) => await new Promise((resolve) => setTimeout(resolve, timeout));

export const createFakeSpreadSheet = () => {
  class FakeSpreadSheet extends EE {
    public options: S2Options | undefined;

    public setOptions(options: S2Options) {
      this.options = customMerge(this.options, options);
    }
  }

  const s2 = new FakeSpreadSheet() as SpreadSheet;
  s2.options = DEFAULT_OPTIONS;
  const interaction = new RootInteraction(s2 as unknown as SpreadSheet);
  s2.store = new Store();
  s2.interaction = interaction;
  s2.tooltip = {
    container: {} as HTMLElement,
  } as BaseTooltip;
  s2.container = {
    draw: jest.fn(),
  } as unknown as Canvas;
  s2.getCellType = jest.fn();
  s2.render = jest.fn();
  s2.hideTooltip = jest.fn();
  s2.showTooltipWithInfo = jest.fn();

  return s2;
};