import React, { Component } from 'react';
import { ExpenseType } from '../../../types/domain';
import Chart from 'react-google-charts';

class ExpenseChart extends Component<
  { expenseList: ExpenseType[]; beginDate: Date; endDate: Date },
  {}
> {
  render(): React.ReactNode {
    const { expenseList, beginDate, endDate } = this.props;

    const catSums = new Map<string, number>();

    expenseList.map((e) => {
      catSums.set(
        e.categoryName,
        (catSums.get(e.categoryName) || 0) + e.amount
      );
    });

    console.log([...catSums]);

    return (
      <Chart
        width={'800px'}
        height={'600px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Категория', 'Сумма'], ...catSums]}
        options={{
          legend: 'none',
          pieSliceText: 'label',
          title: `График затрат по категориям  ${beginDate.toLocaleDateString(
            'Ru'
          )}  по ${endDate.toLocaleDateString('Ru')}`,
          pieStartAngle: 100,
        }}
        rootProps={{ 'data-testid': '4' }}
      />
    );
  }
}

export default ExpenseChart;
