import { FC, Fragment, PropsWithChildren, useRef, useState } from 'react';
import type { TypeProps } from '../value';
import { getValueString, isFloat, Type, typeMap } from '../value';
import { EditIcon } from './icon/edit';
import { JsonViewEditorProps } from './';

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
  visible?: boolean;
  displayDataTypes?: boolean;
}

export function ReValue<T extends object>(props: ReValueProps<T>) {
  const { type, value, keyName, visible, quotes, style, content, children, displayDataTypes, onEdit, ...reset } = props;
  const [editable, setEditable] = useState(false);
  const $edit = useRef<HTMLSpanElement>(null);
  const [curentType, setCurentType] = useState(type);
  const [curentChild, setCurentChild] = useState(value);
  const click = (evn: React.MouseEvent<SVGElement, MouseEvent>) => {
    evn.stopPropagation();
    if ($edit.current) {
      setEditable(true);
      $edit.current!.contentEditable = 'true';
      $edit.current?.focus();
    }
  }
  const keyDown = (evn: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evn.key === 'Enter') {
      evn.stopPropagation();
      evn.preventDefault();
      setEditable(false);
      $edit.current!.contentEditable = 'false';
    }
  }
  const blur = () => {
    setEditable(false);
    if ($edit.current) {
      $edit.current.contentEditable = 'false';
      let text: unknown = $edit.current.innerText as string;
      if (curentType === 'number' || curentType === 'float') {
        text = Number(text);
        setCurentType(isFloat(text as number) ? 'float' : 'number');
      }
      if (curentType === 'url' && typeof text === 'string') {
        text = new URL(text);
      }
      if (Number.isNaN(text)) {
        setCurentType('number');
      }
      if (typeof text === 'string' && /^(true|false)$/ig.test(text)) {
        text = /^(true)$/ig.test(text) ? true : false;
        setCurentType('boolean');
      } else if (typeof text === 'string' && /^[\d]+n$/ig.test(text)) {
        text = BigInt(text.replace(/n$/ig, ''));
        setCurentType('bigint');
      } else if (typeof text === 'string' && /^(null)$/ig.test(text)) {
        text = null
        setCurentType('null');
      } else if (typeof text === 'string' && /^(undefined)$/ig.test(text)) {
        text = undefined;
        setCurentType('undefined');
      } else if (typeof text === 'string') {
        try {
          const dt = new Date(text)
          if (dt.toString() !== 'Invalid Date') {
            text = dt;
            setCurentType('date');
          }

        } catch (error) {
          
        }
      }
      setCurentChild(text);
      onEdit && onEdit({ type: 'value', value: text, oldValue: curentChild })
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
  return (
    <Fragment>
      {displayDataTypes && typeView}
      <Fragment>
        <Quotes style={style} quotes={quotes} show={typeStr === 'string'} />
        <span {...spanProps} ref={$edit} data-value={content}>{typeof curentChild === 'string' ? curentChild :  childStr}</span>
        <Quotes style={style} quotes={quotes} show={typeStr === 'string'} />
      </Fragment>
      {visible && <EditIcon onClick={click} />}
    </Fragment>
  );

}