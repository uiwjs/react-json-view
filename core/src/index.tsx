import React, { useId } from 'react';
import { forwardRef } from 'react';
import { RooNode, MetaProps, SemicolonProps, EllipsisProps } from './node';
import { ValueViewProps } from './value';
import { CopiedProps } from './copied';

export * from './node';
export * from './value';
export interface JsonViewProps<T extends object>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** This property contains your input JSON */
  value?: T;
  /** Set the indent-width for nested objects @default 15 */
  indentWidth?: number;
  /** When set to `true`, data type labels prefix values @default true */
  displayDataTypes?: boolean;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default true */
  displayObjectSize?: boolean;
  /** Define the root node name. @default undefined */
  keyName?: string | number;
  /** The user can copy objects and arrays to clipboard by clicking on the clipboard icon. @default true */
  enableClipboard?: boolean;
  /** Display for quotes in object-key @default " */
  quotes?: "'" | '"' | '';
  /** When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth. @default false */
  collapsed?: boolean | number;
  /** Callback function for when a treeNode is expanded or collapsed */
  onExpand?: (props: { expand: boolean; value: T; keyid: string; keyName?: string | number; }) => void;
  /** Fires event when you copy */
  onCopied?: CopiedProps<T>['onCopied'];
  /** Redefine interface elements to re-render. */
  components?: {
    braces?: MetaProps['render'];
    ellipsis?: EllipsisProps['render'];
    arrow?: JSX.Element;
    objectKey?: SemicolonProps['render'];
    value?: ValueViewProps<T>['renderValue'];
    copied?: CopiedProps<T>['render'];
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
