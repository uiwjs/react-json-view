import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const Arrow = <K extends TagType = 'span'>(props: SymbolsElement<K>) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'Arrow');
  return null;
};

Arrow.displayName = 'JVR.Arrow';
