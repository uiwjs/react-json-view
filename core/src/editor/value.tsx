import type { FC } from 'react';
import { Fragment, PropsWithChildren, useEffect, useRef, useState } from 'react';
import type { TypeProps } from '../value';
import { getValueString, isFloat, Type, typeMap } from '../value';
import { EditIcon } from './icon/edit';
import { DeleteIcon } from './icon/delete';
import type { JsonViewEditorProps } from './';

const Quotes: FC<PropsWithChildren<React.HTMLAttributes<HTMLSpanElement> & { quotes?: JsonViewEditorProps<object>['quotes']; show?: boolean; }>> = ({ show, style, quotes }) => {
  if (!quotes || !show) return;
  return <span style={style}>{quotes}</span>;
}

export interface ReValueProps<T extends object> extends React.HTMLAttributes<HTMLSpanElement> {
  onEdit?: JsonViewEditorProps<T>['onEdit'];
  quotes?: JsonViewEditorProps<T>['quotes'];
  keyName?: JsonViewEditorProps<T>['keyName'];
  type: TypeProps['type'];
  value?: unknown;
  data?: T;
  visible?: boolean;
  editableValue?: boolean;
  displayDataTypes?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
  onDelete?: JsonViewEditorProps<T>['onDelete'];
}

export function ReValue<T extends object>(props: ReValueProps<T>) {
  const { type, value, setValue, data, keyName, visible, quotes, style, children, displayDataTypes, editableValue, onDelete, onEdit, ...reset } = props;
  const [editable, setEditable] = useState(false);
  const $edit = useRef<HTMLSpanElement>(null);
  const [curentType, setCurentType] = useState(type);
  const [curentChild, setCurentChild] = useState(value);
  useEffect(() => setCurentChild(value), [value]);
  const click = (evn: React.MouseEvent<SVGElement, MouseEvent>) => {
    evn.stopPropagation();
    if (!editableValue) return;
    if ($edit.current) {
      setEditable(true);
      $edit.current.setAttribute('contentEditable', 'true');
      $edit.current?.focus();
    }
  }
  const keyDown = (evn: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!editableValue) return;
    if (evn.key === 'Enter') {
      evn.stopPropagation();
      evn.preventDefault();
      setEditable(false);
      if ($edit.current) {
        $edit.current.setAttribute('contentEditable', 'false');
      }
    }
  }
  const blur = async () => {
    if (!editableValue) return;
    setEditable(false);
    if ($edit.current) {
      $edit.current.setAttribute('contentEditable', 'false');
      let text: unknown = $edit.current.innerHTML as string;
      let typeStr = curentType;
      if (curentType === 'number' || curentType === 'float') {
        text = Number(text);
        typeStr = isFloat(text as number) ? 'float' : 'number';
      }
      if (curentType === 'url' && typeof text === 'string') {
        text = new URL(text);
        typeStr = 'url';
      }
      if (Number.isNaN(text)) {
        typeStr = 'number';
      }
      if (typeof text === 'string' && /^(true|false)$/ig.test(text)) {
        text = /^(true)$/ig.test(text) ? true : false;
        typeStr = 'boolean';
      } else if (typeof text === 'string' && /^[\d]+n$/ig.test(text)) {
        text = BigInt(text.replace(/n$/ig, ''));
        typeStr = 'bigint';
      } else if (typeof text === 'string' && /^(null)$/ig.test(text)) {
        text = null;
        typeStr = 'null';
      } else if (typeof text === 'string' && /^(undefined)$/ig.test(text)) {
        text = undefined;
        typeStr = 'undefined';
      } else if (typeof text === 'string') {
        try {
          if(text && text.length > 10 && !isNaN(Date.parse(text))){
            const dt = new Date(text);
            text = dt;
            typeStr = 'date';
          }
        } catch (error) {}
      }
      if (onEdit) {
        const result = await onEdit({ type: 'value', value: text, oldValue: curentChild });
        if (result) {
          setCurentType(typeStr);
          setCurentChild(text);
        } else {
          const { content: oldChildStr } = getValueString(curentChild);
          $edit.current.innerHTML = String(oldChildStr);
        }
      }
    }
  }
  const defaultStyle = { minWidth: 34, minHeight: 18, paddingInline: 3, display: 'inline-block' } as React.CSSProperties;
  const { type: typeStr, content: childStr } = getValueString(curentChild);
  const color = typeMap[typeStr]?.color || '';
  const spanProps: React.HTMLAttributes<HTMLSpanElement> = {
    ...reset,
    onBlur: blur,
    onKeyDown: keyDown,
    spellCheck: false,
    style: editable ? {...style,...defaultStyle, color } : {...style, color},
  }
  let typeView = <Type type={typeStr} />;
  if (typeStr === 'null' || typeStr === 'undefined') {
    typeView = <Fragment />;
  }
  const deleteHandle = async (evn: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    evn.stopPropagation();
    if (data && keyName && keyName in data && setValue) {
      delete (data as Record<string, any>)[keyName as string];
      setValue({ ...data } as T);
    }
  }
  return (
    <Fragment>
      {displayDataTypes && typeView}
      <Quotes style={style} quotes={quotes} show={typeStr === 'string'} />
      <span {...spanProps} ref={$edit} data-value={childStr}>{typeof curentChild === 'string' ? curentChild :  childStr}</span>
      <Quotes style={style} quotes={quotes} show={typeStr === 'string'} />
      {visible && editableValue && onEdit && <EditIcon onClick={click} />}
      {visible && editableValue && onDelete && <DeleteIcon onClick={deleteHandle} />}
    </Fragment>
  );

}