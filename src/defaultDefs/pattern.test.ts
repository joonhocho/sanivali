import { Sanivali } from '../sanivali';

test('pattern', () => {
  const sani = new Sanivali([['pattern', '[ab]c']]);

  expect(sani.run('ac')).toEqual({ fatal: false, errors: null, value: 'ac' });

  expect(sani.run('bc')).toEqual({ fatal: false, errors: null, value: 'bc' });

  expect(sani.run('cc')).toEqual({
    fatal: false,
    errors: [{ param: '[ab]c', type: 'pattern', value: 'cc' }],
    value: 'cc',
  });
});

test('pattern regex', () => {
  const sani = new Sanivali([['pattern', /[ab]c/]]);

  expect(sani.run('ac')).toEqual({ fatal: false, errors: null, value: 'ac' });

  expect(sani.run('bc')).toEqual({ fatal: false, errors: null, value: 'bc' });

  expect(sani.run('cc')).toEqual({
    fatal: false,
    errors: [{ param: /[ab]c/, type: 'pattern', value: 'cc' }],
    value: 'cc',
  });
});
