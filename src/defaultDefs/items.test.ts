import { addDefaultDefs } from '_src/addAllDefs';
import { SanivaliDefaultRuleSchema } from '_src/defaultDefsTypes';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('items', async () => {
  const sani = new Sanivali<any[], SanivaliDefaultRuleSchema>({
    type: 'array',
    items: { parseInt: true },
  });

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

test('items sani', async () => {
  const sani = new Sanivali<any[], SanivaliDefaultRuleSchema>({
    type: 'array',
    items: new Sanivali({ type: 'number' }),
  });

  expect(sani.run(['1', 2, '3.5'], { maxErrors: 100 })).toStrictEqual({
    errors: [
      { param: 'number', path: [0], type: 'type', value: '1' },
      { param: 'number', path: [2], type: 'type', value: '3.5' },
    ],
    fatal: false,
    value: ['1', 2, '3.5'],
  });

  expect(sani.run([1, 2, 3.5])).toStrictEqual({
    errors: null,
    fatal: false,
    value: [1, 2, 3.5],
  });
});
