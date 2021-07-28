import React, { ChangeEvent, Component } from 'react';

//import SortableTree from '@nosferatu500/react-sortable-tree';
import SortableTree, {
  ExtendedNodeData,
  removeNodeAtPath,
  TreeItem,
} from 'react-sortable-tree';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { increment } from '../../../store/appSlice';

interface NodeType {
  id?: string;
  title: string;
  subtitle?: string;
  expanded?: boolean;
  children?: NodeType[];
  removed?: boolean;
}

class Settings extends Component<
  {},
  {
    selectedItem?: TreeItem;
    treeData: TreeItem[];
  }
> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      treeData: [],
      selectedItem: null,
    };
  }

  override componentDidMount(): void {
    console.log('componentDidMount');
    this.setState({
      treeData: [
        {
          id: 'trap',
          title: 'Транспорт',
          subtitle: 'Регулярные поездки',
          children: [
            { id: 'trapped', title: 'Метро' },
            { id: 'bus', title: 'Автобус' },
          ],
        },
        {
          id: 'no-grandkids',
          title: 'Еда',
          subtitle: "Doesn't allow grandchildren",
          children: [{ id: 'jimmy', title: 'Jimmy' }],
        },
        {
          id: 'twin-1',
          title: 'Twin #1',
          subtitle: "Doesn't play with other twin",
        },
        {
          id: 'twin-2',
          title: 'Twin #2',
          subtitle: "Doesn't play with other twin",
        },
      ],
    });
  }

  onChange = (treeData: NodeType[]): void => {
    this.setState({ treeData });
  };

  doSomething = (rowInf: unknown): void => {
    console.log('qq', JSON.stringify(rowInf));
  };

  removeNode = (rowInfo: ExtendedNodeData): void => {
    const { path } = rowInfo;

    const item =
      rowInfo.node !== null &&
      this.state.selectedItem !== null &&
      rowInfo.node.id === this.state.selectedItem.id
        ? { selectedItem: {} }
        : this.state.selectedItem;

    console.log('item', item);

    this.setState({
      selectedItem: null,
      treeData: removeNodeAtPath({
        treeData: this.state.treeData,
        path: path, // You can use path from here
        getNodeKey: ({ node: { id } }) => id,
        ignoreCollapsed: true,
      }),
    });
    rowInfo.node = null;
    //  this.forceUpdate();
  };

  removeNode2 = (rowInf: ExtendedNodeData): void => {
    console.log('removeNode', JSON.stringify(rowInf.node));
  };

  onChangeInput = (evt: ChangeEvent): void => {
    console.log('evt', evt.target);
  };

  addCategory = (): void => {
    const item = this.state.selectedItem;
    console.log('call inc');
    this.props.increment({ data: 'data' });

    if (item !== null) {
      console.log('aaa');
      const child = (item?.children as TreeItem[]) || [];
      item.children = child;
      child.push({ id: Math.random().toString(), title: 'sssss' });
      this.setState({ selectedItem: item });
    } else {
      const root: TreeItem[] = [...this.state.treeData];
      root.push({ id: Math.random().toString(), title: 'sssss' });
      this.setState({ treeData: root });
    }
  };

  render(): React.ReactElement {
    const canDrop = ({}) => {
      return false;
    };
    console.log('render:', this.state);

    return (
      <div style={{ height: 300 }}>
        <SortableTree
          treeData={this.state.treeData}
          canDrop={canDrop}
          isVirtualized={false}
          // Need to set getNodeKey to get meaningful ids in paths
          getNodeKey={({ node }) => node.id}
          onChange={this.onChange}
          generateNodeProps={(rowInf) => ({
            onClick: () => {
              console.log('onClick', rowInf.node);

              this.setState({ selectedItem: rowInf.node });
            },

            buttons: [
              <button key={1} onClick={() => this.doSomething(rowInf)}>
                &#10010;
              </button>,
              true && (
                <button onClick={() => this.removeNode(rowInf)}>
                  &#10006;
                </button>
              ),
            ],
          })}
        />

        {this.state.selectedItem !== null ? (
          <div>
            <input
              onChange={this.onChangeInput}
              type="text"
              value={this.state.selectedItem?.title?.toString()}
            />
            <input
              onChange={this.onChangeInput}
              type="text"
              value={this.state.selectedItem.subtitle?.toString() || ''}
              placeholder={'subs'}
            />
          </div>
        ) : (
          <div></div>
        )}
        <Button onClick={this.addCategory}>Добавить категорию</Button>
      </div>
    );
  }
}

interface StateProps {
  isOn: boolean;
}
interface DispatchProps {
  increment: () => void;
}

const dispatchProps = {
  increment: increment,
};

type HocProps = ReturnType<typeof mapStateToProps> &
  typeof dispatchProps & {
    // here you can extend ConnectedHoc with new props
    overrideCount?: number;
  };

//export default Settings;
export default connect<StateProps, typeof dispatchProps>(
  null,
  dispatchProps
)(Settings);
