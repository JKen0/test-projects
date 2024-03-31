import { Outlet, Link, useLocation  } from "react-router-dom";
import React, { useEffect } from 'react';

import './NavBar.scss';


const getWebsiteTitle = (pathname : string) => {

  if (pathname === '/') {
    return 'Home';
  } else if (pathname === '/grades') {
    return 'Grades';
  } else {
    return 'Not Found';
  }
};

const NavBar = () => {
 const location = useLocation();

  useEffect(() => {
    document.title = `${getWebsiteTitle(location.pathname)}`;
  }, [location]);

  return (
    <div>

      <ul>
        <li>
          <Link to="/">
            <picture>
              <img height={30} src="https://cdn.7tv.app/emote/61f223a81704494956111846/1x.webp" />
            </picture>
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="grades">Grades</Link>
        </li>
        <li style={{ float: 'right' }}>
          <Link to="admin">Admin</Link>
        </li>
      </ul> 


      <Outlet />

    </div>
  )
}

export default NavBar