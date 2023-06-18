import React, { useId } from 'react';
import { forwardRef } from 'react';
import { RooNode, MetaProps, SemicolonProps, EllipsisProps } from './node';
import { ValueViewProps } from './value';

export * from './node';
export * from './value';
export interface JsonViewProps<T>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** This property contains your input JSON */
  value?: T;
  /** Set the indent-width for nested objects @default `15`*/
  indentWidth?: number;
  /** When set to `true`, data type labels prefix values @default `true` */
  displayDataTypes?: boolean;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default `true` */
  displayObjectSize?: boolean;
  /** Define the root node name. @default `undefined` */
  keyName?: string | number;
  components?: {
    braces?: MetaProps['render'];
    ellipsis?: EllipsisProps['render'];
    arrow?: JSX.Element;
    objectKey?: SemicolonProps['render'];
    value?: ValueViewProps<T>['renderValue'];
  };
}

const JsonView = forwardRef<HTMLDivElement, JsonViewProps<object>>((props, ref) => {
  const { value, style, className, ...reset } = props;
  const defaultStyle = {
    lineHeight: 1.4,
    fontFamily: 'monospace',
    color: 'var(--w-rjv-color, #002b36)',
    backgroundColor: 'var(--w-rjv-background-color, #00000000)',
    ...style,
  } as React.CSSProperties;
  const cls = `w-json-view-container w-rjv ${className || ''}`;
  const keyid = useId();
  return <RooNode className={cls} value={value} {...reset} ref={ref} keyid={keyid} style={defaultStyle} />;
});

export default JsonView;