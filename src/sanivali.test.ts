import { addDefaultDefs } from '_src/addAllDefs';
import { SanivaliDefaultRuleSchema } from '_src/defaultDefsTypes';
import { Sanivali } from './sanivali';

addDefaultDefs();

test('Sanivali addDef / async / skipSanitize / skipValidate', async () => {
  const sani = new Sanivali<any, SanivaliDefaultRuleSchema>([], {
    minAsync: {
      validator: (min) => (v) => Promise.resolve(v >= min),
      async: true,
    },
  });

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

  sani.addRule({ parseInt: true } as any);
  sani.addRule([saniMinAsync]);

  expect(sani.run(2)).toBeInstanceOf(Promise);

  expect(await sani.run(2)).toStrictEqual({
    fatal: false,
    errors: [{ param: 3, type: 'minAsync', value: 2 }],
    value: 2,
  });

  expect(await sani.run(3)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 3,
  });
  expect(await sani.run('6')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 6,
  });

  sani.addRule([['maxAsync', 5]] as any);

  expect(await sani.run('6')).toStrictEqual({
    fatal: false,
    errors: [{ param: 5, type: 'maxAsync', value: 6 }],
    value: 6,
  });

  expect(await sani.run('3', { skipSanitize: true })).toStrictEqual({
    fatal: false,
    errors: null,
    value: '3',
  });

  expect(await sani.run('6', { skipValidate: true })).toStrictEqual({
    fatal: false,
    errors: null,
    value: 6,
  });
});
