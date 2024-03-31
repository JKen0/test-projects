import { Link } from 'react-router-dom';
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
  <div className="whole container">
    <div className="content">
      <h1 className="heading">404 - Page Not Found</h1>
      <p className="paragraph">The page you're looking for does not exist.</p>
      <img src="https://cdn.betterttv.net/emote/64acd705c2a236af8d29581a/3x.webp" alt="Page Not Found" className="image" />
      <p><Link to="/" className="link">Go to Home Page</Link></p>
    </div>
  </div>
  )
}



export default NotFoundPage