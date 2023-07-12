import renderer from 'react-test-renderer';
import { DeleteIcon } from './delete';


it('renders <DeleteIcon /> test case', () => {
  const component = renderer.create(
    <DeleteIcon />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props', {
    viewBox: '0 0 40 40',
    fill: 'var(--w-rjv-delete-color, #dc3545)',
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