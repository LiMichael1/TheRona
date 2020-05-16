import React from 'react';

import Container from 'components/Container';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
let fullDate = mm + '/' + dd + '/' + yyyy

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>Live COVID-19 Tracker, { fullDate }</p>
      </Container>
    </footer>
  );
};

export default Footer;