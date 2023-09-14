// import { Fragment, useState } from 'react';
// import { styled } from 'styled-components';
// import JsonViewEditor from '@uiw/react-json-view/editor';
// import { themesData, example } from './default';

// const Label = styled.label`
//   margin-top: 0.83rem;
//   display: block;
//   span {
//     padding-right: 6px;
//   }
// `;

// const Options = styled.div`
//   display: grid;
//   grid-template-columns: 50% 60%;
// `;

// export function ExampleEditor() {
//   const themeKeys = Object.keys(themesData) as Array<keyof typeof themesData>;
//   const [theme, setTheme] = useState<React.CSSProperties>(themesData[themeKeys[0]]);
//   const [src] = useState({ ...example });

//   // useEffect(() => {
//   //   const loop = () => {
//   //     setSrc((src) => ({
//   //       ...src,
//   //       timer: src.timer + 1,
//   //     }));
//   //   };
//   //   const id = setInterval(loop, 1000);
//   //   return () => clearInterval(id);
//   // }, []);

//   return (
//     <Fragment>
//       <JsonViewEditor
//         value={src}
//         onEdit={(opts) => {
//           console.log('onEdit:', opts);
//           return true;
//         }}
//         onDelete={(keyName, value, parentValue, opts) => {
//           console.group('On Delete');
//           console.log('keyName:', keyName);
//           console.log('value:', value);
//           console.log('parentValue:', parentValue);
//           console.log('opts:', opts);
//           console.groupEnd();
//           return true;
//         }}
//         onAdd={(keyOrValue, newValue, value, isAdd) => {
//           console.log('keyOrValue:', keyOrValue);
//           console.log('newValue:', newValue);
//           console.log('value:', value);
//           console.log('isAdd:', isAdd);
//           return isAdd;
//         }}
//         style={{ ...theme, padding: 6, borderRadius: 6 }}
//         components={{
//           objectKey: ({ value, keyName, parentName, ...props }) => {
//             if (keyName === 'integer' && typeof value === 'number' && value > 40) {
//               return <del {...props} />;
//             }
//             return <span {...props} />;
//           },
//         }}
//       />
//       <Options>
//         <Label>
//           <span>Theme:</span>
//           <select
//             onChange={(evn) => setTheme(themesData[evn.target.value as keyof typeof themesData] as React.CSSProperties)}
//           >
//             {themeKeys.map((key) => (
//               <option value={key} key={key}>
//                 {key}
//               </option>
//             ))}
//           </select>
//         </Label>
//       </Options>
//     </Fragment>
//   );
// }
