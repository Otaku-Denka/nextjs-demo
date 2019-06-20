import MarkdownIt from 'markdown-it';

import { memo, useMemo } from 'react';
import 'github-markdown-css/github-markdown.css';

const md = new MarkdownIt({
  html: true,
  linkify: true,
});

function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(atob(str)));
}

interface MarkdownRendererProps {
  content: string;
  isBase64: boolean;
}

const MarkdownRenderer = ({ content, isBase64 }: MarkdownRendererProps) => {
  const markdown = isBase64 ? b64_to_utf8(content) : content;

  const html = useMemo(() => md.render(markdown), [markdown]);

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default memo(MarkdownRenderer);
