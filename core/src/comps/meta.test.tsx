import renderer from 'react-test-renderer';
import { Meta } from './meta';

it('renders <Meta /> test case', () => {
  const component = renderer.create(
    <Meta />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children', [ '}' ]);
  expect(tree).toHaveProperty('type', 'span');
  expect(tree).toHaveProperty('props', {
    style: {
      color: 'var(--w-rjv-curlybraces-color, #236a7c)',
      fontSize: undefined,
      opacity: undefined,
      paddingRight: undefined
    },
    className: 'w-rjv-curlybraces-end '
  });
});


it('renders <Meta /> render props test case', () => {
  const component = renderer.create(
    <Meta start render={(props) => <del {...props} />} />,
  );
  const tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children', [ '{' ]);
  expect(tree).toHaveProperty('type', 'del');
  expect(tree).toHaveProperty('props', {
    isArray: false,
    className: 'w-rjv-curlybraces-start ',
    style: { color: 'var(--w-rjv-curlybraces-color, #236a7c)' }
  });
});

it('renders <Meta /> isArray props test case', () => {
  const component = renderer.create(
    <Meta isArray render={(props) => <del {...props} />} />,
  );
  const tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children', [ ']' ]);
  expect(tree).toHaveProperty('type', 'del');
  expect(tree).toHaveProperty('props', {
    isArray: true,
    className: 'w-rjv-brackets-end ',
    style: { color: 'var(--w-rjv-brackets-color, #236a7c)' }
  });
});