import React, { ChangeEvent, Component } from 'react';
import { nanoid } from 'nanoid';

//import SortableTree from '@nosferatu500/react-sortable-tree';
import SortableTree, {
  ExtendedNodeData,
  removeNodeAtPath,
  TreeItem,
} from 'react-sortable-tree';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { increment } from '../../../store/appSlice';
import { RootState } from '../../../store/store';
import { addItem } from '../../../store/settingsSlice';
import AddForm from './AddForm';

interface StateType {
  selectedItem?: TreeItem;
  treeData: TreeItem[];
}

class Settings extends Component<
  DispatchProps & ReturnType<typeof mapStateToProps>,
  StateType
> {
  constructor(props: DispatchProps & ReturnType<typeof mapStateToProps>) {
    super(props);
    this.state = {
      treeData: [],
      selectedItem: null,
    };
  }

  override componentDidMount(): void {
    console.log('componentDidMount');
    return;
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

  onChange = (treeData: TreeItem[]): void => {
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
    //this.props.increment();

    if (item !== null) {
      console.log('aaa');
      const child = (item?.children as TreeItem[]) || [];
      item.children = child;
      child.push({ id: nanoid(10), title: 'sssss' });

      this.props.addItem({
        id: nanoid(10),
        title: 'sssss',
        children: [],
      });

      this.setState({ selectedItem: item });
    } else {
      const root: TreeItem[] = [...this.state.treeData];
      root.push({ id: nanoid(10), title: 'sssss' });
      this.props.addItem({
        id: nanoid(10),
        title: 'sssss',
        children: [],
      });
      // this.setState({ treeData: root });
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
          treeData={this.props.treeData}
          canDrop={canDrop}
          isVirtualized={false}
          // Need to set getNodeKey to get meaningful ids in paths
          getNodeKey={({ node }) => node.id}
          onChange={this.onChange}
          generateNodeProps={(rowInf) => ({
            onClick: () => {
              //              console.log('onClick', rowInf.node);
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
          // <div>
          //   <input
          //     onChange={this.onChangeInput}
          //     type="text"
          //     value={this.state.selectedItem?.title?.toString()}
          //   />
          //   <input
          //     onChange={this.onChangeInput}
          //     type="text"
          //     value={this.state.selectedItem.subtitle?.toString() || ''}
          //     placeholder={'subs'}
          //   />
          // </div>

          <AddForm
            title={this.state.selectedItem?.title?.toString()}
            onChangeInput={this.onChangeInput}
          />
        ) : (
          <div></div>
        )}
        <Button onClick={this.addCategory}>Добавить категорию</Button>
      </div>
    );
  }
}
interface DispatchProps {
  increment: () => void;
  addItem: (i: TreeItem) => void;
}

const mapDispatchToProps = {
  addItem: addItem,
  increment: increment,
};

const mapStateToProps = (state: RootState) => ({
  treeData: state.setting.treeData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
