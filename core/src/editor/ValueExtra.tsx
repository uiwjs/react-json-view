import { type SectionElementProps } from '../store/Section';
import { useStore } from './store';
import { EditIcon } from './icon/edit';
import { DeleteIcon } from './icon/delete';
import { useShowToolsStore } from '../store/ShowTools';

export const ValueExtraRender: SectionElementProps['render'] = (
  { children, ...reset },
  { value, parentValue, keyName, expandKey },
) => {
  const { onEdit } = useStore();

  const showTools = useShowToolsStore();
  const isShowTools = expandKey && showTools[expandKey];
  if (!isShowTools) return null;

  const click = (evn: React.MouseEvent<SVGElement, MouseEvent>) => {
    evn.stopPropagation();
  };

  const deleteHandle = async (evn: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    evn.stopPropagation();
    // if (data && keyName && keyName in data && setValue && onDelete) {
    //   const maybeDelete = await onDelete(keyName, value as T, parentValue as T, { namespace });
    //   if (maybeDelete) {
    //     delete (data as Record<string, any>)[keyName as string];
    //     setValue({ ...data } as T);
    //   }
    // }
  };
  return <>
    {/* {visible && editableValue && onEdit && <EditIcon onClick={click} />}
    {visible && editableValue && onDelete && <DeleteIcon onClick={deleteHandle} />} */}
    <EditIcon onClick={click} />
    <DeleteIcon onClick={deleteHandle} />
  </>;
};

