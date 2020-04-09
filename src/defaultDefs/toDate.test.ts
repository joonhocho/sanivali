import { Sanivali } from '../sanivali';

test('toDate', () => {
  const sani = new Sanivali(['toDate']);
  const date = new Date();

  expect(sani.run(date.getTime())).toEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run(date.toISOString())).toEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run(date)).toEqual({
    fatal: false,
    errors: null,
    value: date,
  });

  expect(sani.run('')).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
