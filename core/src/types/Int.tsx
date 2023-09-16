import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Int = (props: TypesElement<TagType>) => {
  const { Int: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Int');

  return null;
};

Int.displayName = 'JVR.Int';
