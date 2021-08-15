import React, { Component } from 'react';
import {
  ExtendedNodeData,
  getNodeAtPath,
  TreeItem,
  TreeNode,
} from 'react-sortable-tree';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../../../store/store';

import {
  addItem,
  fetchUserCategory,
  loadData,
  removeNode,
  saveUserCategories,
  syncState,
} from '../../../store/settingsSlice';
import AddForm from './AddForm';
import { Tree } from './Tree';
import { ThunkProps } from '../../utils';
import Preloader from '../Preloader';
import { nanoid } from 'nanoid';
import { log } from '../../utils/logger';

type PathType = (string | number)[];

const clone = (items: TreeItem[]): TreeItem[] =>
  items.map((item: TreeItem) =>
    Array.isArray(item)
      ? clone(item)
      : {
          ...item,

          children: clone(item.children as TreeItem[]),
        }
  );

const removeExpanded = (items: TreeItem[]): TreeItem[] =>
  items.map((item: TreeItem) =>
    Array.isArray(item)
      ? removeExpanded(item)
      : {
          ...item,
          expanded: false,
          children: removeExpanded(item.children as TreeItem[]),
        }
  );

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

class Settings extends Component<DispatchPropsType, StateType> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      treeData: clone(this.props.treeData || []),
      selectedItem: null,
      isLoading: true,
    };
  }

  componentDidUpdate(prevProps: Readonly<DispatchPropsType>) {
    log('Statistics: componentDidUpdate', this.props.treeData);
    if (prevProps.treeData !== this.props.treeData) {
      this.setState({
        isLoading: false,
        treeData: clone(this.props.treeData || []),
      });
    }
  }

  override async componentDidMount(): Promise<void> {
    if (this.state.treeData !== null) {
      this.setState({ treeData: [] });
    } else {
      this.setState({ isLoading: true, treeData: [] });
    }

    this.props.fetchCategory(this.props.userId);
  }

  onChange = (treeData: TreeItem[]): void => {
    this.props.syncState(treeData);
  };

  removeNode = (rowInfo: ExtendedNodeData): void => {
    const { path } = rowInfo;
    this.props.removeNode(path);
    rowInfo.node = null;
  };

  onChangeInput = (evt: React.FormEvent<HTMLInputElement>): void => {
    if (evt.currentTarget.name === 'title') {
      this.setState({ newCategoryName: evt.currentTarget.value });
    } else if (evt.currentTarget.name === 'desc') {
      this.setState({ newCategoryDesc: evt.currentTarget.value });
    }
  };

  addCategory = async (): Promise<void> => {
    const newNode = {
      id: nanoid(10),
      title: this.state.newCategoryName,
      subtitle: this.state.newCategoryDesc,
      children: [] as TreeItem[],
    };

    const data = clone(this.state.treeData);

    if (!(this.state.selectedItem && this.state.selectedPath)) {
      data.push(newNode);
    } else {
      const node: TreeNode = getNodeAtPath({
        treeData: data,
        path: this.state.selectedItem && this.state.selectedPath,
        getNodeKey: ({ node: { id } }) => id,
        ignoreCollapsed: true,
      });

      (node.node.children as TreeItem).push(newNode);
      node.node.expanded = true;
    }

    await this.props.saveCategoryTree({
      userId: this.props.userId,
      categoryTree: removeExpanded(data),
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
    if (!this.props.isLoading) {
      return <Preloader />;
    }

    return (
      <div style={{ height: 300 }}>
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
        <Button
          onClick={this.addCategory}
          data-testid="stt-btn-add-cat"
          disabled={
            !(
              this.state.newCategoryName &&
              this.state.newCategoryDesc &&
              this.state.newCategoryDesc.length > 0 &&
              this.state.newCategoryName.length > 0
            )
          }
        >
          {(this.state.selectedItem && `Добавить подкатегорию`) ||
            `Добавить категорию`}
        </Button>
      </div>
    );
  }
}

const actionProps = {
  addItem: addItem,
  loadData: loadData,
  removeNode: removeNode,
  syncState: syncState,
};

const mapDispatchThunkToProps = {
  fetchCategory: fetchUserCategory,
  saveCategoryTree: saveUserCategories,
};

const mapStateToProps = (state: RootState) => ({
  treeData: state.setting.treeData,
  isLoading: state.setting.isLoaded,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, {
  ...actionProps,
  ...mapDispatchThunkToProps,
})(Settings);
