import { useContext } from 'react';
import ForgotPass from './pages/forgotPass/ForgotPass';
import Posts from './components/post/Post';
import ResetPass from './pages/resetPass/ResetPass';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import SinglePost from './pages/singlePost/SinglePost';
import Write from './pages/write/Write';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { user, dispatch } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="div">
          <Topbar />
          <Outlet />
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/write',
          element: (
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          ),
        },
        {
          path: '/blogs/:id',
          element: <SinglePost />,
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: user ? <Login /> : <Register />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPass />,
    },
    {
      path: '/resetpassword/:resetToken',
      element: <ResetPass />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
