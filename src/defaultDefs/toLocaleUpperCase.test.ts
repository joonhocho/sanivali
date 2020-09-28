import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('toLocaleUpperCase', () => {
  const sani = new Sanivali(['toLocaleUpperCase']);

  expect(sani.run('istanbul')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'ISTANBUL',
  });
});

test('toLocaleUpperCase TR', () => {
  const sani = new Sanivali([['toLocaleUpperCase', 'TR']]);

  expect(sani.run('istanbul')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'İSTANBUL',
  });
});
