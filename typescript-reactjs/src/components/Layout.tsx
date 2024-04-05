import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import NavBar from "./NavBar";

const getWebsiteTitle = (pathname: string) => {

  if (pathname === '/') {
    return 'Home';
  } else if (pathname === '/grades') {
    return 'Grades';
  } else if (pathname === '/spotify') {
    return 'Spotify';
  } else {
    return 'Not Found';
  }
};

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${getWebsiteTitle(location.pathname)}`;
  }, [location]);

  return (
    <div>

      <NavBar />
      <Outlet />

    </div>
  )
}

export default Layout