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
import Division from './components/pages/Division/Division';
import Categorie from './components/pages/Categorie/Categorie';
import Comments from './components/pages/Notification/Comments';
import Profile from './components/pages/login/Profile';
import NewBesoin from './components/pages/Besoin/NewBesoin';
import BesoinList from './components/pages/Besoin/BesoinList';

import io from "socket.io-client";

function App() {
  const [IsOpen, setIsOpen] = useState (false)
  const [isConn, setIsConn] = useState(false)
  const [comments, setComments] = useState([]);
  const togleSidebar = () => setIsOpen(!IsOpen)

  const [IsOpenNot, setIsOpenNot] = useState (false)
  const togleNot = () => setIsOpenNot(!IsOpenNot)

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

const socket = io("http://localhost:8080");

useEffect(() => {
  socket.on("new-comment", (data) => {
    console.log("Received new-comment event:", data);
    const { comment } = data;
    if (comment) {
      console.log(comment);
      setComments((comments) => [...comments, comment]);
    }
  });
  

  return () => {
    socket.off("new-comment");
  };
}, [setComments, socket, user]);

 console.log(user)
 console.log(comments)

  return (
      <div className={`App ${IsOpen ? "" : "open"}`}>
        
        <AuthProvider>
          {isConn && <SideNav user={user} deconexion={deconexion} IsOpen={IsOpen} setIsOpen={setIsOpen} togleSidebar={togleSidebar} comments={comments} togleNot={togleNot}/>}
          {isConn && <Comments comments={comments} setComments={setComments} user={user} IsOpenNot={IsOpenNot} />}
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
            <Route element={<ProtectedRoute user={user} perm={true}/>}>
              <Route path="/Dashboard" element={<Dashboard user={user} />} />
              <Route path="/Prevision" element={<Previsions user={user}/>} />
              <Route path="/Besoin" element={<Besoin user={user} setComments={setComments}/>} />
              <Route path="/Besoin/Nouveau besoin" element={<NewBesoin user={user}/>} />
              <Route path="/Besoin/Liste" element={<BesoinList user={user}/>} />
              <Route path="/Profile" element={<Profile user={user} />} />
              <Route path="/Comments" element={<Comments comments={comments} setComments={setComments} user={user} IsOpenNot={IsOpenNot} />} />
              <Route element={<ProtectedRoute redirectPath="/Dashboard" user={user} perm={'BAG'}/>}>
                <Route path="/Article/Nouvel_Article" element={<Article />} />
                <Route path="/Article/Liste" element={<ArticleList />} />
                <Route path="/BesoinBag" element={<BesoinListBag user={user} />} />
                <Route path="/Categorie" element={<Categorie user={user} />} />
              </Route>
              <Route element={<ProtectedRoute redirectPath="/Dashboard" user={user} perm={'Admin'}/>}>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/UserList" element={<UserList />} />
                <Route path="/ModUser" element={<ModUser />} />
                <Route path="/Article/Nouvel_Article" element={<Article />} />
                <Route path="/Article/Liste" element={<ArticleList />} />
                <Route path="/Division" element={<Division />} />
                <Route path="/Categorie" element={<Categorie user={user} />} />
              </Route>
            </Route>
            
          <Route path="/*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
      </div>
   );
   
}

export default App;