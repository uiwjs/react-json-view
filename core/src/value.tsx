import type { FC, PropsWithChildren } from 'react';
import { Fragment, forwardRef, useMemo, useState } from 'react';
import { Meta } from './comps/meta';
import { Copied } from './copied';
import type { JsonViewProps } from './';

export const Line: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = (props) => <div {...props} />;
Line.displayName = 'JVR.Line';
export const isFloat = (n: number) => (Number(n) === n && n % 1 !== 0) || isNaN(n);
export const typeMap = {
  string: {
    color: 'var(--w-rjv-type-string-color, #cb4b16)',
    label: 'string',
  },
  number: {
    color: 'var(--w-rjv-type-int-color, #268bd2)',
    label: 'int',
  },
  float: {
    color: 'var(--w-rjv-type-float-color, #859900)',
    label: 'float',
  },
  bigint: {
    color: 'var(--w-rjv-type-bigint-color, #268bd2)',
    label: 'bigint',
  },
  boolean: {
    color: 'var(--w-rjv-type-boolean-color, #2aa198)',
    label: 'bool',
  },
  date: {
    color: 'var(--w-rjv-type-date-color, #586e75)',
    label: 'date',
  },
  url: {
    color: 'var(--w-rjv-type-url-color, #0969da)',
    label: 'url',
  },
  null: {
    color: 'var(--w-rjv-type-null-color, #d33682)',
    label: 'null',
  },
  Set: {
    color: 'var(--w-rjv-type-set-color, #268bd2)',
    label: 'Set',
  },
  Map: {
    color: 'var(--w-rjv-type-map-color, #268bd2)',
    label: 'Map',
  },
  NaN: {
    color: 'var(--w-rjv-type-nan-color, #859900)',
    label: 'NaN',
  },
  undefined: {
    color: 'var(--w-rjv-type-undefined-color, #586e75)',
    label: 'undefined',
  },
};

export const Colon: FC<PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>> = ({
  children = ':',
  style,
  ...props
}) => (
  <span
    className="w-rjv-colon"
    style={{ paddingRight: 3, ...style, color: 'var(--w-rjv-colon-color, var(--w-rjv-color))' }}
    {...props}
  >
    {children}
  </span>
);

Colon.displayName = 'JVR.Colon';

export interface ValueViewProps<T extends object>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  keyName?: string | number;
  value?: unknown;
  parentValue?: T;
  data?: T;
  displayDataTypes: boolean;
  displayObjectSize: boolean;
  enableClipboard: boolean;
  isSet: boolean;
  indentWidth: number;
  level?: number;
  shortenTextAfterLength?: JsonViewProps<T>['shortenTextAfterLength'];
  namespace?: Array<string | number>;
  quotes?: JsonViewProps<T>['quotes'];
  components?: JsonViewProps<T>['components'];
  renderKey?: JSX.Element;
  countInfo?: JSX.Element;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
}

export function getValueString<T>(value: T) {
  let type = typeof value as TypeProps['type'];
  let content = '';
  if (typeof value === 'number') {
    type = isFloat(value) ? 'float' : 'number';
    content = value.toString();
    if (isNaN(value)) {
      type = 'NaN';
      content = 'NaN';
    }
  }
  if (typeof value === 'boolean') {
    type = 'boolean';
    content = value.toString();
  }
  if (typeof value === 'object' && value instanceof Date) {
    type = 'date';
    content = value.toString();
  }
  if (value === null) {
    type = 'null';
    content = `${value}`.toLocaleUpperCase();
  }
  if (value === undefined) {
    type = 'undefined';
    content = String(value);
  }
  if (typeof value === 'bigint') {
    type = 'bigint';
    content = `${value}n`;
  }
  const isURL = value instanceof URL;
  if (isURL) {
    type = 'url';
    content = `"${value.href}"`;
  }
  if (typeof value === 'string') {
    content = `"${value}"`;
  }
  return { type, content };
}

interface RenderStringValueProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  color?: string;
  href?: string;
  style?: React.CSSProperties;
  isURL?: boolean;
  length?: number;
}

const RenderShortenTextValue: FC<PropsWithChildren<RenderStringValueProps>> = ({
  children,
  length,
  style,
  ...rest
}) => {
  const childrenStr = children as string;
  const [shorten, setShorten] = useState(length && childrenStr.length >= length);
  const click = () => {
    if (length && childrenStr.length <= length) return setShorten(false);
    setShorten(!shorten);
  };
  const text = shorten ? `${childrenStr.slice(0, length)}...` : childrenStr;
  return (
    <RenderStringValue {...rest} style={{ ...style, cursor: 'pointer' }} onClick={click}>
      {text}
    </RenderStringValue>
  );
};
RenderShortenTextValue.displayName = 'JVR.RenderShortenTextValue';

