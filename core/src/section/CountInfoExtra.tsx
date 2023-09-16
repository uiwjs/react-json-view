import { type TagType } from '../store/Types';
import { type SectionElement, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';

export const CountInfoExtra = <K extends TagType>(props: SectionElement<K>) => {
  const { CountInfoExtra: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'CountInfoExtra');
  return null;
};

CountInfoExtra.displayName = 'JVR.CountInfoExtra';
