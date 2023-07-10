import { FC, useEffect, useRef, useState } from 'react';
import { useHighlight } from '../semicolon';
import type { SemicolonProps } from '../semicolon';
import { Label } from '../value';
import type { JsonViewEditorProps } from './';

export interface ObjectKeyProps<T extends object> extends SemicolonProps {
  onEdit?: JsonViewEditorProps<T>['onEdit'];
  render?: (props: SemicolonProps & { ref?: React.RefObject<HTMLElement> }) => React.ReactNode;
  editableValue?: boolean;
}

export const ObjectKey: FC<ObjectKeyProps<object>>= (props) => {
  const { className, value, keyName, parentName, quotes, label, editableValue, onEdit, highlightUpdates = true, render, ...reset } = props;
  const [editable, setEditable] = useState(false);
  const [curentLabel, setCurentLabel] = useState(label);
  useEffect(() => setCurentLabel(label), [label]);
  const $edit = useRef<HTMLSpanElement>(null);
  useHighlight({ value, highlightUpdates: highlightUpdates, highlightContainer: $edit });
  const click = (evn: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evn.stopPropagation();
    if (!editableValue) return;
    if (typeof keyName !== 'string') return;
    if (editable) return;
    setEditable(true);
    if ($edit.current) {
      $edit.current!.contentEditable = 'true';
      $edit.current?.focus();
    }
  }

  const blur = () => {
    setEditable(false);
    if ($edit.current) {
      $edit.current.contentEditable = 'false';
      $edit.current?.focus();
      setCurentLabel($edit.current.innerText);
      onEdit && onEdit({ value: $edit.current.innerText, oldValue: curentLabel as string, keyName, parentName, type: 'key' });
    }
  }
  const focus = () => {
    if ($edit.current) {
      $edit.current.contentEditable = 'true';
      $edit.current?.focus();
    }
  }
  const keyDown = (evn: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evn.key === 'Enter') {
      evn.stopPropagation();
      evn.preventDefault();
      $edit.current!.contentEditable = 'false';
    }
  }
  useEffect(() => {
    if ($edit.current) {
      $edit.current.addEventListener("paste", (e) => {
        e.preventDefault();
        // @ts-ignore
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
      });
    }
  }, [$edit]);

  const style = { minWidth: 34, minHeight: 18, paddingInline: 3, display: 'inline-block' } as React.CSSProperties;
  const content = typeof keyName === 'string' ? `${quotes}${curentLabel}${quotes}` : curentLabel;
  const spanProps: SemicolonProps = {
    onClick: click,
    onFocus: focus,
    onBlur: blur,
    onKeyDown: keyDown,
    style: editable ? style : {},
    contentEditable: editable,
    spellCheck: false,
    autoFocus: editable,
    suppressContentEditableWarning: true,
    children: editable ? curentLabel : content,
  }
  if (render) {
    spanProps.value = value;
    spanProps.keyName = keyName;
    spanProps.parentName = parentName;
    return render({ className, ...reset, ...spanProps, parentName, label: curentLabel as string, children: editable ? curentLabel : content, ref: $edit });
  }

  return <Label className={className} {...reset} autoFocus={editable} {...spanProps} ref={$edit} />;
}


