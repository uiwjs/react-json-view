import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const ValueQuote = <K extends TagType = 'span'>(props: SymbolsElement<K>) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'ValueQuote');

  return null;
};

ValueQuote.displayName = 'JVR.ValueQuote';
