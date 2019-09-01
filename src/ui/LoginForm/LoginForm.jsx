import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.scss';
import Widget from '../Widget/Widget.jsx';
import PlanetsOverlay from './PlanetsOverlay/PlanetsOverlay.jsx';
import Feedback from '../Feedback/Feedback.jsx';

const getBoolValFromStorage = (key, defaultValue = true) => (
  window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : defaultValue
);

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: window.localStorage.getItem('nickname') || '',
      showTutorial: getBoolValFromStorage('showTutorial'),
      useWebGLRenderer: getBoolValFromStorage('useWebGLRenderer'),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeShowTutorial = this.onChangeShowTutorial.bind(this);
    this.onUseWebGLRenderer = this.onUseWebGLRenderer.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem('nickname', this.state.name);
    window.localStorage.setItem('showTutorial', this.state.showTutorial);
    window.localStorage.setItem('useWebGLRenderer', this.state.useWebGLRenderer);
    this.props.onSubmit(this.state);
  }

  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onChangeShowTutorial(event) {
    this.setState({ showTutorial: event.target.checked });
  }

  onUseWebGLRenderer(event) {
    this.setState({ useWebGLRenderer: event.target.checked });
  }

  render() {
    return (
      <div className="form-wrapper">
        <PlanetsOverlay />
        <div className="widget-bg" />
        <Widget className="login-widget" title="Attraction Wars">
          <form onSubmit={this.handleSubmit} className="login-form">
            <label className="name-wrapper">
              <input
                type="text"
                value={this.state.name}
                onChange={this.onChangeName}
                className={`name-input ${this.state.name ? 'valid' : ''}`}
                maxLength="18"
                spellCheck="false"
              />
              <div className="name-label">Name</div>
            </label>

            <button
              type="submit"
              className="login-form-button"
              disabled={!this.state.name.length}
            >
              Start
            </button>

            <label className="confirm-wrapper">
              <input
                type="checkbox"
                className="confirm-checkbox"
                checked={this.state.showTutorial}
                onChange={this.onChangeShowTutorial}
              />
              <div className="confirm-label">Show Tutorial</div>
            </label>

            <label className="confirm-wrapper">
              <input
                type="checkbox"
                className="confirm-checkbox"
                checked={this.state.useWebGLRenderer}
                onChange={this.onUseWebGLRenderer}
              />
              <div className="confirm-label">Use WebGL</div>
            </label>
            <Feedback />
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
