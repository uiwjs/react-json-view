import { type TagType } from '../store/Types';
import { type SectionElement, type SectionElementProps, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';
import { useStore } from '../store';

export const CountInfo = <K extends TagType>(props: SectionElement<K>) => {
  const { CountInfo: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'CountInfo');
  return null;
};

CountInfo.displayName = 'JVR.CountInfo';

export interface CountInfoCompProps<T extends object> {
  value?: T;
  keyName: string | number;
}

export const CountInfoComp = <K extends TagType, T extends object>(
  props: SectionElementProps<K> & CountInfoCompProps<T> & React.HTMLAttributes<HTMLElement>,
) => {
  const { value = {}, keyName, ...other } = props;
  const { displayObjectSize } = useStore();

  const { CountInfo: Comp = {} } = useSectionStore();

  if (!displayObjectSize) return null;

  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';

  reset.style = { ...reset.style, ...props.style };

  const len = Object.keys(value).length;
  if (!reset.children) {
    reset.children = `${len} item${len === 1 ? '' : 's'}`;
  }

  const elmProps = { ...reset, ...other };
  const isRender = render && typeof render === 'function';
  const child = isRender && render({ ...elmProps, 'data-length': len } as React.HTMLAttributes<K>, { value, keyName });
  if (child) return child;
  return <Elm {...elmProps} />;
};

CountInfoComp.displayName = 'JVR.CountInfoComp';
