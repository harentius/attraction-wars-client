import React from 'react';
import PropTypes from 'prop-types';
import '../Widget/Widget.scss';
import './LoginForm.scss';
import Client from '../../client/Client';
import Widget from '../Widget/Widget.jsx';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: window.localStorage.getItem('nickname') || '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem('nickname', this.state.name);
    this.props.client.login(this.state.name);
  }

  onChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Widget className="login-widget" title="Attraction Wars">
          <form onSubmit={this.handleSubmit} className="login-form">
            <label>
              <input
                type="text"
                value={this.state.name}
                onChange={this.onChange}
                className={`login-form-input ${this.state.name ? 'valid' : ''}`}
                maxLength="18"
              />
              <div className="login-form-label">Name</div>
            </label>
            <button
              type="submit"
              className="login-form-button"
              disabled={!this.state.name.length}
            >
              Start
            </button>
          </form>
        </Widget>
      </div>
    );
  }
}

LoginForm.propTypes = {
  client: PropTypes.instanceOf(Client),
};

export default LoginForm;
