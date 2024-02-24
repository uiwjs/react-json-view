import { type TagType } from '../store/Types';
import { type SectionElement, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';
import { type SectionElementResult } from '../store/Section';

export const Row = <K extends TagType>(props: SectionElement<K>) => {
  const { Row: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'Row');
  return null;
};

Row.displayName = 'JVR.Row';

export interface RowCompProps<T extends object> extends React.HTMLAttributes<HTMLDivElement>, SectionElementResult<T> {}

export const RowComp = <T extends object>(props: React.PropsWithChildren<RowCompProps<T>>) => {
  const { children, value, parentValue, keyName, keys, ...other } = props;
  const { Row: Comp = {} } = useSectionStore();
  const { as, render, children: _, ...reset } = Comp;
  const Elm = as || 'div';
  const child =
    render &&
    typeof render === 'function' &&
    render({ ...other, ...reset, children }, { value, keyName, parentValue, keys });
  if (child) return child;
  return (
    <Elm {...other} {...reset}>
      {children}
    </Elm>
  );
};

RowComp.displayName = 'JVR.RowComp';
