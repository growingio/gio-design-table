/* eslint-disable react-hooks/exhaustive-deps */
import {
  S2Constructor,
  S2Options,
  SpreadSheet,
} from '@antv/s2';
import React, { useCallback, useEffect, useRef } from 'react';
import { CustomPivotSheet, CustomTableSheet } from '../core/sheet-type';
import type { BaseSheetProps, SheetType } from '../components/interfaces';
import { themeDefault } from '../theme';
import { getSheetComponentOptions, getSheetConditionsOption } from '../utils';
import { useEvents } from './useEvents';
import { useForceUpdate } from './useForceUpdate';
import { useLoading } from './useLoading';
import { usePagination } from './usePagination';
import { usePrevious } from './usePrevious';
import { useResize } from './useResize';

export interface UseSpreadSheetConfig {
  s2Options?: S2Options;
  sheetType: SheetType;
  // container: HTMLDivElement
  // containerRef: React.RefObject<HTMLDivElement>
}


export const useSpreadSheet = (
  props: BaseSheetProps,
  config: UseSpreadSheetConfig,
) => {
  const s2Ref = useRef<SpreadSheet>();
  const containerRef: React.MutableRefObject<HTMLElement | undefined> = useRef<HTMLElement>();
  const wrapRef = React.useRef<HTMLDivElement>();
  const { spreadsheet: customSpreadSheet, dataConfig, options, themeConfig = themeDefault, loading: propsLoading, adaptive } = props;
  const { loading, setLoading } = useLoading(s2Ref.current, propsLoading);
  const pagination = usePagination(s2Ref.current, props);
  const prevDataCfg = usePrevious(dataConfig);
  const prevOptions = usePrevious(options);
  const prevThemeCfg = usePrevious(themeConfig);
  const forceUpdate = useForceUpdate();
  useEvents(props, s2Ref.current);
  function getOptions(_options: BaseSheetProps['options']) {
    // 此处将扩展的背景标注参数 转换为S2 可识别的参数
    const conditions = getSheetConditionsOption((_options as BaseSheetProps['options']).conditions)
    const s2Options = getSheetComponentOptions(_options, { conditions });
    return s2Options;
  }
  const renderSpreadSheet = useCallback(
    (container: HTMLDivElement) => {
      // 此处将扩展的背景标注参数 转换为S2 可识别的参数
      const s2Options = getOptions(options);
      // const s2Options = config.s2Options || getSheetComponentOptions(options);
      const s2ConstructorArgs: S2Constructor = [container, dataConfig, s2Options];
      if (customSpreadSheet) {
        return customSpreadSheet(...s2ConstructorArgs);
      }
      if (config.sheetType === 'table') {
        return new CustomTableSheet(container, dataConfig, s2Options);
      }
      return new CustomPivotSheet(container, dataConfig, s2Options);
    },
    [config.s2Options, config.sheetType, options, dataConfig, customSpreadSheet],
  );
  const buildSpreadSheet = useCallback(() => {
    const { current: container } = containerRef;
    setLoading(true);
    s2Ref.current = renderSpreadSheet(container as HTMLDivElement);
    s2Ref.current.setThemeCfg(themeConfig);
    s2Ref.current.render();
    setLoading(false);
    // 子hook 依赖了s2Ref.current ，需要强制刷新，以便子hook 触发rerender
    forceUpdate();
  }, [props, renderSpreadSheet, setLoading, config, forceUpdate]);

  // init
  useEffect(() => {
    buildSpreadSheet();
    return () => {
      s2Ref.current?.destroy();
    };
  }, []);

  // rerender when dataCfg, options or theme changed
  useEffect(() => {
    let reloadData = false;
    let reBuildDataSet = false;
    if (!Object.is(prevDataCfg, dataConfig)) {
      reloadData = true;
      s2Ref.current?.setDataCfg(dataConfig);
    }

    if (!Object.is(prevOptions, options)) {
      if (!Object.is(prevOptions?.hierarchyType, options?.hierarchyType)) {
        // 自定义树目录需要重新构建 CustomTreePivotDataSet
        reBuildDataSet = true;
        reloadData = true;
        s2Ref.current?.setDataCfg(dataConfig);
      }
      // 此处将扩展的背景标注参数 转换为S2 可识别的参数
      const s2Options = getOptions(options);
      s2Ref.current?.setOptions(s2Options);
    }
    if (!Object.is(prevThemeCfg, themeConfig)) {
      s2Ref.current?.setThemeCfg(themeConfig);
    }

    s2Ref.current?.render(reloadData, reBuildDataSet);
    if (reloadData || reBuildDataSet) {
      forceUpdate();
    }
  }, [dataConfig, options, prevDataCfg, prevOptions, prevThemeCfg, themeConfig]);

  useResize({
    // s2Ref: s2Ref,
    container: containerRef.current as HTMLElement,
    s2: s2Ref.current as SpreadSheet,
    containerRef,
    wrapperRef: wrapRef,
    adaptive,
  });

  return {
    s2Ref,
    containerRef,
    wrapRef,
    loading,
    setLoading,
    pagination,
  };
}
