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

type StateType = {
  isValid: boolean;
  loginValue: string;
  passwordValue: string;
};

class Login extends Component<DispatchPropsType, StateType> {
  private readonly intervalHolder: ReturnType<typeof setInterval>;

  constructor(props: Readonly<DispatchPropsType> | DispatchPropsType) {
    super(props);
    this.state = {
      isValid: false,
      loginValue: '',
      passwordValue: '',
    };

    this.intervalHolder = setInterval(() => {
      if (this.state.loginValue != '' && this.state.passwordValue != '') {
        this.setState({
          isValid: this.#isFormValid(),
        });

        clearInterval(this.intervalHolder);
      }
    }, 100);
  }

  componentWillUnmount() {
    // super.componentWillUnmount();
    clearInterval(this.intervalHolder);
  }

  #isFormValid = (): boolean => {
    return (
      this.state.loginValue !== null &&
      this.state.passwordValue !== null &&
      this.state.loginValue.length > 0 &&
      this.state.passwordValue.length > 0
    );
  };

  #registerMe = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.props.registerWithEmailAndPassword({
      email: this.state.loginValue,
      password: this.state.passwordValue,
    });
  };

  #authMe = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    this.props.loginWithEmailAndPass({
      email: this.state.loginValue,
      password: this.state.passwordValue,
    });
  };

  #onLoginChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      loginValue: event.target.value,
      isValid: this.#isFormValid(),
    });
  };
  #onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      passwordValue: event.target.value,
      isValid: this.#isFormValid(),
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
            // ref={this.#loginRef}
            type="email"
            value={this.state.loginValue}
            className="form-control"
            placeholder="Введите логин"
            required={true}
            onChange={this.#onLoginChange}
            autoComplete={'off'}
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            // ref={this.#passwordRef}
            value={this.state.passwordValue}
            onChange={this.#onPasswordChange}
            onInput={this.#onPasswordChange}
            type="password"
            required={true}
            className="form-control"
            placeholder="Введите пароль"
          />
        </div>
        <p></p>
        <div>
          <Button
            name="enter"
            type="submit"
            variant="primary"
            disabled={!this.state.isValid}
          >
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
