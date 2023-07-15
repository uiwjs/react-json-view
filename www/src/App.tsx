import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Example } from './example/default';
import { ExampleEditor } from './example/editor';

const ExampleWrapper = styled.div`
  max-width: 530px;
  margin: 0 auto;
  padding-bottom: 3rem;
`;

const TabItem = styled.div`
  padding-bottom: 10px;
`;

const Button = styled.button<{ $active: boolean }>`
  background: transparent;
  border: 0;
  cursor: pointer;
  border-radius: 3px;
  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--tabs-bg, #bce0ff);
    `}
`;

export default function App() {
  const [tabs, setTabs] = useState<'preview' | 'editor'>('preview');
  return (
    <ExampleWrapper>
      <TabItem>
        <Button $active={tabs === 'preview'} onClick={() => setTabs('preview')}>
          Preview
        </Button>
        <Button $active={tabs === 'editor'} onClick={() => setTabs('editor')}>
          Editor
        </Button>
      </TabItem>
      {tabs === 'preview' && <Example />}
      {tabs === 'editor' && <ExampleEditor />}
    </ExampleWrapper>
  );
}
