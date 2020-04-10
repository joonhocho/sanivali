import { Sanivali } from '../sanivali';

test('deleteNilProperties default', async () => {
  const sani = new Sanivali([['deleteNilProperties']]);

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, e: '' },
  });
});

test('deleteNilProperties nil', async () => {
  const sani = new Sanivali([['deleteNilProperties', 'nil']]);

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, e: '' },
  });
});

test('deleteNilProperties true=nil', async () => {
  const sani = new Sanivali([['deleteNilProperties', true]]);

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, e: '' },
  });
});

test('deleteNilProperties false=disabled', async () => {
  const sani = new Sanivali([['deleteNilProperties', false]]);

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, b: null, c: false, d: undefined, e: '' },
  });
});

test('deleteNilProperties undefined', async () => {
  const sani = new Sanivali({
    deleteNilProperties: 'undefined',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, b: null, c: false, e: '' },
  });
});

test('deleteNilProperties null', async () => {
  const sani = new Sanivali({
    deleteNilProperties: 'null',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, d: undefined, e: '' },
  });
});

test('deleteNilProperties empty', async () => {
  const sani = new Sanivali({
    deleteNilProperties: 'empty',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '', f: {}, g: [] })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false },
  });
});

test('deleteNilProperties falsy', async () => {
  const sani = new Sanivali({
    deleteNilProperties: 'falsy',
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '', f: {}, g: [] })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { f: {}, g: [] },
  });
});

test('deleteNilProperties keys', async () => {
  const sani = new Sanivali({
    deleteNilProperties: {
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

test('deleteNilProperties keys', async () => {
  const sani = new Sanivali({
    deleteNilProperties: {
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

test('deleteNilProperties pattern keys', async () => {
  const sani = new Sanivali({
    deleteNilProperties: {
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
