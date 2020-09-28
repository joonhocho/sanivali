import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('not', async () => {
  const sani = new Sanivali({
    not: { type: 'integer', minimum: 3 },
  });

  expect(sani.run(undefined)).toStrictEqual({
    errors: null,
    fatal: false,
    value: undefined,
  });

  expect(sani.run('3')).toStrictEqual({
    errors: null,
    fatal: false,
    value: '3',
  });

  expect(sani.run(2)).toStrictEqual({ errors: null, fatal: false, value: 2 });

  expect(sani.run(3)).toStrictEqual({
    errors: [{ param: { minimum: 3, type: 'integer' }, type: 'not', value: 3 }],
    fatal: false,
    value: 3,
  });

  expect(sani.run(3.5)).toStrictEqual({
    errors: null,
    fatal: false,
    value: 3.5,
  });
});

test('not async', async () => {
  const sani = new Sanivali(
    {
      not: { type: 'integer', minAsync: 3 },
    },
    {
      minAsync: {
        validator: (min) => (v) => Promise.resolve(v >= min),
        async: true,
      },
    }
  );

  expect(await sani.run(undefined)).toStrictEqual({
    errors: null,
    fatal: false,
    value: undefined,
  });

  expect(await sani.run('3')).toStrictEqual({
    errors: null,
    fatal: false,
    value: '3',
  });

  expect(await sani.run(2)).toStrictEqual({
    errors: null,
    fatal: false,
    value: 2,
  });

  expect(await sani.run(3)).toStrictEqual({
    errors: [
      { param: { minAsync: 3, type: 'integer' }, type: 'not', value: 3 },
    ],
    fatal: false,
    value: 3,
  });

  expect(await sani.run(3.5)).toStrictEqual({
    errors: null,
    fatal: false,
    value: 3.5,
  });
});
