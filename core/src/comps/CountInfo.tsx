import { useStore } from '../store';
import { useSectionStore, type SectionElementProps } from '../store/Section';
import { type TagType } from '../store/Types';

export interface CountInfoProps<T extends object> {
  value?: T;
  keyName: string | number;
}

export const CountInfo = <T extends object>(
  props: SectionElementProps<TagType> & CountInfoProps<T> & React.HTMLAttributes<HTMLElement>,
) => {
  const { value = {}, keyName, ...other } = props;
  const { displayObjectSize } = useStore();

  const { CountInfo: Comp = {} } = useSectionStore();

  if (!displayObjectSize) return null;

  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';

  reset.style = { ...reset.style, ...props.style };

  const len = Object.keys(value).length;
  if (!reset.children) {
    reset.children = `${len} items`;
  }

  const elmProps = { ...reset, ...other };
  const isRender = render && typeof render === 'function';
  const child = isRender && render({ ...elmProps, 'data-length': len }, { value, keyName });
  if (child) return child;
  return <Elm {...elmProps} />;
};

CountInfo.displayName = 'JVR.CountInfo';

export interface CountInfoExtraProps<T extends object> {
  value?: T;
  keyName: string | number;
}

export const CountInfoExtra = <T extends object>(props: SectionElementProps<TagType> & CountInfoExtraProps<T>) => {
  const { value = {}, keyName, ...other } = props;
  const { CountInfoExtra: Comp = {} } = useSectionStore();
  const { as, render, ...reset } = Comp;
  const Elm = as || 'span';
  const isRender = render && typeof render === 'function';
  const elmProps = { ...reset, ...other };
  const child = isRender && render(elmProps, { value, keyName });
  if (child) return child;
  return <Elm {...elmProps} />;
};

CountInfoExtra.displayName = 'JVR.CountInfoExtra';
