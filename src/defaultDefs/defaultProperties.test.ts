import { Sanivali } from '../sanivali';

test('defaultProperties', async () => {
  const sani = new Sanivali({
    defaultProperties: { n: 1, b: () => true, s: { onNull: true, value: '' } },
  });

  expect(sani.run({})).toStrictEqual({
    fatal: false,
    errors: null,
    value: { n: 1, b: true, s: '' },
  });

  expect(sani.run({ n: null, b: null, s: null })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { n: null, b: null, s: '' },
  });

  expect(sani.run({ n: 0, b: 0, s: 0 })).toStrictEqual({
    fatal: false,
    errors: null,
    value: { n: 0, b: 0, s: 0 },
  });
});
