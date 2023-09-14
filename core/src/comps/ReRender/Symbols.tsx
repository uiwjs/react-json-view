import { useSymbolsStore, type SymbolsElement } from '../../store/Symbols';
import { type TagType } from '../../store/Types';
import { useExpandsStore } from '../../store/Expands';

export const Quote = (props: { isNumber?: boolean }) => {
  const { Quote: Comp = {} } = useSymbolsStore();
  const { isNumber } = props;
  if (isNumber) return null;
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const child = render && typeof render === 'function' && render(reset);
  if (child) return child;
  return <Elm {...reset} />;
};

Quote.displayName = 'JVR.Quote';

export const ValueQuote = (props: { isNumber?: boolean }) => {
  const { ValueQuote: Comp = {} } = useSymbolsStore();
  const { isNumber } = props;
  if (isNumber) return null;
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const child = render && typeof render === 'function' && render(reset);
  if (child) return child;
  return <Elm {...reset} />;
};

ValueQuote.displayName = 'JVR.ValueQuote';

export const Colon = () => {
  const { Colon: Comp = {} } = useSymbolsStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const child = render && typeof render === 'function' && render(reset);
  if (child) return child;
  return <Elm {...reset} />;
};

Colon.displayName = 'JVR.Colon';

export const Arrow = <T extends TagType>(props: SymbolsElement<T> & { expandKey: string }) => {
  const { Arrow: Comp = {} } = useSymbolsStore();
  const expands = useExpandsStore();
  const { expandKey } = props;
  const isExpanded = !!expands[expandKey];
  const { as, style, render, ...reset } = Comp;
  const Elm = as || 'span';
  const isRender = render && typeof render === 'function';
  const child = isRender && render({ ...reset, 'data-expanded': isExpanded, style: { ...style, ...props.style } });
  if (child) return child;
  return <Elm {...reset} style={{ ...style, ...props.style }} />;
};

Arrow.displayName = 'JVR.Arrow';

type EllipsisProps<T extends object> = {
  isExpanded?: boolean;
  keyName: string | number;
  value?: T;
};

export const Ellipsis = <T extends object>({ isExpanded }: EllipsisProps<T>) => {
  const { Ellipsis: Comp = {} } = useSymbolsStore();
  const { as, render, ...reset } = Comp;
  if (!isExpanded) return null;
  const Elm = as || 'span';
  const child = render && typeof render === 'function' && render(reset);
  if (child) return child;
  return <Elm {...reset} />;
};

Ellipsis.displayName = 'JVR.Ellipsis';

export const BracketsOpen = ({ isBrackets }: { isBrackets?: boolean }) => {
  const { BracketsLeft = {}, BraceLeft = {} } = useSymbolsStore();
  if (isBrackets) {
    const { as, render, ...reset } = BracketsLeft;
    const BracketsLeftComp = as || 'span';
    const child = render && typeof render === 'function' && render(reset);
    if (child) return child;
    return <BracketsLeftComp {...reset} />;
  }
  const { as: elm, render, ...props } = BraceLeft;
  const BraceLeftComp = elm || 'span';
  const child = render && typeof render === 'function' && render(props);
  if (child) return child;
  return <BraceLeftComp {...props} />;
};

BracketsOpen.displayName = 'JVR.BracketsOpen';

type BracketsCloseProps = {
  isBrackets?: boolean;
  isVisiable?: boolean;
};

export const BracketsClose = ({ isBrackets, isVisiable }: BracketsCloseProps) => {
  if (!isVisiable) return null;
  const { BracketsRight = {}, BraceRight = {} } = useSymbolsStore();
  if (isBrackets) {
    const { as, render, ...reset } = BracketsRight;
    const BracketsRightComp = as || 'span';
    const child = render && typeof render === 'function' && render(reset);
    if (child) return child;
    return <BracketsRightComp {...reset} />;
  }
  const { as: elm, render, ...reset } = BraceRight;
  const BraceRightComp = elm || 'span';
  const child = render && typeof render === 'function' && render(reset);
  if (child) return child;
  return <BraceRightComp {...reset} />;
};

BracketsClose.displayName = 'JVR.BracketsClose';
