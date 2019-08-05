import React from 'react';
import Title from '../../Title.jsx';
import arrowKeys from '../../../../../resources/ui/tutorial/arrow-keys.png';
import spaceKey from '../../../../../resources/ui/tutorial/space-key.png';
import './Page1.scss';

const Page1 = () => <div>
  <Title>Controls</Title>

  <div>
    <img src={arrowKeys} className="arrow-keys-img" />
    <span>Movement</span>
  </div>

  <div>
    <img src={spaceKey} className="space-key-img" />
    <span>Acceleration</span>
  </div>
</div>;

export default Page1;
