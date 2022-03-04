/* eslint-disable dot-notation */
import { toNumber } from "lodash";

interface LooseObject {
  [name: string]: any;
}
export const transformData = (
  chartData: LooseObject,
) => {
  const source = chartData?.data || [];
  const columns: any[] = chartData?.meta?.columns || [];

  const data = source.map((item: LooseObject) => {
    const row = {} as LooseObject;
    columns?.forEach((column: LooseObject, index: number) => {
      const value = item?.[index];
      let _formatter = (v: number | string) => v;
      if (typeof value === 'number' && column?.format === 'percent') {
        _formatter = (v) => (toNumber(v)) * 100;
      }
      // const _formatter = formatter || defaultFormatter(column, chartType);

      row[column.id] = _formatter(value);
      row.name = column?.name;
    });
    return row;
  });
  const meta = columns.map((c) => ({ field: c.id, name: c.name, ...c }));

  const fields = columns.reduce((acc, cur) => {
    if (cur.isDim) {
      if (cur.id !== 'segmentation') {
        acc['rows'] = [...acc['rows'], cur.id]
      }
    } else {
      acc['values'] = [...acc['values'], cur.id]
    }
    return acc;
  }, { valueInCols: true, columns: ['segmentation'], values: [], rows: [] });

  return { data, meta, fields };
};