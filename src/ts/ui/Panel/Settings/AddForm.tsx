import React, { ChangeEvent, Component, ReactElement } from 'react';

interface AddFormProps {
  title: string;
  subtitle?: string;
  onChangeInput: (evt: ChangeEvent) => void;
}

class AddForm extends Component<AddFormProps, {}> {
  override render(): ReactElement {
    return (
      <div>
        <input
          onChange={this.props.onChangeInput}
          type="text"
          value={this.props.title}
          placeholder={'title'}
        />
        <input
          onChange={this.props.onChangeInput}
          type="text"
          value={this.props.subtitle}
          placeholder={'subtitle'}
        />
      </div>
    );
  }
}

export default AddForm;
