import { render, screen, waitFor } from '@testing-library/react';
import JsonView from '../';

it('renders a custom row from the section render callback', async () => {
  render(
    <JsonView value={{ a: 1 }}>
      <JsonView.Row
        render={(_props, { keyName }) => <div data-testid={`row-${String(keyName)}`}>{String(keyName)}</div>}
      />
    </JsonView>,
  );
  await waitFor(() => {
    expect(screen.getByTestId('row-a').textContent).toBe('a');
  });
});

it('ignores a non-function row render and falls back when as is empty', async () => {
  render(
    <JsonView value={{ a: 1 }}>
      <JsonView.Row render={'nope' as unknown as () => null} as={'' as 'div'} />
    </JsonView>,
  );
  await waitFor(() => {
    expect(screen.getByText('a')).toBeTruthy();
  });
});

it('renders the row element when render returns nothing', async () => {
  render(
    <JsonView value={{ a: 1 }}>
      <JsonView.Row render={() => null} />
    </JsonView>,
  );
  await waitFor(() => {
    expect(screen.getByText('a')).toBeTruthy();
  });
});
