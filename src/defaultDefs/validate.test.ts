import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('validate', () => {
  const sani = new Sanivali({
    validate: (x: unknown) => !x,
  });

  let value: unknown = 0;
  expect(sani.run(value)).toStrictEqual({
    fatal: false,
    errors: null,
    value,
  });

  value = 1;
  expect(sani.run(value)).toMatchObject({
    fatal: false,
    errors: [
      {
        type: 'validate',
        value,
      },
    ],
    value,
  });

  value = 'a';
  expect(sani.run(value)).toMatchObject({
    fatal: false,
    errors: [
      {
        type: 'validate',
        value,
      },
    ],
    value,
  });

  value = '';
  expect(sani.run(value)).toMatchObject({
    fatal: false,
    errors: null,
    value,
  });
});
