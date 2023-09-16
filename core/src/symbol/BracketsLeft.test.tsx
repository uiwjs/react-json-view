import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

it('renders <JsonView.BracketsLeft /> test case', async () => {
  const demo = {
    value: ['123'],
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.BracketsLeft data-testid="brace">x</JsonView.BracketsLeft>
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const arrow = screen.getByTestId('brace');
    expect(arrow.tagName).toBe('SPAN');
    expect(arrow.innerHTML).toBe('x');
  });
});

it('renders <JsonView.BracketsLeft render /> test case', async () => {
  const demo = {
    value: ['123'],
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.BracketsLeft
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
    expect(arrow.className).toBe('w-rjv-brackets-start');
    expect(arrow.innerHTML).toBe('.......');
  });
});
