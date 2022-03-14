import { ColHeaderConfig, SortParam, TableColCell } from "@antv/s2";
import { find, isEqual } from "lodash";
import { GioS2DataConfig } from "..";
import { getSortTypeIcon } from "../util";

export class CustomTableColCell extends TableColCell {
  protected handleRestOptions(...[headerConfig]: [ColHeaderConfig]) {
    this.headerConfig = { ...headerConfig };
    const { field } = this.meta;
    const sortParams = this.spreadsheet.dataCfg.sortParams;
    const { sortMeta = [] } = this.spreadsheet.dataCfg as GioS2DataConfig;
    const sort = sortMeta.find(s => s.field === field);
    const noSort = isEqual(sort?.canSort, false);
    const isSortCell = this.isSortCell() && !noSort; // 当前单元格是否为需要展示排序 icon 单元格
    const sortParam: SortParam = find(
      sortParams,
      (item) => item?.sortFieldId === field,
    ) as SortParam;

    const type = getSortTypeIcon(sortParam, isSortCell);
    this.headerConfig.sortParam = {
      ...this.headerConfig.sortParam,
      ...(sortParam || {}),
      type,
    };
  }
}