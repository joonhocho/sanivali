import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('instance Date', () => {
  const sani = new Sanivali([['instance', Date]]);

  const date = new Date();
  expect(sani.run(date)).toStrictEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run(1)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'instance',
        param: Date,
        value: 1,
      },
    ],
    value: 1,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'instance',
        param: Date,
        value: null,
      },
    ],
    value: null,
  });
});
