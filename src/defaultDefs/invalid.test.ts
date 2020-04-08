import { Sanivali } from '../sanivali';

test('invalid', () => {
  const sani = new Sanivali(['invalid']);

  expect(sani.run(1)).toEqual({
    errors: [{ param: undefined, type: 'invalid', value: 1 }],
    fatal: false,
    value: 1,
  });

  expect(sani.run(undefined)).toEqual({
    errors: [{ param: undefined, type: 'invalid', value: undefined }],
    fatal: false,
    value: undefined,
  });
});
