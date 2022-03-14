import { parseNumberWithPrecision } from '../formatter'

describe('formatter tests', () => {
  it('parseNumberWithPrecision', () => {
    console.log(parseNumberWithPrecision(1 / 2) * 11)
    const b = Math.ceil(parseNumberWithPrecision(1 / 2) * 11) - 1;
    expect(b).toEqual(5);
    const n1 = parseNumberWithPrecision(6 / 10);
    expect(n1).toEqual(0.6);
    const n2 = parseNumberWithPrecision(6 * 0.1);
    expect(n2).toEqual(0.6000000000000001)
    expect(n2).not.toEqual(n1);
    expect(parseNumberWithPrecision(-6 * 0.1)).toBe(-0.6000000000000001);
    expect(parseNumberWithPrecision(0)).toStrictEqual(0);
  });

})