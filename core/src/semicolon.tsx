import { FC, PropsWithChildren, useId, cloneElement, useState, useMemo, useRef, useEffect } from 'react';
import { Label, LabelProps } from './value';
import { JsonViewProps } from './';

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export interface SemicolonProps extends LabelProps {
  show?: boolean;
  highlightUpdates?: boolean;
  quotes?: JsonViewProps<object>['quotes'];
  value?: object;
  render?: (props: Omit<SemicolonProps, 'show'> & {}) => JSX.Element;
}
export const Semicolon: FC<PropsWithChildren<SemicolonProps>> = ({
  children,
  render,
  color,
  value,
  className = 'w-rjv-object-key',
  show,
  highlightUpdates,
  quotes,
  ...props
}) => {
  const prevValue = usePrevious(value);
  const highlightContainer = useRef<HTMLSpanElement>(null)
  const isHighlight = useMemo(() => {
    if (!highlightUpdates || prevValue === undefined) return false
    // highlight if value type changed
    if (typeof value !== typeof prevValue) {
      return true
    }
    if (typeof value === 'number') {
      // notice: NaN !== NaN
      if (isNaN(value) && isNaN(prevValue as unknown as number)) return false
      return value !== prevValue
    }
    // highlight if isArray changed
    if (Array.isArray(value) !== Array.isArray(prevValue)) {
      return true
    }
    // not highlight object/function
    // deep compare they will be slow
    if (typeof value === 'object' || typeof value === 'function') {
      return false
    }

    // highlight if not equal
    if (value !== prevValue) {
      return true
    }

    return false
  }, [highlightUpdates, value]);

  useEffect(() => {
    if (highlightContainer.current && isHighlight && 'animate' in highlightContainer.current) {
      highlightContainer.current.animate(
        [
          { backgroundColor: 'var(--w-rjv-update-color, #ebcb8b)' },
          { backgroundColor: '' }
        ],
        {
          duration: 1000,
          easing: 'ease-in'
        }
      )
    }
  }, [isHighlight, value]);

  const content = show ? `${quotes}${children}${quotes}` : children;
  if (render) return render({ className, ...props, value, style: { color }, children: content });
  return (
    <Label className={className} color={color} {...props} ref={highlightContainer}>
      {content}
    </Label>
  );
};