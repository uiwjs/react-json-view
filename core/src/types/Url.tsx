import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Url = <K extends TagType = 'a'>(props: TypesElement<K>) => {
  const { Url: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Url');

  return null;
};

Url.displayName = 'JVR.Url';
