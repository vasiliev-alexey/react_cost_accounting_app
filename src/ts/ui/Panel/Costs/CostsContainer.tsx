import React, { Component, ReactElement } from 'react';
import { Costs } from './Costs';

class CostsContainer extends Component<{}, {}> {
  render(): ReactElement {
    return (
      <>
        <Costs />
      </>
    );
  }
}

export default CostsContainer;
