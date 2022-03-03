import React from 'react';
import { TooltipNameTipsOptions } from '@antv/s2';
import { usePrefixCls } from '@gio-design/utils';
import { TOOLTIP_PREFIX_CLS } from '../../../common'

export function SimpleTips(props: TooltipNameTipsOptions) {
  const { tips = '', name = '' } = props;
  const prefixCls = usePrefixCls(TOOLTIP_PREFIX_CLS)
  return (
    <>
      {name && <div className={`${prefixCls}-name`}>{name}</div>}
      {tips && <div className={`${prefixCls}-tips`}>{tips}</div>}
    </>
  );
}
