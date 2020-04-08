import { Sanivali } from './sanivali';

test('Sanivali addDef / async / skipSanitize / skipValidate', async () => {
  const sani = new Sanivali();
  const saniMinAsync = new Sanivali([['minAsync', 3]], {
    minAsync: {
      validator: (min) => (v) => Promise.resolve(v >= min),
      async: true,
    },
  });

  sani.addDefs({
    maxAsync: {
      validator: (max) => (v) => Promise.resolve(v <= max),
      async: true,
    },
  });

  sani.addRule({ parseInt: true, saniMinAsync });

  expect(sani.run(2)).toBeInstanceOf(Promise);

  expect(await sani.run(2)).toEqual({
    fatal: false,
    errors: [{ param: 3, type: 'minAsync', value: 2 }],
    value: 2,
  });

  expect(await sani.run(3)).toEqual({ fatal: false, errors: null, value: 3 });
  expect(await sani.run('6')).toEqual({ fatal: false, errors: null, value: 6 });

  sani.addRule([['maxAsync', 5]]);

  expect(await sani.run('6')).toEqual({
    fatal: false,
    errors: [{ param: 5, type: 'maxAsync', value: 6 }],
    value: 6,
  });

  expect(await sani.run('3', { skipSanitize: true })).toEqual({
    fatal: false,
    errors: null,
    value: '3',
  });

  expect(await sani.run('6', { skipValidate: true })).toEqual({
    fatal: false,
    errors: null,
    value: 6,
  });
});
