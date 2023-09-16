import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '../';
import { Nan } from './Nan';

it('renders <JsonView.Nan /> test case', async () => {
  const demo = {
    value: NaN,
  };
  const { container } = render(
    <JsonView value={demo}>
      <Nan
        as="span"
        render={(props, { type, value }) => {
          expect(value).toBeNaN();
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-type-nan-color, #859900)');
          if (type === 'type') {
            return <span {...props} data-testid="type" />;
          }
          return <span {...props} data-testid="value" />;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const type = screen.getByTestId('type');
    expect(type.className).toBe('w-rjv-type');
    expect(type.tagName).toBe('SPAN');
    expect(type.innerHTML).toBe('NaN');
    const value = screen.getByTestId('value');
    expect(value.className).toBe('w-rjv-value');
    expect(value.tagName).toBe('SPAN');
    expect(type.innerHTML).toBe('NaN');
  });
});
