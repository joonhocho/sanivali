import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('maxItems', () => {
  const sani = new Sanivali([['maxItems', 3]]);

  expect(sani.run('12')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '12',
  });

  expect(sani.run('123')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '123',
  });

  expect(sani.run('1234')).toStrictEqual({
    fatal: false,
    errors: [
      {
        type: 'maxItems',
        param: 3,
        value: '1234',
      },
    ],
    value: '1234',
  });
});
