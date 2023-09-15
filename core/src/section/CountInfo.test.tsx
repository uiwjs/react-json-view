import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '../';
import React from 'react';

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const example = {
  avatar,
};

it('renders <JsonView.CountInfo /> test case', async () => {
  const divref = React.createRef<HTMLDivElement>();
  const { container } = render(
    <JsonView value={example} ref={divref}>
      <JsonView.CountInfo data-testid="countInfo" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const copied = screen.getByTestId('countInfo');
  expect(copied.className).toEqual('w-rjv-object-size');
  expect(copied.style).toHaveProperty('padding-left', '8px');
  expect(copied.style).toHaveProperty('font-style', 'italic');
});
