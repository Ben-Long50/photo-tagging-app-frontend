import App from './Components/App';
import ErrorPage from './Components/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
