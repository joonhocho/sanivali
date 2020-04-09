import { Sanivali } from '../sanivali';

test('maxLength', () => {
  const sani = new Sanivali([['maxLength', 3]]);

  expect(sani.run('12')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '12',
  });

  expect(sani.run('123')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '123',
  });

  expect(sani.run('1234')).toStrictEqual({
    fatal: false,
    errors: [
      {
        type: 'maxLength',
        param: 3,
        value: '1234',
      },
    ],
    value: '1234',
  });
});
