import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render} from '@testing-library/react';
import JsonView from './';


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
  const component = renderer.create(
    <JsonView value={example} />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'div');
  expect(tree).toHaveProperty('props.className', 'w-json-view-container w-rjv  w-rjv-inner');
  expect(tree).toHaveProperty('props.style.backgroundColor', 'var(--w-rjv-background-color, #00000000)');
  expect(tree).toHaveProperty('props.style', {
    lineHeight: 1.4,
    fontFamily: 'monospace',
    color: 'var(--w-rjv-color, #002b36)',
    backgroundColor: 'var(--w-rjv-background-color, #00000000)'
  });
  expect(tree).toHaveProperty('props.onMouseEnter');
  expect(tree).toHaveProperty('props.onMouseLeave');
});