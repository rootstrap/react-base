import React from 'react';
import Loader from 'react-loaders';

const Loading = () => (
  <div className="loading-wrapper" aria-live="polite" role="status">
    <Loader type="ball-scale-multiple" active color="#000" />
  </div>
);

export default Loading;
