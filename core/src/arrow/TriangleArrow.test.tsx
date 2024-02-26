import React from 'react';
import renderer from 'react-test-renderer';
import { TriangleArrow } from './TriangleArrow';

it('renders <TriangleArrow /> test case', () => {
  const component = renderer.create(<TriangleArrow />);
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props', {
    viewBox: '0 0 24 24',
    fill: 'var(--w-rjv-arrow-color, currentColor)',
    style: {
      cursor: 'pointer',
      height: '1em',
      width: '1em',
      display: 'inline-flex',
      userSelect: 'none',
    },
  });
});
