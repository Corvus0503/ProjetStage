import './App.css';
import Login from './components/pages/login/login';
import { useEffect, useState } from 'react';
import AuthProvider from './components/pages/login/authProvider';
import { Route, Routes } from 'react-router-dom';
import SideNav from './components/sidebar';
import Dashboard from './components/pages/Dashboard/dashboard';
import Previsions from './components/pages/Previsions/prevision';
import { ProtectedRoute } from './components/routes/protectedRoute';
import Signup from './components/pages/login/Signup';
import Topnav from './components/Topnav';
import Article from './components/pages/Article/Article';
import ArticleList from './components/pages/Article/ArticleList';
import ModificationArticle from './components/pages/Article/ModificationArticle';
import Besoin from './components/pages/Besoin/Besoin';
import NewDivision from './components/pages/Division/NewDivision';
import Division from './components/pages/Division/Division';



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
          {/* {isConn && <SideNav deconexion={deconexion} IsOpen={IsOpen} setIsOpen={setIsOpen} togleSidebar={togleSidebar}/>}
          {isConn && <Topnav />} */}
          <SideNav deconexion={deconexion} IsOpen={IsOpen} setIsOpen={setIsOpen} togleSidebar={togleSidebar}/>
          <Topnav />
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
              <Route path="/Article" element={<Article />} />
              <Route path="/ArticleList" element={<ArticleList />} />
              <Route path="/ModificationArticle" element={<ModificationArticle />} />
              <Route path="/Besoin" element={<Besoin/>} />
              <Route path="/division" element={<Division/>} />

            </Route>
          <Route path="/*" element={<p className='h1 text-center'>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
        
      </div>
   );
   
}

export default App;