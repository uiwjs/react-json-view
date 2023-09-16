import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Map = (props: TypesElement<TagType>) => {
  const { Map: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Map');

  return null;
};

Map.displayName = 'JVR.Map';
