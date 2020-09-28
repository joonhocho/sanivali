import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('toLocaleLowerCase', () => {
  const sani = new Sanivali(['toLocaleLowerCase']);

  expect(sani.run('İstanbul')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'i̇stanbul',
  });
});

test('toLocaleLowerCase TR', () => {
  const sani = new Sanivali([['toLocaleLowerCase', 'TR']]);

  expect(sani.run('İstanbul')).toStrictEqual({
    fatal: false,
    errors: null,
    value: 'istanbul',
  });
});
