import { Outlet } from 'react-router-dom';
import AuthProvider from './AuthContext';
import LevelProvider from './LevelContext';
import './styles.css';

const App = () => {
  return (
    <AuthProvider>
      <LevelProvider>
        <Outlet />
      </LevelProvider>
    </AuthProvider>
  );
};

export default App;
