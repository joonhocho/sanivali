import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('trimToNull', () => {
  const sani = new Sanivali([['type', 'string'], 'trimToNull']);

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
    value: null,
  });
});

test('trimToNull undefined', () => {
  const sani = new Sanivali([
    ['type', 'string'],
    ['trimToNull', 'undefined'],
  ]);

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
    value: undefined,
  });
});
