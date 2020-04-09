import { Sanivali } from '../sanivali';

test('toLowerCase', () => {
  const sani = new Sanivali(['toLowerCase']);

  expect(sani.run('A')).toEqual({
    fatal: false,
    errors: null,
    value: 'a',
  });

  expect(sani.run('aBc')).toEqual({
    fatal: false,
    errors: null,
    value: 'abc',
  });
});
