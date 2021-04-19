import React from 'react';
import './App.css';
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
function App() {
  return (
    <React.Fragment>
      <Sidebar/>
      <Topbar/>
    </React.Fragment>
  );
}

export default App;
