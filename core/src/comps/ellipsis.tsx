import { FC, PropsWithChildren } from 'react';

export interface EllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number;
  level: number;
  render?: (props: EllipsisProps) => JSX.Element;
}
export const Ellipsis: FC<PropsWithChildren<EllipsisProps>> = ({ style, render, count, level, ...props }) => {
  const styl = { cursor: 'pointer', ...style };
  const className = `w-rjv-ellipsis ${props.className || ''}`;
  if (render) return render({ style: styl, count, level, ...props, className });
  return (
    <span className={className} style={styl} {...props}>
      ...
    </span>
  );
};

Ellipsis.displayName = 'JVR.Ellipsis';
