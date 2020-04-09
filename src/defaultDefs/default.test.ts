import { Sanivali } from '../sanivali';

test('default', () => {
  const sani = new Sanivali([['default', 1]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});

test('default getter', () => {
  const sani = new Sanivali([['default', () => 1]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});

test('default onNull', () => {
  const sani = new Sanivali([['default', { value: 1, onNull: true }]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });
});

test('default onNull getter', () => {
  const sani = new Sanivali([['default', { value: () => 1, onNull: true }]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });
});
