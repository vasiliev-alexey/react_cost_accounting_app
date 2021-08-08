import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import fileMd from '../../../../../doc/todo.md';

function TaskList(): ReactElement {
  return <ReactMarkdown remarkPlugins={[gfm]}>{fileMd}</ReactMarkdown>;
}

export default TaskList;
