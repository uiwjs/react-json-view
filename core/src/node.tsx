import { FC, Fragment, PropsWithChildren, useId, cloneElement, useState } from 'react';
import { ValueView, ValueViewProps, Colon, Label, LabelProps, Line, typeMap } from './value';
import { TriangleArrow } from './arrow/TriangleArrow';
import { useExpandsStatus, store } from './store';
import { JsonViewProps } from './';
import { Copied } from './copied';

export interface MetaProps extends LabelProps {
  isArray?: boolean;
  start?: boolean;
  render?: (props: Pick<MetaProps, 'start' | 'isArray' | 'className' | 'children'>) => JSX.Element;
}

export function Meta(props: MetaProps) {
  const { isArray = false, start = false, className, render, ...reset } = props;
  const mark = isArray ? '[]' : '{}';
  const cls = `w-rjv-${isArray ? 'brackets' : 'curlybraces'}-${start ? 'start' : 'end'} ${className || ''}`;
  const color = `var(--w-rjv-${isArray ? 'brackets' : 'curlybraces'}-color, #236a7c)`;
  if (render)
    return render({
      isArray,
      className: cls,
      style: { color },
      children: start ? mark.charAt(0) : mark.charAt(1),
      ...reset,
    });
  return (
    <Label color={color} className={cls} {...reset}>
      {start ? mark.charAt(0) : mark.charAt(1)}
    </Label>
  );
}

export interface EllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  render?: (props: EllipsisProps) => JSX.Element;
}
export const Ellipsis: FC<PropsWithChildren<EllipsisProps>> = ({ style, render, ...props }) => {
  const styl = { cursor: 'pointer', ...style };
  const className = `w-rjv-ellipsis ${props.className || ''}`;
  if (render) return render({ style: styl, ...props, className });
  return (
    <span className={className} style={styl} {...props}>
      ...
    </span>
  );
};
export interface SemicolonProps extends LabelProps {
  show?: boolean;
  quotes?: JsonViewProps<object>['quotes'];
  value?: object;
  render?: (props: Omit<SemicolonProps, 'show'> & {}) => JSX.Element;
}
export const Semicolon: FC<PropsWithChildren<SemicolonProps>> = ({
  children,
  render,
  color,
  value,
  className = 'w-rjv-object-key',
  show,
  quotes,
  ...props
}) => {
  const content = show ? `${quotes}${children}${quotes}` : children;
  if (render) return render({ className, ...props, value, style: { color }, children: content });
  return (
    <Label className={className} color={color} {...props}>
      {content}
    </Label>
  );
};
export const CountInfo: FC<PropsWithChildren<LabelProps>> = ({ children }) => (
  <Label
    style={{ paddingLeft: 4, fontStyle: 'italic' }}
    color="var(--w-rjv-info-color, #0000004d)"
    className="w-rjv-object-size"
  >
    {children}
  </Label>
);

