import { Fragment } from 'react';
import type { CountInfoProps } from '../';
import { AddIcon } from './icon/add';
import { DeleteIcon } from './icon/delete';

export interface CountInfoExtraProps<T> extends Partial<CountInfoProps> {
  editable: boolean;
  showTools: boolean;
  value: T;
  parentValue?: T;
  keyName?: string | number;
  namespace?: Array<string | number>;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
  setParentValue?: React.Dispatch<React.SetStateAction<T>>;
  /**
   * When a callback function is passed in, add functionality is enabled. The callback is invoked before additions are completed.
   * @returns {boolean} Returning false from onAdd will prevent the change from being made.
   */
  onAdd?: (keyOrValue: string, newValue: T, value: T, isAdd: boolean) => boolean;
  /**
   * When a callback function is passed in, delete functionality is enabled. The callback is invoked before deletions are completed.
   * @returns Returning false from onDelete will prevent the change from being made.
   */
  onDelete?: (
    keyName: string | number,
    value: T,
    parentValue: T | null,
    opt: { namespace?: Array<string | number> },
  ) => boolean;
}

export function CountInfoExtra<T extends object>(props: CountInfoExtraProps<T>) {
  const {
    visible,
    showTools,
    editable,
    keyName,
    value,
    namespace,
    parentValue,
    setValue,
    setParentValue,
    onAdd,
    onDelete,
  } = props;
  if (!visible || !showTools) return null;
  const click = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    const keyOrValue = 'AddKeyOrValue';
    const isArray = Array.isArray(value);
    const isAdd = isArray ? true : !(keyOrValue in value);
    const result = isArray ? [...value, keyOrValue] : { ...value, [keyOrValue]: undefined };
    if (onAdd && setValue) {
      const maybeAdd = await onAdd(keyOrValue, result as T, props.value, isAdd);
      if (maybeAdd) {
        setValue!(result as T);
      }
    }
  };
  const deleteHandle = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    if (onDelete && (keyName || typeof keyName === 'number') && parentValue) {
      const maybeDelete = await onDelete(keyName, value, parentValue as T, { namespace });
      if (maybeDelete && setParentValue) {
        if (Array.isArray(parentValue)) {
          parentValue.splice(keyName as number, 1);
          setParentValue([...parentValue] as T);
        } else if (keyName in parentValue) {
          delete (parentValue as Record<string, any>)[keyName as string];
          setParentValue({ ...parentValue } as T);
        }
      }
    }
  };
  return (
    <Fragment>
      {editable && onAdd && <AddIcon onClick={click} />}
      {editable && onDelete && parentValue && <DeleteIcon onClick={deleteHandle} />}
    </Fragment>
  );
}
