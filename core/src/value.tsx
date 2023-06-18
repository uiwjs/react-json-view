import { FC, Fragment, PropsWithChildren } from 'react';

const isFloat = (n: number) => (Number(n) === n && n % 1 !== 0) || isNaN(n);
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

export interface ValueViewProps<T>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  keyName?: string;
  value: T;
  displayDataTypes: boolean;
  renderKey?: JSX.Element;
  renderValue?: (props: React.HTMLAttributes<HTMLSpanElement> & { type: TypeProps['type'] }) => JSX.Element;
}

export function ValueView<T>(props: ValueViewProps<T>) {
  const { value, keyName, renderKey, renderValue, displayDataTypes, ...reset } = props;

  let type = typeof value as TypeProps['type'];
  let content = '';
  let color = '';
  let style = {} as React.CSSProperties;
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
  let typeView = <Type type={type} />;
  if (value === null) {
    type = 'null';
    content = `${value}`.toLocaleUpperCase();
    typeView = <Fragment />;
    style = { fontWeight: 'bold' };
  }
  if (value === undefined) {
    type = 'undefined';
    content = String(value);
    typeView = <Fragment />;
  }
  if (typeof value === 'bigint') {
    type = 'bigint';
    content = `${value}n`;
  }
  if (typeof value === 'string') {
    content = `"${value}"`;
  }

  if (!displayDataTypes) {
    typeView = <Fragment />;
  }
  color = typeMap[type]?.color || '';
  if (content && typeof content === 'string') {
    const valueView = renderValue ? (
      renderValue({
        className: 'w-rjv-value',
        style: { color, ...style },
        type,
        children: content,
      })
    ) : (
      <Label color={color} style={style} className="w-rjv-value">
        {content}
      </Label>
    );
    return (
      <Label {...reset}>
        {renderKey}
        <Colon />
        {typeView}
        {valueView}
      </Label>
    );
  }
  return (
    <Label {...reset}>
      {renderKey}
      <Colon />
      {typeView}
    </Label>
  );
}

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  fontSize?: number;
  opacity?: number;
  paddingRight?: number;
}

export const Label: FC<PropsWithChildren<LabelProps>> = ({
  children,
  color,
  fontSize,
  opacity,
  paddingRight,
  style,
  ...reset
}) => (
  <span style={{ color, fontSize, opacity, paddingRight, ...style }} {...reset}>
    {children}
  </span>
);

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
