import { BaseTooltip, SpreadSheet, setContainerStyle, TooltipShowOptions } from '@antv/s2';
import { LooseObject } from '@antv/g-canvas';
import ReactDOM from 'react-dom';
import { TooltipComponent } from '.';
import { TooltipRenderProps } from './interfaces';
import './index.less'

export class CustomTooltip extends BaseTooltip {
  public customizePrefixCls: string;

  constructor(spreadsheet: SpreadSheet, customizePrefixCls?: string) {
    super(spreadsheet);
    this.customizePrefixCls = customizePrefixCls || 'gio-d-table-tooltip';
  }

  public show<T = Element | string>(showOptions: TooltipShowOptions<T>) {
    super.show(showOptions);
    const container = this.getContainer();
    setContainerStyle(container, {
      className: `${this.customizePrefixCls}-container-show`,
    });
  }

  public hide() {
    super.hide();
    const container = this.getContainer();
    setContainerStyle(container, {
      className: `${this.customizePrefixCls}-container-hide`,
    });
  }

  renderContent() {
    // 配置级 s2.options.tooltip.content = ''
    const { content: contentFromOptions } = this.spreadsheet.options.tooltip || {};
    // console.log('contentFromOptions', contentFromOptions)
    // 方法级 s2.showTooltip({ content: '' })
    const showOptions = this.options;
    const cell = this.spreadsheet.getCell(showOptions.event?.target as LooseObject);
    const tooltipProps: TooltipRenderProps = {
      ...showOptions,
      cell,
    };
    // 优先级: 方法级 > 配置级, 兼容 content 为空字符串的场景
    const content = showOptions.content ?? contentFromOptions;

    ReactDOM.render(
      <TooltipComponent {...tooltipProps} content={content} />,
      this.container,
    );
  }

  destroy() {
    super.destroy();
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
  }

  protected getContainer(): HTMLElement {
    if (!this.container) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      this.container = container;
      return this.container;
    }
    this.container.className = `${this.customizePrefixCls}-container`;
    return this.container;
  }

}
