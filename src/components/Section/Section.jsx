import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './Section.styled';
import Header from '../Header/Header';

const Section = ({ title, children }) => {
  return (
    <Container>
      <Header title={title} />
      {children}
    </Container>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};