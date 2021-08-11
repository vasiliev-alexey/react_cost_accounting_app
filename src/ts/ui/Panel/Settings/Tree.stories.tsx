import React from 'react';
import 'react-sortable-tree/style.css';
import { Story } from '@storybook/react';
import { Tree } from './Tree';
import { ExtendedNodeData, TreeItem } from 'react-sortable-tree';

export default {
  component: Tree,
  title: 'Tree',
};
const Template: Story<{
  treeData: TreeItem[];
  onChange: (treeData: TreeItem[]) => void;
  removeNode: (rowInf: ExtendedNodeData) => void;
  onNodeClick: (rowInf: ExtendedNodeData) => void;
  buttonText: '';
}> = (args) => <Tree {...args} />;

export const tree = Template.bind({});

tree.args = {
  treeData: [
    {
      id: 'trap',
      title: 'Транспорт',
      subtitle: 'Регулярные поездки',
      children: [
        { id: 'trapped', title: 'Метро', children: [] },
        { id: 'bus', title: 'Автобус', children: [] },
      ],
    },
    {
      id: 'no-grandkids',
      title: 'Еда',
      subtitle: 'Затраты на еду, в тч рестораны',
      children: [{ id: 'dasdasd', title: 'Завтраки в кафе', children: [] }],
    },
    {
      id: 'twin-1',
      title: 'Twin #1',
      subtitle: "Doesn't play with other twin",
      children: [],
    },
    {
      id: 'twin-2',
      title: 'Twin #2',
      subtitle: "Doesn't play with other twin",
      children: [],
    },
  ],
};
