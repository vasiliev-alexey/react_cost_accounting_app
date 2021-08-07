import React, { ReactElement } from 'react';
import ParametersForm from './ParametersForm';
import ExpenseTable from './ExpenseTable';
import { Tab, Tabs } from 'react-bootstrap';

export class Statistics extends React.Component<{}, {}> {
  render(): ReactElement {
    return (
      <>
        <p>Статистика расходов:</p>

        <ParametersForm />
        <hr />

        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="table" title="Таблица">
            <ExpenseTable />
          </Tab>

          <Tab eventKey="chart" title="График" disabled>
            <ExpenseTable />
          </Tab>
        </Tabs>
      </>
    );
  }
}