const RenderStringValue: FC<PropsWithChildren<RenderStringValueProps>> = ({
  color,
  style,
  isURL,
  href,
  children,
  ...rest
}) => {
  return (
    <Label color={color} style={style} {...rest} className="w-rjv-value">
      {isURL && (
        <a href={href} style={{ color }} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )}
      {!isURL && children}
    </Label>
  );
};

RenderStringValue.displayName = 'JVR.RenderStringValue';

export function ValueView<T extends object>(props: ValueViewProps<T>) {
  const {
    value,
    parentValue,
    setValue,
    countInfo,
    data,
    keyName,
    indentWidth,
    isSet,
    namespace,
    renderKey,
    components = {},
    quotes,
    level,
    enableClipboard,
    displayObjectSize,
    displayDataTypes,
    shortenTextAfterLength,
    ...reset
  } = props;
  let color = '';
  let style = {} as React.CSSProperties;

  let { type, content } = getValueString(value);

  let typeView = <Type type={type} />;
  if (value === null) {
    typeView = <Fragment />;
    style = { fontWeight: 'bold' };
  }
  if (value === undefined || type.toLocaleLowerCase() === 'nan' || !displayDataTypes) {
    typeView = <Fragment />;
  }
  const isURL = value instanceof URL;
  color = typeMap[type]?.color || '';

  const [showTools, setShowTools] = useState(false);
  const tools = useMemo(
    () => enableClipboard && showTools && <Copied show={showTools} text={value} />,
    [enableClipboard, showTools, value],
  );
  // const tools = enableClipboard ? <Copied show={showTools} text={value} /> : undefined;
  const eventProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'w-rjv-line',
    style: { paddingLeft: indentWidth },
  };
  if (enableClipboard) {
    eventProps.onMouseEnter = () => setShowTools(true);
    eventProps.onMouseLeave = () => setShowTools(false);
  }

  if (content && typeof content === 'string') {
    const reView =
      components.value &&
      components.value({
        className: 'w-rjv-value',
        style: { color, ...style },
        type,
        value,
        setValue,
        data,
        parentValue,
        quotes,
        keyName,
        namespace,
        visible: showTools,
        content,
        children: content,
      });

    const valueView =
      shortenTextAfterLength && type === 'string' ? (
        <RenderShortenTextValue
          color={color}
          href={isURL ? value.href : ''}
          style={style}
          isURL={isURL}
          length={shortenTextAfterLength}
        >
          {content}
        </RenderShortenTextValue>
      ) : (
        <RenderStringValue color={color} href={isURL ? value.href : ''} style={style} isURL={isURL}>
          {content}
        </RenderStringValue>
      );
    return (
      <Line {...eventProps}>
        <Label {...reset} ref={null}>
          {renderKey}
          <Colon />
          {typeView}
          {reView ? reView : valueView}
          {tools}
        </Label>
      </Line>
    );
  }
  const empty = (
    <Fragment>
      <Meta render={components.braces} start isArray={Array.isArray(value)} />
      <Meta render={components.braces} isArray={Array.isArray(value)} />
      {countInfo}
    </Fragment>
  );
  return (
    <Line {...eventProps}>
      <Label {...reset} ref={null}>
        {renderKey}
        <Colon />
        {typeView}
        {empty}
        {tools}
      </Label>
    </Line>
  );
}

ValueView.displayName = 'JVR.ValueView';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  fontSize?: number;
  opacity?: number;
  paddingRight?: number;
}

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, color, fontSize, opacity, paddingRight, style, ...reset }, ref) => (
    <span style={{ color, fontSize, opacity, paddingRight, ...style }} {...reset} ref={ref}>
      {children}
    </span>
  ),
);

Label.displayName = 'JVR.Label';

export interface TypeProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  type: keyof typeof typeMap;
}

export const Type: FC<PropsWithChildren<TypeProps>> = (props) => {
  const { type } = props;
  const color = typeMap[type]?.color;
  const label = typeMap[type]?.label;
  if (color && label) {
    return (
      <Label color={color} fontSize={11} opacity={0.8} paddingRight={4} className="w-rjv-type" data-type={type}>
        {label}
      </Label>
    );
  }
};

Type.displayName = 'JVR.Type';
