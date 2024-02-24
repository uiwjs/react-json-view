import { Fragment, useId, useRef } from 'react';
import { useStore } from '../store';
import { useExpandsStore } from '../store/Expands';
import { useShowToolsDispatch } from '../store/ShowTools';
import { Value } from './Value';
import { KeyNameComp } from '../section/KeyName';
import { RowComp } from '../section/Row';
import { Container, type ContainerProps } from '../Container';
import { Quote, Colon } from '../symbol';
import { useHighlight } from '../utils/useHighlight';
import { type SectionElementResult } from '../store/Section';

interface KeyValuesProps<T extends object> extends SectionElementResult<T> {
  expandKey?: string;
  level: number;
}

export const KeyValues = <T extends object>(props: KeyValuesProps<T>) => {
  const { value, expandKey = '', level, keys = [] } = props;
  const expands = useExpandsStore();
  const { objectSortKeys, indentWidth, collapsed } = useStore();
  const isMyArray = Array.isArray(value);
  const isExpanded =
    expands[expandKey] ??
    (typeof collapsed === 'boolean' ? collapsed : typeof collapsed === 'number' ? level > collapsed : false);
  if (isExpanded) {
    return null;
  }
  // object
  let entries: [key: string | number, value: T][] = isMyArray
    ? Object.entries(value).map((m) => [Number(m[0]), m[1]])
    : Object.entries(value as T);
  if (objectSortKeys) {
    entries =
      objectSortKeys === true
        ? entries.sort(([a], [b]) => (typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : 0))
        : entries.sort(([a, valA], [b, valB]) =>
            typeof a === 'string' && typeof b === 'string' ? objectSortKeys(a, b, valA, valB) : 0,
          );
  }

  const style = {
    borderLeft: 'var(--w-rjv-border-left-width, 1px) var(--w-rjv-line-style, solid) var(--w-rjv-line-color, #ebebeb)',
    paddingLeft: indentWidth,
    marginLeft: 6,
  };
  return (
    <div className="w-rjv-wrap" style={style}>
      {entries.map(([key, val], idx) => {
        return (
          <KeyValuesItem parentValue={value} keyName={key} keys={[...keys, key]} value={val} key={idx} level={level} />
        );
      })}
    </div>
  );
};

KeyValues.displayName = 'JVR.KeyValues';

interface KayNameProps<T extends object> extends Omit<KeyValuesProps<T>, 'level'> {}
export const KayName = <T extends object>(props: KayNameProps<T>) => {
  const { keyName, parentValue, value } = props;
  const { highlightUpdates } = useStore();
  const isNumber = typeof keyName === 'number';
  const highlightContainer = useRef<HTMLSpanElement>(null);
  useHighlight({ value, highlightUpdates, highlightContainer });
  return (
    <Fragment>
      <span ref={highlightContainer}>
        <Quote isNumber={isNumber} data-placement="left" />
        <KeyNameComp keyName={keyName!} value={value} parentValue={parentValue}>
          {keyName}
        </KeyNameComp>
        <Quote isNumber={isNumber} data-placement="right" />
      </span>
      <Colon />
    </Fragment>
  );
};

KayName.displayName = 'JVR.KayName';

export const KeyValuesItem = <T extends object>(props: KeyValuesProps<T>) => {
  const { keyName, value, parentValue, level = 0, keys = [] } = props;
  const dispatch = useShowToolsDispatch();
  const subkeyid = useId();
  const isMyArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  const isMyMap = value instanceof Map;
  const isDate = value instanceof Date;
  const isUrl = value instanceof URL;
  const isMyObject = value && typeof value === 'object' && !isMyArray && !isMySet && !isMyMap && !isDate && !isUrl;
  const isNested = isMyObject || isMyArray || isMySet || isMyMap;
  if (isNested) {
    const myValue = isMySet ? Array.from(value as Set<any>) : isMyMap ? Object.fromEntries(value) : value;
    return (
      <Container
        keyName={keyName}
        value={myValue}
        parentValue={parentValue}
        initialValue={value}
        keys={keys}
        level={level + 1}
      />
    );
  }
  const reset: React.HTMLAttributes<HTMLDivElement> = {
    onMouseEnter: () => dispatch({ [subkeyid]: true }),
    onMouseLeave: () => dispatch({ [subkeyid]: false }),
  };
  return (
    <RowComp className="w-rjv-line" value={value} keyName={keyName} keys={keys} parentValue={parentValue} {...reset}>
      <KayName keyName={keyName} value={value} parentValue={parentValue} />
      <Value keyName={keyName!} value={value} expandKey={subkeyid} />
    </RowComp>
  );
};

KeyValuesItem.displayName = 'JVR.KeyValuesItem';
