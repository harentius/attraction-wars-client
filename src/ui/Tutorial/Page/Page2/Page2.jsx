import React from 'react';
import Title from '../../Title.jsx';
import absorption from '../../../../../resources/ui/tutorial/absorption.gif';
import './Page2.scss';

const Page2 = () => <div>
  <Title>Game objects</Title>

  <div>
    <img src={absorption} className="absorption-img"/>
    <span>Avoid bigger objects, absorb smaller to increase mass and score</span>
  </div>
</div>;

export default Page2;
