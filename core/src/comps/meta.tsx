import { Label, LabelProps } from '../value';

export interface MetaProps extends LabelProps {
  isArray?: boolean;
  start?: boolean;
  render?: (props: Pick<MetaProps, 'start' | 'isArray' | 'className' | 'children'>) => JSX.Element;
}

export function Meta(props: MetaProps) {
  const { isArray = false, start = false, className, render, ...reset } = props;
  const mark = isArray ? '[]' : '{}';
  const cls = `w-rjv-${isArray ? 'brackets' : 'curlybraces'}-${start ? 'start' : 'end'} ${className || ''}`;
  const color = `var(--w-rjv-${isArray ? 'brackets' : 'curlybraces'}-color, #236a7c)`;
  if (render)
    return render({
      isArray,
      className: cls,
      style: { color },
      children: start ? mark.charAt(0) : mark.charAt(1),
      ...reset,
    });
  return (
    <Label color={color} className={cls} {...reset}>
      {start ? mark.charAt(0) : mark.charAt(1)}
    </Label>
  );
}
