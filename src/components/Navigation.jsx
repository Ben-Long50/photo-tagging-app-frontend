import { Link } from 'react-router-dom';
import Button from './Button';
import List from './List';
import '../styles/navigation.css';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navigation = () => {
  const { isAuthenticated, signout } = useContext(AuthContext);

  const handleLogout = () => {
    if (isAuthenticated) {
      signout();
    }
  };

  return (
    <nav className="navbar">
      <List>
        <Button>
          <Link className="link" to="/levels">
            Levels
          </Link>
        </Button>
        <Button>
          <Link className="link" to="/leaderboard">
            Leaderboard
          </Link>
        </Button>
        <Button onClick={handleLogout}>
          <Link className="link" to="/signin">
            {isAuthenticated ? 'Sign out' : 'Sign in'}
          </Link>
        </Button>
      </List>
    </nav>
  );
};

export default Navigation;
