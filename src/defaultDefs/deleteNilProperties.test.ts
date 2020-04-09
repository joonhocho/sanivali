import { Sanivali } from '../sanivali';

test('deleteNilProperties default', async () => {
  const sani = new Sanivali([['deleteNilProperties']]);

  expect(sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, e: '' },
  });
});

test('deleteNilProperties nil', async () => {
  const sani = new Sanivali([['deleteNilProperties', { type: 'nil' }]]);

  expect(sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, e: '' },
  });
});

test('deleteNilProperties undefined', async () => {
  const sani = new Sanivali({
    deleteNilProperties: { type: 'undefined' },
  });

  expect(sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, b: null, c: false, e: '' },
  });
});

test('deleteNilProperties null', async () => {
  const sani = new Sanivali({
    deleteNilProperties: { type: 'null' },
  });

  expect(sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, d: undefined, e: '' },
  });
});

test('deleteNilProperties null', async () => {
  const sani = new Sanivali({
    deleteNilProperties: { type: 'empty' },
  });

  expect(
    sani.run({ a: 0, b: null, c: false, d: undefined, e: '', f: {}, g: [] })
  ).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false },
  });
});

test('deleteNilProperties keys', async () => {
  const sani = new Sanivali({
    deleteNilProperties: { type: 'nil', keys: ['a', 'b'] },
  });

  expect(sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, d: undefined, e: '' },
  });
});

test('deleteNilProperties keys', async () => {
  const sani = new Sanivali({
    deleteNilProperties: { type: 'nil', keys: ['a', 'b', 'd'] },
  });

  expect(sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, c: false, e: '' },
  });
});

test('deleteNilProperties excludeKeys', async () => {
  const sani = new Sanivali({
    deleteNilProperties: {
      type: 'nil',
      keys: ['a', 'b', 'd'],
      excludeKeys: ['b'],
    },
  });

  expect(sani.run({ a: 0, b: null, c: false, d: undefined, e: '' })).toEqual({
    fatal: false,
    errors: null,
    value: { a: 0, b: null, c: false, e: '' },
  });
});
