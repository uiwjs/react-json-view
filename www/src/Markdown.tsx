import CodeLayout from 'react-code-preview-layout';
import { getMetaId, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import styled from 'styled-components';
import rehypeIgnore from 'rehype-ignore';
import data from '@uiw/react-json-view/README.md';
import { CodeComponent, ReactMarkdownNames } from 'react-markdown/lib/ast-to-react';

const Preview = CodeLayout.Preview;
const Code = CodeLayout.Code;
const Toolbar = CodeLayout.Toolbar;

const MarkdownStyle = styled(MarkdownPreview)`
  margin: 0 auto;
  box-shadow: rgb(8 15 41 / 8%) 0.5rem 0.5rem 2rem 0px, rgb(8 15 41 / 8%) 0px 0px 1px 0px;
  border: 1px solid var(--color-border-muted);
  text-align: left;
  max-width: 56rem;
  overflow: auto;
  padding: 2.3rem 3rem;
  border-radius: 5px;
`;

const CodePreview: CodeComponent | ReactMarkdownNames = ({ inline, node, ...props }) => {
  const { 'data-meta': meta, ...rest } = props as any;
  if (inline || !isMeta(meta)) {
    return <code {...props} />;
  }
  const line = node.position?.start.line;
  const metaId = getMetaId(meta) || String(line);
  const Child = data.components[`${metaId}`];
  if (metaId && typeof Child === 'function') {
    const code = data.data[metaId].value || '';
    const { title } = getURLParameters(meta);
    return (
      <CodeLayout>
        <Preview>
          <Child />
        </Preview>
        <Toolbar text={code}>{title || 'Code Example'}</Toolbar>
        <Code>
          <code {...rest} />
        </Code>
      </CodeLayout>
    );
  }
  return <code {...rest} />;
};

export default function Markdown() {
  return (
    <MarkdownStyle
      style={{ paddingTop: 30 }}
      disableCopy={true}
      rehypePlugins={[rehypeIgnore]}
      source={data.source}
      components={{
        code: CodePreview,
      }}
    />
  );
}
