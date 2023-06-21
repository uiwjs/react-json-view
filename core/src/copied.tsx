import { useState } from 'react';

export interface CopiedProps<T = object> extends React.SVGProps<SVGSVGElement> {
  show?: boolean;
  text?: T;
  onCopied?: (text: string, obj: T) => void;
  render?: (props: Omit<CopiedProps<T>, 'render'>) => JSX.Element;
}

export function Copied<T>(props: CopiedProps<T>) {
  const { children, style, text = '', render, show, ...reset } = props;
  if (!show) return null;
  const [copied, setCopied] = useState(false);
  const click = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    let copyText = JSON.stringify(text, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString()
      }
      return value
    }, 2);

    if (text === Infinity) copyText = Infinity;

    navigator.clipboard.writeText(copyText)
      .then(() => {
        setCopied(true);
        const timer = setTimeout(() => {
          setCopied(false);
          clearTimeout(timer);
        }, 3000);
      })
      .catch((error) => {})
  };
  const defalutStyle = { ...style, cursor: 'pointer', marginLeft: 5 } as React.CSSProperties;
  const svgProps: React.SVGProps<SVGSVGElement> = {
    height: '1em', 
    width: '1em',
    fill: 'var(--w-rjv-copied-color, currentColor)',
    onClick: click,
    style: defalutStyle,
    className: 'w-rjv-copied',
    ...reset,
  }
  if (render) return render({ ...props, ...svgProps });
  if (copied)  {
    return (
      <svg viewBox="0 0 38 38" {...svgProps} fill="var(--w-rjv-copied-success-color, #28a745)">
        <path d="M27.5,35 L2.5,35 L2.5,12.5 L27.5,12.5 L27.5,15.2249049 C29.1403264,13.8627542 29.9736597,13.1778155 30,13.1700887 C30,11.9705278 30,10.0804982 30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,35 C0,36.4 1.1,37.5 2.5,37.5 L27.5,37.5 C28.9,37.5 30,36.4 30,35 L30,30 L27.5,30 L27.5,35 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M31.5589286,15 L35.1589286,18.6 L21.0160714,33 L12.5303571,24.2571429 L16.1303571,20.6571429 L21.0160714,25.5428571 L31.5589286,15 Z M12.5,30 L12.5,32.5 L5,32.5 L5,30 L12.5,30 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z"></path>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 38 38" {...svgProps}>
      <path d="M27.5,35 L2.5,35 L2.5,12.5 L27.5,12.5 L27.5,20 L30,20 L30,7.5 C30,6.1 28.9,5 27.5,5 L20,5 C20,2.2 17.8,0 15,0 C12.2,0 10,2.2 10,5 L2.5,5 C1.1,5 0,6.1 0,7.5 L0,35 C0,36.4 1.1,37.5 2.5,37.5 L27.5,37.5 C28.9,37.5 30,36.4 30,35 L30,30 L27.5,30 L27.5,35 Z M7.5,7.5 L10,7.5 C10,7.5 12.5,6.4 12.5,5 C12.5,3.6 13.6,2.5 15,2.5 C16.4,2.5 17.5,3.6 17.5,5 C17.5,6.4 18.8,7.5 20,7.5 L22.5,7.5 C22.5,7.5 25,8.6 25,10 L5,10 C5,8.5 6.1,7.5 7.5,7.5 Z M5,27.5 L10,27.5 L10,25 L5,25 L5,27.5 Z M22.5,22.5 L22.5,17.5 L12.5,25 L22.5,32.5 L22.5,27.5 L35,27.5 L35,22.5 L22.5,22.5 Z M5,32.5 L12.5,32.5 L12.5,30 L5,30 L5,32.5 Z M17.5,15 L5,15 L5,17.5 L17.5,17.5 L17.5,15 Z M10,20 L5,20 L5,22.5 L10,22.5 L10,20 Z"></path>
    </svg>
  );
}