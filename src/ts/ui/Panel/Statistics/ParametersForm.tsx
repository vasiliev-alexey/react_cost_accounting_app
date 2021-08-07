import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DateSelector from './DateSelector';

type ParametersFormStateType = {
  beginDate: Date;
  endDate: Date;
};

class ParametersForm extends Component<{}, ParametersFormStateType> {
  constructor(props: Readonly<{}> | {}) {
    super(props);

    this.state = {
      beginDate: new Date(Date.now()),
      endDate: null,
    };
  }

  #onStartDateChange = (day: Date): void => {
    this.setState({ beginDate: day });
  };
  #onEndDateChange = (day: Date): void => {
    this.setState({ endDate: day });
  };

  render(): React.ReactNode {
    return (
      <>
        <p>Параметры для отображения:</p>
        <Form onSubmit={this.#getExpense}>
          <Row>
            <DateSelector
              initialDate={new Date(Date.now())}
              placeholder="Дата С"
              onDayChange={this.#onStartDateChange}
            />

            <DateSelector
              initialDate={null}
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

  #getExpense = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('event', event);
  };
}

export default ParametersForm;
