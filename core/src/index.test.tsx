import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '@testing-library/react';
import JsonView from './';

const mySet = new Set();
mySet.add(1); // Set(1) { 1 }
mySet.add(5); // Set(2) { 1, 5 }
mySet.add(5); // Set(2) { 1, 5 }
mySet.add('some text'); // Set(3) { 1, 5, 'some text' }

const myMap = new Map();
myMap.set('www', 'foo');
myMap.set(1, 'bar');

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const longArray = new Array(1000).fill(1);
const example = {
  avatar,
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  // @ts-ignore
  bigint: 10086n,
  null: null,
  undefined,
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  array: [19, 100.86, 'test', NaN, Infinity],
  nestedArray: [
    [1, 2],
    [3, 4],
  ],
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  longArray,
  string_number: '1234',
};

it('renders <JsonView /> test case', () => {
  const component = renderer.create(<JsonView value={example} />);
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'div');
  expect(tree).toHaveProperty('props.className', 'w-json-view-container w-rjv w-rjv-inner');
  expect(tree).toHaveProperty('props.style.backgroundColor', 'var(--w-rjv-background-color, #00000000)');
  expect(tree).toHaveProperty('props.style', {
    lineHeight: 1.4,
    fontSize: 13,
    fontFamily: 'var(--w-rjv-font-family, Menlo, monospace)',
    color: 'var(--w-rjv-color, #002b36)',
    backgroundColor: 'var(--w-rjv-background-color, #00000000)',
  });
  expect(tree).toHaveProperty('props.onMouseEnter');
  expect(tree).toHaveProperty('props.onMouseLeave');
});

it('renders <JsonView.String /> test case', async () => {
  const demo = {
    string: 'Lorem ipsum dolor sit amet',
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.String
        render={(props, { type }) => {
          if (type === 'type') {
            expect(props.style).toHaveProperty('color', 'var(--w-rjv-type-string-color, #cb4b16)');
            return <em {...props} data-testid="str-type" />;
          }
          return <span {...props} data-testid="str-value" />;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const type = screen.getByTestId('str-type');
    expect(type.className).toBe('w-rjv-type');
    expect(type.tagName).toBe('EM');
    expect(type.innerHTML).toBe('string');
    const value = screen.getByTestId('str-value');
    expect(value.className).toBe('w-rjv-value');
    expect(value.tagName).toBe('SPAN');
    expect(value).toHaveProperty('style.cursor', 'pointer');
  });
});

[
  {
    name: 'Bigint',
    Comp: JsonView.Bigint,
    value: BigInt(10086),
    field: 'bigint',
    color: 'var(--w-rjv-type-bigint-color, #268bd2)',
  },
  {
    name: 'False',
    Comp: JsonView.False,
    value: false,
    field: 'bool',
    color: 'var(--w-rjv-type-boolean-color, #2aa198)',
  },
  {
    name: 'Float',
    Comp: JsonView.Float,
    value: 0.3,
    field: 'float',
    color: 'var(--w-rjv-type-float-color, #859900)',
  },
  {
    name: 'Int',
    Comp: JsonView.Int,
    value: 123,
    field: 'int',
    color: 'var(--w-rjv-type-int-color, #268bd2)',
  },
  {
    name: 'True',
    Comp: JsonView.True,
    value: true,
    field: 'bool',
    color: 'var(--w-rjv-type-boolean-color, #2aa198)',
  },
  {
    name: 'Null',
    Comp: JsonView.Null,
    value: null,
    field: 'null',
    color: 'var(--w-rjv-type-null-color, #d33682)',
  },
  {
    name: 'Undefined',
    Comp: JsonView.Undefined,
    value: undefined,
    field: 'undefined',
    color: 'var(--w-rjv-type-undefined-color, #586e75)',
  },
  // {
  //   name: 'Nan',
  //   Comp: JsonView.Nan,
  //   value: NaN,
  //   field: 'NaN',
  //   color: 'var(--w-rjv-type-nan-color, #859900)',
  // },
  // {
  //   name: 'Date',
  //   Comp: JsonView.Date,
  //   value: new Date('2023/02/12'),
  //   field: 'date',
  //   color: 'var(--w-rjv-type-date-color, #268bd2)',
  // },
  // {
  //   name: 'Url',
  //   Comp: JsonView.Url,
  //   value: new URL('https://www.google.com'),
  //   field: 'url',
  //   color: 'var(--w-rjv-type-url-color, #0969da)',
  // },
  // {
  //   name: 'Map',
  //   Comp: JsonView.Map,
  //   value: myMap,
  //   field: 'map',
  //   color: 'var(--w-rjv-type-map-color, #268bd2)',
  // },
].forEach(({ name, value: val, field, color, Comp }) => {
  it(`renders <JsonView.${name} /> test case`, async () => {
    const demo = {
      value: val,
    };
    const { container } = render(
      <JsonView value={demo}>
        <Comp
          render={(props, { type, value }) => {
            expect(value).toBe(val);
            expect(props.style).toHaveProperty('color', color);
            return <span {...props} data-testid={`${name}-${type}`} />;
          }}
        />
      </JsonView>,
    );
    expect(container.firstElementChild).toBeInstanceOf(Element);
    await waitFor(() => {
      const type = screen.getByTestId(`${name}-type`);
      expect(type.className).toBe('w-rjv-type');
      expect(type.tagName).toBe('SPAN');
      expect(type.innerHTML).toBe(field);
      const value = screen.getByTestId(`${name}-value`);
      expect(value.className).toBe('w-rjv-value');
      expect(value.tagName).toBe('SPAN');
    });
  });
});
