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

class Statistics extends React.Component<DispatchPropsType, StateType> {
  #requestUserExpenseStats = async (params: RequestParam): Promise<void> => {
    await this.props.getExpenseList(params);
  };

  constructor(props: Readonly<DispatchPropsType> | DispatchPropsType) {
    super(props);
    this.state = {
      isLoading: false,
      beginDate: null,
      endDate: null,
      showType: null,
    };
  }

  componentDidMount() {
    const routeParams = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    console.log('primitiveValues', routeParams);

    const curr = new Date(); // get current date
    let firstDay: Date;
    let lastDay: Date;
    let viewType: ViewType;

    if (routeParams.hasOwnProperty('type')) {
      const type = routeParams['type'];

      console.log('sss');

      // let beginDate: number;
      // let endDate: number;

      if (type === 'week') {
        firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1)); // First day is the day of the month - the day of the week
        lastDay = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 1 + 7)
        ); // last day is the first day + 6
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
  }

  render(): ReactElement {
    // const id = URLSearchParams(this.props.location).search.get('id');
    // const id = this.props.location;
    console.log('showType=', this.state.showType);
    const { userId, expenseLoaded, expenseList } = this.props;
    return (
      <>
        <p>Статистика расходов:</p>
        <ParametersForm
          userId={userId}
          requestUserExpenseStats={this.#requestUserExpenseStats}
          beginDate={this.state.beginDate}
          endDate={this.state.endDate}
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

            <Tab eventKey="chart" title="График">
              <ExpenseChart expenseList={expenseList} />
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
