import { type TagType } from '../store/Types';
import { type SectionElement, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';
import { type SectionElementResult } from '../store/Section';

export const ValueExtra = <K extends TagType>(props: SectionElement<K>) => {
  const { ValueExtra: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'ValueExtra');
  return null;
};

ValueExtra.displayName = 'JVR.ValueExtra';

export interface ValueExtraCompProps<T extends object> extends React.HTMLAttributes<HTMLDivElement>, SectionElementResult<T> {
}

export const ValueExtraComp = <T extends object>(props: React.PropsWithChildren<ValueExtraCompProps<T>>) => {
  const { children, value, parentValue, keyName, keys, expandKey, ...other } = props;
  const { ValueExtra: Comp = {} } = useSectionStore();
  const { as, render, children: _, ...reset } = Comp;
  const Elm = as || 'div';
  const child =
    render &&
    typeof render === 'function' &&
    render({ ...other, ...reset, children }, { value, keyName, parentValue, keys, expandKey });
  if (child) return child;
  return (
    <Elm {...other} {...reset}>
      {children}
    </Elm>
  );
};

ValueExtraComp.displayName = 'JVR.ValueExtraComp';






