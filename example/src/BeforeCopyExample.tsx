import React from 'react';
import JsonView from '@uiw/react-json-view';

const example = {
  string: 'Hello World',
  number: 42,
  boolean: true,
  nested: {
    array: [1, 2, 3],
    quote: 'This has "quotes" inside',
  },
};

export default function BeforeCopyExample() {
  const handleBeforeCopy = (
    text: string,
    keyName?: string | number,
    value?: any,
    parentValue?: any,
    expandKey?: string,
    keys?: (number | string)[],
  ) => {
    console.log('Global beforeCopy context:', { keyName, value, parentValue, expandKey, keys });

    // Example: Add key name as comment when copying objects
    if (keyName && typeof value === 'object' && value !== null) {
      return `// Key: ${keyName}\n${text}`;
    }

    // Remove all quotes from the copied text
    return text.replace(/"/g, '');
  };

  const handleCopied = (text: string, value?: any) => {
    console.log('Copied text:', text);
    console.log('Original value:', value);
  };

  return (
    <div>
      <h2>beforeCopy Example</h2>
      <p>This example shows three ways to use beforeCopy with additional context parameters.</p>

      <h3>1. Global beforeCopy (removes quotes and adds comments for objects)</h3>
      <JsonView value={example} beforeCopy={handleBeforeCopy} onCopied={handleCopied} displayObjectSize={false} />

      <h3>2. Section-level beforeCopy (converts to uppercase)</h3>
      <JsonView value={example} onCopied={handleCopied} displayObjectSize={false}>
        <JsonView.Copied
          beforeCopy={(text, keyName, value) => {
            console.log('Section-level beforeCopy:', { text, keyName, value });
            return text.toUpperCase();
          }}
        />
      </JsonView>
    </div>
  );
}
