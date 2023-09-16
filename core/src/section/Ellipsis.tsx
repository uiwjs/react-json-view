import { type TagType } from '../store/Types';
import { type SectionElement, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';

export const Ellipsis = <K extends TagType>(props: SectionElement<K>) => {
  const { Ellipsis: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'Ellipsis');
  return null;
};

Ellipsis.displayName = 'JVR.Ellipsis';
