import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget/Widget.jsx';
import Page1 from './Page/1.jsx';
import './Tutorial.scss';

const pages = [Page1];

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  updatePage(number) {
    this.setState((state) => (
      { page: state.page + number }
    ));
  }

  render() {
    const Page = pages[this.state.page - 1];

    return <div className="tutorial">
      <Widget title="Game Tutorial">
        <Page />
        { this.state.page > 1 &&
          <button onClick={() => this.updatePage(-1)}>Previous</button>
        }

        <button onClick={this.props.onStartGame}>Start Game</button>

        { this.state.page < pages.length &&
          <button onClick={() => this.updatePage(1)}>Next</button>
        }
      </Widget>
    </div>;
  }
}

Tutorial.propTypes = {
  onStartGame: PropTypes.func,
};

Tutorial.defaultProps = {
  onStartGame: () => {},
};

export default Tutorial;
