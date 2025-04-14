import { Route, createRoutesFromElements, createBrowserRouter, Outlet } from 'react-router';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Path from './pages/Path';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import Loading from './pages/Loading';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/* Auth Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Main App Routes */}
            <Route element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="set-path" element={<Path />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Route>
            <Route
                path="*"
                element={<NotFound />}
                loader={async () => await axios.get('https://dog.ceo/api/breeds/image/random')}
                hydrateFallbackElement={<Loading />}
            />
        </Route>
    )
);

export default router;
