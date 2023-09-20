import { useSymbolsStore, type SymbolsElement } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useSymbolsRender } from '../utils/useRender';

export const Quote = <K extends TagType = 'span'>(props: SymbolsElement<K>) => {
  const { Quote: Comp = {} } = useSymbolsStore();
  useSymbolsRender(Comp, props, 'Quote');

  return null;
};

Quote.displayName = 'JVR.Quote';
