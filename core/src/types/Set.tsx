import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Set = (props: TypesElement<TagType>) => {
  const { Set: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Set');

  return null;
};

Set.displayName = 'JVR.Set';
