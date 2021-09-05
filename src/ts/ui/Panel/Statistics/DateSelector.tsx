import React from 'react';
import { Col, Form } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';
import { dayPickerProps } from '../Costs/constants';

type PropsType = {
  placeholder: string;
  onDayChange: (day: Date) => void;
  initialDate: Date | null;
};

class DateSelector extends React.Component<PropsType, {}> {
  render(): React.ReactElement {
    return (
      <>
        <Col>
          <Form.Label column={'sm'} sm={3}>
            {this.props.placeholder}
          </Form.Label>
        </Col>

        <Col>
          <DayPickerInput
            onDayChange={this.props.onDayChange}
            placeholder={this.props.placeholder}
            format={'DD.MM.YYYY'}
            value={this.props.initialDate}
            formatDate={MomentLocaleUtils.formatDate}
            parseDate={MomentLocaleUtils.parseDate}
            dayPickerProps={dayPickerProps}
          />
        </Col>
      </>
    );
  }
}

export default DateSelector;
