import { Sanivali } from '../sanivali';

test('instance Date', () => {
  const sani = new Sanivali([['instance', Date]]);

  const date = new Date();
  expect(sani.run(date)).toEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run(1)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'instance',
        param: Date,
        value: 1,
      },
    ],
    value: 1,
  });

  expect(sani.run(null)).toEqual({
    fatal: true,
    errors: [
      {
        type: 'instance',
        param: Date,
        value: null,
      },
    ],
    value: null,
  });
});
