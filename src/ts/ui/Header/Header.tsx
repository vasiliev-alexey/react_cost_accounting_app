import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

class Header extends React.Component<RouteComponentProps, {}> {
  #login = () => {
    this.props.history.push('/sign-in');
  };

  render(): React.ReactElement {
    return (
      <div>
        <Button
          data-testid={'HeaderLoginButton'}
          variant="outline-info"
          onClick={this.#login}
        >
          Login
        </Button>
      </div>
    );
  }
}

export default withRouter(Header);
