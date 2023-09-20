import { type TagType } from '../store/Types';
import { type SectionElement, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';

export const Copied = <K extends TagType = 'svg'>(props: SectionElement<K>) => {
  const { Copied: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'Copied');
  return null;
};

Copied.displayName = 'JVR.Copied';
