import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Undefined = <K extends TagType = 'span'>(props: TypesElement<K>) => {
  const { Undefined: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Undefined');

  return null;
};

Undefined.displayName = 'JVR.Undefined';
