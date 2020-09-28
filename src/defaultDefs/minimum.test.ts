import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('minimum', () => {
  const sani = new Sanivali([['minimum', 10]]);

  expect(sani.run(10)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 10,
  });

  expect(sani.run(9.9)).toStrictEqual({
    fatal: false,
    errors: [
      {
        type: 'minimum',
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
