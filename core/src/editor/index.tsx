import { forwardRef } from 'react';
import JsonView, { type JsonViewProps } from '../';
import { KeyNameRender } from './KeyName';
import { CountInfoExtraRender } from './CountInfoExtra';
import { Context, Dispatch, useStoreReducer } from './store';

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
          {editable && <JsonView.CountInfoExtra render={CountInfoExtraRender} />}
          {children}
        </JsonView>
      </Dispatch.Provider>
    </Context.Provider>
  );
});

export default JsonViewEditor;
