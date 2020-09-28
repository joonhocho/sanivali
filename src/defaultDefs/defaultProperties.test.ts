import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('defaultProperties', async () => {
  const sani = new Sanivali({
    defaultProperties: {
      n: 1,
      b: () => true,
      s: { onNull: true, value: '' },
      j: { onNull: true, json: '[1, {"a": 2}]' },
    },
  });

  expect(sani.run({})).toStrictEqual({
    fatal: false,
    errors: null,
    value: { n: 1, b: true, s: '', j: [1, { a: 2 }] },
  });

  expect(sani.run({ n: null, b: null, s: null, j: null })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { n: null, b: null, s: '', j: [1, { a: 2 }] },
  });

  expect(sani.run({ n: 0, b: 0, s: 0, j: 0 })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { n: 0, b: 0, s: 0, j: 0 },
  });
});
