
import { PivotDataSet, ValueRange } from '@antv/s2';
import { getValueRangeByField } from '../util';

export class GioPivotDataSet extends PivotDataSet {
  public getValueRangeByField(field: string): ValueRange {
    return getValueRangeByField(this.spreadsheet, this.originData, field)
  }
}