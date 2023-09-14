import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const BraceLeft = (props: SymbolsElement<TagType>) => {
  const { BraceLeft: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'BraceLeft');

  return null;
};

BraceLeft.displayName = 'JVR.BraceLeft';
