import { Converter } from './converter';

describe('test converter', () => {
  test('test date2Unix with null', () => {
    expect(Converter.date2Unix(null)).toBeNull();
  });

  test('test unix2Date with null', () => {
    Converter.date2Unix(null);

    expect(Converter.unix2Date(null)).toBeNull();
  });

  test('test date2Unix with value', () => {
    Converter.date2Unix(null);
    const simpleDate = new Date(Date.parse('2021-08-01'));
    expect(Converter.date2Unix(simpleDate)).toBe(1627776000);
  });

  test('test unix2date with value', () => {
    Converter.date2Unix(null);
    const simpleDate = new Date(Date.parse('2021-08-01'));
    expect(new Date(Converter.unix2Date(1627776000))).toEqual(simpleDate);
  });
});
