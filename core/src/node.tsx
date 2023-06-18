import { FC, Fragment, PropsWithChildren, useId, cloneElement } from 'react';
import { ValueView, ValueViewProps, Colon, Label, LabelProps, typeMap } from './value';
import { TriangleArrow } from './arrow/TriangleArrow';
import { useExpandsStatus, store } from './store';
import { JsonViewProps } from './';

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

export const Line: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = (props) => <div {...props} />;

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
  ...props
}) => {
  const content = show ? `"${children}"` : children;
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
    className="object-size"
  >
    {children}
  </Label>
);

export interface RooNodeProps<T> extends JsonViewProps<T> {
  keyName?: string | number;
  keyid?: string;
}
export function RooNode<T extends object>(props: RooNodeProps<T>) {
  const {
    value = {},
    keyName,
    displayDataTypes = true,
    components = {},
    displayObjectSize = true,
    indentWidth = 15,
    keyid = 'root',
    ...reset
  } = props;
  const isArray = Array.isArray(value);
  const nameKeys = (isArray ? Object.keys(value).map(m => Number(m)) : Object.keys(value)) as (keyof typeof value)[];
  const subkeyid = useId();
  const expands = useExpandsStatus();
  const expand = expands[keyid] ?? true;
  const arrowStyle = { transform: `rotate(${expand ? '0' : '-90'}deg)`, transition: 'all 0.3s' };
  const handle = () => {
    !expand ? store.expand(keyid) : store.collapse(keyid);
  };
  const subNodeProps: RooNodeProps<T> = {
    components,
    indentWidth,
    displayDataTypes,
    displayObjectSize,
    style: { paddingLeft: indentWidth },
  };
  const valueViewProps = {
    displayDataTypes,
    renderValue: components.value,
  } as ValueViewProps<T>;

  const arrowView = components.arrow ? (
    cloneElement(components.arrow, { style: arrowStyle, 'data-expand': expand })
  ) : (
    <TriangleArrow style={arrowStyle} />
  );
  return (
    <div {...reset}>
      <Line style={{ display: 'inline-flex', alignItems: 'center' }} onClick={handle}>
        {arrowView}
        {(typeof keyName === 'string' || typeof keyName === 'number') && (
          <Fragment>
            <Semicolon
              value={value}
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
      </Line>
      {expand && (
        <Line style={{ borderLeft: 'var(--w-rjv-border-left, 1px solid #ebebeb)', marginLeft: 6 }}>
          {nameKeys.length > 0 &&
            nameKeys.map((key, idx) => {
              const item = value[key];
              if (Array.isArray(item)) {
                const label = isArray ? idx : key;
                return (
                  <Line key={label + idx}>
                    <RooNode value={item} keyid={keyid + subkeyid + label} keyName={label} {...subNodeProps} />
                  </Line>
                );
              }
              const renderKey = (
                <Semicolon
                  value={item}
                  render={components.objectKey}
                  color={typeof key === 'number' ? typeMap['number'].color : ''}
                  show={typeof key === 'string'}
                >
                  {key}
                </Semicolon>
              );
              if (typeof item === 'object' && item && !((item as any) instanceof Date)) {
                if (Object.keys(item).length === 0) {
                  return (
                    <Line key={key + idx} style={{ paddingLeft: indentWidth }}>
                      <ValueView {...valueViewProps} renderKey={renderKey} keyName={key} value={item} />
                      <Meta render={components.braces} start isArray={isArray} />
                      <Meta render={components.braces} isArray={isArray} />
                      {displayObjectSize && <CountInfo>{Object.keys(item).length} items</CountInfo>}
                    </Line>
                  );
                }
                return (
                  <Line key={key + idx}>
                    <RooNode keyid={keyid + subkeyid + key} value={item} keyName={key} {...subNodeProps} />
                  </Line>
                );
              }
              if (typeof item === 'function') {
                return;
              }
              return (
                <Line key={idx} style={{ paddingLeft: indentWidth }}>
                  <ValueView {...valueViewProps} renderKey={renderKey} keyName={key} value={item} />
                </Line>
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
