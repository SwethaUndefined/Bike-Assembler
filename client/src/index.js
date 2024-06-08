import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BikeAssemblyProvider } from './bikeAssemblyProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BikeAssemblyProvider>
      <App />
    </BikeAssemblyProvider>
);
