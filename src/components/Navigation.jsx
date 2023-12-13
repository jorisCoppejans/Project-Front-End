import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/Theme.context';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar sticky-top bg-${theme} text-bg-${theme} mb-4`}>
      <div className="container-fluid flex-column flex-sm-row align-items-start align-items-sm-center">
        <ul className="nav-item my-2 mx-sm-3 my-sm-0">
          <li><Link className="nav-link" to="/">Home</Link></li>
        </ul>
        
        <ul className="nav-item my-2 mx-sm-3 my-sm-0">
          <li><Link className="nav-link" to="/collections">Collections</Link></li>
        </ul>
        
        <ul className="nav-item my-2 mx-sm-3 my-sm-0">
          <li><Link className="nav-link" to="/coins">Coins</Link></li>
        </ul>

        <div className="flex-grow-1"></div>

        <button className="btn btn-secondary" type="button" onClick={toggleTheme}>
          {
            theme==='dark'
              ? <IoMoonSharp />
              : <IoSunny />
          }
        </button>
      </div>
    </nav>
  );
}