import { useTypesStore, type TagType, type TypesElement } from '../store/Types';
import { useTypesRender } from '../utils/useRender';

export const Date = <K extends TagType = 'span'>(props: TypesElement<K>) => {
  const { Date: Comp = {} } = useTypesStore();
  useTypesRender(Comp, props, 'Date');

  return null;
};

Date.displayName = 'JVR.Date';
