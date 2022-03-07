/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
export const formatNumber = (value: number | string, decimalCount = 2, intSuffixZeroFill = false) => {
  if (!Number.isFinite(value as number)) {
    return value || '';
  }

  let sign = '';
  if (Number(value) < 0) {
    sign = '-';
    value = Number(value) * -1;
  }

  value = value || 0;
  const intValue = parseInt(`${value}`, 10);
  const decimalValue = (value as number) - intValue;
  let decimalValueStr;
  if (intValue === 0 && decimalCount > 0) {
    decimalValueStr = decimalValue.toPrecision(decimalCount);
  } else {
    decimalValueStr = decimalValue.toFixed(decimalCount);
  }
  const result = String(Number((intValue + parseFloat(decimalValueStr)).toFixed(decimalCount)));

  const fillStr = intSuffixZeroFill ? `.${'0'.repeat(decimalCount)}` : '';
  const decimalPart = result.indexOf('.') >= 0 ? result.slice(result.indexOf('.')) : fillStr;

  let intPart = result.slice(0, result.indexOf('.') >= 0 ? result.indexOf('.') : result.length);
  intPart = intPart
    .split('')
    .map((char, index) => {
      const dotIndex = intPart.length - index - 1;
      return dotIndex % 3 === 0 && dotIndex !== 0 ? `${char},` : char;
    })
    .join('');
  return sign + intPart + decimalPart;
};

// 1,233,123  ==> 1233123
export const parseFormatedNumber = (text: string) => parseFloat(text.replace(/,/g, ''));

// 12   ==> 12%
// 12.3 ==> 12.3%
export const formatPercent = (value: string | number, decimalCount?: number, intSuffixZeroFill = false) => {
  if (!value) {
    return '0%';
  }
  return !Number.isNaN(Number(value))
    ? `${formatNumber((Number(value) || 0) * 100, decimalCount, intSuffixZeroFill)}%`
    : value;
};
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
      const _formatter = (v: number | string) => v;
      // if (typeof value === 'number' && column?.format === 'percent') {
      //   _formatter = (v) => (toNumber(v)) * 100;
      // }
      // const _formatter = formatter || defaultFormatter(column, chartType);

      row[column.id] = _formatter(value);
      row.name = column?.name;
    });
    return row;
  });

  const meta = columns.map((c) => {
    const res = { field: c.id, name: c.name, ...c, }
    // formatter=(value: unknown, data?: Data | Data[]) => string
    if (c.format === 'percent') {
      res.formatter = (v: string | number) => formatPercent(v, 2)
    }
    return res;
  });

  const fields = columns.reduce((acc, cur) => {
    if (cur.isDim) {
      if (cur.id !== 'segmentation') {
        acc['rows'] = [...acc['rows'], cur.id]
      } else if (cur.id === 'segmentation') {
        acc['columns'] = [...acc['columns'], 'segmentation']
      }
    } else {
      acc['values'] = [...acc['values'], cur.id]
    }
    return acc;
  }, { valueInCols: true, columns: [], values: [], rows: [] });

  return { data, meta, fields };
};