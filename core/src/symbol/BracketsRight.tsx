import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const BracketsRight = <K extends TagType = 'span'>(props: SymbolsElement<K>) => {
  const { BracketsRight: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'BracketsRight');

  return null;
};

BracketsRight.displayName = 'JVR.BracketsRight';
