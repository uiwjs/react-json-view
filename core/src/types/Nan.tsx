import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Nan = <K extends TagType = 'span'>(props: TypesElement<K>) => {
  const { Nan: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Nan');

  return null;
};

Nan.displayName = 'JVR.Nan';
