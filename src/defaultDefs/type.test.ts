import { Sanivali } from '../sanivali';

test('type undefined', () => {
  const sani = new Sanivali([['type', 'undefined']]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'undefined',
        value: null,
      },
    ],
    value: null,
  });
});

test('type null', () => {
  const sani = new Sanivali([['type', 'null']]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'null',
        value: undefined,
      },
    ],
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});

test('type [null]', () => {
  const sani = new Sanivali([['type', ['null']]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: ['null'],
        value: undefined,
      },
    ],
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});

test('type nil', () => {
  const sani = new Sanivali([['type', 'nil']]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(0)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'nil',
        value: 0,
      },
    ],
    value: 0,
  });
});

test('type boolean', () => {
  const sani = new Sanivali([['type', 'boolean']]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'boolean',
        value: undefined,
      },
    ],
    value: undefined,
  });

  expect(sani.run(1)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'boolean',
        value: 1,
      },
    ],
    value: 1,
  });

  expect(sani.run(false)).toStrictEqual({
    fatal: false,
    errors: null,
    value: false,
  });
});

test('type number', () => {
  const sani = new Sanivali([['type', 'number']]);

  expect(sani.run(true)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'number',
        value: true,
      },
    ],
    value: true,
  });

  expect(sani.run(0)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 0,
  });
});

test('type string', () => {
  const sani = new Sanivali([['type', 'string']]);

  expect(sani.run(0)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'string',
        value: 0,
      },
    ],
    value: 0,
  });

  expect(sani.run('')).toStrictEqual({
    fatal: false,
    errors: null,
    value: '',
  });
});

test('type integer', () => {
  const sani = new Sanivali([['type', 'integer']]);

  expect(sani.run(0.5)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'integer',
        value: 0.5,
      },
    ],
    value: 0.5,
  });

  expect(sani.run(1)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });
});

test('type object', () => {
  const sani = new Sanivali([['type', 'object']]);

  expect(sani.run([])).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'object',
        value: [],
      },
    ],
    value: [],
  });

  expect(sani.run({})).toStrictEqual({
    fatal: false,
    errors: null,
    value: {},
  });
});

test('type array', () => {
  const sani = new Sanivali([['type', 'array']]);

  expect(sani.run({})).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param: 'array',
        value: {},
      },
    ],
    value: {},
  });

  expect(sani.run([])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [],
  });
});

test('type multiple', () => {
  const param = ['nil', 'number', 'array'];
  const sani = new Sanivali([['type', param]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });

  expect(sani.run(1)).toStrictEqual({
    fatal: false,
    errors: null,
    value: 1,
  });

  expect(sani.run(true)).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param,
        value: true,
      },
    ],
    value: true,
  });

  expect(sani.run('')).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param,
        value: '',
      },
    ],
    value: '',
  });

  expect(sani.run({})).toStrictEqual({
    fatal: true,
    errors: [
      {
        type: 'type',
        param,
        value: {},
      },
    ],
    value: {},
  });

  expect(sani.run([])).toStrictEqual({
    fatal: false,
    errors: null,
    value: [],
  });
});

test('type []', () => {
  const sani = new Sanivali([['type', []]]);

  expect(sani.run(undefined)).toStrictEqual({
    fatal: false,
    errors: null,
    value: undefined,
  });

  expect(sani.run(null)).toStrictEqual({
    fatal: false,
    errors: null,
    value: null,
  });
});
