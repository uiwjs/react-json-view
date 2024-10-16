import { useSymbolsStore, type SymbolsElement, type SymbolsElementResult } from '../store/Symbols';
import { type TagType } from '../store/Types';
import { useExpandsStore } from '../store/Expands';

export const Quote = <T extends object>(
  props: { isNumber?: boolean } & React.HTMLAttributes<HTMLElement> & SymbolsElementResult<T>,
) => {
  const { Quote: Comp = {} } = useSymbolsStore();
  const { isNumber, value, parentValue, keyName, keys, ...other } = props;
  if (isNumber) return null;
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const elmProps = { ...other, ...reset };
  let result = { value, parentValue, keyName, keys: keys || (keyName ? [keyName] : []) };
  const child = render && typeof render === 'function' && render(elmProps, result);
  if (child) return child;
  return <Elm {...elmProps} />;
};

Quote.displayName = 'JVR.Quote';

export const ValueQuote = (props: React.HTMLAttributes<HTMLElement>) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  const { ...other } = props;
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const elmProps = { ...other, ...reset };
  const child = render && typeof render === 'function' && render(elmProps, {});
  if (child) return child;
  return <Elm {...elmProps} />;
};

ValueQuote.displayName = 'JVR.ValueQuote';

export const Colon = <T extends object>(props: SymbolsElementResult<T>) => {
  const { value, parentValue, keyName, keys } = props;
  const { Colon: Comp = {} } = useSymbolsStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const child =
    render &&
    typeof render === 'function' &&
    render(reset, {
      value,
      parentValue,
      keyName,
      keys: keys || (keyName ? [keyName] : []),
    });
  if (child) return child;
  return <Elm {...reset} />;
};

Colon.displayName = 'JVR.Colon';

export const Arrow = <T extends TagType, K extends object>(
  props: SymbolsElement<T> & { expandKey: string } & SymbolsElementResult<K>,
) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  const expands = useExpandsStore();
  const { expandKey, style: resetStyle, value, parentValue, keyName, keys } = props;
  const isExpanded = !!expands[expandKey];
  const { as, style, render, ...reset } = Comp;
  const Elm = as || 'span';
  const isRender = render && typeof render === 'function';
  const elmProps = { ...reset, 'data-expanded': isExpanded, style: { ...style, ...resetStyle } };
  const result = { value, parentValue, keyName, keys: keys || (keyName ? [keyName] : []) };
  const child = isRender && render(elmProps, result);
  if (child) return child;
  return <Elm {...reset} style={{ ...style, ...resetStyle }} />;
};

Arrow.displayName = 'JVR.Arrow';

export const BracketsOpen = <K extends object>(props: { isBrackets?: boolean } & SymbolsElementResult<K>) => {
  const { isBrackets, value, parentValue, keyName, keys } = props;
  const { BracketsLeft = {}, BraceLeft = {} } = useSymbolsStore();
  const result = { value, parentValue, keyName, keys: keys || (keyName ? [keyName] : []) };
  if (isBrackets) {
    const { as, render, ...reset } = BracketsLeft;
    const BracketsLeftComp = as || 'span';
    const child = render && typeof render === 'function' && render(reset, result);
    if (child) return child;
    return <BracketsLeftComp {...reset} />;
  }
  const { as: elm, render, ...resetProps } = BraceLeft;
  const BraceLeftComp = elm || 'span';
  const child = render && typeof render === 'function' && render(resetProps, result);
  if (child) return child;
  return <BraceLeftComp {...resetProps} />;
};

BracketsOpen.displayName = 'JVR.BracketsOpen';

type BracketsCloseProps = {
  isBrackets?: boolean;
  isVisiable?: boolean;
};

export const BracketsClose = <K extends object>(props: BracketsCloseProps & SymbolsElementResult<K>) => {
  const { isBrackets, isVisiable, value, parentValue, keyName, keys } = props;
  const result = { value, parentValue, keyName, keys: keys || (keyName ? [keyName] : []) };
  if (!isVisiable) return null;
  const { BracketsRight = {}, BraceRight = {} } = useSymbolsStore();
  if (isBrackets) {
    const { as, render, ...reset } = BracketsRight;
    const BracketsRightComp = as || 'span';
    const child = render && typeof render === 'function' && render(reset, result);
    if (child) return child;
    return <BracketsRightComp {...reset} />;
  }
  const { as: elm, render, ...reset } = BraceRight;
  const BraceRightComp = elm || 'span';
  const child = render && typeof render === 'function' && render(reset, result);
  if (child) return child;
  return <BraceRightComp {...reset} />;
};

BracketsClose.displayName = 'JVR.BracketsClose';
