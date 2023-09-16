import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

it('renders <JsonView.String /> test case', async () => {
  const user = userEvent.setup();
  const demo = {
    string: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.String
        as="span"
        render={(props, { type, value }) => {
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-type-string-color, #cb4b16)');
          if (type === 'type') {
            return <span {...props} data-testid="type" />;
          }
          return <span {...props} data-testid="value" />;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const type = screen.getByTestId('type');
  expect(type.className).toBe('w-rjv-type');
  expect(type.tagName).toBe('SPAN');
  expect(type.innerHTML).toBe('string');
  const value = screen.getByTestId('value');
  expect(value.className).toBe('w-rjv-value');
  expect(value.tagName).toBe('SPAN');
  expect(value.innerHTML).toBe('Lorem ipsum dolor si...');
  await user.click(value);
  expect(value.innerHTML).toBe(demo.string);
  await user.click(value);
  expect(value.innerHTML).toBe('Lorem ipsum dolor si...');
});
