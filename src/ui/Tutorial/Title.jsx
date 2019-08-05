import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => <h2>
  { children }
</h2>;

Title.propTypes = {
  children: PropTypes.node,
};

Title.defaultProps = {
  children: '',
};

export default Title;
