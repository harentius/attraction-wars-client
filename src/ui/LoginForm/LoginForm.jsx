import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.scss';
import Client from '../../client/client';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    this.props.client.login(this.state.name);
    event.preventDefault();
  }

  onChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.onChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

LoginForm.propTypes = {
  client: PropTypes.instanceOf(Client),
};

export default LoginForm;
