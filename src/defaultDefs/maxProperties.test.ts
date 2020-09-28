import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('maxProperties', () => {
  const sani = new Sanivali([['maxProperties', 3]]);

  expect(sani.run({ a: 1, b: 2 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: 3 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3, d: 4 })).toStrictEqual({
    errors: [
      { param: 3, type: 'maxProperties', value: { a: 1, b: 2, c: 3, d: 4 } },
    ],
    fatal: false,
    value: { a: 1, b: 2, c: 3, d: 4 },
  });
});
