import './App.css';
import Login from './components/pages/login/login';
import { useEffect, useState } from 'react';
//import AuthProvider from './components/pages/login/authProvider';
//import Routes from './components/routes/routeIdex';
import { Route, Routes } from 'react-router-dom';
import SideNav from './components/sidebar';
import Dashboard from './components/pages/Dashboard/dashboard';
import Previsions from './components/pages/Previsions/prevision';
import { ProtectedRoute } from './components/routes/protectedRoute';

function App() {
  const [IsOpen, setIsOpen] = useState (true)
  const [isConn, setIsConn] = useState(false)
  const togleSidebar = () => setIsOpen(!IsOpen)

  const saveCon = () =>{
    sessionStorage.setItem("con", isConn)
  }
  const getCon = () =>{
    return sessionStorage.getItem("con")
  }
  const deconexion = () =>{
      setIsConn(false)
      saveCon()
  }

  useEffect(() => {
    setIsConn(getCon())
  }, [])

  console.log(getCon())

  return (
      <div className="App">
        
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="/login"
            element={<Login isConn={isConn} setIsConn={setIsConn} saveCon={saveCon} />}
          />
          <Route element={<ProtectedRoute isConn={isConn} />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Prevision" element={<Previsions />} />
          </Route>
          <Route path="/*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </div>
   );
   
}

export default App;
