import React, { useEffect } from 'react';

function App(): JSX.Element {
  useEffect(() => {
    window.ipcAPI?.rendererReady();
  }, []);

  return (
    <div className="app">
      <h4>Welcome to React, Electron and TypeScript</h4>
      <h4>Updated version!! lets try to catch the error kiss</h4>
    </div>
  );
}

export default App;
