import renderer from 'react-test-renderer';
import { EditIcon } from './edit';


it('renders <EditIcon /> test case', () => {
  const component = renderer.create(
    <EditIcon />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props', {
    viewBox: '0 0 26 26',
    fill: 'var(--w-rjv-edit-color, currentColor)',
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