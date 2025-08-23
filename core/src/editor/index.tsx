import { forwardRef, useRef } from 'react';
import JsonView, { type JsonViewProps } from '../';
import { KeyNameRender } from './KeyName';
import { CountInfoExtraRender } from './CountInfoExtra';
import { Context, Dispatch, useKeyValueItem, useStore, useStoreReducer } from './store';
import { ValueExtraRender } from './ValueExtra';

export interface JsonViewEditorProps<T extends object> extends Omit<JsonViewProps<T>, 'shortenTextAfterLength'> {
  /**
   * When a callback function is passed in, edit functionality is enabled. The callback is invoked before edits are completed.
   * @returns {boolean}  Returning false from onEdit will prevent the change from being made.
   */
  onEdit?: (option: {
    value: unknown;
    oldValue: unknown;
    keyName?: string | number;
    parentName?: string | number;
    type?: 'value' | 'key';
  }) => boolean;
  /** Whether enable edit feature. @default true */
  editable?: boolean;
}

const JsonViewEditor = forwardRef<HTMLDivElement, JsonViewEditorProps<object>>((props, ref) => {
  const { children, onEdit, editable = true, ...reset } = props;
  const [state, dispatch] = useStoreReducer({ onEdit });
  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>
        <JsonView {...reset} ref={ref}>
          {editable && <JsonView.KeyName render={KeyNameRender} />}
          {editable && <JsonView.String as={EditableSpan} />}
          {editable && <JsonView.Null as={EditableSpan} />}
          {editable && <JsonView.Undefined as={EditableSpan} />}
          {editable && <JsonView.Nan as={EditableSpan} />}
          {editable && <JsonView.Date as={EditableSpan} />}
          {editable && <JsonView.Float as={EditableSpan} />}
          {editable && <JsonView.Int as={EditableSpan} />}
          {editable && <JsonView.Map as={EditableSpan} />}
          {editable && <JsonView.Set as={EditableSpan} />}
          {editable && <JsonView.Bigint as={EditableSpan} />}
          {editable && <JsonView.CountInfoExtra render={CountInfoExtraRender} />}
          {editable && <JsonView.ValueExtra render={ValueExtraRender} />}
          {children}
        </JsonView>
      </Dispatch.Provider>
    </Context.Provider>
  );
});

export default JsonViewEditor;

const EditableSpan = ({ ...props }: any) => {
  const ref = useRef<HTMLElement>(null)
  const { editable, setEditable } = useKeyValueItem()
  const { onEdit } = useStore()
  if (editable) {
    ref.current?.setAttribute("contentEditable", "true")
    ref.current?.focus()
  }

  const onKeyDown = (evn: React.KeyboardEvent<HTMLSpanElement>) => {
    if (evn.key === 'Enter') {
      ref.current?.setAttribute('contentEditable', 'false');
      setEditable(false)
    }
  };

  const onBlur = (evn: React.FocusEvent<HTMLSpanElement, Element>) => {
    ref.current?.setAttribute('contentEditable', 'false');
    setEditable(false)
    onEdit && onEdit({ value: evn.target.textContent, oldValue: props.children, keyName: "keyName" });
  };
  return <span {...props} ref={ref} onKeyDown={onKeyDown} onBlur={onBlur} >{props.children}</span>
}
