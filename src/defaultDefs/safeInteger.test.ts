import { Sanivali } from '../sanivali';

test('safeInteger', () => {
  const sani = new Sanivali(['safeInteger']);

  expect(sani.run(0)).toEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(-1)).toEqual({
    fatal: false,
    errors: null,
    value: -1,
  });

  expect(sani.run(Number.MAX_SAFE_INTEGER)).toEqual({
    fatal: false,
    errors: null,
    value: Number.MAX_SAFE_INTEGER,
  });

  expect(sani.run(Number.MAX_SAFE_INTEGER * 2)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'safeInteger',
        value: Number.MAX_SAFE_INTEGER * 2,
      },
    ],
    value: Number.MAX_SAFE_INTEGER * 2,
  });

  expect(sani.run(null)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'safeInteger',
        value: null,
      },
    ],
    value: null,
  });

  expect(sani.run(1.5)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'safeInteger',
        value: 1.5,
      },
    ],
    value: 1.5,
  });

  expect(sani.run(NaN)).toEqual({
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
