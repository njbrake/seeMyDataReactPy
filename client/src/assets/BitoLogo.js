import React from 'react';
import bitoLogo from './bitoLogo.png';

export default () => {
  return (
    <div>
      <img
        src={bitoLogo}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Logo"
      />
    </div>
  );
};
