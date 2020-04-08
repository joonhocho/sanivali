import { Sanivali } from '../sanivali';

test('exclusiveMinimum', () => {
  const sani = new Sanivali([['exclusiveMinimum', 10]]);

  expect(sani.run(10)).toEqual({
    fatal: false,
    errors: [
      {
        type: 'exclusiveMinimum',
        param: 10,
        value: 10,
      },
    ],
    value: 10,
  });

  expect(sani.run(9.9)).toEqual({
    fatal: false,
    errors: [
      {
        type: 'exclusiveMinimum',
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
