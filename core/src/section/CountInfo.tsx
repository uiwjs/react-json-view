import { type TagType } from '../store/Types';
import { type SectionElement, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';

export const CountInfo = <K extends TagType>(props: SectionElement<K>) => {
  const { CountInfo: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'CountInfo');
  return null;
};

CountInfo.displayName = 'JVR.CountInfo';
