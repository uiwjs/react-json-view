import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '../';

it('renders <JsonView.Date /> test case', async () => {
  const demo = {
    date: new Date('2023/02/12'),
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.Date
        as="span"
        render={(props, { type, value }) => {
          expect((value as Date).getDate()).toBe(demo.date.getDate());
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-type-date-color, #268bd2)');

          if (type === 'type') {
            return <span {...props} data-testid="date-type" />;
          }
          props.children = (value as Date).toLocaleString();
          return <span {...props} data-testid="date-value" />;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const type = screen.getByTestId('date-type');
    expect(type.className).toBe('w-rjv-type');
    expect(type.tagName).toBe('SPAN');
    expect(type.innerHTML).toBe('date');
    const value = screen.getByTestId('date-value');
    expect(value.className).toBe('w-rjv-value');
    expect(value.tagName).toBe('SPAN');
    expect(value.innerHTML).toBe(demo.date.toLocaleString());
  });
});
