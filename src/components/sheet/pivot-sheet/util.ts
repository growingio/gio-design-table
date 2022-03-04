import { clamp } from "lodash";
import { parseNumberWithPrecision } from "../../../utils";

/**
   * 计算背景标注的颜色
   * ______________min_________x_____0___________________________max
   * |<------------r---------------->|
   *
   * 0_____________x_______________（max-min）
   * |<-----------r----------->|
   * 
   * (max-min)__________x__________________0
   * |<-----------------r----------------->|
   *
   * @param minValue 
   * @param maxValue 
   * @returns 
   */
export function getScale(_minValue = 0, _maxValue = 0) {
  const minValue = parseNumberWithPrecision(_minValue);
  const maxValue = parseNumberWithPrecision(_maxValue);

  let realMin = 0;
  let distance = 1;
  const isPositive = minValue >= 0;
  const isNagative = maxValue <= 0;
  if (isPositive) {

    realMin = minValue;
    distance = maxValue - minValue || 1;

  } else if (isNagative) {
    realMin = minValue;
    distance = minValue - maxValue || -1;
  } else {
    // 正负数混合 区值区间为 最大值最小值
    distance = Math.max(Math.abs(maxValue), Math.abs(minValue));
    realMin = 0;
  }
  return (current: number) =>
    // max percentage shouldn't be greater than 100%
    // min percentage shouldn't be less than 0%
    clamp((current - realMin) / distance, -1, 1);
}

export function computeArrayPosition(arrayLength: number, fieldValue: number, minValue?: number, maxValue?: number) {
  const scale = getScale(minValue, maxValue);
  // -1<=current<=1
  const current = scale(fieldValue); // 当前数据点
  // 计算当前数据点 在CellColorMap 数组中的位置
  // 1. current: (-1~1)-->(0~2)
  const pos = current + 1;
  // 2. CellColorMap.length 0~12  
  const index = Math.ceil(parseNumberWithPrecision(pos / arrayLength) / parseNumberWithPrecision(2 / arrayLength) * 10)
  return index;
}