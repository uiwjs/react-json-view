import React, { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { NestedClose } from './comps/NestedClose';
import { NestedOpen } from './comps/NestedOpen';
import { KeyValues } from './comps/KeyValues';
import { useShowToolsDispatch } from './store/ShowTools';

export interface ContainerProps<T extends object> extends React.HTMLAttributes<HTMLDivElement> {
  keyName?: string | number;
  keyid?: string;
  parentValue?: T;
  level?: number;
  value?: T;
  initialValue?: T;
}
export const Container = forwardRef(<T extends object>(props: ContainerProps<T>, ref: React.Ref<HTMLDivElement>) => {
  const { className = '', children, parentValue, keyid, level = 1, value, initialValue, keyName, ...elmProps } = props;
  const $ref = useRef<HTMLDivElement>(null);
  const dispatch = useShowToolsDispatch();
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => $ref.current, [$ref]);
  const subkeyid = useId();
  const defaultClassNames = [className, 'w-rjv-inner'].filter(Boolean).join(' ');
  const reset: React.HTMLAttributes<HTMLDivElement> = {
    onMouseEnter: () => dispatch({ [subkeyid]: true }),
    onMouseLeave: () => dispatch({ [subkeyid]: false }),
  };
  return (
    <div className={defaultClassNames} {...elmProps} {...reset}>
      <NestedOpen expandKey={subkeyid} value={value} level={level} keyName={keyName} initialValue={initialValue} />
      <KeyValues expandKey={subkeyid} value={value} level={level} />
      <NestedClose expandKey={subkeyid} value={value} level={level} />
    </div>
  );
});

Container.displayName = 'JVR.Container';
