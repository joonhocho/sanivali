import { addDefaultDefs } from '_src/addAllDefs';
import { Sanivali } from '../sanivali';
addDefaultDefs();

test('notEmpty', async () => {
  const param = ['a', 'b'];
  const type = 'notEmpty';
  const sani = new Sanivali({
    notEmpty: ['a', 'b'],
  });
  let value: any;

  const ok = () => ({ errors: null, fatal: false, value });

  const notOk = (...errors: any[]) => ({ errors, fatal: false, value });

  value = {};
  expect(sani.run(value)).toStrictEqual(notOk({ param, type, value }));

  value = { a: 1 };
  expect(sani.run(value)).toStrictEqual(notOk({ param, type, value }));

  value = { a: 1, b: '3' };
  value = expect(sani.run(value)).toStrictEqual(ok());

  value = { a: 1, b: '3', c: null };
  value = expect(sani.run(value)).toStrictEqual(ok());

  value = { a: 1, b: '', c: null };
  expect(sani.run(value)).toStrictEqual(notOk({ param, type, value }));

  value = { a: 1, b: [], c: null };
  expect(sani.run(value)).toStrictEqual(notOk({ param, type, value }));

  value = { a: 1, b: [1], c: null };
  value = expect(sani.run(value)).toStrictEqual(ok());

  value = { a: 1, b: {}, c: null };
  expect(sani.run(value)).toStrictEqual(notOk({ param, type, value }));

  value = { a: 1, b: { a: 1 }, c: null };
  value = expect(sani.run(value)).toStrictEqual(ok());

  value = { a: 1, b: null, c: null };
  expect(sani.run(value)).toStrictEqual(notOk({ param, type, value }));

  value = { a: 1, b: undefined, c: null };
  expect(sani.run(value)).toStrictEqual(notOk({ param, type, value }));
});
