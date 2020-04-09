import { Sanivali } from '../sanivali';

test('emptyToNull', () => {
  const sani = new Sanivali(['emptyToNull']);

  expect(sani.run(undefined)).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(null)).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(false)).toEqual({
    fatal: false,
    errors: null,
    value: false,
  });

  expect(sani.run(0)).toEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run('')).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(' ')).toEqual({
    fatal: false,
    errors: null,
    value: ' ',
  });

  expect(sani.run([])).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run([null])).toEqual({
    fatal: false,
    errors: null,
    value: [null],
  });

  expect(sani.run({})).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run({ a: null })).toEqual({
    fatal: false,
    errors: null,
    value: { a: null },
  });
});
