import React, { ReactElement } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';

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
import { Converter } from '../../utils/converter';

interface CostsStateType {
  expenseName?: string;
  expenseDate?: number;
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
      expenseDate: Converter.date2Unix(
        new Date(new Date(Date.now()).setHours(0, 0, 0, 0))
      ),

      amount: 0,
      categoryId: { id: '', value: '' },
      show: false,
      treeData: [...props.treeData],
    };
  }

  #isValidCost(): boolean {
    return (
      this.state.amount > 0 &&
      this.state.expenseName !== '' &&
      this.state.expenseDate !== null &&
      this.state.categoryId.id !== ''
    );
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
    this.setState({ expenseDate: Converter.date2Unix(day) });
  };

  #onNameChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ expenseName: evt.currentTarget.value });
  };

  render(): ReactElement {
    return (
      <Form onSubmit={this.#saveExpense}>
        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            ????????????????????????
          </Form.Label>

          <Col>
            <Form.Control
              type="text"
              required
              placeholder="?????????????? ???????????????????????? ??????????????"
              value={this.state.expenseName}
              onChange={this.#onNameChange}
              readOnly={this.props.isCostSaved}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            ???????? ??????????????
          </Form.Label>
          <Col>
            <DayPickerInput
              onDayChange={this.#handleDayChange}
              placeholder={'???????? ????????????????'}
              format={'DD.MM.YYYY'}
              value={Converter.unix2Date(this.state.expenseDate)}
              formatDate={MomentLocaleUtils.formatDate}
              parseDate={MomentLocaleUtils.parseDate}
              dayPickerProps={dayPickerProps}
              inputProps={{ disabled: this.props.isCostSaved }}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            ?????????? ??????????????
          </Form.Label>
          <Col sm={10}>
            <NumberFormat
              value={this.state.amount}
              onChange={this.#onChangeAmount}
              readOnly={this.props.isCostSaved}
              disabled={this.props.isCostSaved}
            ></NumberFormat>
          </Col>
        </Row>

        <Row className="mb-2">
          <Form.Label column={'sm'} sm={2}>
            ??????????????????
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
              data-testid="button-show-modal-id"
              onClick={() => {
                this.setState({ show: true });
              }}
              disabled={this.props.isCostSaved}
            >
              ?????????????? ??????????????????
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
            <Modal.Title>?????????? ??????????????????</Modal.Title>
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
                  path: rowInfo.path,
                  getNodeKey: ({ node: { id } }) => id,
                  ignoreCollapsed: true,
                });

                this.#selectedCategory = {
                  id: node.node.id,
                  value: node.node.title.toString(),
                };
              }}
              // eslint-disable-next-line  @typescript-eslint/no-empty-function
              onNodeClick={() => {}}
              buttonText="&#9734;"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ show: false });
              }}
            >
              ????????????
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
              ??????????????
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          variant={this.props.isCostSaved ? 'light' : 'primary'}
          type="submit"
          disabled={!this.#isValidCost()}
        >
          {this.props.isCostSaved ? '??????????????????' : '??????????????????'}
        </Button>
      </Form>
    );
  }
}
