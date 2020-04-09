import { Sanivali } from '../sanivali';

test('removeDuplicateItems default', async () => {
  const sani = new Sanivali([['removeDuplicateItems']]);

  expect(sani.run([0, 0, 1, '1', 'true', true, 1, 5])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [0, 1, 'true', 5],
  });
});

test('removeDuplicateItems string', async () => {
  const sani = new Sanivali([['removeDuplicateItems', 'id']]);

  expect(
    sani.run([{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 1 }])
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: [{ id: 1 }, { id: 2 }, { id: 3 }],
  });
});

test('removeDuplicateItems function', async () => {
  const sani = new Sanivali([['removeDuplicateItems', (x: any) => x.id]]);

  expect(
    sani.run([{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 1 }])
  ).toStrictEqual({
    fatal: false,
    errors: null,
    value: [{ id: 1 }, { id: 2 }, { id: 3 }],
  });
});
