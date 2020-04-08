import { Sanivali } from '../sanivali';

test('minLength', () => {
  const sani = new Sanivali([['minLength', 3]]);

  expect(sani.run('12')).toEqual({
    fatal: false,
    errors: [
      {
        type: 'minLength',
        param: 3,
        value: '12',
      },
    ],
    value: '12',
  });

  expect(sani.run('123')).toEqual({
    fatal: false,
    errors: null,
    value: '123',
  });

  expect(sani.run('1234')).toEqual({
    fatal: false,
    errors: null,
    value: '1234',
  });
});
