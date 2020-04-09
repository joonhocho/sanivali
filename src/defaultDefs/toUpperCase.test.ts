import { Sanivali } from '../sanivali';

test('toUpperCase', () => {
  const sani = new Sanivali(['toUpperCase']);

  expect(sani.run('a')).toEqual({
    fatal: false,
    errors: null,
    value: 'A',
  });

  expect(sani.run('aBc')).toEqual({
    fatal: false,
    errors: null,
    value: 'ABC',
  });
});
