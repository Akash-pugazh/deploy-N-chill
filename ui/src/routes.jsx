import {  Route, createRoutesFromElements, createBrowserRouter } from 'react-router';
import Dashboard from './pages/dashboard';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Path from './pages/Path';
import Layout from './Layout';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />}  />
            <Route path="set-path" element={<Path />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default router;
