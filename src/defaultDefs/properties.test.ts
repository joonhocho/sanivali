import { Sanivali } from '../sanivali';

test('properties', async () => {
  const sani = new Sanivali({
    properties: {
      int: ['parseInt'],
      name: {
        type: 'string',
        trim: true,
      },
    },
  });

  expect(sani.run({ int: '2', name: '   name ' })).toEqual({
    fatal: false,
    errors: null,
    value: { int: 2, name: 'name' },
  });

  sani.addRule([
    [
      'properties',
      {
        bool: { type: 'boolean' },
      },
    ],
  ]);

  expect(sani.run({ int: '2', name: 3 }, { maxErrors: 100 })).toEqual({
    fatal: false,
    errors: [
      { param: 'string', path: ['name'], type: 'type', value: 3 },
      { param: 'boolean', path: ['bool'], type: 'type', value: undefined },
    ],
    value: { bool: undefined, int: 2, name: 3 },
  });

  sani.addDef('minAsync', {
    validator: (min) => (v) => Promise.resolve(v >= min),
    async: true,
  });

  sani.addRule([
    [
      'properties',
      {
        int: { minAsync: 3 },
      },
    ],
  ]);

  expect(await sani.run({ int: '2', name: 3 }, { maxErrors: 100 })).toEqual({
    fatal: false,
    errors: [
      { param: 'string', path: ['name'], type: 'type', value: 3 },
      { param: 'boolean', path: ['bool'], type: 'type', value: undefined },
      { param: 3, path: ['int'], type: 'minAsync', value: 2 },
    ],
    value: { bool: undefined, int: 2, name: 3 },
  });

  expect(
    await sani.run(
      { int: '100', name: ' hello world ', bool: true },
      { maxErrors: 100 }
    )
  ).toEqual({
    fatal: false,
    errors: null,
    value: { int: 100, name: 'hello world', bool: true },
  });
});

test('properties pattern', async () => {
  const sani = new Sanivali({
    properties: {
      a: { type: 'string' },
      '/^n/': { type: 'number' },
      '/^b/i': { type: 'boolean' },
      '/^a/': [],
      '/.*/': ['invalid'],
    },
  });

  expect(sani.run({})).toEqual({
    errors: [{ param: 'string', path: ['a'], type: 'type', value: undefined }],
    fatal: false,
    value: { a: undefined },
  });

  expect(sani.run({ a: '' })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '' },
  });

  expect(sani.run({ a: '', n: '1' })).toEqual({
    errors: [{ param: 'number', path: ['n'], type: 'type', value: '1' }],
    fatal: false,
    value: { a: '', n: '1' },
  });

  expect(sani.run({ a: '', n: 1 })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '', n: 1 },
  });

  expect(sani.run({ a: '', n: 1, b: 1 })).toEqual({
    errors: [{ param: 'boolean', path: ['b'], type: 'type', value: 1 }],
    fatal: false,
    value: { a: '', b: 1, n: 1 },
  });

  expect(sani.run({ a: '', n: 1, b: false })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '', b: false, n: 1 },
  });

  expect(sani.run({ a: '', n1: 1, B1: false, a1: 3 })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '', n1: 1, B1: false, a1: 3 },
  });

  expect(sani.run({ a: '', n1: 1, b1: false, a1: 3, invalidkey: 1 })).toEqual({
    errors: [
      { param: undefined, path: ['invalidkey'], type: 'invalid', value: 1 },
    ],
    fatal: false,
    value: { a: '', a1: 3, b1: false, invalidkey: 1, n1: 1 },
  });
});

test('properties pattern', async () => {
  const sani = new Sanivali(
    {
      properties: {
        a: { type: 'string' },
        '/^n/': { typeAsync: 'number' },
        '/^b/i': { typeAsync: 'boolean' },
        '/^a/': [],
        '/.*/': ['invalid'],
      },
    },
    {
      typeAsync: {
        validator: (type) => async (v) => typeof v === type,
        async: true,
      },
    }
  );

  expect(await sani.run({})).toEqual({
    errors: [{ param: 'string', path: ['a'], type: 'type', value: undefined }],
    fatal: false,
    value: { a: undefined },
  });

  expect(await sani.run({ a: '' })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '' },
  });

  expect(await sani.run({ a: '', n: '1' })).toEqual({
    errors: [{ param: 'number', path: ['n'], type: 'typeAsync', value: '1' }],
    fatal: false,
    value: { a: '', n: '1' },
  });

  expect(await sani.run({ a: '', n: 1 })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '', n: 1 },
  });

  expect(await sani.run({ a: '', n: 1, b: 1 })).toEqual({
    errors: [{ param: 'boolean', path: ['b'], type: 'typeAsync', value: 1 }],
    fatal: false,
    value: { a: '', b: 1, n: 1 },
  });

  expect(await sani.run({ a: '', n: 1, b: false })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '', b: false, n: 1 },
  });

  expect(await sani.run({ a: '', n1: 1, B1: false, a1: 3 })).toEqual({
    errors: null,
    fatal: false,
    value: { a: '', n1: 1, B1: false, a1: 3 },
  });

  expect(
    await sani.run({ a: '', n1: 1, b1: false, a1: 3, invalidkey: 1 })
  ).toEqual({
    errors: [
      { param: undefined, path: ['invalidkey'], type: 'invalid', value: 1 },
    ],
    fatal: false,
    value: { a: '', a1: 3, b1: false, invalidkey: 1, n1: 1 },
  });
});
