import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('finite', () => {
  const sani = new Sanivali([['finite']]);

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(0)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(Infinity)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'finite',
        value: Infinity,
      },
    ],
    value: Infinity,
  });

  expect(sani.run(NaN)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'finite',
        value: NaN,
      },
    ],
    value: NaN,
  });
});
