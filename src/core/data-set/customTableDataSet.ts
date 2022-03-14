import { TableDataSet, ValueRange } from "@antv/s2";
import { getValueRangeByField } from '../util';

export class GioTableDataSet extends TableDataSet {
  public getValueRangeByField(field: string): ValueRange {
    return getValueRangeByField(this.spreadsheet, this.originData, field)
  }
} 