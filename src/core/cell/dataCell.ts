import { DataCell, TextTheme } from '@antv/s2'
import { isEmpty, isNil } from 'lodash';
import { parseNumberWithPrecision, computeArrayPosition } from '../util'
import { CELL_COLOR_MAP } from '../../common'
/**
 * dataCell背景标注的颜色 [backgroudColor,textColor]
 */
const CellColorMap = CELL_COLOR_MAP;
/**
 [
 ['#DEE7FF', '#242E59'],// positive1
 ['#BBCCFF', '#242E59'],// positive2
 ['#8CA9FF', '#242E59'],// positive3
 ['#4875FB', '#FFFFFF'],// positive4
 ['#1649DF', '#FFFFFF'],// positive5
 ['#FFFFFF', '#242E59'],// zero
 // ['#FFFFFF', '#242E59'],// zero
 ['#FAF3B5', '#242E59'],// negative1
 ['#F7EB81', '#242E59'],// negative2
 ['#EDDD44', '#242E59'],// negative3
 ['#D5C100', '#FFFFFF'],// negative4
 ['#AE9E03', '#FFFFFF'],// negative5
]
*/
export class CustomDataCell extends DataCell {



  protected getTextStyle(): TextTheme {
    const { isTotals } = this.meta;
    const textStyle = isTotals
      ? this.theme.dataCell?.bolderText as TextTheme
      : this.theme.dataCell?.text as TextTheme;

    let { fill } = textStyle;
    // 如果设置了background condition 则需要重新设置文本色，如果同时设置了文本标注 按照文本标注的颜色填充
    // if backgroundCondition reset fill
    const bgCondition = this.conditions?.background ? this.findFieldCondition(this.conditions?.background) : undefined;
    if (bgCondition && bgCondition.mapping) {
      const attrs = this.mappingValue(bgCondition);
      if (attrs && (isNil(attrs.fill) || isEmpty(attrs.fill))) {
        const { minValue, maxValue } = attrs.isCompare
          ? attrs
          : this.spreadsheet.dataSet.getValueRangeByField(this.meta.valueField);
        const fieldValue = parseNumberWithPrecision(
          this.meta.fieldValue as number,
        );
        const index = this.computeColorMapPosition(fieldValue, minValue, maxValue);

        const calculateBgColor = CellColorMap[index];
        fill = calculateBgColor[1];

      }
    }
    // get text condition's fill result
    const textCondition = this.conditions?.text ? this.findFieldCondition(this.conditions?.text) : undefined;
    if (textCondition?.mapping) {
      fill = this.mappingValue(textCondition)?.fill;
    }
    return { ...textStyle, fill };
  }


  private computeColorMapPosition(fieldValue: number, minValue?: number, maxValue?: number) {

    return computeArrayPosition(CellColorMap.length, fieldValue, minValue, maxValue);
  }

  getBackgroundColor() {
    const crossBackgroundColor = this.getStyle()?.cell?.crossBackgroundColor as string;

    let backgroundColor = this.getStyle()?.cell?.backgroundColor as string;
    const strokeColor = 'transparent';
    if (
      this.spreadsheet.isPivotMode() &&
      crossBackgroundColor &&
      this.meta.rowIndex % 2 === 0
    ) {
      // 隔行颜色的配置
      // 偶数行展示灰色背景，因为index是从0开始的
      backgroundColor = crossBackgroundColor;
    }

    // get background condition fill color

    const bgCondition = this.conditions?.background ? this.findFieldCondition(this.conditions?.background) : undefined;
    if (bgCondition && bgCondition.mapping) {
      const attrs = this.mappingValue(bgCondition);
      if (attrs) {
        const { minValue, maxValue } = attrs.isCompare
          ? attrs
          : this.spreadsheet.dataSet.getValueRangeByField(this.meta.valueField);


        const fieldValue = parseNumberWithPrecision(
          this.meta.fieldValue as number,
        );

        const index = this.computeColorMapPosition(fieldValue, minValue, maxValue);

        const calculateBgColor = CellColorMap[index];
        const fill = !isEmpty(attrs.fill) ? attrs.fill : calculateBgColor?.[0];
        backgroundColor = fill
      }
    }
    return { backgroundColor, strokeColor };
  }

}