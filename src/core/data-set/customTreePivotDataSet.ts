import { CustomTreePivotDataSet, ValueRange } from "@antv/s2";
import { getValueRangeByField } from "../util";

export class GioCustomTreePivotDataSet extends CustomTreePivotDataSet {
  public getValueRangeByField(field: string): ValueRange {
    return getValueRangeByField(this.spreadsheet, this.originData, field)
  }
} 