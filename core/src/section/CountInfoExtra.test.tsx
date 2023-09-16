import { screen, render } from '@testing-library/react';
import JsonView from '../';

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const example = {
  avatar,
};

it('renders <JsonView.CountInfoExtra /> test case', async () => {
  const { container } = render(
    <JsonView value={example}>
      <JsonView.CountInfoExtra data-testid="countInfo">xx</JsonView.CountInfoExtra>
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const countInfo = screen.getByTestId('countInfo');
  expect(countInfo.className).toEqual('w-rjv-object-extra');
  expect(countInfo.style).toHaveProperty('padding-left', '8px');
});

it('renders <JsonView.CountInfoExtra /> test case', async () => {
  const { container, debug } = render(
    <JsonView value={example}>
      <JsonView.CountInfoExtra
        data-testid="countInfo"
        render={(props) => {
          return <span {...props}>xx</span>;
        }}
      />
    </JsonView>,
  );
  expect(container.firstElementChild).toBeInstanceOf(Element);
  const countInfo = screen.getByTestId('countInfo');
  expect(countInfo.className).toEqual('w-rjv-object-extra');
  expect(countInfo.style).toHaveProperty('padding-left', '8px');
  expect(countInfo.innerHTML).toEqual('xx');
});
