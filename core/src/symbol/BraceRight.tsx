import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const BraceRight = <K extends TagType = 'span'>(props: SymbolsElement<K>) => {
  const { BraceRight: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'BraceRight');
  return null;
};

BraceRight.displayName = 'JVR.BraceRight';
