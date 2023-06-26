import { FC, PropsWithChildren } from 'react';

export interface EllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  render?: (props: EllipsisProps) => JSX.Element;
}
export const Ellipsis: FC<PropsWithChildren<EllipsisProps>> = ({ style, render, ...props }) => {
  const styl = { cursor: 'pointer', ...style };
  const className = `w-rjv-ellipsis ${props.className || ''}`;
  if (render) return render({ style: styl, ...props, className });
  return (
    <span className={className} style={styl} {...props}>
      ...
    </span>
  );
};
