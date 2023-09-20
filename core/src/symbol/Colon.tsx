import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const Colon = <K extends TagType = 'span'>(props: SymbolsElement<K>) => {
  const { Colon: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'Colon');

  return null;
};

Colon.displayName = 'JVR.Colon';
