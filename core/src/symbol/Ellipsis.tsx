import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const Ellipsis = (props: SymbolsElement<TagType>) => {
  const { Ellipsis: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'Ellipsis');

  return null;
};

Ellipsis.displayName = 'JVR.Ellipsis';
