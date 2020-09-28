import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('integer', () => {
  const sani = new Sanivali([['integer']]);

  expect(sani.run(0)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(-1)).toStrictEqual({
    fatal: false,
    errors: null,
    value: -1,
  });

  expect(sani.run(Number.MAX_SAFE_INTEGER)).toStrictEqual({
    fatal: false,
    errors: null,
    value: Number.MAX_SAFE_INTEGER,
  });

  expect(sani.run(Number.MAX_SAFE_INTEGER * 2)).toStrictEqual({
    fatal: false,
    errors: null,
    value: Number.MAX_SAFE_INTEGER * 2,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'integer',
        value: null,
      },
    ],
    value: null,
  });

  expect(sani.run(1.5)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'integer',
        value: 1.5,
      },
    ],
    value: 1.5,
  });

  expect(sani.run(NaN)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'integer',
        value: NaN,
      },
    ],
    value: NaN,
  });
});
