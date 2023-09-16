import { type TagType } from '../store/Types';
import { type SectionElement, useSectionStore } from '../store/Section';
import { useSectionRender } from '../utils/useRender';

export const KeyName = <K extends TagType>(props: SectionElement<K>) => {
  const { KeyName: Comp = {} } = useSectionStore();
  useSectionRender(Comp, props, 'KeyName');
  return null;
};

KeyName.displayName = 'JVR.KeyName';
