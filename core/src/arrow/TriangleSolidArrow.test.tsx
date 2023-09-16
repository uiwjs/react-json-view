import React from 'react';
import renderer from 'react-test-renderer';
import { TriangleSolidArrow } from './TriangleSolidArrow';

it('renders <TriangleSolidArrow /> test case', () => {
  const component = renderer.create(<TriangleSolidArrow />);
  let tree = component.toJSON();
  expect(tree).toHaveProperty('type');
  expect(tree).toHaveProperty('props');
  expect(tree).toHaveProperty('children');
  expect(tree).toHaveProperty('type', 'svg');
  expect(tree).toHaveProperty('props', {
    viewBox: '0 0 30 30',
    fill: 'var(--w-rjv-arrow-color, currentColor)',
    height: '1em',
    width: '1em',
    style: {
      cursor: 'pointer',
      height: '1em',
      width: '1em',
      display: 'flex',
      userSelect: 'none',
    },
  });
});
