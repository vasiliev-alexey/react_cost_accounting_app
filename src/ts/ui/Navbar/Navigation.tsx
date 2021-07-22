import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Navigation extends React.Component<{}, {}> {
  render(): React.ReactElement {
    return (
      <Nav
        style={{ width: '20%' }}
        justify
        variant="pills"
        className="flex-column"
      >
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link>О проекте</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/settings">
            <Nav.Link>Настройка</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/costs">
            <Nav.Link>Ввод расходов</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          {/*<Nav.Link eventKey="1" href="/task/1">*/}
          {/*  Просмотр статистики*/}
          {/*</Nav.Link>*/}

          <LinkContainer to="/statistics">
            <Nav.Link>Просмотр статистики</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          {/*<Nav.Link as={Link} to="/task" eventKey="category" title="Category">*/}
          {/*    Просмотр Задания*/}
          {/*</Nav.Link>*/}

          <LinkContainer to="/task">
            <Nav.Link>Просмотр Задания</Nav.Link>
          </LinkContainer>

          {/*<Nav.Link eventKey="1" href="/task">*/}
          {/*  Просмотр Задания*/}
          {/*</Nav.Link>*/}
        </Nav.Item>
      </Nav>
    );
  }
}
