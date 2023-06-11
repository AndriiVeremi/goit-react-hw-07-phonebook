import React from 'react';
import PropTypes from 'prop-types';
import { Title } from './Header.styled';

const Header = ({ title }) => {
  return <Title>{title}</Title>;
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};


