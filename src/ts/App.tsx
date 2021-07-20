import React, { Component } from 'react';
import { Header } from './Header/Header';
// import "./../css/bootstrap.css";
import 'bootswatch/dist/cosmo/bootstrap.min.css';

type RootStateType = {};

export class App extends Component<{}, RootStateType> {
  render(): React.ReactElement {
    return <Header />;
  }
}
