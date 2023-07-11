import renderer from 'react-test-renderer';
import { AddIcon } from './add';


it('renders <AddIcon /> test case', () => {
  const component = renderer.create(
    <AddIcon />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props', {
    viewBox: '0 0 20 20',
    fill: 'var(--w-rjv-add-color, currentColor)',
    style: {
      verticalAlign: 'middle',
      display: 'inline-block',
      cursor: 'pointer',
      marginLeft: 5,
      height: '1em',
      width: '1em',
    }
  });
});