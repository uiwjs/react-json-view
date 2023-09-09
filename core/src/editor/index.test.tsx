import renderer from 'react-test-renderer';
import JsonViewEditor from './';

it('renders <JsonViewEditor /> test case', () => {
  const component = renderer.create(<JsonViewEditor />);
  const tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('type', 'div');
  expect(tree).toHaveProperty('props.style', {
    lineHeight: 1.4,
    fontSize: 13,
    fontFamily: 'var(--w-rjv-font-family, Menlo, monospace)',
    color: 'var(--w-rjv-color, #002b36)',
    backgroundColor: 'var(--w-rjv-background-color, #00000000)',
  });
  // @ts-ignore
  expect(tree.children).toHaveLength(3);
  expect(tree).toHaveProperty('props.className', 'w-json-view-container w-rjv  w-rjv-inner');
  expect(tree).toHaveProperty('props.onMouseEnter');
  expect(tree).toHaveProperty('props.onMouseLeave');
  expect(tree).toHaveProperty('children[0].type', 'div');
  expect(tree).toHaveProperty('children[0].props.style', {
    alignItems: 'center',
    display: 'inline-flex',
  });
  expect(tree).toHaveProperty('children[0].props.onClick');
});
