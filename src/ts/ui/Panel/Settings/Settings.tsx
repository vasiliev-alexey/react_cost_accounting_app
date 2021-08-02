import React, { Component, Dispatch } from 'react';
import { ExtendedNodeData, TreeItem } from 'react-sortable-tree';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  addItem,
  fetchCategory,
  loadData,
  removeNode,
  syncState,
} from '../../../store/settingsSlice';
import AddForm from './AddForm';
import { Tree } from './Tree';

type PathType = (string | number)[];

interface StateType {
  selectedItem?: TreeItem;
  selectedPath?: PathType;
  treeData: TreeItem[];
  newCategoryName?: string;
  newCategoryDesc?: string;
}
export type DispatchPropsType = typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;
interface Snapshot {
  counter: number;
}

class Settings extends Component<DispatchPropsType, StateType, Snapshot> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      treeData: props.treeData,
      selectedItem: null,
    };
  }

  componentDidUpdate(prevProps: Readonly<DispatchPropsType>) {
    if (prevProps.treeData !== this.props.treeData) {
      this.setState({
        treeData: this.props.treeData,
      });
    }
  }

  override componentDidMount(): void {
    this.props.loadData();
  }

  onChange = (treeData: TreeItem[]): void => {
    this.props.syncState(treeData);
  };

  doSomething = (rowInf: unknown): void => {
    console.log('qq', JSON.stringify(rowInf));
  };

  removeNode = (rowInfo: ExtendedNodeData): void => {
    const { path } = rowInfo;
    this.props.removeNode(path);
    rowInfo.node = null;
  };

  onChangeInput = (evt: React.FormEvent<HTMLInputElement>): void => {
    console.log('evt', evt.currentTarget.value);

    if (evt.currentTarget.name === 'title') {
      this.setState({ newCategoryName: evt.currentTarget.value });
    } else if (evt.currentTarget.name === 'desc') {
      this.setState({ newCategoryDesc: evt.currentTarget.value });
    }
  };

  addCategory = (): void => {
    this.props.addItem({
      path: this.state.selectedItem && this.state.selectedPath,
      title: this.state.newCategoryName,
      subtitle: this.state.newCategoryDesc,
    });
    this.setState({ newCategoryName: '', newCategoryDesc: '' });
  };

  onNodeClick = (rowInfo: ExtendedNodeData): void => {
    this.setState({
      selectedItem: rowInfo.node,
      selectedPath: rowInfo.path,
    });
  };

  render(): React.ReactElement {
    // const canDrop = ({}) => {
    //   return false;
    // };
    console.log('render:', this.state);

    return (
      <div style={{ height: 300 }}>
        {/*<SortableTree*/}
        {/*  treeData={this.state.treeData}*/}
        {/*  canDrop={canDrop}*/}
        {/*  isVirtualized={false}*/}
        {/*  // Need to set getNodeKey to get meaningful ids in paths*/}
        {/*  getNodeKey={({ node }) => node.id}*/}
        {/*  onChange={this.onChange}*/}
        {/*  generateNodeProps={(rowInf) => ({*/}
        {/*    onClick: () => {*/}
        {/*      this.setState({*/}
        {/*        selectedItem: rowInf.node,*/}
        {/*        selectedPath: rowInf.path,*/}
        {/*      });*/}
        {/*    },*/}

        {/*    buttons: [*/}
        {/*      <Button*/}
        {/*        key={`removeNode-key`}*/}
        {/*        onClick={() => this.removeNode(rowInf)}*/}
        {/*      >*/}
        {/*        &#10006;*/}
        {/*      </Button>,*/}
        {/*    ],*/}
        {/*  })}*/}
        {/*/>*/}

        <Tree
          treeData={this.state.treeData}
          onChange={this.onChange}
          removeNode={this.removeNode}
          onNodeClick={this.onNodeClick}
        />

        <AddForm
          title={this.state.newCategoryName || ''}
          subtitle={this.state.newCategoryDesc || ''}
          onChangeInput={this.onChangeInput}
        />
        <Button onClick={this.addCategory}>
          {(this.state.selectedItem && `Добавить подкатегорию`) ||
            `Добавить категорию`}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addItem: addItem,
  loadData: loadData,
  removeNode: removeNode,
  syncState: syncState,
  fetchCategory: fetchCategory,
};

const mapStateToProps = (state: RootState) => ({
  treeData: state.setting.treeData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
