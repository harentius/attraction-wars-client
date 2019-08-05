import React from 'react';
import Title from '../../Title.jsx';
import gravityAssist from '../../../../../resources/ui/tutorial/gravity-assist.gif';
import './Page3.scss';

const Page3 = () => <div>
  <Title>Interaction zones</Title>
  <div>Players have 3 interaction zones:</div>
  <ol>
    <li>Rotation</li>
    <li>Gravity Assist</li>
    <li>Attraction</li>
  </ol>

  <p>
    When user stand in <b>Rotation</b> or
    <b>Gravity Assist</b> zones of other player he receives extra bonuses.
  </p>

  <p>In <b>Gravity Assist</b> zone user can obtain extra speed</p>
  <img src={gravityAssist} />
</div>;

export default Page3;
