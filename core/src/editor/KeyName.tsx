import { FC, useRef, useState } from 'react';
import { SectionElementProps } from '../store/Section';
import { useStore } from './store';

export const KeyNameRender: SectionElementProps['render'] = (
  { children, ...reset },
  { value, parentValue, keyName },
) => {
  if (typeof children === 'number') {
    return <span {...reset}>{children}</span>;
  }
  return (
    <Child {...reset} value={value} parentValue={parentValue} keyName={keyName}>
      {children}
    </Child>
  );
};

interface ChildProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: unknown;
  parentValue?: unknown;
  keyName: string | number;
}

const Child: FC<ChildProps> = (props) => {
  const { value, parentValue, keyName, ...reset } = props;
  const $dom = useRef<HTMLElement>(null);
  const [currentValue, setCurrentValue] = useState(props.children);
  const { onEdit } = useStore();

  const onKeyDown = (evn: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evn.key === 'Enter') {
      $dom.current?.setAttribute('contentEditable', 'false');
    }
  };

  const onClick = (evn: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evn.stopPropagation();
    $dom.current?.setAttribute('contentEditable', 'true');
    $dom.current?.focus();
  };

  const onBlur = (evn: React.FocusEvent<HTMLSpanElement, Element>) => {
    $dom.current?.setAttribute('contentEditable', 'false');
    const callback = onEdit && onEdit({ value: evn.target.textContent, oldValue: value, keyName });
    if (callback) {
      setCurrentValue(evn.target.textContent);
    }
  };

  const spanProps: React.HTMLAttributes<HTMLSpanElement> = {
    ...reset,
    onKeyDown,
    onClick,
    onBlur,
    spellCheck: false,
    contentEditable: 'false',
    suppressContentEditableWarning: true,
    children: currentValue,
  };

  return <span {...spanProps} ref={$dom} />;
};
