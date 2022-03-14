import {
  BaseDataSet,
  ColHeaderConfig,
  customMerge,
  S2DataConfig,
  S2MountContainer,
  S2Options,
  SERIES_NUMBER_FIELD,
  SpreadSheet,
  SpreadSheetFacetCfg,
  TableCornerCell,
  TableRowCell,
  TableSheet,
  ViewMeta,
  Node,
  InterceptType,
  TooltipOperatorOptions,
  i18n,
  SortParam,
  S2Event
} from "@antv/s2";
import { Event as CanvasEvent } from '@antv/g-canvas';
import { CustomTableColCell, CustomTableDataCell } from "../cell";
import { GioTableDataSet } from "../data-set";
import { getTableSortMenus } from "../util/tooltip";

export class CustomTableSheet extends TableSheet {
  public constructor(
    dom: S2MountContainer,
    dataCfg: S2DataConfig,
    options: S2Options,
  ) {
    super(dom, dataCfg, options);
    // 注册定制的 cell 实现
    const colCell = this.options.colCell ?? this.getCellInstance;
    this.options = customMerge(this.options, { colCell });;

  }

  protected getCellInstance(
    item: Node,
    spreadsheet: SpreadSheet,
    headerConfig: ColHeaderConfig,
  ) {
    return item.field === SERIES_NUMBER_FIELD
      ? new TableCornerCell(item, spreadsheet, headerConfig)
      : new CustomTableColCell(item, spreadsheet, headerConfig);
  }

  public getDataSet(options: S2Options): BaseDataSet {
    const { dataSet } = options;
    if (dataSet) {
      return dataSet(this);
    }

    return new GioTableDataSet(this);
  }

  protected getFacetCfgFromDataSetAndOptions(): SpreadSheetFacetCfg {
    const { fields, meta } = this.dataSet;
    const { style, dataCell } = this.options;
    // 默认单元格实现
    const defaultCell = (facet: ViewMeta) => {
      if (this.options.showSeriesNumber && facet.colIndex === 0) {
        return new TableRowCell(facet, this);
      }
      return new CustomTableDataCell(facet, this);
    };
    return {
      ...fields,
      ...style,
      ...this.options,
      meta,
      spreadsheet: this,
      dataSet: this.dataSet,
      dataCell: dataCell ?? defaultCell,
    };
  }

  public onSortTooltipClick = ({ key }: { key: string }, meta: Node) => {
    const { field } = meta;

    const prevOtherSortParams = [] as SortParam[];
    let prevSelectedSortParams: SortParam = {} as SortParam;
    this.dataCfg.sortParams?.forEach((item) => {
      if (item?.sortFieldId !== field) {
        prevOtherSortParams.push(item);
      } else {
        prevSelectedSortParams = item;
      }
    });

    const sortParam: SortParam = {
      ...(prevSelectedSortParams || {}),
      sortFieldId: field,
      sortMethod: key as unknown as SortParam['sortMethod'],
    };
    // 触发排序事件
    this.emit(S2Event.RANGE_SORT, [...prevOtherSortParams, sortParam]);
  }

  public handleGroupSort(event: CanvasEvent, meta: Node) {
    event.stopPropagation();
    this.interaction.addIntercepts([InterceptType.HOVER]);
    const operator: TooltipOperatorOptions = {
      onClick: (params) => {
        const { key } = params as { key: string };
        this.onSortTooltipClick({ key }, meta)
      },
      menus: getTableSortMenus(i18n),
    };

    this.showTooltipWithInfo(event, [], {
      operator,
      onlyMenu: true,
    });
  }

}