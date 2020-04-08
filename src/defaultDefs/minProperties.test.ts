import { Sanivali } from '../sanivali';

test('minProperties', () => {
  const sani = new Sanivali([['minProperties', 3]]);

  expect(sani.run({ a: 1, b: 2 })).toEqual({
    errors: [{ param: 3, type: 'minProperties', value: { a: 1, b: 2 } }],
    fatal: false,
    value: { a: 1, b: 2 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3 })).toEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: 3 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3, d: 4 })).toEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: 3, d: 4 },
  });
});
