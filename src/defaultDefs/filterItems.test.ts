import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('filterItems', async () => {
  const sani = new Sanivali([['filterItems', (x: any) => x && x !== 2]]);

  expect(
    sani.run([0, '1', null, true, false, 2, undefined, '3.5'])
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: ['1', true, '3.5'],
  });
});
