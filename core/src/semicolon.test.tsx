import renderer from 'react-test-renderer';
import { Semicolon } from './semicolon';

it('renders <Semicolon /> test case', () => {
  const component = renderer.create(
    <Semicolon>name</Semicolon>,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('children', null);
  expect(tree).toHaveProperty('type', 'span');
  expect(tree).toHaveProperty('props.className', 'w-rjv-object-key');
  expect(tree).toHaveProperty('props.style', {
    color: undefined,
    fontSize: undefined,
    opacity: undefined,
    paddingRight: undefined
  });
});

it('renders <Semicolon /> `render` test case', () => {
  const component = renderer.create(
    <Semicolon render={({ value, ...props }) => <del {...props} />}>name</Semicolon>,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('children', null);
  expect(tree).toHaveProperty('type', 'del');
  expect(tree).toHaveProperty('props.className', 'w-rjv-object-key');
  expect(tree).toHaveProperty('props.style', {
    color: undefined,
    fontSize: undefined,
    opacity: undefined,
    paddingRight: undefined
  });
});
