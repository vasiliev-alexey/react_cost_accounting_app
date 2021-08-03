import React, { Component, ReactElement } from 'react';
import { Costs } from './Costs';
import { ThunkProps } from '../../utils';
import { RootState } from '../../../store/store';
import { connect } from 'react-redux';
import { fetchCategory } from '../../../store/settingsSlice';
import { TreeItem } from 'react-sortable-tree';
import Preloader from '../Preloader';

interface StateType {
  treeData: TreeItem[];
  isLoading: boolean;
}

export type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchThunkToProps>;

class CostsContainer extends Component<DispatchPropsType, StateType> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      treeData: [],
      isLoading: true,
    };
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

  override componentDidUpdate(prevProps: Readonly<DispatchPropsType>) {
    if (prevProps.treeData !== this.props.treeData) {
      this.setState({
        isLoading: false,
        treeData: this.props.treeData,
      });
    }
  }

  render(): ReactElement {
    if (this.state.isLoading) {
      return <Preloader />;
    }

    return (
      <>
        <Costs treeData={this.state.treeData} />
      </>
    );
  }
}

const actionProps = {};

const mapDispatchThunkToProps = {
  fetchCategory,
};

const mapStateToProps = (state: RootState) => ({
  treeData: state.setting.treeData,
});

export default connect(mapStateToProps, {
  ...actionProps,
  ...mapDispatchThunkToProps,
})(CostsContainer);
