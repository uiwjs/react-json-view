import { forwardRef } from 'react';
import type * as CSS from 'csstype';
import { Provider } from './store';
import { Container } from './Container';

import { BraceLeft } from './symbol/BraceLeft';
import { BraceRight } from './symbol/BraceRight';
import { BracketsLeft } from './symbol/BracketsLeft';
import { BracketsRight } from './symbol/BracketsRight';
import { Arrow } from './symbol/Arrow';
import { Colon } from './symbol/Colon';
import { Quote } from './symbol/Quote';
import { ValueQuote } from './symbol/ValueQuote';

import { Bigint } from './types/Bigint';
import { Date } from './types/Date';
import { False } from './types/False';
import { Float } from './types/Float';
import { Int } from './types/Int';
import { Map } from './types/Map';
import { Nan } from './types/Nan';
import { Null } from './types/Null';
import { Set } from './types/Set';
import { StringText } from './types/String';
import { True } from './types/True';
import { Undefined } from './types/Undefined';
import { Url } from './types/Url';

import { Copied } from './section/Copied';
import { CountInfo } from './section/CountInfo';
import { CountInfoExtra } from './section/CountInfoExtra';
import { Ellipsis } from './section/Ellipsis';
import { KeyName } from './section/KeyName';
import { Row } from './section/Row';

export * from './store';
export * from './store/Expands';
export * from './store/ShowTools';
export * from './store/Symbols';
export * from './store/Types';
export * from './symbol/';

export type ShouldExpandNodeInitially<T extends object> = (
  isExpanded: boolean,
  props: { keyName?: string | number; value?: T; parentValue?: T; keys: (number | string)[]; level: number },
) => boolean;

export interface JsonViewProps<T extends object>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** This property contains your input JSON */
  value?: T;
  /** Define the root node name. @default undefined */
  keyName?: string | number;
  /** Whether sort keys through `String.prototype.localeCompare()` @default false */
  objectSortKeys?: boolean | ((keyA: string, keyB: string, valueA: T, valueB: T) => number);
  /** Set the indent-width for nested objects @default 15 */
  indentWidth?: number;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default true */
  displayObjectSize?: boolean;
  /** When set to `true`, data type labels prefix values @default true */
  displayDataTypes?: boolean;
  /** The user can copy objects and arrays to clipboard by clicking on the clipboard icon. @default true */
  enableClipboard?: boolean;
  /**
   * When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a specific depth. @default false
   * collapsed takes precedence over shouldExpandNodeInitially.
   * @see {@link shouldExpandNodeInitially} for more details on how the initial expansion works.
   */
  collapsed?: boolean | number;
  /**
   * Determines whether the node should be expanded on the first render, or you can use collapsed to control the level of expansion (by default, the root is expanded).
   * If both collapsed and shouldExpandNodeInitially are set, the value of collapsed takes precedence.
   * @see {@link collapsed} for more details on how this works.
   */
  shouldExpandNodeInitially?: ShouldExpandNodeInitially<T>;
  /** Whether to highlight updates. @default true */
  highlightUpdates?: boolean;
  /** Shorten long JSON strings, Set to `0` to disable this feature @default 30 */
  shortenTextAfterLength?: number;
  /** When the text exceeds the length, `...` will be displayed. Currently, this `...` can be customized. @default "..." */
  stringEllipsis?: number;
  /** Callback function for when a treeNode is expanded or collapsed */
  onExpand?: (props: { expand: boolean; value?: T; keyid: string; keyName?: string | number }) => void;
  /** Fires event when you copy */
  onCopied?: (text: string, value?: T) => void;
  /** Transform the text before copying to clipboard */
  beforeCopy?: (
    copyText: string,
    keyName?: string | number,
    value?: T,
    parentValue?: T,
    expandKey?: string,
    keys?: (number | string)[],
  ) => string;
}

type JsonViewComponent = React.FC<React.PropsWithRef<JsonViewProps<object>>> & {
  Bigint: typeof Bigint;
  Date: typeof Date;
  False: typeof False;
  Float: typeof Float;
  Int: typeof Int;
  Map: typeof Map;
  Nan: typeof Nan;
  Null: typeof Null;
  Set: typeof Set;
  String: typeof StringText;
  True: typeof True;
  Undefined: typeof Undefined;
  Url: typeof Url;
  // Symbol
  BraceLeft: typeof BraceLeft;
  BraceRight: typeof BraceRight;
  BracketsLeft: typeof BracketsLeft;
  BracketsRight: typeof BracketsRight;

  Colon: typeof Colon;
  Ellipsis: typeof Ellipsis;
  Quote: typeof Quote;
  ValueQuote: typeof ValueQuote;
  Arrow: typeof Arrow;

  Copied: typeof Copied;
  CountInfo: typeof CountInfo;
  CountInfoExtra: typeof CountInfoExtra;
  KeyName: typeof KeyName;
  Row: typeof Row;
};

const JsonView: JsonViewComponent = forwardRef<HTMLDivElement, JsonViewProps<object>>((props, ref) => {
  const {
    className = '',
    style,
    value,
    children,
    collapsed = false,
    shouldExpandNodeInitially,
    indentWidth = 15,
    displayObjectSize = true,
    shortenTextAfterLength = 30,
    stringEllipsis,
    highlightUpdates = true,
    enableClipboard = true,
    displayDataTypes = true,
    objectSortKeys = false,
    onExpand,
    onCopied,
    beforeCopy,
    ...elmProps
  } = props;
  const defaultStyle: CSS.Properties<string | number> = {
    lineHeight: 1.4,
    fontFamily: 'var(--w-rjv-font-family, Menlo, monospace)',
    color: 'var(--w-rjv-color, #002b36)',
    backgroundColor: 'var(--w-rjv-background-color, #00000000)',
    fontSize: 13,
    ...style,
  };
  const cls = ['w-json-view-container', 'w-rjv', className].filter(Boolean).join(' ');
  return (
    <Provider
      initialState={{
        value,
        objectSortKeys,
        indentWidth,
        shouldExpandNodeInitially: collapsed === false ? shouldExpandNodeInitially : undefined,
        displayObjectSize,
        collapsed,
        enableClipboard,
        shortenTextAfterLength,
        stringEllipsis,
        highlightUpdates,
        onCopied,
        onExpand,
        beforeCopy,
      }}
      initialTypes={{ displayDataTypes }}
    >
      <Container value={value} {...elmProps} ref={ref} className={cls} style={defaultStyle} />
      {children}
    </Provider>
  );
}) as unknown as JsonViewComponent;

JsonView.Bigint = Bigint;
JsonView.Date = Date;
JsonView.False = False;
JsonView.Float = Float;
JsonView.Int = Int;
JsonView.Map = Map;
JsonView.Nan = Nan;
JsonView.Null = Null;
JsonView.Set = Set;
JsonView.String = StringText;
JsonView.True = True;
JsonView.Undefined = Undefined;
JsonView.Url = Url;

JsonView.ValueQuote = ValueQuote;
JsonView.Arrow = Arrow;
JsonView.Colon = Colon;
JsonView.Quote = Quote;
JsonView.Ellipsis = Ellipsis;
JsonView.BraceLeft = BraceLeft;
JsonView.BraceRight = BraceRight;
JsonView.BracketsLeft = BracketsLeft;
JsonView.BracketsRight = BracketsRight;

JsonView.Copied = Copied;
JsonView.CountInfo = CountInfo;
JsonView.CountInfoExtra = CountInfoExtra;
JsonView.KeyName = KeyName;
JsonView.Row = Row;

JsonView.displayName = 'JVR.JsonView';

export default JsonView;
