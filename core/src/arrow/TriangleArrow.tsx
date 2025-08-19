import React from 'react';
import type * as CSS from 'csstype';

export interface TriangleArrowProps extends React.SVGProps<SVGSVGElement> {}
export function TriangleArrow(props: TriangleArrowProps) {
  const { style, ...reset } = props;
  const defaultStyle: CSS.Properties<string | number> = {
    cursor: 'pointer',
    height: '1em',
    width: '1em',
    userSelect: 'none',
    display: 'inline-flex',
    ...style,
  };
  return (
    <svg viewBox="0 0 24 24" fill="var(--w-rjv-arrow-color, currentColor)" style={defaultStyle} {...reset}>
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}

TriangleArrow.displayName = 'JVR.TriangleArrow';
