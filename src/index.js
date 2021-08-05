import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

/**npm install react-router-dom
 * modulo em react para que vc possa fazer as navegações entre paginas
 */
ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
