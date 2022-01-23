import { sum, sub, times, division, random, lucky } from '../src';

describe('blah', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});

describe('sub', () => {
  it('works', () => {
    expect(sub(2, 1)).toEqual(1);
  });
});

describe('times', () => {
  it('works', () => {
    expect(times(2, 3)).toEqual(6);
  });
});

describe('division', () => {
  it('works', () => {
    expect(division(10, 5)).toEqual(2);
  });

  it('error', () => {
    expect(() => {
      division(10, 0);
    }).toThrowError();
    expect(() => {
      division(0, 5);
    }).toThrowError();
  });
});

describe('random', () => {
  it('works', () => {
    const a = random();
    const b = random();
    expect(a).not.toBe(b);
  });
});

describe('lucky', () => {
  it('works', () => {
    expect(lucky()).toBe(7);
  });
});
