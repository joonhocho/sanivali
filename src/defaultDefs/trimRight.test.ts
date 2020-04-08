import { Sanivali } from '../sanivali';

test('trimRight', () => {
  const sani = new Sanivali([['type', 'string'], 'trimRight']);

  expect(sani.run(0)).toEqual({
    fatal: true,
    errors: [{ param: 'string', type: 'type', value: 0 }],
    value: 0,
  });

  expect(sani.run(' 2 ')).toEqual({
    fatal: false,
    errors: null,
    value: ' 2',
  });

  expect(sani.run('        ')).toEqual({
    fatal: false,
    errors: null,
    value: '',
  });
});
