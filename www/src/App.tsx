import GitHubCorners from '@uiw/react-github-corners';
import styled from 'styled-components';
import { Example } from './Example';
import MarkdownPreview from './Markdown';

const Header = styled.header`
  padding: 2rem 0;
  text-align: center;
  h1 {
    font-weight: 900;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji';
  }
`;

const SupVersion = styled.sup`
  font-weight: 200;
  font-size: 0.78rem;
  margin-left: 0.5em;
  margin-top: -0.3em;
  position: absolute;
`;

const ExampleWrapper = styled.div`
  max-width: 530px;
  margin: 0 auto;
  padding-bottom: 3rem;
`;

const Wrappper = styled.div`
  padding-bottom: 5rem;
`;

export default function App() {
  return (
    <Wrappper>
      <GitHubCorners fixed target="__blank" zIndex={10} href="https://github.com/uiwjs/react-json-view" />
      <Header>
        <h1>
          JSON View for React<SupVersion>v{VERSION}</SupVersion>
        </h1>
      </Header>
      <ExampleWrapper>
        <Example />
      </ExampleWrapper>
      <MarkdownPreview />
    </Wrappper>
  );
}
