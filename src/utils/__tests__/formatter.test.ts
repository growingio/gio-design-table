import { parseNumberWithPrecision } from '../formatter'

describe('formatter tests', () => {
  it('parseNumberWithPrecision', () => {
    const n1 = parseNumberWithPrecision(6 / 10);
    expect(n1).toEqual(0.6);
    const n2 = parseNumberWithPrecision(6 * 0.1);
    expect(n2).toEqual(0.6000000000000001)
    expect(n2).not.toEqual(n1);
    expect(parseNumberWithPrecision(-6 * 0.1)).toBe(-0.6000000000000001)
  });

})