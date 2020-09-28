import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('minProperties', () => {
  const sani = new Sanivali([['minProperties', 3]]);

  expect(sani.run({ a: 1, b: 2 })).toStrictEqual({
    errors: [{ param: 3, type: 'minProperties', value: { a: 1, b: 2 } }],
    fatal: false,
    value: { a: 1, b: 2 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: 3 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3, d: 4 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: 3, d: 4 },
  });
});
