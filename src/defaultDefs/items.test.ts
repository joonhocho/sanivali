import { Sanivali } from '../sanivali';

test('items', async () => {
  const sani = new Sanivali([['items', ['parseInt']]]);

  expect(sani.run(['1', 2, '3.5'])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [1, 2, 3],
  });

  expect(await sani.runAsync(['1', 2, '3.5'])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [1, 2, 3],
  });

  sani.addDef('minAsync', {
    validator: (min) => (v) => Promise.resolve(v >= min),
    async: true,
  });

  sani.addRule([['items', [['minAsync', 3] as any]]]);

  expect(await sani.run(['1', 2, '3.5'])).toStrictEqual({
    fatal: false,
    errors: [
      { param: 3, path: [0], type: 'minAsync', value: 1 },
      { param: 3, path: [1], type: 'minAsync', value: 2 },
    ],
    value: [1, 2, 3],
  });

  expect(await sani.runAsync(['1', 2, '3.5'])).toStrictEqual({
    fatal: false,
    errors: [
      { param: 3, path: [0], type: 'minAsync', value: 1 },
      { param: 3, path: [1], type: 'minAsync', value: 2 },
    ],
    value: [1, 2, 3],
  });
});
