import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';

it('renders <JsonView.BraceRight /> test case', async () => {
  const demo = {
    value: '123',
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.BraceRight data-testid="brace">x</JsonView.BraceRight>
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const arrow = screen.getByTestId('brace');
    expect(arrow.tagName).toBe('SPAN');
    expect(arrow.innerHTML).toBe('x');
  });
});

it('renders <JsonView.BraceRight render /> test case', async () => {
  const demo = {
    value: '123',
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.BraceRight
        data-testid="brace"
        render={(props) => {
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-curlybraces-color, #236a7c)');
          return <span {...props}>.......</span>;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const arrow = screen.getByTestId('brace');
    expect(arrow.tagName).toBe('SPAN');
    expect(arrow.className).toBe('w-rjv-curlybraces-end');
    expect(arrow.innerHTML).toBe('.......');
  });
});
