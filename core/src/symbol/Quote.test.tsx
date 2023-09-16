import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

it('renders <JsonView.Quote /> test case', async () => {
  const demo = {
    value: 123,
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.Quote data-testid="quote">x</JsonView.Quote>
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const elm = screen.getAllByTestId('quote')[0];
    expect(elm.tagName).toBe('SPAN');
    expect(elm.innerHTML).toBe('x');
  });
});

it('renders <JsonView.Quote render /> test case', async () => {
  const demo = {
    value: 123,
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.Quote
        data-testid="quote"
        render={(props) => {
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-quotes-color, #236a7c)');
          return <span {...props}>.......</span>;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const elm = screen.getAllByTestId('quote')[0];
    expect(elm.tagName).toBe('SPAN');
    expect(elm.className).toBe('w-rjv-quotes');
    expect(elm.innerHTML).toBe('.......');
  });
});
