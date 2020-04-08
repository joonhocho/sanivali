import { Sanivali } from '../sanivali';

test('uniqueItems default', async () => {
  const sani = new Sanivali([['uniqueItems']]);

  expect(sani.run([0, 1])).toEqual({
    errors: null,
    fatal: false,
    value: [0, 1],
  });
  expect(sani.run([0, 1, 1])).toEqual({
    errors: [{ param: undefined, type: 'uniqueItems', value: [0, 1, 1] }],
    fatal: false,
    value: [0, 1, 1],
  });
});

test('uniqueItems string', async () => {
  const sani = new Sanivali([['uniqueItems', 'id']]);
  expect(sani.run([{ id: 0 }, { id: 1 }])).toEqual({
    errors: null,
    fatal: false,
    value: [{ id: 0 }, { id: 1 }],
  });
  expect(sani.run([{ id: 0 }, { id: 1 }, { id: 1 }])).toEqual({
    errors: [
      {
        param: 'id',
        type: 'uniqueItems',
        value: [{ id: 0 }, { id: 1 }, { id: 1 }],
      },
    ],
    fatal: false,
    value: [{ id: 0 }, { id: 1 }, { id: 1 }],
  });
});

test('uniqueItems function', async () => {
  const getId = (x: any) => x.id;
  const sani = new Sanivali([['uniqueItems', getId]]);
  expect(sani.run([{ id: 0 }, { id: 1 }])).toEqual({
    errors: null,
    fatal: false,
    value: [{ id: 0 }, { id: 1 }],
  });
  expect(sani.run([{ id: 0 }, { id: 1 }, { id: 1 }])).toEqual({
    errors: [
      {
        param: getId,
        type: 'uniqueItems',
        value: [{ id: 0 }, { id: 1 }, { id: 1 }],
      },
    ],
    fatal: false,
    value: [{ id: 0 }, { id: 1 }, { id: 1 }],
  });
});
