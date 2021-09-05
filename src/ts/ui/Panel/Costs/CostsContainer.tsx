import React, { Component, ReactElement } from 'react';
import { Costs } from './Costs';
import { ThunkProps } from '../../utils';
import { RootState } from '../../../store/store';
import { connect } from 'react-redux';
import { fetchUserCategory } from '../../../store/settingsSlice';
import { TreeItem } from 'react-sortable-tree';
import Preloader from '../Preloader';
import { resetCost, saveUserExpense } from '../../../store/costSlice';

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
    if (this.state.treeData !== null) {
      this.setState({ treeData: [] });
    } else {
      this.setState({ isLoading: true });
    }

    this.props.fetchCategory(this.props.userId);
    this.props.resetCost();
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
        <Costs
          treeData={this.state.treeData}
          userId={this.props.userId}
          saveUserExpense={this.props.saveUserExpense}
          isCostSaved={this.props.isCostSaved}
        />
      </>
    );
  }
}

const actionProps = {
  resetCost: resetCost,
};

const mapDispatchThunkToProps = {
  fetchCategory: fetchUserCategory,
  saveUserExpense: saveUserExpense,
};

const mapStateToProps = (state: RootState) => ({
  treeData: state.setting.treeData,
  userId: state.auth.userId,
  isCostSaved: state.cost.expenseSaved,
});

export default connect(mapStateToProps, {
  ...actionProps,
  ...mapDispatchThunkToProps,
})(CostsContainer);
