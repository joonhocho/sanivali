import { Sanivali } from '../sanivali';
import { SanivaliDefaultRuleSchema } from '../defaultDefs';

test('properties', async () => {
  const sani = new Sanivali<any, SanivaliDefaultRuleSchema>({
    properties: {
      int: ['parseInt'],
      name: {
        type: 'string',
        trim: true,
      },
    },
  });

  expect(sani.run({})).toStrictEqual({
    fatal: false,
    errors: null,
    value: {},
  });

  expect(sani.run({ int: '2', name: '   name ' })).toStrictEqual({
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

  expect(sani.run({ int: '2', name: 3 }, { maxErrors: 100 })).toStrictEqual({
    fatal: false,
    errors: [{ param: 'string', path: ['name'], type: 'type', value: 3 }],
    value: { int: 2, name: 3 },
  });

  expect(
    sani.run({ int: '2', name: 3, bool: undefined }, { maxErrors: 100 })
  ).toStrictEqual({
    fatal: false,
    errors: [
      { param: 'string', path: ['name'], type: 'type', value: 3 },
      { param: 'boolean', path: ['bool'], type: 'type', value: undefined },
    ],
    value: { int: 2, name: 3 },
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

  expect(
    await sani.run({ int: '2', name: 3 }, { maxErrors: 100 })
  ).toStrictEqual({
    fatal: false,
    errors: [
      { param: 'string', path: ['name'], type: 'type', value: 3 },
      { param: 3, path: ['int'], type: 'minAsync', value: 2 },
    ],
    value: { int: 2, name: 3 },
  });

  expect(
    await sani.run(
      { int: '100', name: ' hello world ', bool: true },
      { maxErrors: 100 }
    )
  ).toStrictEqual({
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

  expect(sani.run({})).toStrictEqual({
    errors: null,
    fatal: false,
    value: {},
  });

  expect(sani.run({ a: undefined })).toStrictEqual({
    errors: [{ param: 'string', path: ['a'], type: 'type', value: undefined }],
    fatal: false,
    value: {},
  });

  expect(sani.run({ a: '' })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '' },
  });

  expect(sani.run({ a: '', n: '1' })).toStrictEqual({
    errors: [{ param: 'number', path: ['n'], type: 'type', value: '1' }],
    fatal: false,
    value: { a: '', n: '1' },
  });

  expect(sani.run({ a: '', n: 1 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '', n: 1 },
  });

  expect(sani.run({ a: '', n: 1, b: 1 })).toStrictEqual({
    errors: [{ param: 'boolean', path: ['b'], type: 'type', value: 1 }],
    fatal: false,
    value: { a: '', b: 1, n: 1 },
  });

  expect(sani.run({ a: '', n: 1, b: false })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '', b: false, n: 1 },
  });

  expect(sani.run({ a: '', n1: 1, B1: false, a1: 3 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '', n1: 1, B1: false, a1: 3 },
  });

  expect(
    sani.run({ a: '', n1: 1, b1: false, a1: 3, invalidkey: 1 })
  ).toStrictEqual({
    errors: [{ path: ['invalidkey'], type: 'invalid', value: 1 }],
    fatal: false,
    value: { a: '', a1: 3, b1: false, invalidkey: 1, n1: 1 },
  });
});

test('properties pattern', async () => {
  const sani = new Sanivali(
    {
      properties: {
        a: { type: 'string' },
        c: { typeAsync: 'number' },
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
        runOnNil: true,
      },
    }
  );

  expect(await sani.run({})).toStrictEqual({
    errors: null,
    fatal: false,
    value: {},
  });

  expect(await sani.run({ a: undefined })).toStrictEqual({
    errors: [{ param: 'string', path: ['a'], type: 'type', value: undefined }],
    fatal: false,
    value: {},
  });

  expect(await sani.run({ c: undefined })).toStrictEqual({
    errors: [
      { param: 'number', path: ['c'], type: 'typeAsync', value: undefined },
    ],
    fatal: false,
    value: {},
  });

  expect(await sani.run({ a: '' })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '' },
  });

  expect(await sani.run({ a: '', n: '1' })).toStrictEqual({
    errors: [{ param: 'number', path: ['n'], type: 'typeAsync', value: '1' }],
    fatal: false,
    value: { a: '', n: '1' },
  });

  expect(await sani.run({ a: '', n: 1 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '', n: 1 },
  });

  expect(await sani.run({ a: '', n: 1, b: 1 })).toStrictEqual({
    errors: [{ param: 'boolean', path: ['b'], type: 'typeAsync', value: 1 }],
    fatal: false,
    value: { a: '', b: 1, n: 1 },
  });

  expect(await sani.run({ a: '', n: 1, b: false })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '', b: false, n: 1 },
  });

  expect(await sani.run({ a: '', n1: 1, B1: false, a1: 3 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: '', n1: 1, B1: false, a1: 3 },
  });

  expect(
    await sani.run({ a: '', n1: 1, b1: false, a1: 3, invalidkey: 1 })
  ).toStrictEqual({
    errors: [{ path: ['invalidkey'], type: 'invalid', value: 1 }],
    fatal: false,
    value: { a: '', a1: 3, b1: false, invalidkey: 1, n1: 1 },
  });
});

test('properties delete undefined props', async () => {
  const sani = new Sanivali({
    properties: {
      a: { type: 'undefined' },
      '/.*/': ['valid'],
    },
  });

  expect(await sani.run({})).toStrictEqual({
    errors: null,
    fatal: false,
    value: {},
  });

  expect(await sani.run({ a: undefined })).toStrictEqual({
    errors: null,
    fatal: false,
    value: {},
  });

  expect(await sani.run({ b: null, c: undefined })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { b: null },
  });
});
