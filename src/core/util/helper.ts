import { ValueRange, SpreadSheet, DataType } from "@antv/s2";
import { clamp, filter, isNil, map, max, min, toNumber } from "lodash";
import { parseNumberWithPrecision } from "./formatter";
import { getValueRangeState, setValueRangeState } from "./stateController";

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
  let distance = (maxValue - minValue) || 1;
  const isPositive = minValue >= 0;
  const isNagative = maxValue <= 0;
  if (isPositive) {
    realMin = minValue;

  } else if (isNagative) {
    realMin = maxValue;
  } else {
    // 正负数混合 区值区间为 最大值最小值
    distance = Math.max(Math.abs(maxValue), Math.abs(minValue)) || 1;
    realMin = 0;
  }
  return (current: number) =>
    // max percentage shouldn't be greater than 100%
    // min percentage shouldn't be less than 0%
    clamp((current - realMin) / distance, -1, 1);
}

export function computeArrayPosition(arrayLength: number, fieldValue: number, minValue?: number, maxValue?: number) {
  if (arrayLength < 2) {
    return 0;
  }
  const scale = getScale(minValue, maxValue);
  // -1<=current<=1
  let current = scale(fieldValue); // 当前数据点
  // 计算当前数据点 在CellColorMap 数组中的位置
  // 1. current: (-1~1)-->(0~2),&& distance=current-min(-1);
  // 2. CellColorMap.length 0~11  
  // 3 current===0 比较特殊，一种是 fieldValue===0，
  // 还有就是 max==value时，此时需要修正一下，如果fieldValue 为负值 需要将current偏移为一个负值，否则为一个正值
  if (current === 0) {
    if (toNumber(maxValue) === toNumber(minValue) && toNumber(minValue) > 0) {
      current += 0.0000001;
    } else if (toNumber(maxValue) === toNumber(minValue) && toNumber(maxValue) < 0) {
      current -= 0.0000001;
    }
  }
  const mid = Math.ceil((arrayLength - 1) / 2);
  // 数值0 始终返回数组中间值;
  if (current === 0) {
    return mid;
  }
  if (current < 0) {
    const idx = mid - Math.ceil(parseNumberWithPrecision((-current) / 2) * arrayLength);
    return clamp(idx, 0, arrayLength - 1);
  } 
    const idx = mid + Math.ceil(parseNumberWithPrecision(current / 2) * arrayLength);
    return clamp(idx, 0, arrayLength - 1);
  

}
export function getValueRangeByField(spreadSheet: SpreadSheet, originData: DataType[], field: string): ValueRange {
  const cacheRange = getValueRangeState(spreadSheet, field);
  if (cacheRange) {
    return cacheRange;
  }
  const fieldValues = filter(
    map(originData, (item) => {
      const value = item[field] as string;
      return isNil(value) ? undefined : Number.parseFloat(value);
    }), (v) => !isNil(v)
  );
  const range = {
    maxValue: max(fieldValues),
    minValue: min(fieldValues),
  };
  setValueRangeState(spreadSheet, {
    [field]: range,
  });
  return range;
}