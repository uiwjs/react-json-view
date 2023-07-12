import renderer from 'react-test-renderer';
import { ReValue } from './value';

it('renders <ReValue /> type="string" test case', () => {
  const component = renderer.create(
    <ReValue type="string" />,
  );
  const tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('type', 'span');
  expect(tree).toHaveProperty('props.style.color', 'var(--w-rjv-type-undefined-color, #586e75)')
  expect(tree).toHaveProperty('props.onBlur');
  expect(tree).toHaveProperty('props.onKeyDown');
  expect(tree).toHaveProperty('children', ["undefined"]);
  expect(tree).toHaveProperty('props[data-value]', 'undefined');
});

it('renders <ReValue /> displayDataTypes="true" test case', () => {
  const component = renderer.create(
    <ReValue type="string" displayDataTypes value="test" />,
  );
  const tree = component.toJSON();
  expect(Array.isArray(tree)).toBe(true);
  if (Array.isArray(tree)) {
    const child1 = tree[1];
    expect(child1).toHaveProperty('type');
    expect(child1).toHaveProperty('props');
    expect(child1).toHaveProperty('type', 'span');
    expect(child1).toHaveProperty('props.style.color', 'var(--w-rjv-type-string-color, #cb4b16)')
    expect(child1).toHaveProperty('props.onBlur');
    expect(child1).toHaveProperty('props.onKeyDown');
    expect(child1).toHaveProperty('children', ["test"]);
    expect(child1).toHaveProperty('props[data-value]', '"test"');
  }
});

it('renders <ReValue /> value="test" test case', () => {
  const component = renderer.create(
    <ReValue type="string" displayDataTypes value="test" />,
  );
  const tree = component.toJSON();
  expect(Array.isArray(tree)).toBe(true);
  if (Array.isArray(tree)) {
    const child1 = tree[1];
    expect(tree).toHaveLength(2);
    expect(child1).toHaveProperty('type');
    expect(child1).toHaveProperty('props');
    expect(child1).toHaveProperty('type', 'span');
    expect(child1).toHaveProperty('props.style.color', 'var(--w-rjv-type-string-color, #cb4b16)')
    expect(child1).toHaveProperty('props.onBlur');
    expect(child1).toHaveProperty('props.onKeyDown');
    expect(child1).toHaveProperty('children', ['test']);
    expect(child1).toHaveProperty('props[data-value]', '"test"');
  }
});


it('renders <ReValue /> editable & onEdit test case', () => {
  const component = renderer.create(
    <ReValue type="string" displayDataTypes value="test" visible={true} editableValue={true} onEdit={() => true} />,
  );
  const tree = component.toJSON();
  expect(Array.isArray(tree)).toBe(true);
  if (Array.isArray(tree)) {
    expect(tree).toHaveLength(3);
    const child1 = tree[2];
    expect(child1).toHaveProperty('type');
    expect(child1).toHaveProperty('props');
    expect(child1).toHaveProperty('type', 'svg');
    expect(child1).toHaveProperty('props.viewBox', '0 0 26 26');
    expect(child1).toHaveProperty('props.fill', 'var(--w-rjv-edit-color, currentColor)');
    expect(child1).toHaveProperty('props.style', {
      verticalAlign: 'middle',
      display: 'inline-block',
      cursor: 'pointer',
      marginLeft: 5,
      height: '1em',
      width: '1em'
    })
    expect(child1.children).toHaveLength(1);
    expect(child1).toHaveProperty('children[0].type', 'path');
  }
});

it('renders <ReValue /> onEdit test case', () => {
  const component = renderer.create(
    <ReValue type="string" displayDataTypes value="test" visible={true} editableValue={true} />,
  );
  const tree = component.toJSON();
  expect(Array.isArray(tree)).toBe(true);
  if (Array.isArray(tree)) {
    expect(tree).toHaveLength(2);
    const child1 = tree[1];
    expect(child1).toHaveProperty('type');
    expect(child1).toHaveProperty('props');
    expect(child1).toHaveProperty('type', 'span');
    expect(tree[2]).toBeUndefined();
  }
});

it('renders <ReValue /> quotes test case', () => {
  const component = renderer.create(
    <ReValue type="string" displayDataTypes quotes="'" value="test" visible={true} editableValue={true} />,
  );
  const tree = component.toJSON();
  expect(Array.isArray(tree)).toBe(true);
  if (Array.isArray(tree)) {
    expect(tree).toHaveLength(4);
    const child1 = tree[1];
    expect(child1).toHaveProperty('type');
    expect(child1).toHaveProperty('props');
    expect(child1).toHaveProperty('type', 'span');
    expect(tree[2]).toHaveProperty('type', 'span');
    expect(tree[2]).toHaveProperty('props.onBlur');
    expect(tree[2]).toHaveProperty('props.onKeyDown');
    expect(tree[2]).toHaveProperty('props.spellCheck', false);
    expect(tree[2]).toHaveProperty('props.style', { color: 'var(--w-rjv-type-string-color, #cb4b16)' });
    expect(tree[2]).toHaveProperty('props.data-value', '"test"');
  }
});


it('renders <ReValue /> onDelete test case', () => {
  const component = renderer.create(
    <ReValue type="string" displayDataTypes quotes="'" value="test" visible={true} editableValue={true}  onDelete={() => true} />,
  );
  const tree = component.toJSON();
  expect(Array.isArray(tree)).toBe(true);
  if (Array.isArray(tree)) {
    expect(tree).toHaveLength(5);
    const child1 = tree[4];
    expect(child1).toHaveProperty('props');
    expect(child1).toHaveProperty('type', 'svg');
    expect(child1).toHaveProperty('props.style', {
      verticalAlign: 'middle',
      display: 'inline-block',
      cursor: 'pointer',
      marginLeft: 5,
      height: '1em',
      width: '1em'
    });
    expect(child1).toHaveProperty('props.onClick');
    expect(child1).toHaveProperty('props.fill', 'var(--w-rjv-delete-color, #dc3545)');
    expect(child1).toHaveProperty('props.viewBox', '0 0 40 40');
  }
});