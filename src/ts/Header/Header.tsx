import React from 'react';
import { Button } from 'react-bootstrap';

export class Header extends React.Component<{}, {}> {
  render(): React.ReactElement {
    return (
      <div>
        <Button variant="outline-info">Login</Button>
      </div>
    );
  }
}
