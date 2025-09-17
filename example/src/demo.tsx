import JsonView, { ShouldExpandNodeInitially } from '@uiw/react-json-view';

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const tpl = {
  avatar,
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  string_number: '1234',
};
const longArray = new Array(10).fill(tpl);
const example = {
  longArray,
  array2: new Array(2).fill(tpl),
  // nestedArray: [],
  // object: {},
  // data: {
  //   value: 1,
  // },
  level1: {
    level2: {
      level3: {
        level4: {
          level5: {
            message: 'This is deeply nested and will be collapsed',
            value: 42,
          },
        },
      },
    },
  },
};

const shouldExpandNodeInitially: ShouldExpandNodeInitially<object> = (isExpanded, props) => {
  const { value, level } = props;
  const isArray = Array.isArray(value);
  const isObject = typeof value === 'object' && !isArray;
  if (isArray) {
    return value.length < 5;
  }
  if (isObject && level > 3) {
    return false;
  }
  return isExpanded;
};

export default function App() {
  return <JsonView value={example} displayObjectSize={false} shouldExpandNodeInitially={shouldExpandNodeInitially} />;
  // return <JsonView value={example} displayObjectSize={false} shouldExpandNodeInitially={() => true} collapsed={true} />;
  // return <JsonView value={example} displayObjectSize={false} shouldExpandNodeInitially={() => false} />;
}
