import { forwardRef } from 'react';
import JsonView from '../';
import type { JsonViewProps } from '../';
import { ObjectKey } from './objectKey';
import { ReValue } from './value';
import { CountInfoExtra } from './countInfoExtra';
import type { CountInfoExtraProps } from './countInfoExtra';

export interface JsonViewEditorProps<T extends object> extends JsonViewProps<T> {
  /**
   * When a callback function is passed in, edit functionality is enabled. The callback is invoked before edits are completed.
   * @returns {boolean}  Returning false from onEdit will prevent the change from being made.
   */
  onEdit?: (option: {
    value: unknown;
    oldValue: unknown;
    keyName?: string | number;
    parentName?: string | number;
    namespace?: Array<string | number>;
    type?: 'value' | 'key';
  }) => boolean;
  /**
   * When a callback function is passed in, add functionality is enabled. The callback is invoked before additions are completed.
   * @returns {boolean} Returning false from onAdd will prevent the change from being made.
   */
  onAdd?: CountInfoExtraProps<T>['onAdd'];
  /**
   * When a callback function is passed in, delete functionality is enabled. The callback is invoked before deletions are completed.
   * @returns Returning false from onDelete will prevent the change from being made.
   */
  onDelete?: CountInfoExtraProps<T>['onDelete'];
  /** Whether enable edit feature. @default true */
  editable?: boolean;
}

const JsonViewEditor = forwardRef<HTMLDivElement, JsonViewEditorProps<object>>((props, ref) => {
  const { onEdit, components, editable = true, displayDataTypes = true, onAdd, onDelete, ...reset } = props;
  const comps: JsonViewEditorProps<object>['components'] = {
    ...components,
    countInfoExtra: (reprops) => <CountInfoExtra {...reprops} editable={editable} onAdd={onAdd} onDelete={onDelete} />,
    objectKey: (reprops) => (
      <ObjectKey {...reprops} editableValue={editable} onEdit={onEdit} render={components?.objectKey} />
    ),
    value: (reprops) => {
      return (
        <ReValue
          {...reprops}
          editableValue={editable}
          displayDataTypes={displayDataTypes}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      );
    },
  };
  return <JsonView {...reset} displayDataTypes={false} components={comps} ref={ref} />;
});

export default JsonViewEditor;
