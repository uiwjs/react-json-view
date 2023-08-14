import React, { useId } from 'react';
import { forwardRef } from 'react';
import { RootNode } from './node';
import type { SemicolonProps } from './semicolon';
import type { ValueViewProps, TypeProps } from './value';
import type { CopiedProps } from './copied';
import type { EllipsisProps } from './comps/ellipsis';
import type { MetaProps } from './comps/meta';
import type { CountInfoExtraProps } from './editor/countInfoExtra';

export * from './node';
export * from './value';

export interface CountInfoProps {
  count: number;
  level: number;
  visible: boolean;
}

interface RenderValueProps<T extends object> extends React.HTMLAttributes<HTMLSpanElement> {
  type: TypeProps['type'];
  value?: unknown;
  parentValue?: T;
  data?: T;
  visible?: boolean;
  quotes?: JsonViewProps<T>['quotes'];
  namespace?: Array<string | number>;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
  keyName?: ValueViewProps<T>['keyName'];
}

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
  /** Whether to highlight updates. @default true */
  highlightUpdates?: boolean;
  /** Whether sort keys through `String.prototype.localeCompare()` @default false */
  objectSortKeys?: boolean | ((a: string, b: string) => number);
  /** Display for quotes in object-key @default " */
  quotes?: "'" | '"' | '';
  /** When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth. @default false */
  collapsed?: boolean | number;
  /** Callback function for when a treeNode is expanded or collapsed */
  onExpand?: (props: { expand: boolean; value: T; keyid: string; keyName?: string | number }) => void;
  /** Fires event when you copy */
  onCopied?: CopiedProps<T>['onCopied'];
  /** Redefine interface elements to re-render. */
  components?: {
    braces?: MetaProps['render'];
    ellipsis?: EllipsisProps['render'];
    arrow?: JSX.Element;
    objectKey?: SemicolonProps['render'];
    value?: (props: RenderValueProps<T>) => JSX.Element;
    copied?: CopiedProps<T>['render'];
    countInfo?: (props: CountInfoProps) => JSX.Element;
    countInfoExtra?: (props: Omit<CountInfoExtraProps<T>, 'editable'>) => JSX.Element;
  };
}

const JsonView = forwardRef<HTMLDivElement, JsonViewProps<object>>((props, ref) => {
  const { value, style, className, ...reset } = props;
  const defaultStyle = {
    lineHeight: 1.4,
    fontFamily: 'var(--w-rjv-font-family, Menlo, monospace)',
    color: 'var(--w-rjv-color, #002b36)',
    backgroundColor: 'var(--w-rjv-background-color, #00000000)',
    ...style,
  } as React.CSSProperties;
  const cls = `w-json-view-container w-rjv ${className || ''}`;
  const keyid = useId();
  return <RootNode className={cls} value={value} {...reset} ref={ref} keyid={keyid} style={defaultStyle} />;
});

export default JsonView;
