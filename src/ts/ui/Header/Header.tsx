import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';

class Header extends React.Component<
  RouteComponentProps & ReturnType<typeof mapStateToProps>,
  {}
> {
  #login = () => {
    this.props.history.push('/sign-in');
  };

  render(): React.ReactElement {
    return (
      <div>
        <p>{this.props.userName}</p>
        {!this.props.isAuthenticated && (
          <Button
            data-testid={'HeaderLoginButton'}
            variant="outline-info"
            onClick={this.#login}
          >
            Login
          </Button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  userName: state.auth.userName,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(withRouter(Header));
