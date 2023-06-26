import { FC, Fragment, PropsWithChildren, useId, cloneElement, useState } from 'react';
import { ValueView, ValueViewProps, Colon, Label, LabelProps, Line, typeMap } from './value';
import { TriangleArrow } from './arrow/TriangleArrow';
import { useExpandsStatus, store } from './store';
import { JsonViewProps } from './';
import { Semicolon } from './semicolon';
import { Tools } from './tools';
import { Ellipsis } from './comps/ellipsis';
import { Meta } from './comps/meta';

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
    className,
    displayDataTypes = true,
    components = {},
    displayObjectSize = true,
    enableClipboard = true,
    highlightUpdates = true,
    objectSortKeys = false,
    indentWidth = 15,
    collapsed,
    level = 1,
    keyid = 'root',
    quotes = '"',
    onCopied,
    onExpand,
    ...reset
  } = props;
  const isArray = Array.isArray(value);
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
    highlightUpdates,
    onCopied,
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
    quotes,
    renderBraces: components.braces,
    renderValue: components.value,
  } as ValueViewProps<T>;
  const arrowView = components.arrow ? (
    cloneElement(components.arrow, { style: arrowStyle, 'data-expand': expand, className: "w-rjv-arrow" })
  ) : (
    <TriangleArrow style={arrowStyle} className="w-rjv-arrow" />
  );
  const [showTools, setShowTools] = useState(false);
  const eventProps: React.HTMLAttributes<HTMLDivElement> = {};
  if (enableClipboard) {
    eventProps.onMouseEnter = () => setShowTools(true);
    eventProps.onMouseLeave = () => setShowTools(false);
  }
  const nameKeys = (isArray ? Object.keys(value).map(m => Number(m)) : Object.keys(value)) as (keyof typeof value)[];

  // object
  let entries: [key: string | number, value: unknown][] = isArray ? Object.entries(value).map(m => [Number(m[0]), m[1]]) : Object.entries(value);
  if (objectSortKeys) {
    entries = objectSortKeys === true
      ? entries.sort(([a], [b]) => typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : 0)
      : entries.sort(([a], [b]) => typeof a === 'string' && typeof b === 'string' ? objectSortKeys(a, b) : 0)
  }
  return (
    <div {...reset} className={`${className} w-rjv-inner`} {...eventProps}>
      <Line style={{ display: 'inline-flex', alignItems: 'center' }} onClick={handle}>
        {arrowView}
        {(typeof keyName === 'string' || typeof keyName === 'number') && (
          <Fragment>
            <Semicolon
              value={value}
              quotes={quotes}
              data-keys={keyid}
              render={components.objectKey}
              keyName={keyName}
              parentName={keyName}
              color={typeof keyName === 'number' ? typeMap['number'].color : ''}
            />
            <Colon />
          </Fragment>
        )}
        <Meta start isArray={isArray} render={components.braces} />
        {!expand && <Ellipsis render={components.ellipsis} />}
        {!expand && <Meta isArray={isArray} render={components.braces} />}
        {displayObjectSize && <CountInfo>{nameKeys.length} items</CountInfo>}
        <Tools
          value={value}
          enableClipboard={enableClipboard}
          onCopied={onCopied}
          components={components}
          showTools={showTools}
        />
      </Line>
      {expand && (
        <Line className="w-rjv-content" style={{ borderLeft: 'var(--w-rjv-border-left-width, 1px) var(--w-rjv-line-style, solid) var(--w-rjv-line-color, #ebebeb)', marginLeft: 6 }}>
          {entries.length > 0 &&
            entries.map(([key, itemVal], idx) => {
              const item = itemVal as T;
              const renderKey = (
                <Semicolon
                  value={item}
                  data-keys={keyid}
                  quotes={quotes}
                  parentName={keyName}
                  highlightUpdates={highlightUpdates}
                  render={components.objectKey}
                  color={typeof key === 'number' ? typeMap['number'].color : ''}
                  keyName={key}
                />
              );
              const isEmpty = (Array.isArray(item) && (item as []).length === 0) || (typeof item === 'object' && item && !((item as any) instanceof Date) && Object.keys(item).length === 0);
              if (Array.isArray(item) && !isEmpty) {
                const label = (isArray ? idx : key) as string;
                return (
                  <Line key={label + idx} className="w-rjv-wrap">
                    <RooNode value={item} keyName={label} keyid={keyid + subkeyid + label} {...subNodeProps} />
                  </Line>
                );
              }
              if (typeof item === 'object' && item && !((item as any) instanceof Date) && !isEmpty) {
                return (
                  <Line key={key + '' + idx} className="w-rjv-wrap">
                    <RooNode value={item} keyName={key} keyid={keyid + subkeyid + key} {...subNodeProps} />
                  </Line>
                );
              }
              if (typeof item === 'function') {
                return;
              }
              return (
                <ValueView key={idx} {...valueViewProps} renderKey={renderKey} keyName={key} value={item} />
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
