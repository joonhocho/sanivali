import { Sanivali } from '../sanivali';

test('minItems', () => {
  const sani = new Sanivali([['minItems', 3]]);

  expect(sani.run('12')).toStrictEqual({
    fatal: false,
    errors: [
      {
        type: 'minItems',
        param: 3,
        value: '12',
      },
    ],
    value: '12',
  });

  expect(sani.run('123')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '123',
  });

  expect(sani.run('1234')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '1234',
  });
});
