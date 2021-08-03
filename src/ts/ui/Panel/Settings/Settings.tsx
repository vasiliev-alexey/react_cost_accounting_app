import React, { Component } from 'react';
import { ExtendedNodeData, TreeItem } from 'react-sortable-tree';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../../../store/store';

import {
  addItem,
  fetchCategory,
  loadData,
  removeNode,
  syncState,
} from '../../../store/settingsSlice';
import AddForm from './AddForm';
import { Tree } from './Tree';
import { ThunkProps } from '../../utils';
import Preloader from '../Preloader';

type PathType = (string | number)[];

interface StateType {
  isLoading?: boolean;
  selectedItem?: TreeItem;
  selectedPath?: PathType;
  treeData: TreeItem[];
  newCategoryName?: string;
  newCategoryDesc?: string;
}

export type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchThunkToProps>;
interface Snapshot {
  counter: number;
}

class Settings extends Component<DispatchPropsType, StateType, Snapshot> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      treeData: props.treeData,
      selectedItem: null,
      isLoading: true,
    };
  }

  componentDidUpdate(prevProps: Readonly<DispatchPropsType>) {
    if (prevProps.treeData !== this.props.treeData) {
      this.setState({
        isLoading: false,
        treeData: this.props.treeData,
      });
    }
  }

  override componentDidMount(): void {
    // this.props.loadData();

    if (this.state.treeData !== null) {
      this.setState({ treeData: [] });
    } else {
      this.setState({ isLoading: true });
    }

    this.props.fetchCategory(1);
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
    if (this.state.isLoading) {
      return <Preloader />;
    }

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
          buttonText="&#10060;"
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

// const mapDispatchToPropsSync = {
//   addItem: addItem,
//   loadData: loadData,
//   removeNode: removeNode,
//   syncState: syncState,
// };

// const mapDispatchToProps = (dispatch: Dispatch) =>
//   bindActionCreators(
//     {
//       fetchCategory: fetchCategory,
//
//       addItem: addItem,
//       loadData: loadData,
//       removeNode: removeNode,
//       syncState: syncState,
//     },
//     dispatch
//   );

const actionProps = {
  addItem: addItem,
  loadData: loadData,
  removeNode: removeNode,
  syncState: syncState,
};

const mapDispatchThunkToProps = {
  fetchCategory,
};

const mapStateToProps = (state: RootState) => ({
  treeData: state.setting.treeData,
});
//
// type mapDispatchToProps = typeof mapDispatchToPropsSync &
//   typeof mapDispatchToPropsAsync;

export default connect(mapStateToProps, {
  ...actionProps,
  ...mapDispatchThunkToProps,
})(Settings);
