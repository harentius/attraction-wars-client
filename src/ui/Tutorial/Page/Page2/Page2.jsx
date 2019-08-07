import React from 'react';
import Title from '../../Title/Title.jsx';
import absorption from '../../../../../resources/ui/tutorial/absorption.gif';
import './Page2.scss';

const Page2 = () => <div>
  <Title>Game objects</Title>

  <div className="page-content">
    <img src={absorption} className="absorption-img"/>
    <span className="absorption-label">
      Avoid bigger objects, absorb smaller ones to increase mass and score.
    </span>
  </div>
</div>;

export default Page2;
