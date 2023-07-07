import './App.css';
//import Login from './components/login';
import SideNav from './components/sidebar';
import { useState } from 'react';

function App() {
  const [IsOpen, setIsOpen] = useState (true)
  const togleSidebar = () => setIsOpen(!IsOpen)
  return (
    <div className="App">
      <SideNav IsOpen={IsOpen} togleSidebar={togleSidebar}/>
    </div>
  );
}

export default App;
