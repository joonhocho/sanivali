import { Sanivali } from '../sanivali';

test('parseFloat', () => {
  const sani = new Sanivali([['parseFloat']]);

  expect(sani.run(undefined)).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(0)).toEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(0.5)).toEqual({
    fatal: false,
    errors: null,
    value: 0.5,
  });

  expect(sani.run(1.5)).toEqual({
    fatal: false,
    errors: null,
    value: 1.5,
  });

  expect(sani.run('2')).toEqual({
    fatal: false,
    errors: null,
    value: 2,
  });

  expect(sani.run('2.5')).toEqual({
    fatal: false,
    errors: null,
    value: 2.5,
  });

  expect(sani.run('')).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
