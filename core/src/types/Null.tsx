import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Null = <K extends TagType = 'span'>(props: TypesElement<K>) => {
  const { Null: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Null');

  return null;
};

Null.displayName = 'JVR.Null';
