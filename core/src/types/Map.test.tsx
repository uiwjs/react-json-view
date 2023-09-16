import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

const myMap = new Map();
myMap.set('www', 'foo');
myMap.set(1, 'bar');

it('renders <JsonView.Map /> test case', async () => {
  const demo = {
    value: myMap,
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.Map
        as="span"
        render={(props, { type, value }) => {
          expect(type).toEqual('type');
          expect(value).toEqual(myMap);
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-type-map-color, #268bd2)');
          if (type === 'type') {
            return <span {...props} data-testid="type" />;
          }
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const type = screen.getByTestId('type');
    expect(type.className).toBe('w-rjv-type');
    expect(type.tagName).toBe('SPAN');
    expect(type.innerHTML).toBe('Map');
  });
});
