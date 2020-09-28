import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('deleteProperties nil', async () => {
  const sani = new Sanivali([['deleteProperties', 'nil']]);

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, e: '' },
  });
});

test('deleteProperties false=disabled', async () => {
  const sani = new Sanivali([['deleteProperties', false]]);

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, b: null, c: false, d: undefined, e: '' },
  });
});

test('deleteProperties undefined', async () => {
  const sani = new Sanivali({
    deleteProperties: 'undefined',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, b: null, c: false, e: '' },
  });
});

test('deleteProperties null', async () => {
  const sani = new Sanivali({
    deleteProperties: 'null',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, d: undefined, e: '' },
  });
});

test('deleteProperties empty', async () => {
  const sani = new Sanivali({
    deleteProperties: 'empty',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '', f: {}, g: [] })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false },
  });
});

test('deleteProperties falsy', async () => {
  const sani = new Sanivali({
    deleteProperties: 'falsy',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '', f: {}, g: [] })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { f: {}, g: [] },
  });
});

test('deleteProperties keys', async () => {
  const sani = new Sanivali({
    deleteProperties: {
      a: 'nil',
      b: 'nil',
    },
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, d: undefined, e: '' },
  });
});

test('deleteProperties keys', async () => {
  const sani = new Sanivali({
    deleteProperties: {
      undefined: 'undefined',
      null: 'null',
      nil: 'nil',
      falsy: 'falsy',
      empty: 'empty',
    },
  });

  expect(
    sani.run({
      undefined,
      null: null,
      nil: null,
      falsy: 0,
      empty: [],
    })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: {},
  });

  expect(
    sani.run({
      undefined: null,
      null: undefined,
      nil: 0,
      falsy: [],
      empty: 0,
    })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: {
      undefined: null,
      null: undefined,
      nil: 0,
      falsy: [],
      empty: 0,
    },
  });
});

test('deleteProperties pattern keys', async () => {
  const sani = new Sanivali({
    deleteProperties: {
      undefined: 'undefined',
      null: 'null',
      nil: 'nil',
      falsy: 'falsy',
      empty: 'empty',
      '/^a/': false, // allow ^a
      '/.*/': true, // delete all rest
    },
  });

  expect(
    sani.run({
      undefined,
      null: null,
      nil: null,
      falsy: 0,
      empty: [],
      other: 1,
    })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: {},
  });

  expect(sani.run({})).toStrictEqual({
    fatal: false,
    errors: null,
    value: {},
  });

  expect(sani.run({ a: 1, b: 2 })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 1 },
  });

  expect(sani.run({ nil: 1, a: 1, b: 2 })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { nil: 1, a: 1 },
  });

  expect(sani.run({ nil: 1, a: 1, b: 2 })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { nil: 1, a: 1 },
  });
});
