import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const ValueQuote = (props: SymbolsElement<TagType>) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'ValueQuote');

  return null;
};

ValueQuote.displayName = 'JVR.ValueQuote';
