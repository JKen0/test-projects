import { Outlet, Link } from "react-router-dom";



const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <Link to="/">
          <picture>
            <img src="https://cdn.7tv.app/emote/61f223a81704494956111846/2x.webp" />
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