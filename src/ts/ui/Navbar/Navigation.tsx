import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Navigation extends React.Component<{}, {}> {
  render(): React.ReactElement {
    return (
      <Nav
        data-testid={'Navigation-Test-Id'}
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
          <LinkContainer to="/statistics">
            <Nav.Link>Просмотр статистики</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to="/task">
            <Nav.Link>Просмотр Задания</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/taskList">
            <Nav.Link>Задачи</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    );
  }
}
