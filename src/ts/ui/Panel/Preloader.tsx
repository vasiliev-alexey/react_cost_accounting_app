import { ReactElement } from 'react';
import React from 'react';
import { Spinner } from 'react-bootstrap';

function Preloader(): ReactElement {
  return (
    <>
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" /> <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" /> <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" /> <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" />
    </>
  );
}

export default Preloader;
