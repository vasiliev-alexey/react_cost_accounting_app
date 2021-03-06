import React, { ReactElement } from 'react';
import ParametersForm from './ParametersForm';
import ExpenseTable from './ExpenseTable';
import { Tab, Tabs } from 'react-bootstrap';
import { RootState } from '../../../store/store';
import { connect } from 'react-redux';

import { ThunkProps } from '../../utils';
import { getUserExpense } from '../../../store/costSlice';
import { RequestParam } from './types';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import qs from 'qs';
import ExpenseChart from './ExpenseChart';
import { log } from '../../utils/logger';

class Statistics extends React.Component<DispatchPropsType, StateType> {
  constructor(props: Readonly<DispatchPropsType> | DispatchPropsType) {
    super(props);
    this.state = {
      isLoading: false,
      beginDate: null,
      endDate: null,
      showType: 'table',
    };
  }

  async componentDidMount() {
    const routeParams = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const curr = new Date();
    let firstDay: Date;
    let lastDay: Date;
    let viewType: ViewType;

    if (routeParams.hasOwnProperty('type')) {
      const type = routeParams['type'];

      if (type === 'week') {
        firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
        lastDay = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 1 + 7)
        );
      } else if (type === 'month') {
        firstDay = new Date(curr.getFullYear(), curr.getMonth(), 1);
        lastDay = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
      }
    }

    if (routeParams.hasOwnProperty('view')) {
      const view = routeParams['view'].toString();

      if (isViewType(view)) {
        viewType = view;
      }
    }
    this.setState({
      beginDate: firstDay,
      endDate: lastDay,
      showType: viewType,
    });

    if (firstDay) {
      log('runn requestUserExpenseStats');
      await this.#requestUserExpenseStats({
        userId: this.props.userId,
        endDate: lastDay,
        beginDate: firstDay,
      });
    }
  }

  #requestUserExpenseStats = async (params: RequestParam): Promise<void> => {
    await this.props.getExpenseList(params);
  };

  #onStartDateChange = (date: Date): void => {
    this.setState({ beginDate: date });
  };
  #onEndDateChange = (date: Date): void => {
    this.setState({ endDate: date });
  };

  render(): ReactElement {
    const { userId, expenseLoaded, expenseList } = this.props;
    return (
      <>
        <p>???????????????????? ????????????????:</p>
        <ParametersForm
          userId={userId}
          requestUserExpenseStats={this.#requestUserExpenseStats}
          beginDate={this.state.beginDate}
          endDate={this.state.endDate}
          onEndDateChange={this.#onEndDateChange}
          onStartDateChange={this.#onStartDateChange}
        />
        <hr />
        {expenseLoaded && (
          <Tabs
            activeKey={this.state.showType}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="table" title="??????????????">
              <ExpenseTable expenseList={expenseList} />
            </Tab>

            <Tab eventKey="chart" title="????????????">
              <ExpenseChart
                expenseList={expenseList}
                beginDate={this.state.beginDate}
                endDate={this.state.endDate}
              />
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

type ViewType = 'table' | 'chart' | null;

function isViewType(view: unknown): view is ViewType {
  return view === null || view === 'table' || view === 'chart';
}

interface StateType {
  isLoading: boolean;
  beginDate: Date;
  endDate: Date;
  showType: ViewType;
}

type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchThunkToProps> &
  RouteComponentProps;

export default connect(mapStateToProps, {
  ...actionProps,
  ...mapDispatchThunkToProps,
})(withRouter(Statistics));
