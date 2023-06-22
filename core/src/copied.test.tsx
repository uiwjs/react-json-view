import renderer from 'react-test-renderer';
import {cleanup, screen, fireEvent, render} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom/client';
import userEvent from '@testing-library/user-event'
import { Copied } from './copied';

it('renders <Copied /> test case', () => {
  const component = renderer.create(
    <Copied />,
  );
  let tree = component.toJSON();
  expect(tree).toBeNull();
});

it('renders <Copied /> `show` test case', () => {
  const component = renderer.create(
    <Copied text={{ a: 1 }} show />,
  );
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props.viewBox', '0 0 38 38');
  expect(tree).toHaveProperty('props.height', '1em');
  expect(tree).toHaveProperty('props.width', '1em');
  expect(tree).toHaveProperty('props.fill', 'var(--w-rjv-copied-color, currentColor)');
  expect(tree).toHaveProperty('props.style', { cursor: 'pointer', marginLeft: 5 });
  expect(tree).toHaveProperty('props.className', 'w-rjv-copied');
  expect(tree).toHaveProperty('props.onClick');
});
