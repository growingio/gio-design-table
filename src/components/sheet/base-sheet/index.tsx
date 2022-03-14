import React from 'react';
import {
  SpreadSheet
} from '@antv/s2';
import { useControlledState, usePrefixCls } from '@gio-design/utils'
import { Loading } from '@gio-design/components';
import { SheetProps } from '../../interfaces';
import { useSpreadSheet } from '../../../hooks';
import { getSheetComponentOptions, getSheetConditionsOption } from '../../../utils';
import { Header } from '../../header'
import './index.less';


export const BaseSheet = React.forwardRef(
  (props: SheetProps, ref: React.ForwardedRef<SpreadSheet | undefined>) => {
    const { options = {}, type: sheetType = 'pivot', prefixCls: customizePrefixCls, loading: propsLoading = false, header = { legendConfig: { open: true } } } = props;
    const prefixCls = usePrefixCls('d-table', customizePrefixCls);
    // 此处将扩展的背景标注参数 转换为S2 可识别的参数
    const conditions = getSheetConditionsOption((options as SheetProps['options']).conditions)
    const s2Options = getSheetComponentOptions(props.options, { conditions });
    const [innerLoading] = useControlledState(propsLoading, false);

    const { s2Ref, loading, containerRef, wrapRef } = useSpreadSheet(props, {
      sheetType,
    });

    React.useImperativeHandle<SpreadSheet | undefined, SpreadSheet | undefined>(ref, () => s2Ref.current, [s2Ref]);
    React.useEffect(() => {
      s2Ref.current?.interaction.hideColumns(
        s2Options.interaction?.hiddenColumnFields,
      );
    }, [s2Options.interaction?.hiddenColumnFields, s2Ref]);

    return (
      <React.StrictMode>
        <Loading loading={innerLoading || loading}>
          <div ref={wrapRef as React.RefObject<HTMLDivElement>} className={`${prefixCls}-wrapper`}>
            {header && (
              <Header
                {...header}
                sheet={s2Ref.current as SpreadSheet}
                width={containerRef?.current?.getBoundingClientRect()?.width || s2Options.width}
              />
            )}
            <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`${prefixCls}-container`} />
          </div>
        </Loading>
      </React.StrictMode>
    );
  },
);

