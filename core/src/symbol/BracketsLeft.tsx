import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const BracketsLeft = <K extends TagType = 'span'>(props: SymbolsElement<K>) => {
  const { BracketsLeft: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'BracketsLeft');

  return null;
};

BracketsLeft.displayName = 'JVR.BracketsLeft';
