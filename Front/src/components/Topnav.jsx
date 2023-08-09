import React from 'react'
import './styles/sidebar.css'

const Topnav = ({user, IsOpen}) => {
  return (
    <div className={`topbar ${IsOpen ? "open" : ""}`}>
      <div className='fixed-top' style={IsOpen ? {marginLeft: "70px", transition: "0.4s"} : {marginLeft: "200px", transition: "0.4s"}}>
      <nav className="navbar navbar-expand-sm bg-light navbar-light shadow wb-20">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={require(`../uploads/${user[0].PHOTO}`)} alt="Avatar Logo" style={{width: "50px", height: "50px"}} className="rounded-pill"/> 
            {user[0].NOM_UTIL_AG}
          </a>
        </div>
      </nav>
    </div>
    </div>
    
  )
}

export default Topnav