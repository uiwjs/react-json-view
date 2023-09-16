import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

it('renders <JsonView.BracketsRight /> test case', async () => {
  const demo = {
    value: ['123'],
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.BracketsRight data-testid="brace">x</JsonView.BracketsRight>
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const arrow = screen.getByTestId('brace');
    expect(arrow.tagName).toBe('SPAN');
    expect(arrow.innerHTML).toBe('x');
  });
});

it('renders <JsonView.BracketsRight render /> test case', async () => {
  const demo = {
    value: ['123'],
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.BracketsRight
        data-testid="brace"
        render={(props) => {
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-brackets-color, #236a7c)');
          return <span {...props}>.......</span>;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const arrow = screen.getByTestId('brace');
    expect(arrow.tagName).toBe('SPAN');
    expect(arrow.className).toBe('w-rjv-brackets-end');
    expect(arrow.innerHTML).toBe('.......');
  });
});
