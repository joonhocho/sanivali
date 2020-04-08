import { Sanivali } from '../sanivali';

test('anyOf', async () => {
  const sani = new Sanivali({
    anyOf: [{ type: 'string', minLength: 3 }, { type: 'null' }],
  });

  expect(sani.run(undefined)).toEqual({
    errors: [
      { param: 'string', type: 'type', value: undefined },
      { param: 'null', type: 'type', value: undefined },
    ],
    fatal: false,
    value: undefined,
  });

  expect(sani.run(1)).toEqual({
    errors: [
      { param: 'string', type: 'type', value: 1 },
      { param: 'null', type: 'type', value: 1 },
    ],
    fatal: false,
    value: 1,
  });

  expect(sani.run(null)).toEqual({ errors: null, fatal: false, value: null });

  expect(sani.run('')).toEqual({
    errors: [
      { param: 3, type: 'minLength', value: '' },
      { param: 'null', type: 'type', value: '' },
    ],
    fatal: false,
    value: '',
  });

  expect(sani.run('abc')).toEqual({ errors: null, fatal: false, value: 'abc' });
});

test('anyOf async', async () => {
  const sani = new Sanivali(
    {
      anyOf: [
        { parseInt: true, type: 'integer', minAsync: 3 },
        { type: 'null' },
      ],
    },
    {
      minAsync: {
        validator: (min) => (v) => Promise.resolve(v >= min),
        async: true,
      },
    }
  );

  expect(await sani.run(undefined)).toEqual({
    errors: [
      { param: 'integer', type: 'type', value: null },
      { param: 'null', type: 'type', value: undefined },
    ],
    fatal: false,
    value: undefined,
  });

  expect(await sani.run('1')).toEqual({
    errors: [
      { param: 3, type: 'minAsync', value: 1 },
      { param: 'null', type: 'type', value: '1' },
    ],
    fatal: false,
    value: '1',
  });

  expect(await sani.run('3')).toEqual({ errors: null, fatal: false, value: 3 });

  expect(await sani.run(null)).toEqual({
    errors: null,
    fatal: false,
    value: null,
  });
});
