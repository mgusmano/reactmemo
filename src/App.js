import React from 'react';
import { GlobalStateProvider } from './globalstate/GlobalStateProvider';
import Absolute from './absolute/Absolute';

const App = () => {
  return (
    <GlobalStateProvider>
      <Absolute/>
    </GlobalStateProvider>
  )
}

export default App
