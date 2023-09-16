import { screen, render, waitFor } from '@testing-library/react';
import JsonView from '../';
import React from 'react';

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const example = {
  avatar,
};

it('renders <JsonView.CountInfo /> test case', async () => {
  const { container } = render(
    <JsonView value={example}>
      <JsonView.CountInfo data-testid="countInfo" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const copied = screen.getByTestId('countInfo');
  expect(copied.className).toEqual('w-rjv-object-size');
  expect(copied.style).toHaveProperty('padding-left', '8px');
  expect(copied.style).toHaveProperty('font-style', 'italic');
});

it('renders <JsonView.CountInfo /> test case', async () => {
  const { container } = render(
    <JsonView value={example}>
      <JsonView.CountInfo
        data-testid="countInfo"
        render={(props) => {
          return <span {...props}>xxx</span>;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const copied = screen.getByTestId('countInfo');
  expect(copied.className).toEqual('w-rjv-object-size');
  expect(copied.style).toHaveProperty('padding-left', '8px');
  expect(copied.style).toHaveProperty('font-style', 'italic');
});

it('renders <JsonView.CountInfo /> displayObjectSize test case', async () => {
  const { container } = render(
    <JsonView value={example} displayObjectSize={false}>
      <JsonView.CountInfo data-testid="countInfo" />
      <JsonView.BraceLeft data-testid="brace" />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const brace = screen.getByTestId('brace');
  expect(brace.nextElementSibling).toBeNull();
});
