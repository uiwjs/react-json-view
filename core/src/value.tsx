import { FC, Fragment, PropsWithChildren, forwardRef, useState } from 'react';
import { CountInfo } from './node';
import { Meta, MetaProps } from './comps/meta';
import { Copied } from './copied';
import { JsonViewProps } from './';

export const Line: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = (props) => <div {...props} />;
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
    label: 'URL',
  },
  null: {
    color: 'var(--w-rjv-type-null-color, #d33682)',
    label: 'null',
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
  <span className="w-rjv-colon" style={{ paddingRight: 3, ...style }} {...props}>
    {children}
  </span>
);

export interface ValueViewProps<T extends object>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  keyName?: string | number;
  value?: unknown;
  displayDataTypes: boolean;
  displayObjectSize: boolean;
  enableClipboard: boolean;
  indentWidth: number;
  quotes?: JsonViewProps<T>['quotes'];
  renderKey?: JSX.Element;
  renderBraces?: MetaProps['render'];
  renderValue?: (props: React.HTMLAttributes<HTMLSpanElement> & { type: TypeProps['type']; value?: unknown; visible?: boolean; quotes?: JsonViewProps<T>['quotes']; keyName?: ValueViewProps<T>['keyName']; }) => JSX.Element;
}

export function getValueString<T>(value: T) {
  let type = typeof value as TypeProps['type'];
  let content = '';
  if (typeof value === 'number') {
    type = isFloat(value) ? 'float' : 'number';
    content = value.toString();
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
  if (isURL)  {
    type = 'url';
    content = `"${value.href}"`;
  }
  if (typeof value === 'string') {
    content = `"${value}"`;
  }
  return { type, content };
}

export function ValueView<T extends object>(props: ValueViewProps<T>) {
  const { value, keyName, indentWidth, renderKey, quotes, renderValue, renderBraces, enableClipboard, displayObjectSize, displayDataTypes, ...reset } = props;

  let color = '';
  let style = {} as React.CSSProperties;

  let { type, content } = getValueString(value);

  let typeView = <Type type={type} />;
  if (value === null) {
    typeView = <Fragment />;
    style = { fontWeight: 'bold' };
  }
  if (value === undefined) {
    typeView = <Fragment />;
  }
  const isURL = value instanceof URL;

  if (!displayDataTypes) {
    typeView = <Fragment />;
  }
  color = typeMap[type]?.color || '';

  const [showTools, setShowTools] = useState(false);
  const tools = enableClipboard ? <Copied show={showTools} text={value} /> : undefined;
  const eventProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'w-rjv-line',
    style: { paddingLeft: indentWidth },
  };
  if (enableClipboard) {
    eventProps.onMouseEnter = () => setShowTools(true);
    eventProps.onMouseLeave = () => setShowTools(false);
  }

  if (content && typeof content === 'string') {
    const reView = renderValue && renderValue({
      className: 'w-rjv-value',
      style: { color, ...style },
      type,
      value,
      quotes,
      keyName,
      visible: showTools,
      content,
      children: content,
    });
    const valueView = reView ? reView : (
      <Label color={color} style={style} className="w-rjv-value">
        {isURL ? <a href={value.href} style={{ color }} target="_blank" rel="noopener noreferrer">{content}</a> : content}
      </Label>
    );
    return (
      <Line {...eventProps}>
        <Label {...reset} ref={null}>
          {renderKey}
          <Colon />
          {typeView}
          {valueView}
          {tools}
        </Label>
      </Line>
    );
  }
  const length = Array.isArray(value) ? value.length : Object.keys(value as object).length;
  const empty = (
    <Fragment>
      <Meta render={renderBraces} start isArray={Array.isArray(value)} />
      <Meta render={renderBraces} isArray={Array.isArray(value)} />
      {displayObjectSize && <CountInfo>{length} items</CountInfo>}
    </Fragment>
  )
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

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  fontSize?: number;
  opacity?: number;
  paddingRight?: number;
}

export const Label = forwardRef<HTMLSpanElement, LabelProps>(({
  children,
  color,
  fontSize,
  opacity,
  paddingRight,
  style,
  ...reset
}, ref) => (
  <span style={{ color, fontSize, opacity, paddingRight, ...style }} {...reset} ref={ref}>
    {children}
  </span>
));

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
