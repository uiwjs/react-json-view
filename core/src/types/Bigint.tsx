import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Bigint = <K extends TagType = 'span'>(props: TypesElement<K>) => {
  const { Bigint: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Bigint');

  return null;
};

Bigint.displayName = 'JVR.Bigint';
