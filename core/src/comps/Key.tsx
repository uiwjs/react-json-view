import { FC, PropsWithChildren } from 'react';
import { useSectionStore } from '../store/Section';

type KeyProps = {
  keyName: string | number;
  value?: unknown;
};
export const Key: FC<PropsWithChildren<KeyProps>> = (props) => {
  const { children, value, keyName } = props;
  const isNumber = typeof children === 'number';
  const style: React.CSSProperties = {
    color: isNumber ? 'var(--w-rjv-key-number, #268bd2)' : 'var(--w-rjv-key-string, #002b36)',
  };
  const { KeyName: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  reset.style = { ...reset.style, ...style };
  const Elm = as || 'span';
  const child = render && typeof render === 'function' && render(reset, { value, keyName });
  if (child) return child;
  return <Elm {...reset}>{children}</Elm>;
};

Key.displayName = 'JVR.Key';
