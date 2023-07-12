import renderer from 'react-test-renderer';
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Copied } from './copied';

it('renders <Copied /> test case', () => {
  const component = renderer.create(
    <Copied />,
  );
  let tree = component.toJSON();
  expect(tree).toBeNull();
});

it('renders <Copied /> `show` test case', () => {
  const component = renderer.create(
    <Copied text={{ a: 1 }} show />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props.viewBox', '0 0 32 36');
  expect(tree).toHaveProperty('props.height', '1em');
  expect(tree).toHaveProperty('props.width', '1em');
  expect(tree).toHaveProperty('props.fill', 'var(--w-rjv-copied-color, currentColor)');
  expect(tree).toHaveProperty('props.style', { cursor: 'pointer', marginLeft: 5, verticalAlign: 'middle' });
  expect(tree).toHaveProperty('props.className', 'w-rjv-copied');
  expect(tree).toHaveProperty('props.onClick');
});

it('renders <Copied /> `click` test case', async () => {
  const user = userEvent.setup();
  render(<Copied text={{ a: 1 }} show data-testid="demo2" />);
  const elm = screen.getByTestId('demo2');
  await user.click(elm);
  expect(elm).toBeInstanceOf(SVGSVGElement);
  const elme = screen.getByTestId('demo2');
  expect(typeof elme).toEqual('object');
  expect(elm.style).toHaveProperty('cursor', 'pointer');
  expect(elm.style).toHaveProperty('vertical-align', 'middle');
  expect(elm.style).toHaveProperty('margin-left', '5px');
  expect(elm.getAttribute('fill')).toEqual('var(--w-rjv-copied-success-color, #28a745)');
  // screen.debug();
});

it('renders <Copied /> `show` test case', () => {
  function TriangleArrow(props: any) {
    const { style, ...reset } = props;
    const defaultStyle: React.CSSProperties = {
      cursor: 'pointer',
      height: '1em',
      width: '1em',
      verticalAlign: 'middle',
      ...style,
    };
    return (
      <svg viewBox="0 0 24 24" fill="var(--w-rjv-arrow-color, currentColor)" style={defaultStyle} {...reset}>
        <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </svg>
    );
  }
  
  const component = renderer.create(
    <Copied text={{ a: 1 }} show render={(props) => <TriangleArrow {...props}/>} />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props.viewBox', '0 0 24 24');
  expect(tree).toHaveProperty('props.height', '1em');
  expect(tree).toHaveProperty('props.width', '1em');
  expect(tree).toHaveProperty('props.fill', 'var(--w-rjv-copied-color, currentColor)');
  expect(tree).toHaveProperty('props.style', { cursor: 'pointer', marginLeft: 5, height: '1em', width: '1em', verticalAlign: 'middle' });
  expect(tree).toHaveProperty('props.className', 'w-rjv-copied');
  expect(tree).toHaveProperty('props.onClick');
});
