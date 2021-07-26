import React, { Component } from 'react';

//import SortableTree from '@nosferatu500/react-sortable-tree';
import SortableTree from 'react-sortable-tree';

// In your own app, you would need to use import styles once in the app

export class Settings extends Component<{}, { treeData: unknown[] }> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      treeData: [
        {
          id: 'trap',
          title: 'Wicked witch',
          subtitle: 'Traps people',
          expanded: true,
          children: [{ id: 'trapped', title: 'Trapped' }],
        },
        {
          id: 'no-grandkids',
          title: 'Jeannie',
          subtitle: "Doesn't allow grandchildren",
          expanded: true,
          children: [{ id: 'jimmy', title: 'Jimmy' }],
        },
        {
          id: 'twin-1',
          title: 'Twin #1',
          isTwin: true,
          subtitle: "Doesn't play with other twin",
        },
        {
          id: 'twin-2',
          title: 'Twin #2',
          isTwin: true,
          subtitle: "Doesn't play with other twin",
        },
      ],
    };
  }

  onChange(treeData: unknown[]): void {
    console.log(treeData);
    this.setState({ treeData });
  }

  doSomething = (rowInf: unknown): void => {
    console.log('qq', JSON.stringify(rowInf));
  };

  render(): React.ReactElement {
    const canDrop = ({}) => {
      return false;
    };

    return (
      <div style={{ height: 300 }}>
        <SortableTree
          treeData={this.state.treeData}
          canDrop={canDrop}
          isVirtualized={false}
          // Need to set getNodeKey to get meaningful ids in paths

          getNodeKey={({ node }) => node.id}
          // onChange={(treeData: any) => this.setState({treeData})}
          onChange={this.onChange}
          generateNodeProps={(rowInf) => ({
            buttons: [
              <button key={1} onClick={() => this.doSomething(rowInf)}>
                1
              </button>,
              true && (
                <button onClick={() => this.doSomething(rowInf)}>2</button>
              ),
            ],
          })}
        />
      </div>
    );
  }
}
