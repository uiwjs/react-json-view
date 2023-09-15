import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';
import { Url } from './Url';

it('renders <JsonView.Url /> test case', async () => {
  const demo = {
    value: new URL('https://wangchujiang.com/'),
  };
  const { container } = render(
    <JsonView value={demo}>
      <Url
        as="span"
        render={(props, { type, value }) => {
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-type-url-color, #0969da)');
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
    expect(type.innerHTML).toBe('url');
    const value = screen.getByTestId('value');
    expect(value.className).toBe('w-rjv-value');
    expect(value.tagName).toBe('SPAN');
    expect(value.innerHTML).toBe(demo.value.href);
  });
});
