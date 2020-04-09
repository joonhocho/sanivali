import { Sanivali } from '../sanivali';

test('toUpperCase', () => {
  const sani = new Sanivali(['toUpperCase']);

  expect(sani.run('a')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'A',
  });

  expect(sani.run('aBc')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'ABC',
  });
});
