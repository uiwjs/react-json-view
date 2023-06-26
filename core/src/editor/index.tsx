import { forwardRef } from 'react'
import JsonView, { JsonViewProps } from '../';
import { ObjectKey } from './objectKey';
import { ReValue } from './value';

export interface JsonViewEditorProps<T extends object> extends JsonViewProps<T> {
  /** Callback when value edit functionality */
  onEdit?: (option: {
    value: unknown;
    oldValue: unknown;
    keyName?: string | number;
    parentName?: string | number;
    type?: 'value' | 'key';
  }) => void;
  /** Whether enable edit feature. @default true */
  editable?: boolean;
}

const JsonViewEditor = forwardRef<HTMLDivElement, JsonViewEditorProps<object>>((props, ref) => {
  const { onEdit, components, editable = true, displayDataTypes = true, ...reset } = props;
  const comps: JsonViewEditorProps<object>['components'] = {
    ...components,
    objectKey: (reprops) => <ObjectKey {...reprops} editableValue={editable} onEdit={onEdit} render={components?.objectKey} />,
    value: (reprops) => {
      return <ReValue {...reprops} editableValue={editable} displayDataTypes={displayDataTypes} onEdit={onEdit} />
    }
  }
  return (
    <JsonView {...reset} displayDataTypes={false} components={comps} ref={ref} />
  );
});

export default JsonViewEditor;
