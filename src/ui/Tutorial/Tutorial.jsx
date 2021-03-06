import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget/Widget.jsx';
import Page1 from './Page/Page1/Page1.jsx';
import Page2 from './Page/Page2/Page2.jsx';
import Page3 from './Page/Page3/Page3.jsx';
import './Tutorial.scss';

const pages = [Page1, Page2, Page3];

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

  setPage(page) {
    this.setState({ page });
  }

  render() {
    const Page = pages[this.state.page - 1];

    return (
      <div className="tutorial">
        <Widget title="Game Tutorial" className="tutorial-widget">
          <Page />

          <div className="tutorial-footer">
            <div className="page-indicators">
              {pages.length > 1 && pages.map((page, index) => (
                <span
                  key={index}
                  className={`page-indicator ${index === this.state.page - 1 ? 'page-indicator-active' : ''}`}
                  onClick={() => this.setPage(index + 1)}
                />
              ))}
            </div>

            <div className="buttons">
              { this.state.page > 1 &&
                <button className="button button-prev" onClick={() => this.updatePage(-1)}>Previous</button>
              }

              <button className="button-submit" onClick={this.props.onStartGame}>
                Start Game
              </button>

              { this.state.page < pages.length &&
                <button className="button button-next" onClick={() => this.updatePage(1)}>Next</button>
              }
            </div>
          </div>
        </Widget>
      </div>
    );
  }
}

Tutorial.propTypes = {
  onStartGame: PropTypes.func,
};

Tutorial.defaultProps = {
  onStartGame: () => {},
};

export default Tutorial;
