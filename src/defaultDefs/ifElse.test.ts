import { Sanivali } from '../sanivali';

test('ifElse', async () => {
  const sani = new Sanivali({
    ifElse: {
      if: { type: 'string' },
      then: ['trim'],
      else: { type: 'number', parseInt: true },
    },
  });

  expect(sani.run('  a  ')).toStrictEqual({
    errors: null,
    fatal: false,
    value: 'a',
  });

  expect(sani.run(true)).toStrictEqual({
    errors: [{ param: 'number', type: 'type', value: true }],
    fatal: true,
    value: true,
  });

  expect(sani.run(3.5)).toStrictEqual({ errors: null, fatal: false, value: 3 });
});

test('ifElse array', async () => {
  const sani = new Sanivali({
    ifElse: [{ type: 'string' }, ['trim'], { type: 'number', parseInt: true }],
  });

  expect(sani.run('  a  ')).toStrictEqual({
    errors: null,
    fatal: false,
    value: 'a',
  });

  expect(sani.run(true)).toStrictEqual({
    errors: [{ param: 'number', type: 'type', value: true }],
    fatal: true,
    value: true,
  });

  expect(sani.run(3.5)).toStrictEqual({ errors: null, fatal: false, value: 3 });
});
