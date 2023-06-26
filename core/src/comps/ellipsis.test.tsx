import renderer from 'react-test-renderer';
import { Ellipsis } from './ellipsis';

it('renders <Ellipsis /> test case', () => {
  const component = renderer.create(
    <Ellipsis />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children', [ '...' ]);
  expect(tree).toHaveProperty('type', 'span');
  expect(tree).toHaveProperty('props', {
    className: 'w-rjv-ellipsis ',
    style: {
      cursor: 'pointer',
    }
  });
});


it('renders <Ellipsis /> render props test case', () => {
  const component = renderer.create(
    <Ellipsis render={(props) => <del {...props}>xxx</del>} />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children', [ 'xxx' ]);
  expect(tree).toHaveProperty('type', 'del');
  expect(tree).toHaveProperty('props', {
    className: 'w-rjv-ellipsis ',
    style: {
      cursor: 'pointer',
    }
  });
});