import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store/store';
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from '../../store/authSlice';
import { ThunkProps } from '../utils';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchThunkToProps>;

class Login extends Component<DispatchPropsType> {
  #loginRef = React.createRef<HTMLInputElement>();
  #passwordRef = React.createRef<HTMLInputElement>();

  #registerMe = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('ee:', event);
    console.log(
      'loginRef',
      this.#loginRef.current.value,
      'passwordRef',
      this.#passwordRef.current.value
    );

    this.props.registerWithEmailAndPassword({
      email: this.#loginRef.current.value,
      password: this.#passwordRef.current.value,
    });
  };

  #authMe = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    console.log('event.currentTarget.name=', event.target);
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
        <p></p>
        <div>
          <Button name="enter" type="submit" variant="primary">
            Вход
          </Button>
          {'   '}
          <Button
            name="register"
            type="button"
            variant="info"
            onClick={this.#registerMe}
          >
            Регистрация
          </Button>
        </div>
      </form>
    );
  }
}

const mapDispatchThunkToProps = {
  loginWithEmailAndPass: loginWithEmailAndPassword,
  registerWithEmailAndPassword: registerWithEmailAndPassword,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  ...mapDispatchThunkToProps,
})(Login);
