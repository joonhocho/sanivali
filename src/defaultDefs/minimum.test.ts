import { Sanivali } from '../sanivali';

test('minimum', () => {
  const sani = new Sanivali([['minimum', 10]]);

  expect(sani.run(10)).toEqual({
    fatal: false,
    errors: null,
    value: 10,
  });

  expect(sani.run(9.9)).toEqual({
    fatal: false,
    errors: [
      {
        type: 'minimum',
        param: 10,
        value: 9.9,
      },
    ],
    value: 9.9,
  });

  expect(sani.run(10.1)).toEqual({
    fatal: false,
    errors: null,
    value: 10.1,
  });
});
