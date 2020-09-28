import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('toDate', () => {
  const sani = new Sanivali(['toDate']);
  const date = new Date();

  expect(sani.run(date.getTime())).toStrictEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run(date.toISOString())).toStrictEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run(date)).toStrictEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run('')).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
