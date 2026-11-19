import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '../';
import { KeyName, KeyNameComp } from './KeyName';

const example = {
  value: 'test2',
};

it('renders <JsonView.KeyName /> test case', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <JsonView value={example}>
      <KeyName
        as="span"
        data-testid="keyName"
        render={(props) => {
          expect(props.children).toEqual('value');
          expect(props.style).toHaveProperty('color', 'var(--w-rjv-key-string, #002b36)');
          return <span {...props} />;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await waitFor(() => {
    const keyName = screen.getByTestId('keyName');
    expect(keyName.className).toEqual('w-rjv-object-key');
  });
});

it('fills keys when KeyNameComp is rendered without them', async () => {
  const seen: Array<(string | number)[] | undefined> = [];
  render(
    <JsonView value={{ a: 1 }}>
      <JsonView.KeyName
        render={(_props, result) => {
          seen.push(result.keys as (string | number)[] | undefined);
          return <span>{String(result.keyName ?? 'bare')}</span>;
        }}
      />
      <KeyNameComp keyName="solo">solo</KeyNameComp>
      <KeyNameComp>bare</KeyNameComp>
    </JsonView>,
  );
  await waitFor(() => {
    expect(seen).toEqual(expect.arrayContaining([['solo'], []]));
  });
  expect(screen.getByText('solo')).toBeTruthy();
  expect(screen.getByText('bare')).toBeTruthy();
});
