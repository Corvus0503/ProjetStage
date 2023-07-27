import './App.css';
import Login from './components/pages/login/login';
import { useEffect, useState } from 'react';
import AuthProvider from './components/pages/login/authProvider';
//import Routes from './components/routes/routeIdex';
import { Route, Routes } from 'react-router-dom';
//import Routes from './components/routes/routeIdex';
import SideNav from './components/sidebar';
import Dashboard from './components/pages/Dashboard/dashboard';
import Previsions from './components/pages/Previsions/prevision';
import { ProtectedRoute } from './components/routes/protectedRoute';
import Signup from './components/pages/login/Signup';
import Topnav from './components/Topnav';
import UserList from './components/pages/user/UserList';
import ModUser from './components/pages/user/modUser';

function App() {
  const [IsOpen, setIsOpen] = useState (false)
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
  const [user, setUser] = useState({
    MATRICULE: "",
    NOM_UTIL_AG: "",
    PASSWORD: ""
})
    
  useEffect(() => {
    setIsConn(getCon())
  }, [])

  //console.log(user.NOM_UTIL_AG)

  return (
      <div className={`App ${IsOpen ? "" : "open"}`}>
        
        <AuthProvider>
          {isConn && <SideNav deconexion={deconexion} IsOpen={IsOpen} setIsOpen={setIsOpen} togleSidebar={togleSidebar}/>}
          {isConn && <Topnav />}
          <Routes>
            <Route index element={<Login 
            isConn={isConn} setIsConn={setIsConn} saveCon={saveCon}
            user={user} setUser={setUser} getCon={getCon}
            />} />
            <Route
              path="/login"
              element={<Login isConn={isConn} setIsConn={setIsConn} saveCon={saveCon}
              user={user} setUser={setUser} getCon={getCon} />}
            />
            <Route element={<ProtectedRoute isConn={isConn} />}>
              <Route path="/Dashboard" element={<Dashboard user={user} />} />
              <Route path="/Prevision" element={<Previsions />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/UserList" element={<UserList />} />
              <Route path="/ModUser" element={<ModUser />} />
            </Route>
          <Route path="/*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
      </div>
   );
   
}

export default App;