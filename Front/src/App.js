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
import UserList from './components/pages/user/UserList';
import ModUser from './components/pages/user/modUser';
import Article from './components/pages/Article/Article';
import ArticleList from './components/pages/Article/ArticleList';
import Besoin from './components/pages/Besoin/Besoin';
import BesoinListBag from './components/pages/Besoin/BesoinListeBAG';
import io from "socket.io-client";

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
      sessionStorage.removeItem("con")
  }
  const [user, setUser] = useState([{
    MATRICULE: "",
    NOM_UTIL_AG: "",
    PASSWORD: "",
    TYPE_AG: ""
}])

    
  useEffect(() => {
    setIsConn(getCon())
    const tokenString = localStorage.getItem('token');
    setUser(JSON.parse(tokenString))
  }, [])

 console.log(user)

  return (
      <div className={`App ${IsOpen ? "" : "open"}`}>
        
        <AuthProvider>
          {isConn && <SideNav user={user} deconexion={deconexion} IsOpen={IsOpen} setIsOpen={setIsOpen} togleSidebar={togleSidebar}/>}
          {/*isConn && <Topnav user={user} />*/}
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
            <Route element={<ProtectedRoute user={user} perm={'Admin'}/>}>
              <Route path="/Dashboard" element={<Dashboard user={user} />} />
              <Route path="/Prevision" element={<Previsions />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/UserList" element={<UserList />} />
              <Route path="/ModUser" element={<ModUser />} />
              <Route path="/Article" element={<Article />} />
              <Route path="/ArticleList" element={<ArticleList />} />
              <Route path="/Besoin" element={<Besoin user={user} />} />
              <Route path="/BesoinBag" element={<BesoinListBag user={user} />} />
            </Route>
            <Route element={<ProtectedRoute user={user} perm={'User'}/>}>
              <Route path="/Dashboard" element={<Dashboard user={user} />} />
              <Route path="/Prevision" element={<Previsions />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Article" element={<Article />} />
              <Route path="/ArticleList" element={<ArticleList />} />
              <Route path="/Besoin" element={<Besoin/>} />
            </Route>
          <Route path="/*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
      </div>
   );
   
}

export default App;