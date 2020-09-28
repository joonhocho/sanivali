import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('removeItems default', async () => {
  const sani = new Sanivali([['removeItems']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false, ''],
  });
});

test('removeItems false=disable', async () => {
  const sani = new Sanivali([['removeItems', false]]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, null, false, undefined, ''],
  });
});

test('removeItems nil', async () => {
  const sani = new Sanivali([['removeItems', 'nil']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false, ''],
  });
});

test('removeItems undefined', async () => {
  const sani = new Sanivali([['removeItems', 'undefined']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, null, false, ''],
  });
});

test('removeItems null', async () => {
  const sani = new Sanivali([['removeItems', 'null']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false, undefined, ''],
  });
});

test('removeItems falsy', async () => {
  const sani = new Sanivali([['removeItems', 'falsy']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [],
  });
});

test('removeItems empty', async () => {
  const sani = new Sanivali([['removeItems', 'empty']]);

  expect(sani.run([0, null, false, undefined, ''])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, false],
  });
});
