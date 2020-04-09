import { Sanivali } from '../sanivali';

test('toTimestamp', () => {
  const sani = new Sanivali(['toTimestamp']);
  const date = new Date();

  expect(sani.run(date.getTime())).toStrictEqual({
    fatal: false,
    errors: null,
    value: date.getTime(),
  });

  expect(sani.run(date.toISOString())).toStrictEqual({
    fatal: false,
    errors: null,
    value: date.getTime(),
  });

  expect(sani.run(date)).toStrictEqual({
    fatal: false,
    errors: null,
    value: date.getTime(),
  });

  expect(sani.run('')).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
