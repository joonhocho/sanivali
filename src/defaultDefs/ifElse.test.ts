import { Sanivali } from '../sanivali';

test('ifElse', async () => {
  const sani = new Sanivali({
    ifElse: {
      if: { type: 'string' },
      then: ['trim'],
      else: { type: 'number', parseInt: true },
    },
  });

  expect(sani.run('  a  ')).toEqual({
    errors: null,
    fatal: false,
    value: 'a',
  });

  expect(sani.run(true)).toEqual({
    errors: [{ param: 'number', type: 'type', value: true }],
    fatal: true,
    value: true,
  });

  expect(sani.run(3.5)).toEqual({ errors: null, fatal: false, value: 3 });
});
