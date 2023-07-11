import { CSSProperties } from 'react';

export interface AddIconProps extends React.SVGAttributes<SVGElement> {}
export const AddIcon = (props: AddIconProps) => {
  const { style } = props
  const defaultStyle: CSSProperties = {
    verticalAlign: 'middle',
    display: 'inline-block',
    cursor: 'pointer',
    marginLeft: 5,
    height: '1em',
    width: '1em',
  }
  return (
    <svg viewBox="0 0 20 20" fill="var(--w-rjv-add-color, currentColor)" {...props} style={{ ...style, ...defaultStyle}}>
      <path d="M14.1970498,0 L5.81288651,0 C2.17107809,0 0,2.17 0,5.81 L0,14.18 C0,17.83 2.17107809,20 5.81288651,20 L14.1870449,20 C17.8288533,20 19.9999658,17.83 19.9999658,14.19 L19.9999658,5.81 C20.0099363,2.17 17.8388583,0 14.1970498,0 Z M16.0079491,10.75 L10.7553408,10.75 L10.7553408,16 C10.7553408,16.41 10.4151719,16.75 10.0049682,16.75 C9.59476448,16.75 9.25459556,16.41 9.25459556,16 L9.25459556,10.75 L4.00198727,10.75 C3.59178357,10.75 3.25161466,10.41 3.25161466,10 C3.25161466,9.59 3.59178357,9.25 4.00198727,9.25 L9.25459556,9.25 L9.25459556,4 C9.25459556,3.59 9.59476448,3.25 10.0049682,3.25 C10.4151719,3.25 10.7553408,3.59 10.7553408,4 L10.7553408,9.25 L16.0079491,9.25 C16.4181528,9.25 16.7583217,9.59 16.7583217,10 C16.7583217,10.41 16.4181528,10.75 16.0079491,10.75 Z" />
    </svg>
  );
}
