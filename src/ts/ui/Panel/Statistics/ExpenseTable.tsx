import React, { Component } from 'react';
import { ExpenseType } from '../../../types/domain';
import { Table } from 'react-bootstrap';

interface ExpenseDto extends ExpenseType {
  categoryName: string;
}

type ExpenseTableStateType = {
  expenses: ExpenseDto[];
};

class ExpenseTable extends Component<
  { expenseList: ExpenseType[] },
  ExpenseTableStateType
> {
  render(): React.ReactNode {
    const { expenseList } = this.props;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Категория</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((exp) => {
            return (
              <tr key={exp.categoryId + exp.expenseDate.toISOString()}>
                <td>3</td>
                <td>{exp.categoryId}</td>
                <td>{exp.amount}</td>
                <td>{exp.expenseDate.toLocaleDateString()}</td>
              </tr>
            );
          })}

          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default ExpenseTable;
