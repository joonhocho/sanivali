import { Sanivali } from '../sanivali';

test('safeInteger', () => {
  const sani = new Sanivali(['safeInteger']);

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
    fatal: true,
    errors: [
      {
        type: 'safeInteger',
        value: Number.MAX_SAFE_INTEGER * 2,
      },
    ],
    value: Number.MAX_SAFE_INTEGER * 2,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'safeInteger',
        value: null,
      },
    ],
    value: null,
  });

  expect(sani.run(1.5)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'safeInteger',
        value: 1.5,
      },
    ],
    value: 1.5,
  });

  expect(sani.run(NaN)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'safeInteger',
        value: NaN,
      },
    ],
    value: NaN,
  });
});
