import { isNil, map, max, min } from "lodash";
import { computeArrayPosition, getScale } from "../util"
import { data } from '../../../demos/data/negative-data'
import { transformData } from "../../../demos/util";

describe('test computeArrayPosition', () => {
  it('test getScale', () => {
    const scale = getScale(-10, -0);
    const d1 = scale(-5);
    expect(d1).toEqual(-0.5);
    const scale2 = getScale(0, 10);
    expect(scale2(5)).toEqual(0.5);
    const scale3 = getScale(-10, 10);
    expect(scale3(5)).toEqual(0.5);
  })
  it('test computeArrayPosition', () => {
    const d1 = computeArrayPosition(11, -322.8287192846307, -17221.27659574468, - 0.0002821965578040141);
    console.log(d1);
    const originData = transformData(data);
    const fieldValues =
      map(originData?.data, (item) => {
        const value = item.KnGnL3QR as string;
        return isNil(value) ? null : Number.parseFloat(value);
      });

    const range = {
      maxValue: max(fieldValues),
      minValue: min(fieldValues),
    };
    console.log(range)
  })
})