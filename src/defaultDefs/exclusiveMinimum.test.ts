import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('exclusiveMinimum', () => {
  const sani = new Sanivali([['exclusiveMinimum', 10]]);

  expect(sani.run(10)).toStrictEqual({
    fatal: false,
    errors: [
      {
        type: 'exclusiveMinimum',
        param: 10,
        value: 10,
      },
    ],
    value: 10,
  });

  expect(sani.run(9.9)).toStrictEqual({
    fatal: false,
    errors: [
      {
        type: 'exclusiveMinimum',
        param: 10,
        value: 9.9,
      },
    ],
    value: 9.9,
  });

  expect(sani.run(10.1)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 10.1,
  });
});
