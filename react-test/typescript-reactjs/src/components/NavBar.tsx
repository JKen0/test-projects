import { Outlet, Link } from "react-router-dom";



const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <p className="nav-link active">
            <Link to="/">
              <picture>
                <img src="https://cdn.7tv.app/emote/61f223a81704494956111846/2x.webp" />
              </picture>
            </Link>
          </p>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <p className="nav-link active">
                  <Link to="/">Home</Link>
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link active">
                  <Link to="grades">Grades</Link>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

    </div>
  )
}

export default NavBar