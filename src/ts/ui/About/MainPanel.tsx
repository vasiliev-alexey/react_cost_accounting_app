import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import fileMd from '../../../../doc/about.md';

export class MainPanel extends React.Component<{}, {}> {
  render(): React.ReactElement {
    return (
      <>
        <ReactMarkdown remarkPlugins={[gfm]}>{fileMd}</ReactMarkdown>
      </>
    );
  }
}
