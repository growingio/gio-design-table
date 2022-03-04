import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import { TooltipInfosProps } from '../interfaces';
import { TOOLTIP_PREFIX_CLS } from '../../../common'

export function TooltipInfos(props: TooltipInfosProps) {
  const { infos = '' } = props;
  const clsPrefix = usePrefixCls(TOOLTIP_PREFIX_CLS);
  return <div className={`${clsPrefix}-infos`}>{infos}</div>;
}
