import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('trim', () => {
  const sani = new Sanivali([['type', 'string'], 'trim']);

  expect(sani.run(0)).toStrictEqual({
    fatal: true,
    errors: [{ param: 'string', type: 'type', value: 0 }],
    value: 0,
  });

  expect(sani.run(' 2 ')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '2',
  });

  expect(sani.run('        ')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '',
  });
});

test('trim disabled', () => {
  const sani = new Sanivali([
    ['type', 'string'],
    ['trim', false],
  ]);

  expect(sani.run(0)).toStrictEqual({
    fatal: true,
    errors: [{ param: 'string', type: 'type', value: 0 }],
    value: 0,
  });

  expect(sani.run(' 2 ')).toStrictEqual({
    fatal: false,
    errors: null,
    value: ' 2 ',
  });
});
