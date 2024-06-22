

import React from 'react';

function Logo({ width = '100px', height = 'auto' }) {
  return (
    <div>
      <img 
        src="../../public/LOGOEB.png" 
        alt="Epic Blog" 
        style={{ width: width, height: height }} 
      />
    </div>
  )
}

export default Logo;
