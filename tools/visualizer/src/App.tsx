import React from 'react';
import './App.css'

import {entities, researchTree} from "@iddle-factory/config";

function App() {
  return (
    <div>
      <h1>Idle Factory Visualizer</h1>
      <h4>Entities</h4>
      <pre>{JSON.stringify(entities, null, 2)}</pre>
      <h4>Research Tree</h4>
      <pre>{JSON.stringify(researchTree, null, 2)}</pre>
    </div>
  )
}

export default App
