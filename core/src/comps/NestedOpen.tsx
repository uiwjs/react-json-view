import { KayName } from './KeyValues';
import { useExpandsStore, useExpandsDispatch, useExpands } from '../store/Expands';
import { useStore } from '../store';
import { Copied } from './Copied';
import { CountInfo, CountInfoExtra } from './CountInfo';
import { Arrow, BracketsOpen, BracketsClose } from './ReRender/Symbols';
import { Ellipsis } from './Ellipsis';
import { SetComp, MapComp } from './ReRender/Types';

export interface NestedOpenProps<T extends object> {
  keyName?: string | number;
  value?: T;
  initialValue?: T;
  expandKey: string;
  level: number;
}

export const NestedOpen = <T extends object>(props: NestedOpenProps<T>) => {
  const { keyName, expandKey, initialValue, value, level } = props;
  const expands = useExpandsStore();
  const dispatchExpands = useExpandsDispatch();
  const { onExpand, collapsed } = useStore();
  const isArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  const isExpanded =
    expands[expandKey] ??
    (typeof collapsed === 'boolean' ? collapsed : typeof collapsed === 'number' ? level > collapsed : false);
  const isObject = typeof value === 'object';
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
  return (
    <span {...reset}>
      {showArrow && <Arrow style={arrowStyle} expandKey={expandKey} />}
      {(keyName || typeof keyName === 'number') && <KayName keyName={keyName} />}
      <SetComp value={initialValue} />
      <MapComp value={initialValue} />
      <BracketsOpen isBrackets={isArray || isMySet} />
      <Ellipsis keyName={keyName!} value={value} isExpanded={isExpanded} />
      <BracketsClose isVisiable={isExpanded || !showArrow} isBrackets={isArray || isMySet} />
      <CountInfo value={value} keyName={keyName!} />
      <CountInfoExtra value={value} keyName={keyName!} />
      <Copied keyName={keyName!} value={value} expandKey={expandKey} />
    </span>
  );
};
NestedOpen.displayName = 'JVR.NestedOpen';
