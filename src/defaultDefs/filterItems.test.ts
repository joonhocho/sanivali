import { Sanivali } from '../sanivali';

test('filterItems', async () => {
  const sani = new Sanivali([['filterItems', (x: any) => x && x !== 2]]);

  expect(sani.run([0, '1', null, true, false, 2, undefined, '3.5'])).toEqual({
    fatal: false,
    errors: null,
    value: ['1', true, '3.5'],
  });
});
