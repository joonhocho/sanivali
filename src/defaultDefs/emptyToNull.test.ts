import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('emptyToNull', () => {
  const sani = new Sanivali(['emptyToNull']);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(false)).toStrictEqual({
    fatal: false,
    errors: null,
    value: false,
  });

  expect(sani.run(0)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run('')).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(' ')).toStrictEqual({
    fatal: false,
    errors: null,
    value: ' ',
  });

  expect(sani.run([])).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run([null])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [null],
  });

  expect(sani.run({})).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run({ a: null })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: null },
  });
});

test('emptyToNull undefined', () => {
  const sani = new Sanivali([['emptyToNull', 'undefined']]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(false)).toStrictEqual({
    fatal: false,
    errors: null,
    value: false,
  });

  expect(sani.run(0)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run('')).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(' ')).toStrictEqual({
    fatal: false,
    errors: null,
    value: ' ',
  });

  expect(sani.run([])).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run([null])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [null],
  });

  expect(sani.run({})).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run({ a: null })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: null },
  });
});
