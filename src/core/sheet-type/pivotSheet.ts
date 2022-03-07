import { BaseDataSet, PivotSheet, S2Options, SpreadSheetFacetCfg, ViewMeta } from "@antv/s2";
import { GioPivotDataSet, GioCustomTreePivotDataSet } from "../data-set";
import { CustomDataCell as GioDataCell } from '../cell/dataCell'

export class CustomPivotSheet extends PivotSheet {
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

  protected getFacetCfgFromDataSetAndOptions(): SpreadSheetFacetCfg {
    const { fields, meta } = this.dataSet;
    const { style, dataCell } = this.options;
    // 默认单元格实现
    const defaultCell = (facet: ViewMeta) => new GioDataCell(facet, this);

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
}