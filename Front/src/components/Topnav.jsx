import React from 'react'
import './styles/sidebar.css'
import SideUser from './images/SideUser'

const Topnav = ({user}) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light navbar-light shadow wb-20">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={<SideUser/>} alt="Avatar Logo" style={{width: "40px"}} className="rounded-pill"/> 
          </a>
        </div>
      </nav>
    </div>
    
  )
}

export default Topnav