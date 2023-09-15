import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '@testing-library/react';
import JsonView from './';
import React from 'react';

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
      <JsonView.CountInfoExtra data-testid="infoExtra" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  await user.hover(container.lastElementChild!);
  const copied = screen.getByTestId('copied');
  expect(copied.style).toHaveProperty('height', '1em');
  expect(copied.style).toHaveProperty('width', '1em');
  expect(copied.style).toHaveProperty('cursor', 'pointer');
  expect(copied.style).toHaveProperty('vertical-align', 'middle');
  expect(copied.style).toHaveProperty('margin-left', '5px');
  await user.unhover(container.lastElementChild!);
  const uncopied = screen.getByTestId('infoExtra');
  expect(uncopied.nextElementSibling).toBeNull();
  await waitFor(() => {
    expect(divref.current instanceof HTMLDivElement).toBeTruthy();
  });
});
