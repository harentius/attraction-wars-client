import React from 'react';
import PropTypes from 'prop-types';
import './Title.scss';

const Title = ({ children }) => (
  <h2 className="title">
    { children }
  </h2>
);

Title.propTypes = {
  children: PropTypes.node,
};

Title.defaultProps = {
  children: '',
};

export default Title;
