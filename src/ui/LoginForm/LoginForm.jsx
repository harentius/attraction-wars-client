import React from 'react';
import PropTypes from 'prop-types';
import '../Widget/Widget.scss';
import './LoginForm.scss';
import Widget from '../Widget/Widget.jsx';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: window.localStorage.getItem('nickname') || '',
      showTutorial: window.localStorage.getItem('showTutorial')
        ? JSON.parse(window.localStorage.getItem('showTutorial'))
        : true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeShowTutorial = this.onChangeShowTutorial.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem('nickname', this.state.name);
    window.localStorage.setItem('showTutorial', this.state.showTutorial);
    this.props.onSubmit(this.state);
  }

  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onChangeShowTutorial(event) {
    this.setState({ showTutorial: event.target.checked });
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
                onChange={this.onChangeName}
                className={`login-form-input ${this.state.name ? 'valid' : ''}`}
                maxLength="18"
              />
              <div className="login-form-label">Name</div>
            </label>

            <label className="confirm-label">
              <input
                type="checkbox"
                checked={this.state.showTutorial}
                onChange={this.onChangeShowTutorial}
              />
              <div className="login-form-label">Show Tutorial</div>
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
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: () => {},
};

export default LoginForm;
