import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Undefined = (props: TypesElement<TagType>) => {
  const { Undefined: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Undefined');

  return null;
};

Undefined.displayName = 'JVR.Undefined';
