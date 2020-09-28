import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';

addDefaultDefs();

test('allOf', async () => {
  const sani = new Sanivali({
    allOf: [
      { type: 'integer' },
      { maximum: 5 },
      { minimum: 3 },
      { maximum: 6 },
    ],
  });

  expect(sani.run(undefined, { maxErrors: 100 })).toStrictEqual({
    errors: [{ param: 'integer', type: 'type', value: undefined }],
    fatal: true,
    value: undefined,
  });

  expect(sani.run(1, { maxErrors: 100 })).toStrictEqual({
    errors: [{ param: 3, type: 'minimum', value: 1 }],
    fatal: false,
    value: 1,
  });

  expect(sani.run(3, { maxErrors: 100 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: 3,
  });

  expect(sani.run(6, { maxErrors: 100 })).toStrictEqual({
    errors: [{ param: 5, type: 'maximum', value: 6 }],
    fatal: false,
    value: 6,
  });

  expect(sani.run(7, { maxErrors: 100 })).toStrictEqual({
    errors: [
      { param: 5, type: 'maximum', value: 7 },
      { param: 6, type: 'maximum', value: 7 },
    ],
    fatal: false,
    value: 7,
  });
});

test('allOf async', async () => {
  const sani = new Sanivali(
    {
      allOf: [
        { type: 'integer' },
        { maxAsync: 5 },
        { minAsync: 3 },
        { maxAsync: 6 },
      ],
    },
    {
      minAsync: {
        validator: (min) => (v) => Promise.resolve(v >= min),
        async: true,
      },
      maxAsync: {
        validator: (max) => (v) => Promise.resolve(v <= max),
        async: true,
      },
    }
  );

  expect(await sani.run(undefined, { maxErrors: 100 })).toStrictEqual({
    errors: [{ param: 'integer', type: 'type', value: undefined }],
    fatal: true,
    value: undefined,
  });

  expect(await sani.run(1, { maxErrors: 100 })).toStrictEqual({
    errors: [{ param: 3, type: 'minAsync', value: 1 }],
    fatal: false,
    value: 1,
  });

  expect(await sani.run(3, { maxErrors: 100 })).toStrictEqual({
    errors: null,
    fatal: false,
    value: 3,
  });

  expect(await sani.run(6, { maxErrors: 100 })).toStrictEqual({
    errors: [{ param: 5, type: 'maxAsync', value: 6 }],
    fatal: false,
    value: 6,
  });

  expect(await sani.run(7, { maxErrors: 100 })).toStrictEqual({
    errors: [
      { param: 5, type: 'maxAsync', value: 7 },
      { param: 6, type: 'maxAsync', value: 7 },
    ],
    fatal: false,
    value: 7,
  });
});
