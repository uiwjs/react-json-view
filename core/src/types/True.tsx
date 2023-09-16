import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const True = (props: TypesElement<TagType>) => {
  const { True: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'True');

  return null;
};

True.displayName = 'JVR.True';
