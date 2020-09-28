import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('filterProperties', async () => {
  const sani = new Sanivali([
    [
      'filterProperties',
      (v: any, k: string) => k !== 'c' && typeof v === 'number',
    ],
  ]);

  expect(
    sani.run({
      a: 0,
      b: null,
      c: 3,
      d: undefined,
      e: '',
      f: 4,
    })
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: { a: 0, f: 4 },
  });
});
