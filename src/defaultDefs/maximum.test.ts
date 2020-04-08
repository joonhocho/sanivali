import { Sanivali } from '../sanivali';

test('maximum', () => {
  const sani = new Sanivali([['maximum', 10]]);

  expect(sani.run(10)).toEqual({
    fatal: false,
    errors: null,
    value: 10,
  });

  expect(sani.run(9.9)).toEqual({
    fatal: false,
    errors: null,
    value: 9.9,
  });

  expect(sani.run(10.1)).toEqual({
    fatal: false,
    errors: [
      {
        type: 'maximum',
        param: 10,
        value: 10.1,
      },
    ],
    value: 10.1,
  });
});
