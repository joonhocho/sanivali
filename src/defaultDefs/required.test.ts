import { Sanivali } from '../sanivali';

test('required', async () => {
  const sani = new Sanivali({
    required: ['a', 'c'],
  });

  expect(sani.run({})).toEqual({
    errors: [{ param: ['a', 'c'], type: 'required', value: {} }],
    fatal: false,
    value: {},
  });

  expect(sani.run({ a: 1 })).toEqual({
    errors: [{ param: ['a', 'c'], type: 'required', value: { a: 1 } }],
    fatal: false,
    value: { a: 1 },
  });

  expect(sani.run({ a: 1, c: 2 })).toEqual({
    errors: null,
    fatal: false,
    value: { a: 1, c: 2 },
  });

  expect(sani.run({ a: 1, b: 2, c: null })).toEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: null },
  });

  expect(sani.run({ a: undefined, b: 2, c: null })).toEqual({
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
