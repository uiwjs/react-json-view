import { useStore } from '../store';
import { useSectionStore, type SectionElementProps } from '../store/Section';
import { type TagType } from '../store/Types';

export interface CountInfoProps<T extends object> {
  value?: T;
  keyName: string | number;
  isExpanded: boolean;
}

export const Ellipsis = <T extends object>({ isExpanded, value, keyName }: CountInfoProps<T>) => {
  const { Ellipsis: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const child =
    render && typeof render === 'function' && render({ ...reset, 'data-expanded': isExpanded }, { value, keyName });
  if (child) return child;
  if (!isExpanded) return null;
  return <Elm {...reset} />;
};

Ellipsis.displayName = 'JVR.Ellipsis';
