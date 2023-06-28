import renderer from 'react-test-renderer';
import { ObjectKey } from './objectKey';

it('renders <ObjectKey /> test case', () => {
  const component = renderer.create(
    <ObjectKey />,
  );
  const tree = component.toJSON();

  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children', null);
  expect(tree).toHaveProperty('type', 'span');
  expect(tree).toHaveProperty('props.style', {
    color: undefined,
    fontSize: undefined,
    opacity: undefined,
    paddingRight: undefined
  })
  expect(tree).toHaveProperty('props.onClick');
  expect(tree).toHaveProperty('props.onFocus');
  expect(tree).toHaveProperty('props.onBlur');
  expect(tree).toHaveProperty('props.onKeyDown');
  expect(tree).toHaveProperty('props.autoFocus', false);
  expect(tree).toHaveProperty('props.contentEditable', false);
  expect(tree).toHaveProperty('props.spellCheck', false);
  expect(tree).toHaveProperty('props.suppressContentEditableWarning', true);
});

it('renders <ObjectKey /> render test case', () => {
  const component = renderer.create(
    <ObjectKey
      label="good"
      keyName="key"
      quotes="'"
      render={({ value, keyName, label, parentName, ...props}) => {
        return <span {...props}>xx{label}</span>
      }}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children', ['xx', 'good']);
  expect(tree).toHaveProperty('type', 'span');
  expect(tree).toHaveProperty('props.style', {
    color: undefined,
    fontSize: undefined,
    opacity: undefined,
    paddingRight: undefined
  })
  expect(tree).toHaveProperty('props.onClick');
  expect(tree).toHaveProperty('props.onFocus');
  expect(tree).toHaveProperty('props.onBlur');
  expect(tree).toHaveProperty('props.onKeyDown');
  expect(tree).toHaveProperty('props.autoFocus', false);
  expect(tree).toHaveProperty('props.contentEditable', false);
  expect(tree).toHaveProperty('props.spellCheck', false);
  expect(tree).toHaveProperty('props.suppressContentEditableWarning', true);
});
