import React, { ReactElement } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils from 'react-day-picker/moment';

import NumberFormat from 'react-number-format';
import { dayPickerProps } from './constants';
import { Tree } from '../Settings/Tree';
import {
  ExtendedNodeData,
  getNodeAtPath,
  TreeItem,
  TreeNode,
} from 'react-sortable-tree';
import { ExpenseType } from '../../../types/domain';

interface CostsStateType {
  expenseName?: string;
  expenseDate?: Date;
  amount?: number;
  categoryId?: CategoryTuple;
  show: boolean;
  treeData: TreeItem[];
}

interface CategoryTuple {
  id: string;
  value: string;
}

interface propsType {
  treeData: TreeItem[];
  isCostSaved: boolean;
  userId: string;
  saveUserExpense: (arg: { userId: string; expense: ExpenseType }) => void;
}

export class Costs extends React.Component<propsType, CostsStateType> {
  constructor(props: Readonly<propsType>) {
    super(props);

    this.state = {
      expenseName: '',
      expenseDate: new Date(),
      amount: 0,
      categoryId: { id: '', value: '' },
      show: false,
      treeData: [...props.treeData],
    };
  }

  #selectedCategory: CategoryTuple;

  #onChangeAmount = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ amount: parseFloat(evt.currentTarget.value) });
  };

  #saveExpense = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.saveUserExpense({
      userId: this.props.userId,
      expense: {
        categoryId: this.state.categoryId.id,
        description: this.state.expenseName,
        expenseDate: this.state.expenseDate,
        amount: this.state.amount,
      },
    });
  };

  #handleDayChange = (day: Date): void => {
    this.setState({ expenseDate: day });
  };

  #onChangeSelect = (
    currentNode: TreeItem
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

  render(): ReactElement {
    console.log('render:', this.state);

    return (
      <Form onSubmit={this.#saveExpense}>
        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            Наименование
          </Form.Label>

          <Col>
            <Form.Control
              type="text"
              required
              placeholder="Введите наименование расхода"
              value={this.state.expenseName}
              onChange={this.#onNameChange}
              readOnly={this.props.isCostSaved}
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
              inputProps={{ disabled: this.props.isCostSaved }}
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
              readOnly={this.props.isCostSaved}
              disabled={this.props.isCostSaved}
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

          <Col>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ show: true });
              }}
              disabled={this.props.isCostSaved}
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
          <Modal.Header>
            <Modal.Title>Выбор категории</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tree
              treeData={this.state.treeData}
              onChange={(treeData: TreeItem[]) => {
                this.setState({ treeData });
              }}
              removeNode={(rowInfo: ExtendedNodeData) => {
                const node: TreeNode = getNodeAtPath({
                  treeData: this.state.treeData,
                  path: rowInfo.path, // You can use path from here
                  getNodeKey: ({ node: { id } }) => id,
                  ignoreCollapsed: true,
                });

                // this.setState({
                //   categoryId: {
                //     id: node.node.id,
                //     value: node.node.title.toString(),
                //   },
                // });

                this.#selectedCategory = {
                  id: node.node.id,
                  value: node.node.title.toString(),
                };

                console.log('node', node.node.id);
              }}
              onNodeClick={() => {
                console.log(1);
              }}
              buttonText="&#9734;"
              // onChange={this.onChange}
              // removeNode={this.removeNode}
              // onNodeClick={this.onNodeClick}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ show: false });
              }}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  categoryId: this.#selectedCategory,
                  show: false,
                });
              }}
            >
              Выбрать
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          variant={this.props.isCostSaved ? 'light' : 'primary'}
          type="submit"
        >
          {this.props.isCostSaved ? 'Сохранено' : 'Сохранить'}
        </Button>
      </Form>
    );
  }
}
