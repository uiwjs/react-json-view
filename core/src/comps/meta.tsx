import { Label, LabelProps } from '../value';

export interface MetaProps extends LabelProps {
  isArray?: boolean;
  start?: boolean;
  level?: number;
  render?: (props: Pick<MetaProps, 'start' | 'level' | 'isArray' | 'className' | 'children'>) => JSX.Element;
}

export function Meta(props: MetaProps) {
  const { isArray = false, start = false, level, className, render, ...reset } = props;
  const mark = isArray ? '[]' : '{}';
  const cls = `w-rjv-${isArray ? 'brackets' : 'curlybraces'}-${start ? 'start' : 'end'} ${className || ''}`;
  const color = `var(--w-rjv-${isArray ? 'brackets' : 'curlybraces'}-color, #236a7c)`;
  if (render) {
    const viev = render({
      isArray,
      level,
      className: cls,
      style: { color },
      children: start ? mark.charAt(0) : mark.charAt(1),
      ...reset,
    });
    if (viev) {
      return viev;
    }
  }
  return (
    <Label color={color} className={cls} {...reset}>
      {start ? mark.charAt(0) : mark.charAt(1)}
    </Label>
  );
}
