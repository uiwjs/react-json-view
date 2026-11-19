import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '..';
import { Colon } from './index';

it('renders <JsonView.Colon /> test case', async () => {
  const demo = {
    value: 123,
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.Colon data-testid="brace">x</JsonView.Colon>
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const elm = screen.getByTestId('brace');
    expect(elm.tagName).toBe('SPAN');
    expect(elm.innerHTML).toBe('x');
  });
});

it('renders <JsonView.Colon render /> test case', async () => {
  const demo = {
    value: 123,
  };
  const { container } = render(
    <JsonView value={demo}>
      <JsonView.Colon
        data-testid="colon"
        render={(props) => {
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-colon-color, var(--w-rjv-color))');
          return <span {...props}>.......</span>;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const elm = screen.getByTestId('colon');
    expect(elm.tagName).toBe('SPAN');
    expect(elm.className).toBe('w-rjv-colon');
    expect(elm.innerHTML).toBe('.......');
  });
});

it('supplies colon keys when the caller omits them', async () => {
  const seen: Array<(string | number)[] | undefined> = [];
  render(
    <JsonView value={{ value: 123 }}>
      <JsonView.Colon
        render={(_props, result) => {
          seen.push(result.keys as (string | number)[]);
          return null;
        }}
      />
      <Colon />
      <Colon keyName="k" />
    </JsonView>,
  );
  await waitFor(() => {
    expect(seen).toEqual(expect.arrayContaining([[], ['k']]));
  });
});
