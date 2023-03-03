import React from 'react';
import '../Loader/Loader.scss';
import { ThreeCircles } from 'react-loader-spinner';

export const Loader: React.FC = () => (
  <div className='loader'>
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  </div>
);
