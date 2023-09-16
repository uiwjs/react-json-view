import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const Arrow = (props: SymbolsElement<TagType>) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'Arrow');
  return null;
};

Arrow.displayName = 'JVR.Arrow';
