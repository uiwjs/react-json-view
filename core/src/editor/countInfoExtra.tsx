import { AddIcon } from './icon/add';
import type { CountInfoProps } from '../';

export interface CountInfoExtraProps<T> extends Partial<CountInfoProps> {
  editable: boolean;
  showTools: boolean;
  value: T;
  setValue?: React.Dispatch<React.SetStateAction<T>>
  /**
   * When a callback function is passed in, add functionality is enabled. The callback is invoked before additions are completed.
   * @returns {boolean} Returning false from onAdd will prevent the change from being made.
   */
  onAdd?: (keyOrValue: string, newValue: T, value: T, isAdd: boolean) => boolean;
}

export function CountInfoExtra<T extends object>(props: CountInfoExtraProps<T>) {
  const { visible, showTools, editable, value, setValue, onAdd } = props;
  if (!visible || !showTools) return null;
  const click = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    const keyOrValue = 'AddKeyOrValue';
    const isArray = Array.isArray(value);
    const isAdd = isArray ? true : !(keyOrValue in value);
    const result = isArray ? [...value, keyOrValue] : { ...value, [keyOrValue]: undefined };
    if (onAdd) {
      const maybeAdd = await onAdd(keyOrValue, result as T, props.value, isAdd);
      if (maybeAdd) {
        setValue!(result as T);
      }
    }
  }
  const svgProps: React.SVGProps<SVGSVGElement> = {
    onClick: click,
  }
  if (!editable || !onAdd) return;
  return (
    <AddIcon {...svgProps} />
  );
}
