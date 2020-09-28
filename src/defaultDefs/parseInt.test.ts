import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('parseInt', () => {
  const sani = new Sanivali([['parseInt']]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(0)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(0.5)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 0,
  });

  expect(sani.run(1.5)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });

  expect(sani.run('2')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 2,
  });

  expect(sani.run('')).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
