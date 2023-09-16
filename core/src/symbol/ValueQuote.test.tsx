import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

it('renders <JsonView.ValueQuote /> test case', async () => {
  const demo = {
    value: '123',
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.ValueQuote data-testid="quote">|</JsonView.ValueQuote>
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const elm = screen.getAllByTestId('quote')[1];
    expect(elm.tagName).toBe('SPAN');
    expect(elm.innerHTML).toBe('|');
  });
});

it('renders <JsonView.ValueQuote render /> test case', async () => {
  const demo = {
    value: '123',
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.ValueQuote
        data-testid="quote"
        render={(props) => {
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-quotes-string-color, #cb4b16)');
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
