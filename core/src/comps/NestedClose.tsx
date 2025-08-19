import { useStore } from '../store';
import { useExpandsStore } from '../store/Expands';
import { BracketsClose } from '../symbol/';
import { type SectionElementResult } from '../store/Section';
import type * as CSS from 'csstype';

interface NestedCloseProps<T extends object> extends SectionElementResult<T> {
  expandKey: string;
  level: number;
}

export const NestedClose = <T extends object>(props: NestedCloseProps<T>) => {
  const { keyName, value, expandKey, parentValue, level, keys = [] } = props;
  const expands = useExpandsStore();
  const { collapsed, shouldExpandNodeInitially } = useStore();
  const defaultExpanded =
    typeof collapsed === 'boolean' ? collapsed : typeof collapsed === 'number' ? level > collapsed : false;
  const isExpanded = expands[expandKey] ?? defaultExpanded;
  const shouldExpand =
    shouldExpandNodeInitially && shouldExpandNodeInitially(isExpanded, { value, keys, level, keyName, parentValue });
  if (expands[expandKey] === undefined && !!shouldExpand) {
    return null;
  }
  const len = Object.keys(value!).length;
  if (isExpanded || len === 0) {
    return null;
  }
  const style: CSS.Properties<string | number> = {
    paddingLeft: 4,
  };
  const compProps = { keyName, value, keys, parentValue };
  const isArray = Array.isArray(value);
  const isMySet = value instanceof Set;
  return (
    <div style={style}>
      <BracketsClose isBrackets={isArray || isMySet} {...compProps} isVisiable={true} />
    </div>
  );
};

NestedClose.displayName = 'JVR.NestedClose';