export interface RooNodeProps<T extends object> extends JsonViewProps<T> {
  keyName?: string | number;
  keyid?: string;
  level?: number;
}
export function RooNode<T extends object>(props: RooNodeProps<T>) {
  const {
    value = {},
    keyName,
    displayDataTypes = true,
    components = {},
    displayObjectSize = true,
    enableClipboard = true,
    indentWidth = 15,
    collapsed,
    level = 1,
    keyid = 'root',
    quotes = '"',
    onExpand,
    ...reset
  } = props;
  const isArray = Array.isArray(value);
  const nameKeys = (isArray ? Object.keys(value).map(m => Number(m)) : Object.keys(value)) as (keyof typeof value)[];
  const subkeyid = useId();
  const expands = useExpandsStatus();
  const expand = expands[keyid] ?? (typeof collapsed === 'boolean' ? collapsed : (typeof collapsed === 'number' ? level <= collapsed : true));
  const arrowStyle = { transform: `rotate(${expand ? '0' : '-90'}deg)`, transition: 'all 0.3s' };
  const handle = () => {
    onExpand && typeof onExpand === 'function' && onExpand({ expand: !expand, keyid, keyName, value: value as T })
    !expand ? store.expand(keyid) : store.collapse(keyid);
  };
  const subNodeProps: RooNodeProps<T> = {
    components,
    indentWidth,
    displayDataTypes,
    displayObjectSize,
    enableClipboard,
    onExpand,
    collapsed,
    quotes,
    level: level + 1,
    style: { paddingLeft: indentWidth },
  };
  const valueViewProps = {
    displayDataTypes,
    displayObjectSize,
    enableClipboard,
    indentWidth,
    renderValue: components.value,
  } as ValueViewProps<T>;

  const arrowView = components.arrow ? (
    cloneElement(components.arrow, { style: arrowStyle, 'data-expand': expand, className: "w-rjv-arrow" })
  ) : (
    <TriangleArrow style={arrowStyle} className="w-rjv-arrow" />
  );
  const [showTools, setShowTools] = useState(false);
  const tools = enableClipboard ? <Copied show={showTools} text={value as T} render={components.copied} /> : undefined;
  const eventProps: React.HTMLAttributes<HTMLDivElement> = {};
  if (enableClipboard) {
    eventProps.onMouseEnter = () => setShowTools(true);
    eventProps.onMouseLeave = () => setShowTools(false);
  }
  return (
    <div {...reset} className="w-rjv-inner" {...eventProps}>
      <Line style={{ display: 'inline-flex', alignItems: 'center' }} onClick={handle}>
        {arrowView}
        {(typeof keyName === 'string' || typeof keyName === 'number') && (
          <Fragment>
            <Semicolon
              value={value}
              quotes={quotes}
              render={components.objectKey}
              color={typeof keyName === 'number' ? typeMap['number'].color : ''}
              show={typeof keyName === 'string'}
            >
              {keyName}
            </Semicolon>
            <Colon />
          </Fragment>
        )}
        <Meta start isArray={isArray} render={components.braces} />
        {!expand && <Ellipsis render={components.ellipsis} />}
        {!expand && <Meta isArray={isArray} render={components.braces} />}
        {displayObjectSize && <CountInfo>{nameKeys.length} items</CountInfo>}
        {tools}
      </Line>
      {expand && (
        <Line className="w-rjv-content" style={{ borderLeft: 'var(--w-rjv-border-left-width, 1px) solid var(--w-rjv-line-color, #ebebeb)', marginLeft: 6 }}>
          {nameKeys.length > 0 &&
            nameKeys.map((key, idx) => {
              const item = value[key];
              const renderKey = (
                <Semicolon
                  value={item}
                  quotes={quotes}
                  render={components.objectKey}
                  color={typeof key === 'number' ? typeMap['number'].color : ''}
                  show={typeof key === 'string'}
                >
                  {key}
                </Semicolon>
              );
              const isEmpty = (Array.isArray(item) && (item as []).length === 0) || (typeof item === 'object' && item && !((item as any) instanceof Date) && Object.keys(item).length === 0);
              if (Array.isArray(item) && !isEmpty) {
                const label = isArray ? idx : key;
                return (
                  <Line key={label + idx} className="w-rjv-wrap">
                    <RooNode value={item} keyid={keyid + subkeyid + label} keyName={label} {...subNodeProps} />
                  </Line>
                );
              }
              if (typeof item === 'object' && item && !((item as any) instanceof Date) && !isEmpty) {
                return (
                  <Line key={key + idx} className="w-rjv-wrap">
                    <RooNode keyid={keyid + subkeyid + key} value={item} keyName={key} {...subNodeProps} />
                  </Line>
                );
              }
              if (typeof item === 'function') {
                return;
              }
              return (
                <ValueView key={idx} {...valueViewProps} renderBraces={components.braces} renderKey={renderKey} keyName={key} value={item} />
              );
            })}
        </Line>
      )}
      {expand && (
        <Line style={{ paddingLeft: 2 }}>
          <Meta render={components.braces} isArray={isArray} style={{ paddingLeft: 2, display: 'inline-block' }} />
        </Line>
      )}
    </div>
  );
}
