import { Sanivali } from '../sanivali';

test('removeNilItems default', async () => {
  const sani = new Sanivali([['removeNilItems']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false, ''],
  });
});

test('removeNilItems true=nil', async () => {
  const sani = new Sanivali([['removeNilItems', true]]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false, ''],
  });
});

test('removeNilItems false=disable', async () => {
  const sani = new Sanivali([['removeNilItems', false]]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, null, false, undefined, ''],
  });
});

test('removeNilItems nil', async () => {
  const sani = new Sanivali([['removeNilItems', 'nil']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false, ''],
  });
});

test('removeNilItems undefined', async () => {
  const sani = new Sanivali([['removeNilItems', 'undefined']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, null, false, ''],
  });
});

test('removeNilItems null', async () => {
  const sani = new Sanivali([['removeNilItems', 'null']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false, undefined, ''],
  });
});

test('removeNilItems falsy', async () => {
  const sani = new Sanivali([['removeNilItems', 'falsy']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [],
  });
});

test('removeNilItems empty', async () => {
  const sani = new Sanivali([['removeNilItems', 'empty']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false],
  });
});
