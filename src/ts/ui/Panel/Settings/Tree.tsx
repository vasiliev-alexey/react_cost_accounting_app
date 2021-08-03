import React, { Component } from 'react';
import SortableTree, { ExtendedNodeData, TreeItem } from 'react-sortable-tree';
import { Button } from 'react-bootstrap';

export class Tree extends Component<
  {
    treeData: TreeItem[];
    buttonText: string;
    onChange: (treeData: TreeItem[]) => void;
    removeNode: (rowInf: ExtendedNodeData) => void;
    onNodeClick: (rowInf: ExtendedNodeData) => void;
  },
  {}
> {
  render(): React.ReactElement {
    const { treeData, onChange, removeNode, onNodeClick } = this.props;

    return (
      <SortableTree
        treeData={treeData}
        canDrop={({}) => {
          return false;
        }}
        isVirtualized={false}
        // Need to set getNodeKey to get meaningful ids in paths
        getNodeKey={({ node }) => node.id}
        onChange={onChange}
        generateNodeProps={(rowInf) => {
          const nodeProps = {
            onClick: () => {
              onNodeClick(rowInf);
            },

            buttons: [
              <Button
                key={`removeNode-key`}
                onClick={() => removeNode(rowInf)}
                variant="info"
              >
                {/*&#10006;*/}
                {this.props.buttonText}
              </Button>,
            ],
          };

          return nodeProps;
        }}
      />
    );
  }
}
