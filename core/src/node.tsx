import { FC, Fragment, PropsWithChildren, useId, cloneElement, useState, useEffect } from 'react';
import { ValueView, ValueViewProps, Colon, Label, LabelProps, Line, typeMap } from './value';
import { TriangleArrow } from './arrow/TriangleArrow';
import { useExpandsStatus, store } from './store';
import { JsonViewProps } from './';
import { Semicolon } from './semicolon';
import { Copied } from './copied';
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
  parentValue?: T;
  namespace?: Array<string | number>;
  setParentValue?: React.Dispatch<React.SetStateAction<T>>;
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
    namespace = [],
    onCopied,
    onExpand,
    parentValue,
    setParentValue,
    ...reset
  } = props;
  const isArray = Array.isArray(value);
  const subkeyid = useId();
  const expands = useExpandsStatus();
  const expand =
    expands[keyid] ??
    (typeof collapsed === 'boolean' ? collapsed : typeof collapsed === 'number' ? level <= collapsed : true);
  const handle = () => {
    onExpand && typeof onExpand === 'function' && onExpand({ expand: !expand, keyid, keyName, value: value as T });
    !expand ? store.expand(keyid) : store.collapse(keyid);
  };
  const [valueData, setValueData] = useState<T>(value as T);
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
    parentValue: value as T,
    setParentValue: setValueData,
    quotes,
    level: level + 1,
    style: { paddingLeft: indentWidth },
  };
  const valueViewProps = {
    displayDataTypes,
    displayObjectSize,
    enableClipboard,
    indentWidth,
    data: valueData,
    quotes,
    setValue: setValueData,
    renderBraces: components.braces,
    renderValue: components.value,
  } as ValueViewProps<T>;
  const arrowStyle = { transform: `rotate(${expand ? '0' : '-90'}deg)`, transition: 'all 0.3s' };
  const arrowView = components.arrow ? (
    cloneElement(components.arrow, { style: arrowStyle, 'data-expand': expand, className: 'w-rjv-arrow' })
  ) : (
    <TriangleArrow style={arrowStyle} className="w-rjv-arrow" />
  );
  const [showTools, setShowTools] = useState(false);
  const eventProps: React.HTMLAttributes<HTMLDivElement> = {};
  if (enableClipboard) {
    eventProps.onMouseEnter = () => setShowTools(true);
    eventProps.onMouseLeave = () => setShowTools(false);
  }

  useEffect(() => setValueData(value as T), [value]);
  const nameKeys = (
    isArray ? Object.keys(valueData).map((m) => Number(m)) : Object.keys(valueData)
  ) as (keyof typeof valueData)[];

  // object
  let entries: [key: string | number, value: unknown][] = isArray
    ? Object.entries(valueData).map((m) => [Number(m[0]), m[1]])
    : Object.entries(valueData);
  if (objectSortKeys) {
    entries =
      objectSortKeys === true
        ? entries.sort(([a], [b]) => (typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : 0))
        : entries.sort(([a], [b]) => (typeof a === 'string' && typeof b === 'string' ? objectSortKeys(a, b) : 0));
  }
  let countInfo = <CountInfo>{nameKeys.length} items</CountInfo>;
  if (components.countInfo) {
    countInfo = components.countInfo({ count: nameKeys.length, level, visible: expand }) || countInfo;
  }
  return (
    <div {...reset} className={`${className} w-rjv-inner`} {...eventProps}>
      <Line style={{ display: 'inline-flex', alignItems: 'center' }} onClick={handle}>
        {arrowView}
        {(typeof keyName === 'string' || typeof keyName === 'number') && (
          <Fragment>
            <Semicolon
              value={valueData}
              quotes={quotes}
              data-keys={keyid}
              namespace={[...namespace]}
              render={components.objectKey}
              keyName={keyName}
              parentName={keyName}
              color={typeof keyName === 'number' ? typeMap['number'].color : ''}
            />
            <Colon />
          </Fragment>
        )}
        <Meta start isArray={isArray} level={level} render={components.braces} />
        {!expand && <Ellipsis render={components.ellipsis} count={nameKeys.length} level={level} />}
        {!expand && <Meta isArray={isArray} level={level} render={components.braces} />}
        {displayObjectSize && countInfo}
        {components.countInfoExtra &&
          components.countInfoExtra({
            count: nameKeys.length,
            level,
            showTools,
            keyName,
            visible: expand,
            value: valueData,
            parentValue,
            setParentValue,
            setValue: setValueData,
          })}
        {enableClipboard && (
          <Copied show={showTools} text={valueData as T} onCopied={onCopied} render={components?.copied} />
        )}
      </Line>
      {expand && (
        <Line
          className="w-rjv-content"
          style={{
            borderLeft:
              'var(--w-rjv-border-left-width, 1px) var(--w-rjv-line-style, solid) var(--w-rjv-line-color, #ebebeb)',
            marginLeft: 6,
          }}
        >
          {entries.length > 0 &&
            [...entries].map(([key, itemVal], idx) => {
              const item = itemVal as T;
              const renderKey = (
                <Semicolon
                  value={item}
                  data-keys={keyid}
                  quotes={quotes}
                  namespace={[...namespace, key]}
                  parentName={keyName}
                  highlightUpdates={highlightUpdates}
                  render={components.objectKey}
                  color={typeof key === 'number' ? typeMap['number'].color : ''}
                  keyName={key}
                />
              );
              const isEmpty =
                (Array.isArray(item) && (item as []).length === 0) ||
                (typeof item === 'object' &&
                  item &&
                  !((item as any) instanceof Date) &&
                  Object.keys(item).length === 0);
              if (Array.isArray(item) && !isEmpty) {
                const label = (isArray ? idx : key) as string;
                return (
                  <Line key={label + idx} className="w-rjv-wrap">
                    <RooNode
                      value={item}
                      namespace={[...namespace, label]}
                      keyName={label}
                      keyid={keyid + subkeyid + label}
                      {...subNodeProps}
                    />
                  </Line>
                );
              }
              if (typeof item === 'object' && item && !((item as any) instanceof Date) && !isEmpty) {
                return (
                  <Line key={key + '' + idx} className="w-rjv-wrap">
                    <RooNode
                      value={item}
                      namespace={[...namespace, key]}
                      keyName={key}
                      keyid={keyid + subkeyid + key}
                      {...subNodeProps}
                    />
                  </Line>
                );
              }
              if (typeof item === 'function') {
                return;
              }
              return (
                <ValueView
                  key={idx}
                  namespace={[...namespace, key]}
                  {...valueViewProps}
                  renderKey={renderKey}
                  keyName={key}
                  value={item}
                />
              );
            })}
        </Line>
      )}
      {expand && (
        <Line style={{ paddingLeft: 2 }}>
          <Meta
            render={components.braces}
            isArray={isArray}
            level={level}
            style={{ paddingLeft: 2, display: 'inline-block' }}
          />
        </Line>
      )}
    </div>
  );
}
