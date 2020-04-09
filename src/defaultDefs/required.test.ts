import { Sanivali } from '../sanivali';

test('required', async () => {
  const sani = new Sanivali({
    required: ['a', 'c'],
  });

  expect(sani.run({})).toStrictEqual({
    errors: [{ param: ['a', 'c'], type: 'required', value: {} }],
    fatal: false,
    value: {},
  });

  expect(sani.run({ a: 1 })).toStrictEqual({
    errors: [{ param: ['a', 'c'], type: 'required', value: { a: 1 } }],
    fatal: false,
    value: { a: 1 },
  });

  expect(sani.run({ a: 1, c: 2 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: 1, c: 2 },
  });

  expect(sani.run({ a: 1, b: 2, c: null })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: null },
  });

  expect(sani.run({ a: undefined, b: 2, c: null })).toStrictEqual({
    errors: [
      {
        param: ['a', 'c'],
        type: 'required',
        value: { a: undefined, b: 2, c: null },
      },
    ],
    fatal: false,
    value: { a: undefined, b: 2, c: null },
  });
});
