import React, { Component } from 'react';
import { ExpenseType } from '../../../types/domain';
import { Table } from 'react-bootstrap';
import { Converter } from '../../utils/converter';

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
    const childRows: React.ReactElement[] = expenseList.map((exp) => {
      return (
        <tr key={exp.expenseId}>
          <td>3</td>
          <td>{exp.categoryName}</td>
          <td>{exp.amount}</td>
          <td>
            {Converter.unix2Date(exp.expenseDate).toLocaleDateString('Ru')}
          </td>
        </tr>
      );
    });

    return (
      <Table striped bordered hover>
        <thead>
          <tr key={'h-row'}>
            <th>#</th>
            <th>Категория</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>{childRows}</tbody>
      </Table>
    );
  }
}

export default ExpenseTable;
