

import React from 'react';
import logoeb from "../../src/assets/logoeb.png"

function Logo({ width = '100px', height = 'auto' }) {
  return (
    <div>
      <img 
        src={logoeb}
        alt="Epic Blog" 
        style={{ width: width, height: height }} 
      />
    </div>
  )
}

export default Logo;
