import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('dependencies', async () => {
  const dependencies = {
    a: ['b', 'c'],
    c: ['d'],
  };

  const sani = new Sanivali({ dependencies });

  expect(sani.run({})).toStrictEqual({ errors: null, fatal: false, value: {} });

  expect(sani.run({ a: 1 })).toStrictEqual({
    errors: [
      {
        param: dependencies,
        type: 'dependencies',
        value: { a: 1 },
      },
    ],
    fatal: false,
    value: { a: 1 },
  });

  expect(sani.run({ a: 1, b: 2 })).toStrictEqual({
    errors: [
      {
        param: dependencies,
        type: 'dependencies',
        value: { a: 1, b: 2 },
      },
    ],
    fatal: false,
    value: { a: 1, b: 2 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3 })).toStrictEqual({
    errors: [
      {
        param: dependencies,
        type: 'dependencies',
        value: { a: 1, b: 2, c: 3 },
      },
    ],
    fatal: false,
    value: { a: 1, b: 2, c: 3 },
  });

  expect(sani.run({ a: 1, b: 2, c: 3, d: 4 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { a: 1, b: 2, c: 3, d: 4 },
  });

  expect(sani.run({ c: 3 })).toStrictEqual({
    errors: [
      {
        param: dependencies,
        type: 'dependencies',
        value: { c: 3 },
      },
    ],
    fatal: false,
    value: { c: 3 },
  });

  expect(sani.run({ c: 3, d: 4 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: { c: 3, d: 4 },
  });
});
