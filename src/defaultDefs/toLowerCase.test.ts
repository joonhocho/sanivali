import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('toLowerCase', () => {
  const sani = new Sanivali(['toLowerCase']);

  expect(sani.run('A')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'a',
  });

  expect(sani.run('aBc')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'abc',
  });
});
