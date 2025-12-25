import React from 'react';
import { ClipLoader } from 'react-spinners';
import './loader.module.css';

function Loader({ color = "#000000", size = 20 }) {
  return (
    <div className="loader-container">
      <ClipLoader 
        color={color}
        size={size}
        speedMultiplier={0.8}
      />
    </div>
  );
}

export default Loader;