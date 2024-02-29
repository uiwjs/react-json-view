import { useRef, useState } from 'react';
import { type SectionElementProps } from '../store/Section';
import { useStore } from './store';
import { type SectionElementResult } from '../store/Section';

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

interface ChildProps<T extends object> extends React.HTMLAttributes<HTMLSpanElement>, SectionElementResult<T> {}

const Child = <T extends object>(props: ChildProps<T>) => {
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
