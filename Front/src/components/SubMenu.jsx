import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles/sidebar.css'
 
 
const SubMenu = ({ item, IsOpen }) => {
  const [subnav, setSubnav] = useState(false);
 
  const showSubnav = () => setSubnav(!subnav);
 
  return (
    <>
      <Link className={`nav-item ${IsOpen ? "open" : ""}`} activeClassName={`active ${IsOpen ? "open" : ""}`} to={item.lien}
      onClick={item.subNav && showSubnav}>
        <div style={{paddingRight: "22px"}}>
          {item.icon}
        </div>
        <span className={`sideText ${IsOpen ? "open" : ""}`}>{item.name}</span>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link className={`nav-item ${IsOpen ? "open" : ""}`} activeClassName={`active ${IsOpen ? "open" : ""}`} to={item.lien} key={index}>
              {item.icon}
              <span className={`sideText ${IsOpen ? "open" : ""}`}>{item.name}</span>
            </Link>
          );
        })}
    </>
  );
};
 
export default SubMenu;
