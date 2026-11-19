import renderer from 'react-test-renderer';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import JsonView from './';
import { Provider } from './store';
import { Container } from './Container';
import { KeyValues, KeyValuesItem } from './comps/KeyValues';

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

it('renders <JsonView objectSortKeys /> test case', () => {
  render(
    <JsonView value={{ b: 1, a: 2 }} objectSortKeys>
      <JsonView.KeyName data-testid="keyname" />
    </JsonView>,
  );
  const keyname = screen.getAllByTestId('keyname')[0];
  expect(keyname.innerHTML).toEqual('a');
});

it('renders <JsonView objectSortKeys={false} /> test case', () => {
  render(
    <JsonView value={{ b: 1, a: 2 }} objectSortKeys={false}>
      <JsonView.KeyName data-testid="keyname" />
    </JsonView>,
  );
  const keyname = screen.getAllByTestId('keyname')[0];
  expect(keyname.innerHTML).toEqual('b');
});

it('renders <JsonView objectSortKeys={() => {}} /> test case', () => {
  render(
    <JsonView
      value={{ bool: 1, a: 2 }}
      objectSortKeys={(a, b, valA, valB) => {
        expect(a).toEqual('a');
        expect(b).toEqual('bool');
        expect(valA).toEqual(2);
        expect(valB).toEqual(1);
        return a.localeCompare(b);
      }}
    >
      <JsonView.KeyName data-testid="keyname" />
    </JsonView>,
  );
  const keyname = screen.getAllByTestId('keyname')[0];
  expect(keyname.innerHTML).toEqual('a');
});

it('renders null, undefined and NaN values when displayDataTypes={false}', () => {
  render(<JsonView value={{ null: null, undefined, nan: NaN }} displayDataTypes={false} />);

  const values = Array.from(document.querySelectorAll('.w-rjv-value')).map((elm) => elm.textContent);
  expect(values).toEqual(['null', 'undefined', 'NaN']);
  expect(screen.queryByText('float')).toBeNull();
  expect(screen.queryByText('undefined', { selector: '.w-rjv-type' })).toBeNull();
  expect(screen.queryByText('null', { selector: '.w-rjv-type' })).toBeNull();
  expect(screen.queryByText('NaN', { selector: '.w-rjv-type' })).toBeNull();
});

it('renders root-level Set and Map values like nested ones', () => {
  const { container, rerender } = render(<JsonView value={new Set(['read', 'write'])} />);
  expect(container.textContent).toContain('read');
  expect(container.textContent).toContain('write');
  expect(container.textContent).toContain('Set');
  expect(container.textContent).toContain('2 items');

  rerender(<JsonView value={new Map([['role', 'admin']])} />);
  expect(container.textContent).toContain('role');
  expect(container.textContent).toContain('admin');
  expect(container.textContent).toContain('Map');
  expect(container.textContent).toContain('1 item');
});

it('collapses nodes past a numeric depth and notifies onExpand', () => {
  const onExpand = jest.fn();
  const { container } = render(
    <JsonView value={{ l1: { l2: { l3: { msg: 'deep-secret' } } } }} collapsed={2} onExpand={onExpand} />,
  );
  expect(screen.getByText('l1')).toBeTruthy();
  expect(screen.getByText('l2')).toBeTruthy();
  expect(screen.queryByText('deep-secret')).toBeNull();
  fireEvent.click(container.querySelector('.w-rjv-arrow')!);
  expect(onExpand).toHaveBeenCalledWith(expect.objectContaining({ expand: true, keyName: undefined }));
});

it('shows every level when collapsed is neither boolean nor number', () => {
  render(
    <Provider initialState={{ collapsed: undefined }}>
      <Container value={{ a: 1 }} />
      <KeyValues value={{ z: 9 }} level={1} />
      <KeyValuesItem keyName="solo" value="x" />
    </Provider>,
  );
  expect(screen.getByText('a')).toBeTruthy();
  expect(screen.getByText('z')).toBeTruthy();
  expect(screen.getByText('solo')).toBeTruthy();
});

it('hides children when shouldExpandNodeInitially returns false', () => {
  render(<JsonView value={{ a: { b: 2 }, c: 3 }} shouldExpandNodeInitially={() => false} />);
  expect(screen.queryByText('b')).toBeNull();
  expect(screen.queryByText('c')).toBeNull();
});

it('shows children when shouldExpandNodeInitially returns true', () => {
  render(<JsonView value={{ a: { b: 2 } }} shouldExpandNodeInitially={() => true} />);
  expect(screen.getByText('b')).toBeTruthy();
});

it('lets collapsed override shouldExpandNodeInitially', () => {
  render(<JsonView value={{ a: 1 }} collapsed shouldExpandNodeInitially={() => false} />);
  expect(screen.queryByText('a')).toBeNull();
});

it('hides a collapsed node when the stored callback asks to expand it', () => {
  const { rerender } = render(
    <Provider initialState={{ collapsed: true, shouldExpandNodeInitially: () => true }}>
      <Container value={{ a: 1 }} />
    </Provider>,
  );
  expect(screen.queryByText('a')).toBeNull();
  rerender(
    <Provider initialState={{ collapsed: true, shouldExpandNodeInitially: () => false }}>
      <Container value={{ kept: 1 }} />
    </Provider>,
  );
  expect(screen.getByText('kept')).toBeTruthy();
});

it('renders empty objects and non-json values', () => {
  render(<JsonView value={{ empty: {}, run: () => 1 }} />);
  expect(screen.getByText('empty')).toBeTruthy();
  expect(screen.getByText('run')).toBeTruthy();
});

it('does not shorten strings when shortenTextAfterLength is 0', () => {
  const text = 'x'.repeat(40);
  render(<JsonView value={{ text }} shortenTextAfterLength={0} />);
  expect(screen.getByText(text)).toBeTruthy();
});

it('leaves numeric keys unsorted', () => {
  const sort = jest.fn().mockReturnValue(0);
  const { container, rerender } = render(<JsonView value={{ nums: [3, 1, 2] }} objectSortKeys={sort} />);
  const readValues = () => Array.from(container.querySelectorAll('.w-rjv-value')).map((elm) => elm.textContent);
  expect(readValues()).toEqual(['3', '1', '2']);
  expect(sort).not.toHaveBeenCalled();
  rerender(<JsonView value={{ nums: [3, 1, 2] }} objectSortKeys />);
  expect(readValues()).toEqual(['3', '1', '2']);
});
