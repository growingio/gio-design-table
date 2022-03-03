import React from 'react';
import { ListItem, TooltipHeadInfo } from '@antv/s2';
import { usePrefixCls } from '@gio-design/utils';
import { TOOLTIP_PREFIX_CLS } from '../../../common'

export function TooltipHead(props: Partial<TooltipHeadInfo>) {
  const { rows = [], cols = [] } = props;
  const clsPrefix = usePrefixCls(TOOLTIP_PREFIX_CLS);
  return (
    <div className={`${clsPrefix}-head-info-list`}>
      {cols.map((item: ListItem) => item.value)?.join('/')}
      {cols.length > 0 && rows.length > 0 && '，'}
      {rows.map((item: ListItem) => item.value)?.join('/')}
    </div>
  );
}
