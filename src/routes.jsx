import App from './components/App';
import ErrorPage from './components/ErrorPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Homepage from './components/Homepage';
import LevelPage from './components/LevelPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      {/* <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-in" element={<Signup />} /> */}
      <Route index path="/levels" element={<Homepage />} />
      <Route path="/levels/:levelId" element={<LevelPage />} />
    </Route>,
  ),
);

export default router;
