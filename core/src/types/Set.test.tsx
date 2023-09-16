import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

const mySet = new Set();
mySet.add(1); // Set(1) { 1 }
mySet.add(5); // Set(2) { 1, 5 }
mySet.add(5); // Set(2) { 1, 5 }
mySet.add('some text'); // Set(3) { 1, 5, 'some text' }

it('renders <JsonView.Set /> test case', async () => {
  const demo = {
    value: mySet,
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.Set
        as="span"
        render={(props, { type, value }) => {
          expect(type).toEqual('type');
          expect(value).toEqual(mySet);
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-type-set-color, #268bd2)');
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
    expect(type.innerHTML).toBe('Set');
  });
});
