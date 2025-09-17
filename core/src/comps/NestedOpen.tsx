import type * as CSS from 'csstype';
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
  const defaultExpanded =
    typeof collapsed === 'boolean' ? collapsed : typeof collapsed === 'number' ? level > collapsed : false;
  let isExpanded = expands[expandKey] ?? (shouldExpandNodeInitially ? false : defaultExpanded);
  const shouldExpand =
    shouldExpandNodeInitially && shouldExpandNodeInitially(!isExpanded, { value, keys, level, keyName, parentValue });
  console.log('NestedOpen', expands[expandKey], defaultExpanded, shouldExpand, !shouldExpand);
  if (expands[expandKey] === undefined && shouldExpandNodeInitially) {
    isExpanded = !shouldExpand;
  }
  const click = () => {
    const opt = { expand: !isExpanded, value, keyid: expandKey, keyName };
    onExpand && onExpand(opt);
    dispatchExpands({ [expandKey]: opt.expand });
  };

  const style: CSS.Properties<string | number> = { display: 'inline-flex', alignItems: 'center' };
  const arrowStyle: CSS.Properties<string | number> = {
    transform: `rotate(${!isExpanded ? '0' : '-90'}deg)`,
    transition: 'all 0.3s',
  };
  const len = Object.keys(value!).length;
  const isObject = typeof value === 'object';
  const isArray = Array.isArray(value);
  const isMySet = value instanceof Set;
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
