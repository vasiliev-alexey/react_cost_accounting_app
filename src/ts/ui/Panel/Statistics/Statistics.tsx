import React, { ReactElement } from 'react';
import ParametersForm from './ParametersForm';
import ExpenseTable from './ExpenseTable';
import { Tab, Tabs } from 'react-bootstrap';
import { RootState } from '../../../store/store';
import { connect } from 'react-redux';

import { ThunkProps } from '../../utils';
import { getUserExpense } from '../../../store/costSlice';
import { RequestParam } from './types';

class Statistics extends React.Component<DispatchPropsType, StateType> {
  #requestUserExpenseStats = async (params: RequestParam): Promise<void> => {
    console.log('-> requestUserExpenseStats', params);

    await this.props.getExpenseList(params);
    console.log('<-requestUserExpenseStats');
  };

  render(): ReactElement {
    const { userId, expenseLoaded, expenseList } = this.props;
    return (
      <>
        <p>Статистика расходов:</p>
        <ParametersForm
          userId={userId}
          requestUserExpenseStats={this.#requestUserExpenseStats}
        />
        <hr />
        {expenseLoaded && (
          <Tabs
            defaultActiveKey="table"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="table" title="Таблица">
              <ExpenseTable expenseList={expenseList} />
            </Tab>

            <Tab eventKey="chart" title="График" disabled>
              <ExpenseTable expenseList={expenseList} />
            </Tab>
          </Tabs>
        )}
      </>
    );
  }
}
const actionProps = {};

const mapDispatchThunkToProps = {
  getExpenseList: getUserExpense,
};

const mapStateToProps = (state: RootState) => ({
  userId: state.auth.userId,
  expenseList: state.cost.expenseList,
  expenseLoaded: state.cost.expenseLoaded,
});

interface StateType {
  isLoading: boolean;
}

type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchThunkToProps>;

export default connect(mapStateToProps, {
  ...actionProps,
  ...mapDispatchThunkToProps,
})(Statistics);
