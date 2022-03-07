import { BaseDataSet, S2Options, SpreadSheetFacetCfg, TableRowCell, TableSheet, ViewMeta } from "@antv/s2";
import { CustomTableDataCell } from "../cell/tableDataCell";
import { GioTableDataSet } from "../data-set";

export class CustomTableSheet extends TableSheet {
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
}