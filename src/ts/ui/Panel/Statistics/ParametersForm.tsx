import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DateSelector from './DateSelector';
import { RequestParam } from './types';

type ParametersFormStateType = {
  beginDate: Date;
  endDate: Date;
};

type PropsType = {
  requestUserExpenseStats: (params: RequestParam) => Promise<void>;
  userId: string;
  beginDate: Date;
  endDate: Date;
  onStartDateChange: (day: Date) => void;
  onEndDateChange: (day: Date) => void;
};
class ParametersForm extends Component<PropsType, ParametersFormStateType> {
  render(): React.ReactNode {
    return (
      <>
        <p>Параметры для отображения:</p>
        <Form data-testid={'form-param'} onSubmit={this.#getExpense}>
          <Row>
            <DateSelector
              initialDate={this.props.beginDate}
              placeholder="Дата С"
              onDayChange={this.props.onStartDateChange}
            />

            <DateSelector
              initialDate={this.props.endDate}
              placeholder="Дата По"
              onDayChange={this.props.onEndDateChange}
            />

            <Col>
              <Button
                data-testid={'form-btn-param'}
                variant="primary"
                type="submit"
              >
                Посчитать
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }

  #getExpense = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await this.props.requestUserExpenseStats({
      userId: this.props.userId,
      beginDate: this.props.beginDate,
      endDate: this.props.endDate,
    });
  };
}

export default ParametersForm;
