import { Sanivali } from '../sanivali';

test('enum numbers', () => {
  const sani = new Sanivali([['enum', [1, 2, 3]]]);

  expect(sani.run(1)).toEqual({
    fatal: false,
    errors: null,
    value: 1,
  });

  expect(sani.run(3)).toEqual({
    fatal: false,
    errors: null,
    value: 3,
  });

  expect(sani.run(4)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'enum',
        param: [1, 2, 3],
        value: 4,
      },
    ],
    value: 4,
  });
});

test('enum long numbers', () => {
  const enums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sani = new Sanivali([['enum', enums]]);

  expect(sani.run(0)).toEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(10)).toEqual({
    fatal: false,
    errors: null,
    value: 10,
  });

  expect(sani.run(11)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'enum',
        param: enums,
        value: 11,
      },
    ],
    value: 11,
  });
});

test('enum long mixed', () => {
  const enums = [true, 0, 1, 2, 3, 4, 6, 7, 8, 9, 10, '11', null, undefined];
  const sani = new Sanivali([['enum', enums]]);

  expect(sani.run(true)).toEqual({
    fatal: false,
    errors: null,
    value: true,
  });

  expect(sani.run(0)).toEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(10)).toEqual({
    fatal: false,
    errors: null,
    value: 10,
  });

  expect(sani.run('11')).toEqual({
    fatal: false,
    errors: null,
    value: '11',
  });

  expect(sani.run(null)).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(undefined)).toEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(false)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'enum',
        param: enums,
        value: false,
      },
    ],
    value: false,
  });

  expect(sani.run(11)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'enum',
        param: enums,
        value: 11,
      },
    ],
    value: 11,
  });

  expect(sani.run('10')).toEqual({
    fatal: true,
    errors: [
      {
        type: 'enum',
        param: enums,
        value: '10',
      },
    ],
    value: '10',
  });
});
