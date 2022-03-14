import {
  CellScrollPosition,
  TargetCellInfo,
  S2Constructor,
  SpreadSheet,
  ViewMeta,
  LayoutResult,
  SortParams,
  DataCell,
  DataType,
  CollapsedRowsType,
  HiddenColumnsInfo,
  ResizeParams,
  ResizeInfo,
  Data,
  Conditions,
  Condition
} from '@antv/s2';
import { Event as CanvasEvent } from '@antv/g-canvas';
import { HeaderConfigProps } from './header';
import { GioS2DataConfig, GioS2Options, GioThemeConfig } from '../core/interfaces';
/**
 * 表格类型: 透视表｜明细表
 */
export type SheetType = 'pivot' | 'table';

/**
 * 自适应宽高配置
 */
export type Adaptive =
  | boolean
  | {
    width?: boolean;
    height?: boolean;
    getContainer?: () => HTMLElement;
  };
export type CellEventCallback = (data: TargetCellInfo) => void;

export interface BaseSheetEventsProps {
  // ============== Row Cell ====================
  onRowCellHover?: (data: TargetCellInfo) => void;
  onRowCellClick?: (data: TargetCellInfo) => void;
  onRowCellDoubleClick?: (data: TargetCellInfo) => void;
  onRowCellMouseDown?: (data: TargetCellInfo) => void;
  onRowCellMouseUp?: (data: TargetCellInfo) => void;
  onRowCellMouseMove?: (data: TargetCellInfo) => void;
  onRowCellCollapseTreeRows?: (params: {
    id: number;
    isCollapsed: boolean;
    node: Node;
  }) => void;

  // ============== Col Cell ====================
  onColCellHover?: (data: TargetCellInfo) => void;
  onColCellClick?: (data: TargetCellInfo) => void;
  onColCellDoubleClick?: (data: TargetCellInfo) => void;
  onColCellMouseDown?: (data: TargetCellInfo) => void;
  onColCellMouseUp?: (data: TargetCellInfo) => void;
  onColCellMouseMove?: (data: TargetCellInfo) => void;

  // ============== Data Cell ====================
  onDataCellHover?: (data: TargetCellInfo) => void;
  onDataCellClick?: (data: TargetCellInfo) => void;
  onDataCellDoubleClick?: (data: TargetCellInfo) => void;
  onDataCellMouseDown?: (data: TargetCellInfo) => void;
  onDataCellMouseUp?: (data: TargetCellInfo) => void;
  onDataCellMouseMove?: (data: TargetCellInfo) => void;
  onDataCellTrendIconClick?: (meta: ViewMeta) => void;
  onDataCellBrushSelection?: (brushRangeDataCells: DataCell[]) => void;

  // ============== Corner Cell ====================
  onCornerCellHover?: (data: TargetCellInfo) => void;
  onCornerCellClick?: (data: TargetCellInfo) => void;
  onCornerCellDoubleClick?: (data: TargetCellInfo) => void;
  onCornerCellMouseDown?: (data: TargetCellInfo) => void;
  onCornerCellMouseUp?: (data: TargetCellInfo) => void;
  onCornerCellMouseMove?: (data: TargetCellInfo) => void;

  // ============== Merged Cells ====================
  onMergedCellsHoverer?: (data: TargetCellInfo) => void;
  onMergedCellClick?: (data: TargetCellInfo) => void;
  onMergedCellsDoubleClick?: (data: TargetCellInfo) => void;
  onMergedCellsMouseDown?: (data: TargetCellInfo) => void;
  onMergedCellsMouseUp?: (data: TargetCellInfo) => void;
  onMergedCellsMouseMove?: (data: TargetCellInfo) => void;

  // ============== Sort ====================
  onRangeSort?: (params: SortParams) => void;
  onRangeSorted?: (event: CanvasEvent) => void;

  // ============== Filter ====================
  onRangeFilter?: (data: {
    filterKey: string;
    filteredValues: string[];
  }) => void;
  onRangeFiltered?: (data: DataType[]) => void;

  // ============== Layout ====================
  onLayoutAfterHeaderLayout?: (layoutResult: LayoutResult) => void;
  onLayoutPagination?: (data: {
    pageSize: number;
    pageCount: number;
    total: number;
    current: number;
  }) => void;
  onLayoutCellScroll?: (position: CellScrollPosition) => void;
  onLayoutAfterCollapseRows?: (data: CollapsedRowsType) => void;
  onCollapseRowsAll?: (hierarchyCollapse: boolean) => void;
  onLayoutColsExpanded?: (node: Node) => void;
  onLayoutColsHidden?: (data: {
    currentHiddenColumnsInfo: HiddenColumnsInfo;
    hiddenColumnsDetail: HiddenColumnsInfo[];
  }) => void;
  onBeforeRender?: () => void;
  onAfterRender?: () => void;
  onDestroy?: () => void;

  // ============== Resize ====================
  onLayoutResize?: (params: ResizeParams) => void;
  onLayoutResizeSeriesWidth?: (params: ResizeParams) => void;
  onLayoutResizeRowWidth?: (params: ResizeParams) => void;
  onLayoutResizeRowHeight?: (params: ResizeParams) => void;
  onLayoutResizeColWidth?: (params: ResizeParams) => void;
  onLayoutResizeColHeight?: (params: ResizeParams) => void;
  onLayoutResizeTreeWidth?: (params: ResizeParams) => void;
  onLayoutResizeMouseDown?: (data: {
    event: Partial<MouseEvent>;
    resizeInfo?: ResizeInfo;
  }) => void;
  onLayoutResizeMouseUp?: (data: {
    event: Partial<MouseEvent>;
    resizeInfo?: ResizeInfo;
  }) => void;
  onLayoutResizeMouseMove?: (data: {
    event: Partial<MouseEvent>;
    resizeInfo?: ResizeInfo;
  }) => void;

  // ============== Global ====================
  onKeyBoardDown?: (event: KeyboardEvent) => void;
  onKeyBoardUp?: (event: KeyboardEvent) => void;
  onCopied?: (copyData: string) => void;
  onActionIconHover?: (event: CanvasEvent) => void;
  onActionIconClick?: (event: CanvasEvent) => void;
  onContextMenu?: (event: CanvasEvent) => void;
  onMouseHover?: (event: CanvasEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onSelected?: (cells: DataCell[]) => void;
  onReset?: (event: KeyboardEvent) => void;
  onLinkFieldJump?: (data: { key: string; record: Data }) => void;

}
export type ThemeConfig = Omit<GioThemeConfig, 'name'>

export interface ConditionConfig extends Omit<Condition, 'mapping'> {
  mapping?: Condition['mapping']
}
export interface ConditionsConfig extends Omit<Conditions, 'background'> {
  background: ConditionConfig[]
}
export interface OptionsConfig extends Omit<GioS2Options, 'conditions'> {
  conditions?: ConditionsConfig
}
export interface BaseSheetProps extends BaseSheetEventsProps {
  spreadsheet?: (...args: S2Constructor) => SpreadSheet;
  dataConfig: GioS2DataConfig;
  options: OptionsConfig;
  loading?: boolean;

  // partDrillDown?: PartDrillDown;
  /**
   * 是否开启自适应宽高，并指定容器,如果为true时，按照内部的container 自适应宽高。可以对宽高分别设置
   */
  adaptive?: Adaptive;

  themeConfig?: ThemeConfig;
  prefixCls?: string;
  header?: HeaderConfigProps;
  // empty?: () => JSX.Element;
}
export interface SheetProps extends BaseSheetProps {
  /**
   * sheet 类型
   * @default 'pivot'
   */
  type?: SheetType;
}