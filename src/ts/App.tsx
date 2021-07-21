import React, { Component } from 'react';
// import "./../css/bootstrap.css";
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './../css/index.scss';
import { Header } from './Header/Header';
import { Navigation } from './Navbar/Navigation';

type RootStateType = {};

export class App extends Component<{}, RootStateType> {
  render(): React.ReactElement {
    return (
      <>
        <Container>
          <Row>
            <Col>1 of 3</Col>
            <Col xs={10}></Col>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col>
              <Navigation />
            </Col>
            <Col xs={5}>Main View Component</Col>
          </Row>
        </Container>
      </>
    );
  }
}
