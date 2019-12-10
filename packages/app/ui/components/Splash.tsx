import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Service } from '../../common/Service';

interface Props {
  services: Service[] | null;
}

const StyledSplash = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Splash: FunctionComponent<Props> = ({ services }) => {
  console.log('splash');
  return (
    <StyledSplash>
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
           x="0px" y="0px"
           viewBox="0 0 385.94 385.94"
           xmlSpace="preserve"
           width="385.94" height="385.94">
        <g>
          <path style={{fill: '#5314a7'}} d="M342.719,215.78c0,92.19-73.3,167.25-164.8,170.07c-1.78,0.06-3.57,0.09-5.36,0.09
              c-45.14,0-86.18-17.59-116.63-46.27c-32.95-31.03-53.52-75.06-53.52-123.89c0-75.09,48.64-138.82,116.14-161.4
              c16.97-5.68,35.13-8.75,54.01-8.75c39.2,0,75.3,13.25,104.06,35.52C316.829,112.27,342.719,161,342.719,215.78z" />
          <path style={{fill: '#F45D5D'}} d="M372.769,114.37h-86.55c-16.5-24-12-114.37-12-114.37l0,0
              c14.845,23.996,34.414,44.723,57.518,60.921l45.169,31.668c2.142,1.502,3.922,3.462,5.212,5.738v0
              C386.177,105.49,381.003,114.37,372.769,114.37z" />
          <path style={{fill: '#E6E6E6'}} d="M286.219,114.37h-18c-131.86,13.34-110.3,183.99-90.3,271.48c-1.78,0.06-3.57,0.09-5.36,0.09
              c-45.14,0-86.18-17.59-116.63-46.27c5.32-137.6,32.98-223.81,54.69-271.27c2.26-4.94,4.91-9.62,7.93-14.02
              c14.55-21.27,37.36-35.86,63.29-39.92L274.219,0c0,0-2.29,46.06,2.4,81.15C278.499,95.21,281.499,107.5,286.219,114.37z" />
          <circle style={{fill: '#4D4D4D'}} cx="226.22" cy="45.369" r="11.999" />
        </g>
      </svg>
      <h1>
        {services === null && 'Ferdinand is getting ready...' || 'No services found :('}
      </h1>
    </StyledSplash>
  );
};
