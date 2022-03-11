import {
  BaseDataSet, Node, CornerHeaderConfig, PivotSheet,
  S2Options, SpreadSheet, SpreadSheetFacetCfg, ViewMeta, ColHeaderConfig,
  S2MountContainer, S2DataConfig, customMerge, TooltipOperatorOptions,
  SortMethod, InterceptType, S2Event,
  TOOLTIP_OPERATOR_SORT_MENUS, EXTRA_FIELD, SortParam, CornerNodeType, TOOLTIP_OPERATOR_TABLE_SORT_MENUS
} from "@antv/s2";
import { Event as CanvasEvent } from '@antv/g-canvas';
import { clone, first, isEqual, last } from "lodash";
import { GioPivotDataSet, GioCustomTreePivotDataSet } from "../data-set";
import { CustomDataCell as GioDataCell } from '../cell/dataCell'
import { CustomCornerCell } from "../cell/cornerCell";
import { CustomColCell } from "../cell/colCell";

export class CustomPivotSheet extends PivotSheet {
  public constructor(
    dom: S2MountContainer,
    dataCfg: S2DataConfig,
    options: S2Options,
  ) {
    super(dom, dataCfg, options);
    // 注册定制的 cell 实现
    const colCell = this.options.colCell ?? this.getColCell;
    const cornerCell = this.options.cornerCell ?? this.getCornerCell
    this.options = customMerge(this.options, { colCell, cornerCell });;

  }

  protected getCellInstance(
    item: Node,
    spreadsheet: SpreadSheet,
    headerConfig: ColHeaderConfig,
  ) {
    return new CustomColCell(item, spreadsheet, headerConfig);
  }

  public getDataSet(options: S2Options): BaseDataSet {
    const { dataSet, hierarchyType } = options;
    if (dataSet) {
      return dataSet(this);
    }
    const realDataSet =
      hierarchyType === 'customTree'
        ? new GioCustomTreePivotDataSet(this)
        : new GioPivotDataSet(this);
    return realDataSet;
  }

  // CellCallback<T extends BaseHeaderConfig> = (node: Node, spreadsheet: SpreadSheet, headerConfig: T) => S2CellType;
  protected getCornerCell<T extends CornerHeaderConfig>(node: Node, spreadsheet: SpreadSheet, headerConfig: T) {
    return new CustomCornerCell(node, spreadsheet, headerConfig);
  }

  protected getColCell<T extends ColHeaderConfig>(node: Node, spreadsheet: SpreadSheet, headerConfig: T) {
    return new CustomColCell(node, spreadsheet, headerConfig);
  }

  protected getFacetCfgFromDataSetAndOptions(): SpreadSheetFacetCfg {
    const { fields, meta } = this.dataSet;
    const { style, dataCell } = this.options;
    // 默认单元格实现
    const defaultDataCell
      = (facet: ViewMeta) => new GioDataCell(facet, this);

    return {
      ...fields,
      ...style,
      ...this.options,
      meta,
      spreadsheet: this,
      dataSet: this.dataSet,
      dataCell: dataCell ?? defaultDataCell,
    };
  }

  public handleGroupSort(event: CanvasEvent, meta: Node) {
    event.stopPropagation();
    this.interaction.addIntercepts([InterceptType.HOVER]);
    const isCornerRow = meta.cornerType === CornerNodeType.Row;
    const { rows } = this.dataCfg.fields;
    const isFirstCol = meta.isPivotMode && isCornerRow && isEqual(first(rows), meta.field);
    const operator: TooltipOperatorOptions = {
      onClick: (arg) => {
        const { key } = arg as any;
        // console.log('sort menu click:', arg)
        this.groupSortByMethod(key as unknown as SortMethod, meta);
        // 排序事件完成触发
        this.emit(S2Event.RANGE_SORTED, event);
      },
      menus: isFirstCol ? TOOLTIP_OPERATOR_TABLE_SORT_MENUS : TOOLTIP_OPERATOR_SORT_MENUS
    };

    this.showTooltipWithInfo(event, [], {
      operator,
      onlyMenu: true,
    });
  }

  public groupSortByMethod(sortMethod: SortMethod, meta: Node) {
    const { rows, columns } = this.dataCfg.fields;
    // 是否为角头列的排序
    const isCornerRow = meta.cornerType === CornerNodeType.Row;
    const ifHideMeasureColumn = this.options.style?.colCfg?.hideMeasureColumn;
    let sortFieldId = this.isValueInCols() ? last(rows) : last(columns);

    // 如果为角头行维度的排序，则filedId为当前单元格的filed
    if (isCornerRow) {
      sortFieldId = meta.field;
    }
    const { query, value } = meta;
    const sortQuery = clone(query);
    let sortValue = value;
    // 数值置于列头且隐藏了指标列头的情况, 会默认取第一个指标做组内排序, 需要还原指标列的query, 所以多指标时请不要这么用……
    if (ifHideMeasureColumn && this.isValueInCols() && sortQuery) {
      sortValue = this.dataSet.fields?.values?.[0] as string;
      sortQuery[EXTRA_FIELD] = sortValue;
    }

    const sortParam: SortParam = {
      sortFieldId: sortFieldId ?? '',
      sortMethod,
      sortByMeasure: sortValue,
      query: sortQuery,
    };
    const prevSortParams = this.dataCfg.sortParams?.filter(
      (item) => item?.sortFieldId !== sortFieldId,
    ) || [];
    // 触发排序事件
    this.emit(S2Event.RANGE_SORT, [...prevSortParams, sortParam]);
    this.setDataCfg({
      ...this.dataCfg,
      sortParams: [...prevSortParams, sortParam],
    });
    console.log('groupSort', meta.field, [...prevSortParams, sortParam])

    this.render();
  }
  // protected buildFacet() {
  //   const facetCfg = this.getFacetCfgFromDataSetAndOptions();
  //   this.facet?.destroy();
  //   this.facet = new GioPivotFacet(facetCfg);
  //   this.facet.render();
  // }
}