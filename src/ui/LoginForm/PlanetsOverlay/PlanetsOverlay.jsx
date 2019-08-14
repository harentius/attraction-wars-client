import React from 'react';
import './PlanetsOverlay.scss';

class PlanetsOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      planets: new Array(3).fill(1),
      asteroids: new Array(7).fill(1),
    };
  }

  render() {
    return (
      <div className="PlanetsOverlay">
        {this.state.asteroids.map((k, i) => (
          <div key={i} className={`asteroid asteroid${i + 1}`} />
        ))}
        {this.state.planets.map((k, i) => (
          <div className={`ellipse planet${i + 1}-ellipse`} key={i}>
            <div className={`planet planet${i + 1}`} />
          </div>
        ))}
      </div>
    );
  }
}

export default PlanetsOverlay;
