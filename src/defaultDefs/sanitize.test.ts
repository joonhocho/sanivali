import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('sanitize', () => {
  const sani = new Sanivali({
    sanitize: (x: unknown) => String(x).toLowerCase(),
  });

  expect(sani.run(0)).toStrictEqual({
    fatal: false,
    errors: null,
    value: '0',
  });

  expect(sani.run(' HELLO ')).toStrictEqual({
    fatal: false,
    errors: null,
    value: ' hello ',
  });
});
