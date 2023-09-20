import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const False = <K extends TagType = 'span'>(props: TypesElement<K>) => {
  const { False: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'False');

  return null;
};

False.displayName = 'JVR.False';
