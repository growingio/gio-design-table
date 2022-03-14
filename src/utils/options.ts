import { customMerge, DEFAULT_OPTIONS, S2Options } from '@antv/s2';
import { SHEET_COMPONENT_DEFAULT_OPTIONS } from '../common';
import { SheetProps } from '../components/interfaces';

export const getSheetConditionsOption = (conditions: SheetProps['options']['conditions']) => {
  const res = { ...(conditions || {}) };
  if (conditions?.background) {
    res.background = conditions.background.map(condition => ({
      ...condition,
      mapping: condition.mapping ?? (() => ({ fill: '' }))
    }))
  }
  return res as S2Options['conditions'];
}
export const getSheetComponentOptions = (
  ...options: Partial<S2Options | SheetProps['options']>[]
): S2Options => customMerge(DEFAULT_OPTIONS, SHEET_COMPONENT_DEFAULT_OPTIONS, ...options)
