import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Nan = (props: TypesElement<TagType>) => {
  const { Nan: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Nan');

  return null;
};

Nan.displayName = 'JVR.Nan';
