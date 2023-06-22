import renderer from 'react-test-renderer';
import { TriangleSolidArrow } from './TriangleSolidArrow';


it('renders <JsonView /> test case', () => {
  const component = renderer.create(
    <TriangleSolidArrow />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props', {
    viewBox: '0 0 15 15',
    fill: 'var(--w-rjv-arrow-color, currentColor)',
    style: { cursor: 'pointer', height: '1em', width: '1em' }
  });
});