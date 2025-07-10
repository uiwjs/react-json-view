import { useStore } from '../store';
import { useExpandsStore } from '../store/Expands';
import { BracketsClose } from '../symbol/';

interface NestedCloseProps<T extends object> {
  value?: T;
  expandKey: string;
  level: number;
  keys?: (string | number)[];
}

export const NestedClose = <T extends object>(props: NestedCloseProps<T>) => {
  const { value, expandKey, level, keys = [] } = props;
  const expands = useExpandsStore();
  const isArray = Array.isArray(value);
  const { collapsed, shouldExpandNodeInitially } = useStore();
  const isMySet = value instanceof Set;
  const defaultExpanded =
    typeof collapsed === 'boolean' ? collapsed : typeof collapsed === 'number' ? level > collapsed : false;
  const isExpanded = expands[expandKey] ?? defaultExpanded;
  const len = Object.keys(value!).length;
  const shouldExpand = shouldExpandNodeInitially && shouldExpandNodeInitially(!isExpanded, { value, keys, level });
  if (expands[expandKey] === undefined && shouldExpandNodeInitially && !shouldExpand) {
    return null;
  }
  if (isExpanded || len === 0) {
    return null;
  }
  const style: React.CSSProperties = {
    paddingLeft: 4,
  };
  return (
    <div style={style}>
      <BracketsClose isBrackets={isArray || isMySet} isVisiable={true} />
    </div>
  );
};

NestedClose.displayName = 'JVR.NestedClose';
