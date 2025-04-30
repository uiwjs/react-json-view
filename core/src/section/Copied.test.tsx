import userEvent from '@testing-library/user-event';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import JsonView from '../';
import React from 'react';
import { act } from 'react';

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const example = {
  avatar,
};
const exampleWithBigInt = {
  avatar,
  bigint: BigInt(1000),
};

// BigInt(1000) should render to '1000n'
const exampleWithBigIntAnswer = {
  avatar,
  bigint: BigInt(1000).toString() + 'n',
};

it('render <JsonView />, copy String test case', async () => {
  const user = userEvent.setup();
  // Mock the necessary functions and values
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);
  const divref = React.createRef<HTMLDivElement>();
  const { container } = render(
    <JsonView
      value={example}
      ref={divref}
      // onCopied={(copyText, value) => {
      //   console.log('>>>', copyText, value)
      // }}
    >
      <JsonView.Copied data-testid="copied" />
      <JsonView.CountInfo data-testid="countInfo" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  // await user.hover(container.lastElementChild!);
  fireEvent.mouseEnter(container.lastElementChild!);
  const copied = screen.getByTestId('copied');
  expect(copied.style).toHaveProperty('height', '1em');
  expect(copied.style).toHaveProperty('width', '1em');
  expect(copied.style).toHaveProperty('cursor', 'pointer');
  expect(copied.style).toHaveProperty('vertical-align', 'middle');
  expect(copied.style).toHaveProperty('margin-left', '5px');
  expect(copied.getAttribute('fill')).toEqual('var(--w-rjv-copied-color, currentColor)');
  expect(copied.tagName).toEqual('svg');
  await act(async () => {
    await user.click(copied);
  });
  expect(copied.getAttribute('fill')).toEqual('var(--w-rjv-copied-success-color, #28a745)');
  // Assertions
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(JSON.stringify(example, null, 2));
  await act(async () => {
    await user.unhover(container.lastElementChild!);
  });
  const countInfo = screen.getByTestId('countInfo');
  expect(countInfo.nextElementSibling).toBeNull();
  await waitFor(() => {
    expect(divref.current instanceof HTMLDivElement).toBeTruthy();
  });
  // Restore the original implementation
  jest.restoreAllMocks();
});

it('render <JsonView />, copy Number test case', async () => {
  const user = userEvent.setup();

  // Mock the necessary functions and values
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);
  const { container } = render(
    <JsonView value={{ value: 123 }}>
      <JsonView.Copied data-testid="copied" />
      <JsonView.Quote data-testid="quote" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const quote = screen.getAllByTestId('quote')[0];
  const lineDom = quote.parentElement?.parentElement!;
  fireEvent.mouseEnter(lineDom);
  const copied = screen.getAllByTestId('copied')[1];
  expect(copied.tagName).toEqual('svg');
  await waitFor(async () => {
    await user.click(copied);
  });
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('123');
  jest.restoreAllMocks();
});

it('render <JsonView.Copied />, copy Number test case', async () => {
  const user = userEvent.setup();

  // Mock the necessary functions and values
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);
  const { container } = render(
    <JsonView value={{ value: 123 }}>
      <JsonView.Copied
        as="span"
        data-testid="copied"
        render={(props) => {
          return <span {...props}>xx</span>;
        }}
      />
      <JsonView.Quote data-testid="quote" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const quote = screen.getAllByTestId('quote')[0];
  const lineDom = quote.parentElement?.parentElement!;
  fireEvent.mouseEnter(lineDom);
  const copied = screen.getAllByTestId('copied')[1];
  expect(copied.tagName).toEqual('SPAN');
  expect(copied.innerHTML).toEqual('xx');
  await waitFor(async () => {
    await user.click(copied);
  });
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('123');
  jest.restoreAllMocks();
});

it('render <JsonView.Copied />, copy NaN test case', async () => {
  const user = userEvent.setup();

  // Mock the necessary functions and values
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);
  const { container } = render(
    <JsonView value={{ value: NaN }}>
      <JsonView.Copied data-testid="copied" />
      <JsonView.Quote data-testid="quote" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const quote = screen.getAllByTestId('quote')[0];
  const lineDom = quote.parentElement?.parentElement!;
  fireEvent.mouseEnter(lineDom);
  const copied = screen.getAllByTestId('copied')[1];
  await waitFor(async () => {
    await user.click(copied);
  });
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('NaN');
  jest.restoreAllMocks();
});

it('render <JsonView.Copied />, copy Infinity test case', async () => {
  const user = userEvent.setup();

  // Mock the necessary functions and values
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);
  const { container } = render(
    <JsonView value={{ value: Infinity }}>
      <JsonView.Copied data-testid="copied" />
      <JsonView.Quote data-testid="quote" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const quote = screen.getAllByTestId('quote')[0];
  const lineDom = quote.parentElement?.parentElement!;
  fireEvent.mouseEnter(lineDom);
  const copied = screen.getAllByTestId('copied')[1];
  await waitFor(async () => {
    await user.click(copied);
  });
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Infinity');
  jest.restoreAllMocks();
});

it('render <JsonView.Copied />, copy BigInt test case', async () => {
  const user = userEvent.setup();

  // Mock the necessary functions and values
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);
  const { container, debug } = render(
    <JsonView value={{ value: BigInt(1000) }}>
      <JsonView.Copied data-testid="copied" />
      <JsonView.Quote data-testid="quote" />
      <JsonView.Bigint data-testid="bigint" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const quote = screen.getAllByTestId('quote')[0];
  const lineDom = quote.parentElement?.parentElement!;
  fireEvent.mouseEnter(lineDom);
  const copied = screen.getAllByTestId('copied')[1];
  await waitFor(async () => {
    await user.click(copied);
  });
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('1000n');
  fireEvent.mouseLeave(lineDom);
  const bigint = screen.getAllByTestId('bigint')[1];
  expect(bigint.nextElementSibling).toBeNull();
  jest.restoreAllMocks();
});

it('render <JsonView.Copied />, copy Object with BigInt test case', async () => {
  const user = userEvent.setup();

  // Mock the necessary functions and values
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);
  const { container, debug } = render(
    <JsonView value={exampleWithBigInt}>
      <JsonView.Copied data-testid="copied" />
      <JsonView.CountInfo data-testid="countInfo" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  fireEvent.mouseEnter(container.lastElementChild!);
  const copied = screen.getByTestId('copied');
  await waitFor(async () => {
    await user.click(copied);
  });
  // Assertions
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(JSON.stringify(exampleWithBigIntAnswer, null, 2));
  await waitFor(async () => {
    await user.unhover(container.lastElementChild!);
  });
  // Restore the original implementation
  jest.restoreAllMocks();
});
