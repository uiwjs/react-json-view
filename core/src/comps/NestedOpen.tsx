import { KayName } from './KeyValues';
import { useExpandsStore, useExpandsDispatch } from '../store/Expands';
import { useStore } from '../store';
import { Copied } from './Copied';
import { CountInfoExtraComps } from '../section/CountInfoExtra';
import { CountInfoComp } from '../section/CountInfo';
import { Arrow, BracketsOpen, BracketsClose } from '../symbol/';
import { EllipsisComp } from '../section/Ellipsis';
import { SetComp, MapComp } from '../types/';
import { type SectionElementResult } from '../store/Section';

export interface NestedOpenProps<T extends object> extends SectionElementResult<T> {
  initialValue?: T;
  expandKey: string;
  level: number;
}

export const NestedOpen = <T extends object>(props: NestedOpenProps<T>) => {
  const { keyName, expandKey, keys = [], initialValue, value, parentValue, level } = props;
  const expands = useExpandsStore();
  const dispatchExpands = useExpandsDispatch();
  const { onExpand, collapsed, shouldExpandNodeInitially } = useStore();
  const isArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  const defaultExpanded =
    typeof collapsed === 'boolean' ? collapsed : typeof collapsed === 'number' ? level > collapsed : false;
  const isObject = typeof value === 'object';
  let isExpanded = expands[expandKey] ?? defaultExpanded;
  const shouldExpand = shouldExpandNodeInitially && shouldExpandNodeInitially(!isExpanded, { value, keys, level });
  if (expands[expandKey] === undefined && !shouldExpand) {
    isExpanded = !shouldExpand;
  }
  const click = () => {
    const opt = { expand: !isExpanded, value, keyid: expandKey, keyName };
    onExpand && onExpand(opt);
    dispatchExpands({ [expandKey]: opt.expand });
  };

  const style: React.CSSProperties = { display: 'inline-flex', alignItems: 'center' };
  const arrowStyle = { transform: `rotate(${!isExpanded ? '0' : '-90'}deg)`, transition: 'all 0.3s' };
  const len = Object.keys(value!).length;
  const showArrow = len !== 0 && (isArray || isMySet || isObject);
  const reset: React.HTMLAttributes<HTMLDivElement> = { style };
  if (showArrow) {
    reset.onClick = click;
  }
  const compProps = { keyName, value, keys, parentValue };
  return (
    <span {...reset}>
      {showArrow && <Arrow style={arrowStyle} expandKey={expandKey} {...compProps} />}
      {(keyName || typeof keyName === 'number') && <KayName {...compProps} />}
      <SetComp value={initialValue} keyName={keyName!} />
      <MapComp value={initialValue} keyName={keyName!} />
      <BracketsOpen isBrackets={isArray || isMySet} {...compProps} />
      <EllipsisComp keyName={keyName!} value={value} isExpanded={isExpanded} />
      <BracketsClose isVisiable={isExpanded || !showArrow} isBrackets={isArray || isMySet} {...compProps} />
      <CountInfoComp value={value} keyName={keyName!} />
      <CountInfoExtraComps value={value} keyName={keyName!} />
      <Copied keyName={keyName!} value={value} expandKey={expandKey} parentValue={parentValue} keys={keys} />
    </span>
  );
};
NestedOpen.displayName = 'JVR.NestedOpen';
