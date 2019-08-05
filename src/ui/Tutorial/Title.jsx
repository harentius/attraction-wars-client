import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => <div>
  { children }
</div>;

Title.propTypes = {
  children: PropTypes.node,
};

Title.defaultProps = {
  children: '',
};

export default Title;
