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
    event.preventDefault();
    this.props.client.login(this.state.name);
  }

  onChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="form-wrapper">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label>
            Nickname:
            <input type="text" value={this.state.name} onChange={this.onChange}/>
          </label>
          <input className="btn btn-success" type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  client: PropTypes.instanceOf(Client),
};

export default LoginForm;
