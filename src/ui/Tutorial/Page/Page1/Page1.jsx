import React from 'react';
import Title from '../../Title/Title.jsx';
import arrowKeys from '../../../../../resources/ui/tutorial/arrow-keys.png';
import spaceKey from '../../../../../resources/ui/tutorial/space-key.png';
import './Page1.scss';

const Page1 = () => <div>
  <Title>Controls</Title>

  <div className="keys-wrapper">
    <div className="key-wrapper">
      <img src={arrowKeys} className="key-img arrow-keys-img" />
      <span className="movement-label">Movement</span>
    </div>

    <div className="key-wrapper">
      <img src={spaceKey} className="key-img space-key-img" />
      <span className="movement-label">Acceleration</span>
    </div>
  </div>
</div>;

export default Page1;
