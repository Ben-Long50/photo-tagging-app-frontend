import App from './components/App';
import ErrorPage from './components/ErrorPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import Homepage from './components/Homepage';
import LevelPage from './components/LevelPage';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import Leaderboard from './components/Leaderboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/signin" element={<SigninForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route index element={<Navigate to="/levels" replace />} />
      <Route path="/levels" element={<Homepage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/levels/:levelId" element={<LevelPage />} />
    </Route>,
  ),
);

export default router;
