import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('toConst', () => {
  const sani = new Sanivali([['toConst', 7]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 7,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 7,
  });

  expect(sani.run(1)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 7,
  });

  expect(sani.run('7')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 7,
  });
});
