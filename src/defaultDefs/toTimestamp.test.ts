import { Sanivali } from '../sanivali';

test('toTimestamp', () => {
  const sani = new Sanivali(['toTimestamp']);
  const date = new Date();

  expect(sani.run(date.getTime())).toEqual({
    fatal: false,
    errors: null,
    value: date.getTime(),
  });

  expect(sani.run(date.toISOString())).toEqual({
    fatal: false,
    errors: null,
    value: date.getTime(),
  });

  expect(sani.run(date)).toEqual({
    fatal: false,
    errors: null,
    value: date.getTime(),
  });

  expect(sani.run('')).toEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
