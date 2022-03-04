import { ListItem, TooltipDetailProps, } from '@antv/s2';
import { usePrefixCls } from '@gio-design/utils';
import { Icon } from './TooltipIcon';
import { TOOLTIP_PREFIX_CLS } from '../../../common'

export function TooltipDetail(props: TooltipDetailProps) {
  const { list = [] } = props;
  const clsPrefix = usePrefixCls(TOOLTIP_PREFIX_CLS);
  return (
    <div className={`${clsPrefix}-detail-list`}>
      {list.map((listItem: ListItem, idx) => {
        const { name, value, icon } = listItem;
        const k = `${value}-${idx}`;
        return (
          <div
            key={k}
            className={`${clsPrefix}-detail-item`}
          >
            <span className={`${clsPrefix}-detail-item-key`}>
              {name}
            </span>
            <span
              className={`${clsPrefix}-detail-item-val ${clsPrefix}-highlight`}
            >
              {icon ? <Icon icon={icon} width={8} height={7} /> : null} {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
