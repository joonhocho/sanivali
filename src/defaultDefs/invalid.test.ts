import { Sanivali } from '../sanivali';

test('invalid', () => {
  const sani = new Sanivali(['invalid']);

  expect(sani.run(1)).toStrictEqual({
    errors: [{ type: 'invalid', value: 1 }],
    fatal: false,
    value: 1,
  });

  expect(sani.run(undefined)).toStrictEqual({
    errors: [{ type: 'invalid', value: undefined }],
    fatal: false,
    value: undefined,
  });
});
