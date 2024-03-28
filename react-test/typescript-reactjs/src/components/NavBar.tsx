import { Outlet, Link, useLocation  } from "react-router-dom";
import React, { useEffect } from 'react';

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
    document.title = `My Website | ${getWebsiteTitle(location.pathname)}`;
  }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <Link to="/">
          <picture>
            <img src="https://cdn.7tv.app/emote/61f223a81704494956111846/2x.webp" />
          </picture>
        </Link>

        <Link to="/">
          <picture>
            <img src="https://cdn.betterttv.net/emote/64acd705c2a236af8d29581a/2x.webp" />
          </picture>
        </Link>

        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-primary"><Link to="/">Home</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to="grades">Grades</Link></button>
        </div>

        </div>
      </nav>

      <Outlet />

    </div>
  )
}

export default NavBar