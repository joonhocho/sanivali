import { Sanivali } from '../sanivali';

test('filterUniqueItems default', async () => {
  const sani = new Sanivali([['filterUniqueItems']]);

  expect(sani.run([0, 1])).toStrictEqual({
    errors: null,
    fatal: false,
    value: [0, 1],
  });
  expect(sani.run([0, 1, 1, 0, 1])).toStrictEqual({
    errors: null,
    fatal: false,
    value: [0, 1],
  });
});

test('filterUniqueItems string', async () => {
  const sani = new Sanivali([['filterUniqueItems', 'id']]);
  expect(sani.run([{ id: 0 }, { id: 1 }])).toStrictEqual({
    errors: null,
    fatal: false,
    value: [{ id: 0 }, { id: 1 }],
  });
  expect(sani.run([{ id: 0 }, { id: 1 }, { id: 1 }])).toStrictEqual({
    errors: null,
    fatal: false,
    value: [{ id: 0 }, { id: 1 }],
  });
});

test('filterUniqueItems function', async () => {
  const getId = (x: any) => x.id;
  const sani = new Sanivali([['filterUniqueItems', getId]]);
  expect(sani.run([{ id: 0 }, { id: 1 }])).toStrictEqual({
    errors: null,
    fatal: false,
    value: [{ id: 0 }, { id: 1 }],
  });
  expect(sani.run([{ id: 0 }, { id: 1 }, { id: 1 }])).toStrictEqual({
    errors: null,
    fatal: false,
    value: [{ id: 0 }, { id: 1 }],
  });
});
