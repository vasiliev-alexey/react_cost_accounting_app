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
};
class ParametersForm extends Component<PropsType, ParametersFormStateType> {
  constructor(props: Readonly<PropsType>) {
    super(props);

    this.state = {
      beginDate: new Date(Date.now()),
      endDate: null,
    };
  }

  #onStartDateChange = (day: Date): void => {
    this.setState({ beginDate: new Date(day.setHours(0, 0, 0, 0)) });
  };
  #onEndDateChange = (day: Date): void => {
    this.setState({ endDate: new Date(day.setHours(0, 0, 0, 0)) });
  };

  render(): React.ReactNode {
    return (
      <>
        <p>Параметры для отображения:</p>
        <Form onSubmit={this.#getExpense}>
          <Row>
            <DateSelector
              initialDate={this.state.beginDate}
              placeholder="Дата С"
              onDayChange={this.#onStartDateChange}
            />

            <DateSelector
              initialDate={this.state.endDate}
              placeholder="Дата По"
              onDayChange={this.#onEndDateChange}
            />

            <Col>
              <Button variant="primary" type="submit">
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
      beginDate: this.state.beginDate,
      endDate: this.state.endDate,
    });
  };
}

export default ParametersForm;
