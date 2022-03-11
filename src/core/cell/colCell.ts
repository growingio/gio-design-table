import { ColCell, ColHeaderConfig, SortParam } from "@antv/s2";
import { find, get, isEqual } from "lodash";
import { GioS2DataConfig } from "../interfaces";
import { getSortTypeIcon } from "../util";

export class CustomColCell extends ColCell {
  protected handleRestOptions(...[headerConfig]: [ColHeaderConfig]) {
    this.headerConfig = { ...headerConfig };
    const { value, query, field } = this.meta;
    const sortParams = this.spreadsheet.dataCfg.sortParams;
    const { sortMeta = [] } = this.spreadsheet.dataCfg as GioS2DataConfig;
    const sort = sortMeta.find(s => s.field === field);
    const noSort = isEqual(sort?.canSort, false);
    const isSortCell = this.isSortCell() && !noSort; // 当前单元格是否为需要展示排序 icon 单元格
    ///----------
    // const data = this.headerConfig.data;
    // console.log('custom colcell handleRestOptions', { isSortCell, sortParams, value, query, cornerNodes: data })
    ///------------
    const sortParam = find(
      sortParams?.reverse(),
      (item) =>
        isSortCell &&
        item?.sortByMeasure === value &&
        isEqual(get(item, 'query'), query),
    ) as SortParam;
    const type = getSortTypeIcon(sortParam, isSortCell);
    this.headerConfig.sortParam = {
      ...this.headerConfig.sortParam,
      ...(sortParam || { query }),
      type,
    };
  }
}