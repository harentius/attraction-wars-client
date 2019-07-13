import React from 'react';
import PropTypes from 'prop-types';
import './Widget.scss';

class Widget extends React.Component {
  render() {
    const { title, children, className } = this.props;
    return (
      <div className={`widget ${className}`}>
        <h4 className="widget-title">{title}</h4>
        <div className="widget-content">
          {children}
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};

Widget.defaultProps = {
  title: '',
  className: '',
  children: '',
};

export default Widget;
