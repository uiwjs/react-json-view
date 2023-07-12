import renderer from 'react-test-renderer';
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountInfoExtra } from './countInfoExtra';


it('renders <CountInfoExtra /> test case', () => {
  const component = renderer.create(<CountInfoExtra editable showTools value={{ a: 123 }} />);
  let tree = component.toJSON();
  expect(tree).toBeNull();
});
it('renders <CountInfoExtra /> editable=false test case', () => {
  const component = renderer.create(<CountInfoExtra editable={false} visible showTools value={{ a: 123 }} />);
  let tree = component.toJSON();
  expect(tree).toBeNull();
});


it('renders <CountInfoExtra /> onAdd test case', () => {
  const component = renderer.create(<CountInfoExtra editable visible showTools value={{ a: 123 }} onAdd={() => true}/>);
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props.fill', 'var(--w-rjv-add-color, currentColor)')
  expect(tree).toHaveProperty('props.viewBox', '0 0 40 40')
  expect(tree).toHaveProperty('props.style', {
    verticalAlign: 'middle',
    display: 'inline-block',
    cursor: 'pointer',
    marginLeft: 5,
    height: '1em',
    width: '1em',
  });
});

it('renders <CountInfoExtra /> onDelete/parentValue test case', () => {
  const component = renderer.create(
    <CountInfoExtra editable parentValue={{ ab: 1 }} visible showTools value={{ a: 123 }} onDelete={() => true} onAdd={() => true} />
  );
  let tree = component.toJSON();
  expect(Array.isArray(tree)).toBe(true);
  if (Array.isArray(tree)) {
    const child1 = tree[1];
    expect(child1).toHaveProperty('type');
    expect(child1).toHaveProperty('props');
    expect(child1).toHaveProperty('children');
    expect(child1).toHaveProperty('type', 'svg');
    expect(child1).toHaveProperty('props.fill', 'var(--w-rjv-delete-color, #dc3545)')
    expect(child1).toHaveProperty('props.viewBox', '0 0 40 40')
    expect(child1).toHaveProperty('props.style', {
      verticalAlign: 'middle',
      display: 'inline-block',
      cursor: 'pointer',
      marginLeft: 5,
      height: '1em',
      width: '1em',
    });
  }
});

it('renders <CountInfoExtra /> `onDelete/onAdd` test case', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <CountInfoExtra
      editable
      visible
      showTools
      keyName="ab"
      parentValue={{ ab: { a: 123 } }}
      value={{ a: 123 }}
      onDelete={(keyName, value, parentValue) => {
        expect(keyName).toEqual('ab');
        return true;
      }}
      setValue={() => { }}
      setParentValue={() => { }}
      onAdd={(keyOrValue) => {
        expect(keyOrValue).toEqual('AddKeyOrValue');
        return true
      }}
    />
  );
  expect(container.firstElementChild).toBeInstanceOf(SVGSVGElement);
  await user.click(container.firstElementChild!);
  expect(container.lastElementChild).toBeInstanceOf(SVGSVGElement);
  await user.click(container.lastElementChild!);
});

it('renders <CountInfoExtra /> `onDelete/onAdd` test case', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <CountInfoExtra
      editable
      visible
      showTools
      keyName={0}
      parentValue={['ab', 1, 3]}
      value={['ab', 1, 3]}
      onDelete={(keyName, value, parentValue) => {
        expect(keyName).toEqual(0);
        return true;
      }}
      setValue={() => { }}
      setParentValue={() => { }}
      onAdd={(keyOrValue) => {
        expect(keyOrValue).toEqual('AddKeyOrValue');
        return true
      }}
    />
  );
  expect(container.firstElementChild).toBeInstanceOf(SVGSVGElement);
  await user.click(container.firstElementChild!);
  expect(container.lastElementChild).toBeInstanceOf(SVGSVGElement);
  await user.click(container.lastElementChild!);
});
