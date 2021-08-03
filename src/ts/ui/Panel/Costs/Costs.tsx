import React, { ReactElement } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// import { DayModifiers } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import DropdownTreeSelect, { TreeNode } from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import NumberFormat from 'react-number-format';
import { dayPickerProps } from './constants';

interface CostsStateType {
  expenseName?: string;
  expenseDate?: Date;
  amount?: number;
  categoryId?: CategoryTuple;
  data: {};
  show: boolean;
}

interface CategoryTuple {
  id: string;
  value: string;
}

export class Costs extends React.Component<{}, CostsStateType> {
  constructor(props: Readonly<{}> | {}) {
    super(props);

    this.state = {
      expenseName: '',
      expenseDate: new Date(),
      amount: 0,
      categoryId: { id: '', value: '' },
      show: false,
      data: {
        label: 'Транспорт',
        value: 'asdasd',
        data: '1111',
        children: [
          {
            label: 'Метро',
            value: 'Метро',
            data: '2222',
          },
          {
            label: 'Автобус',
            value: 'Автобус',
            data: '3333',
          },
        ],
      },
    };
  }

  #selectedCategory: CategoryTuple;

  // shouldComponentUpdate = (nextProps: unknown) => {
  //   // return nextProps.data !== this.state.data;
  // };

  #onChangeAmount = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ amount: parseFloat(evt.currentTarget.value) });
  };

  #handleDayChange = (day: Date): void => {
    this.setState({ expenseDate: day });
  };

  #onChangeSelect = (
    currentNode: TreeNode
    // selectedNodes: TreeNode[]
  ): void => {
    //  this.setState({ categoryId: currentNode.data });
    this.#selectedCategory = { id: currentNode.data, value: currentNode.value };
    console.log(this.state, 'currentNode.data:', currentNode.data);
    console.log('currentNode', currentNode);
  };

  #onNameChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ expenseName: evt.currentTarget.value });
  };

  private data = {
    label: 'Транспорт',
    value: 'asdasd',
    data: '1111',
    children: [
      {
        label: 'Метро',
        value: 'Метро',
        data: '1111',
      },
      {
        label: 'Автобус',
        value: 'Автобус',
        data: '1111',
      },
    ],
  };

  render(): ReactElement {
    console.log('render:', this.state);

    return (
      <Form>
        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Наименование
          </Form.Label>

          <Col>
            <Form.Control
              type="text"
              placeholder="Введите наименование расхода"
              value={this.state.expenseName}
              onChange={this.#onNameChange}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Дата расхода
          </Form.Label>
          <Col>
            <DayPickerInput
              onDayChange={this.#handleDayChange}
              placeholder={'Дата расходов'}
              format={'DD.MM.YYYY'}
              value={this.state.expenseDate}
              formatDate={MomentLocaleUtils.formatDate}
              parseDate={MomentLocaleUtils.parseDate}
              dayPickerProps={dayPickerProps}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Сумма расхода
          </Form.Label>
          <Col sm={10}>
            <NumberFormat
              value={this.state.amount}
              // thousandSeparator={' '}
              onChange={this.#onChangeAmount}
            ></NumberFormat>
          </Col>
        </Row>

        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Категория
          </Form.Label>

          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder=""
              value={this.state.categoryId.value}
              readOnly={true}
            />
          </Col>
          {/*<DropdownTreeSelect*/}
          {/*  texts={{ placeholder: 'выбери категорию' }}*/}
          {/*  data={this.state.data}*/}
          {/*  onChange={this.#onChangeSelect}*/}
          {/*  mode="radioSelect"*/}
          {/*/>*/}
          <Col>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ show: true });
              }}
            >
              Выбрать категорию
            </Button>
          </Col>
        </Row>

        <Modal
          centered={true}
          show={this.state.show}
          onHide={() => {
            this.setState({ show: false });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DropdownTreeSelect
              texts={{ placeholder: 'выбери категорию' }}
              data={this.state.data}
              onChange={this.#onChangeSelect}
              mode="radioSelect"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ show: false });
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({
                  categoryId: this.#selectedCategory,
                  show: false,
                });
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </Form>
    );
  }
}
