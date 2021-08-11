import React, { Component, ReactElement } from 'react';

interface AddFormProps {
  title: string;
  subtitle?: string;
  onChangeInput: (evt: React.FormEvent<HTMLInputElement>) => void;
}

class AddForm extends Component<AddFormProps, {}> {
  override render(): ReactElement {
    const { title, subtitle, onChangeInput } = this.props;
    return (
      <div>
        <hr />
        <p>
          <input
            onChange={onChangeInput}
            type="text"
            value={title}
            name="title"
            placeholder={'Имя'}
          />
          <input
            onChange={onChangeInput}
            type="text"
            value={subtitle}
            name="desc"
            placeholder={'Описание'}
          />
        </p>
      </div>
    );
  }
}

export default AddForm;
