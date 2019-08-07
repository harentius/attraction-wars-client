import React from 'react';
import Title from '../../Title/Title.jsx';
import gravityAssist from '../../../../../resources/ui/tutorial/gravity-assist.gif';
import './Page3.scss';

const Page3 = () => <div>
  <Title>Interaction zones</Title>

  <div className="page-content">
    <img className="zones-img" src={gravityAssist} />

    <div className="zones-description">
      <p>Players have <b>3 interaction zones:</b></p>
      <ol className="zones-list">
        <li>Rotation</li>
        <li>Gravity Assist</li>
        <li>Attraction</li>
      </ol>

      <p>
        Being in <b>Rotation</b> or <b>Gravity Assist</b> zones
        of other player gives extra score points.
      </p>

      <p className="zones-label">
        In <b>Gravity Assist</b> zone user obtains extra speed.
      </p>
    </div>
  </div>
</div>;

export default Page3;
