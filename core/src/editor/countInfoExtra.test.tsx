import renderer from 'react-test-renderer';
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