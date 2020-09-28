import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('const number', () => {
  const sani = new Sanivali([['const', 3]]);

  expect(sani.run(undefined)).toStrictEqual({
    errors: [{ param: 3, type: 'const', value: undefined }],
    fatal: true,
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    errors: [{ param: 3, type: 'const', value: null }],
    fatal: true,
    value: null,
  });

  expect(sani.run(1)).toStrictEqual({
    errors: [{ param: 3, type: 'const', value: 1 }],
    fatal: true,
    value: 1,
  });

  expect(sani.run('3')).toStrictEqual({
    errors: [{ param: 3, type: 'const', value: '3' }],
    fatal: true,
    value: '3',
  });

  expect(sani.run(3)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 3,
  });
});

test('const null', () => {
  const sani = new Sanivali([['const', null]]);

  expect(sani.run(1)).toStrictEqual({
    errors: [{ param: null, type: 'const', value: 1 }],
    fatal: true,
    value: 1,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
