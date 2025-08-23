import { type SectionElementProps } from '../store/Section';
import { useStore } from './store';
import { AddIcon } from './icon/add';
import { DeleteIcon } from './icon/delete';
import { useShowToolsStore } from '../store/ShowTools';

export const CountInfoExtraRender: SectionElementProps['render'] = (
  { children, ...reset },
  { value, parentValue, keyName, expandKey },
) => {
  const showTools = useShowToolsStore();
  const isShowTools = expandKey && showTools[expandKey];
  if (!isShowTools) return null;

  // const { onEdit } = useStore()

  const click = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    // const keyOrValue = 'AddKeyOrValue';
    // const isArray = Array.isArray(value);
    // const isAdd = isArray ? true : !(keyOrValue in value);
    // const result = isArray ? [...value, keyOrValue] : { ...value, [keyOrValue]: undefined };
    // if (onAdd && setValue) {
    //   const maybeAdd = await onAdd(keyOrValue, result as T, props.value, isAdd);
    //   if (maybeAdd) {
    //     setValue!(result as T);
    //   }
    // }
  };
  const deleteHandle = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    // if (onDelete && (keyName || typeof keyName === 'number') && parentValue) {
    //   const maybeDelete = await onDelete(keyName, value, parentValue as T, { namespace });
    //   if (maybeDelete && setParentValue) {
    //     if (Array.isArray(parentValue)) {
    //       parentValue.splice(keyName as number, 1);
    //       setParentValue([...parentValue] as T);
    //     } else if (keyName in parentValue) {
    //       delete (parentValue as Record<string, any>)[keyName as string];
    //       setParentValue({ ...parentValue } as T);
    //     }
    //   }
    // }
  };
  return <>
    <AddIcon onClick={click} />
    {parentValue && <DeleteIcon onClick={deleteHandle} />}
  </>
};

