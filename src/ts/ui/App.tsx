import React, { Component } from 'react';
// import "./../css/bootstrap.css";
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import '../../css/index.scss';
import { Header } from './Header/Header';
import { Navigation } from './Navbar/Navigation';
import { Logo } from './Logo/Logo';
import { BrowserRouter as Router } from 'react-router-dom';
// import { MainPanel } from './Panel/MainPanel';
//import Router from './Router';
// import { Task } from './Task/Task';

// import Router from './Router';
import Routes from './Panel/Router';

type RootStateType = {};

export class App extends Component<{}, RootStateType> {
  render(): React.ReactElement {
    return (
      <Container>
        <Row>
          <Col />
          <Col>
            <Logo />
          </Col>
          <Col xl={10} />
          <Col>
            <Header />
          </Col>
        </Row>

        <Row>
          <hr />
        </Row>
        <Row>
          <Router>
            <Col xl={3}>
              <Navigation />
            </Col>
            <Col xl={7}>
              {/*<Switch>*/}
              {/*  <Switch>*/}
              {/*    <Route exact path="/" component={MainPanel} />*/}
              {/*    <Route exact path="/task" component={Task} />*/}
              {/*  </Switch>*/}
              {/*</Switch>*/}
              <Routes />
              {/*<Task />*/}
            </Col>
            <Col xl={1} />
          </Router>
        </Row>
      </Container>
    );
  }
}
