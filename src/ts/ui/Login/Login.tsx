import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store/store';
import { loginWithEmailAndPassword } from '../../store/authSlice';
import { ThunkProps } from '../utils';
import { Redirect } from 'react-router-dom';

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchThunkToProps>;

class Login extends Component<DispatchPropsType> {
  #loginRef = React.createRef<HTMLInputElement>();
  #passwordRef = React.createRef<HTMLInputElement>();

  #authMe = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('sssss');
    console.log(
      'loginRef',
      this.#loginRef.current.value,
      'passwordRef',
      this.#passwordRef.current.value
    );

    this.props.loginWithEmailAndPass({
      email: this.#loginRef.current.value,
      password: this.#passwordRef.current.value,
    });
  };

  render(): React.ReactElement {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.#authMe}>
        <h3>Вход</h3>

        <div className="form-group">
          <label>Логин</label>
          <input
            ref={this.#loginRef}
            type="email"
            className="form-control"
            placeholder="Введите логин"
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            ref={this.#passwordRef}
            type="password"
            className="form-control"
            placeholder="Введите пароль"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Вход
        </button>
      </form>
    );
  }
}

const mapDispatchThunkToProps = {
  loginWithEmailAndPass: loginWithEmailAndPassword,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  ...mapDispatchThunkToProps,
})(Login);
