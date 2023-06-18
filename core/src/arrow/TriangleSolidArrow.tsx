import React from 'react';

export interface TriangleSolidArrowProps extends React.SVGProps<SVGSVGElement> {}
export function TriangleSolidArrow(props: TriangleSolidArrowProps) {
  const { style, ...reset } = props;
  const defaultStyle: React.CSSProperties = {
    cursor: 'pointer',
    height: '1em',
    width: '1em',
    ...style,
  };
  return (
    <svg viewBox="0 0 15 15" fill="var(--w-rjv-arrow-color, currentColor)" style={defaultStyle} {...reset}>
      <path d="M0 5l6 6 6-6z"></path>
    </svg>
  );
}
