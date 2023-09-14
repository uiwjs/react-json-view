import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const StringText = (props: TypesElement<TagType>) => {
  const { Str: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Str');

  return null;
};

StringText.displayName = 'JVR.StringText';
