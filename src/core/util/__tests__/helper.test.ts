import { computeArrayPosition, getScale } from "../helper"

describe('test computeArrayPosition', () => {
  it('test getScale', () => {
    const scale = getScale(-10, -0);
    const d1 = scale(-5);
    expect(d1).toEqual(-0.5);
    const scale2 = getScale(0, 10);
    expect(scale2(5)).toEqual(0.5);
    const scale3 = getScale(-10, 10);
    expect(scale3(5)).toEqual(0.5);
    const scale4 = getScale(-100, 0);
    expect(scale4(-3)).toEqual(-0.03)
  })

  it('should return 0~11 when min~max from -70~100 ', () => {
    const d0 = computeArrayPosition(11, 0, -70, 100);
    expect(d0).toStrictEqual(5);
    const d1 = computeArrayPosition(11, -1, -70, 100);
    expect(d1).toStrictEqual(4);
    const d2 = computeArrayPosition(11, 2, -70, 100);
    expect(d2).toStrictEqual(6);

    const d20 = computeArrayPosition(11, -20, -70, 100);
    expect(d20).toStrictEqual(3);

    const d50 = computeArrayPosition(11, -50, -70, 100);
    expect(d50).toStrictEqual(2);
    const d10 = computeArrayPosition(11, 10, -70, 100);
    expect(d10).toStrictEqual(6);
    const d90 = computeArrayPosition(11, 90, -70, 100);
    expect(d90).toStrictEqual(10);
  })
  it('should return 0~5 when max<=0', () => {
    const d0 = computeArrayPosition(11, 0, -100, 0);
    expect(d0).toStrictEqual(5);
    const d1 = computeArrayPosition(11, -1, -100, 0);
    expect(d1).toStrictEqual(4);
    const d20 = computeArrayPosition(11, -20, -100, 0);
    expect(d20).toStrictEqual(3);
    const d40 = computeArrayPosition(11, -40, -100, 0);
    expect(d40).toStrictEqual(2);
    const d50 = computeArrayPosition(11, -50, -100, 0);
    expect(d50).toStrictEqual(2);
    const d10 = computeArrayPosition(11, -100, -100, 0);
    expect(d10).toStrictEqual(0);
    const d90 = computeArrayPosition(11, -90, -100, 0);
    expect(d90).toStrictEqual(0);
  })
  it('should return 6~10 when min>=0', () => {
    const d0 = computeArrayPosition(11, 0, 0, 100);
    expect(d0).toStrictEqual(5);
    const d4 = computeArrayPosition(11, 50, 0, 100);
    expect(d4).toStrictEqual(8);
    const d10 = computeArrayPosition(11, 100, 0, 100);
    expect(d10).toStrictEqual(10);
    const d90 = computeArrayPosition(11, 90, 0, 100);
    expect(d90).toStrictEqual(10);
  })
  it('should return 5 when max=min=0', () => {

    const d0 = computeArrayPosition(11, 0, 0, 0);
    expect(d0).toStrictEqual(5);
  })
  it('should return 6 when max=min and min>0', () => {
    const d6 = computeArrayPosition(11, 100, 100, 100);
    expect(d6).toStrictEqual(6);
  })
  it('should return 4 when max=min and max<0', () => {
    const d4 = computeArrayPosition(11, -100, -100, -100);
    expect(d4).toStrictEqual(4);
  })
  it('should return 4 when max=min and max<0', () => {
    const d4 = computeArrayPosition(11, 2, 2, 100);
    expect(d4).toStrictEqual(5);
  })
})