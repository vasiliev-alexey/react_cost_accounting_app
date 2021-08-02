import React, { ReactElement } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { DayModifiers } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import DropdownTreeSelect, { TreeNode } from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import NumberFormat from 'react-number-format';

const WEEKDAYS_SHORT = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};
const MONTHS = {
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
};

const WEEKDAYS_LONG = {
  ru: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
};

const FIRST_DAY_OF_WEEK = {
  ru: 1,
  it: 1,
};
// Translate aria-labels
const LABELS = {
  ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' },
};

export type CostsPropsType = {
  expenseName: string;
  expenseDate: Date;
  amount: number;
  categoryId: string;
};
export class Costs extends React.Component<CostsPropsType, {}> {
  private handleDayChange = (
    day: Date,
    dayModifiers: DayModifiers,
    dayPickerInput: DayPickerInput
  ): void => {
    console.log(day, dayModifiers, dayPickerInput);
  };

  private onChangeSelect = (
    currentNode: TreeNode,
    selectedNodes: TreeNode[]
  ): void => {
    console.log('onChangeSelect', currentNode, selectedNodes);
  };

  private data = {
    label: 'Транспорт',
    value: 'asdasd',
    data: '1111',
    children: [
      {
        label: 'Метро',
        value: 'Метро',
      },
      {
        label: 'Автобус',
        value: 'Автобус',
      },
    ],
  };

  render(): ReactElement {
    return (
      <Form>
        {/*<Row>*/}
        {/*  <Form.Label column="sm" sm={1}>*/}
        {/*    Large Text*/}
        {/*  </Form.Label>*/}
        {/*  <Col>*/}
        {/*    <Form.Control size="lg" type="text" placeholder="Large text" />*/}
        {/*  </Col>*/}
        {/*</Row>*/}

        <Row className="mb-2">
          {/*<Form.Group className="mb-3" controlId="formName">*/}

          <Form.Label column={'sm'} sm={2}>
            Наименование
          </Form.Label>

          <Col>
            <Form.Control
              type="text"
              placeholder="Введите наименование расхода"
              value={this.props.expenseName}
            />
          </Col>
          {/*<Form.Text className="text-muted">*/}
          {/*  На что-то же вы потратили деньги*/}
          {/*</Form.Text>*/}
        </Row>
        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Дата расхода
          </Form.Label>
          <Col>
            <DayPickerInput
              onDayChange={this.handleDayChange}
              placeholder={'Дата расходов'}
              format={'MM.DD.YYYY'}
              value={this.props.expenseDate}
              formatDate={MomentLocaleUtils.formatDate}
              parseDate={MomentLocaleUtils.parseDate}
              dayPickerProps={{
                locale: 'ru',
                months: MONTHS['ru'],
                weekdaysLong: WEEKDAYS_LONG['ru'],
                weekdaysShort: WEEKDAYS_SHORT['ru'],
                firstDayOfWeek: FIRST_DAY_OF_WEEK['ru'],
                labels: LABELS['ru'],
              }}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Сумма расхода
          </Form.Label>
          {/*<Form.Control type="number" placeholder="Введите сумму расхода" />*/}
          <Col sm={10}>
            <NumberFormat
              value={this.props.amount}
              thousandSeparator={' '}
            ></NumberFormat>
          </Col>
        </Row>

        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Категория
          </Form.Label>
          <Col sm={10}>
            <DropdownTreeSelect
              texts={{ placeholder: 'выбери категорию' }}
              data={this.data}
              onChange={this.onChangeSelect}
              mode="radioSelect"
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </Form>
    );
  }
}
