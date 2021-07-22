import React from 'react';
import imgCost from '../../../img/cost.png';

export class Logo extends React.Component<{}, {}> {
  render(): React.ReactElement {
    return (
      <div data-testid={'HeaderLogoImg'}>
        <img alt="logo image" src={String(imgCost)} style={{ width: 50 }} />
      </div>
    );
  }
}
