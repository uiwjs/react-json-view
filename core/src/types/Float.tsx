import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Float = (props: TypesElement<TagType>) => {
  const { Float: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Float');

  return null;
};

Float.displayName = 'JVR.Float';
