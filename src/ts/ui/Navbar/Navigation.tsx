import React from 'react';
import { Nav } from 'react-bootstrap';

export class Navigation extends React.Component<{}, {}> {
  render(): React.ReactElement {
    return (
      <Nav
        style={{ width: '20%' }}
        justify
        variant="pills"
        activeKey="1"
        className="flex-column"
      >
        <Nav.Item>
          <Nav.Link eventKey="1" href="/#home">
            о проекте
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="1" href="#/home1">
            настройка
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="1" href="#/home2">
            Ввод расходов
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="1" href="#/home3">
            Просмотр статистики
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="1" href="#/tz">
            Просмотр Задания
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
