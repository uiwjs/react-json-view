import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '@testing-library/react';
import JsonView from './';

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const example = {
  avatar,
};

it('renders <JsonView /> Container test case', async () => {
  const user = userEvent.setup();
  const divref = React.createRef<HTMLDivElement>();
  const { container } = render(
    <JsonView value={example} ref={divref}>
      <JsonView.Copied data-testid="copied" />
      <JsonView.CountInfo data-testid="countInfo" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  // 使用新的 act 用法包裹 hover 操作
  await act(async () => {
    await user.hover(container.lastElementChild!);
  });
  const copied = screen.getByTestId('copied');
  expect(copied.style).toHaveProperty('height', '1em');
  expect(copied.style).toHaveProperty('width', '1em');
  expect(copied.style).toHaveProperty('cursor', 'pointer');
  expect(copied.style).toHaveProperty('vertical-align', 'middle');
  expect(copied.style).toHaveProperty('margin-left', '5px');
  // 使用新的 act 用法包裹 unhover 操作
  await act(async () => {
    await user.unhover(container.lastElementChild!);
  });
  const countInfo = screen.getByTestId('countInfo');
  expect(countInfo.nextElementSibling).toBeNull();
  await waitFor(() => {
    expect(divref.current instanceof HTMLDivElement).toBeTruthy();
  });
});
