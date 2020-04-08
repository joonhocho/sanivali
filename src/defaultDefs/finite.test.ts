import { Sanivali } from '../sanivali';

test('finite', () => {
  const sani = new Sanivali([['finite']]);

  expect(sani.run(null)).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(0)).toEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(Infinity)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'finite',
        value: Infinity,
      },
    ],
    value: Infinity,
  });

  expect(sani.run(NaN)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'finite',
        value: NaN,
      },
    ],
    value: NaN,
  });
});
