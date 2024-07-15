import { Outlet } from 'react-router-dom';
import AuthProvider from './AuthContext';
import LevelProvider from './LevelContext';
import '../styles/styles.css';
import Navigation from './Navigation';

const App = () => {
  return (
    <AuthProvider>
      <LevelProvider>
        <Navigation />
        <Outlet />
      </LevelProvider>
    </AuthProvider>
  );
};

export default App;
