import JsonView from '@uiw/react-json-view';

const example = {
  nestedArray: [],
  object: {},
  data: {
    value: 1,
  },
};

export default function App() {
  return (
    <JsonView value={example}>
      <JsonView.KeyName
        as="span"
        render={({ style, onClick, ...props }, { keyName, keys }) => {
          console.log('~~:', keyName, keys); // keys undefined
          return <span {...props} style={{ ...style, backgroundColor: 'red' }} />;
        }}
      />
    </JsonView>
  );
}
