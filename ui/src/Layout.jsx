import { Link, NavLink } from 'react-router';
import { Outlet } from 'react-router';



const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Config Path', path: '/set-path' },
    { name: 'Profile', path: '/profile' },
]
function Layout() {
    return (
        <div className="min-h-screen">
            <nav className="p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link className="text-xl font-bold" to="/">Deploy-N-Chill</Link>
                    <div className="flex space-x-4">
                        {
                            navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-green-400 font-medium underline underline-offset-4 drop-shadow-[0_0_5px_#4ade80]'
                                            : 'text-gray-600 hover:text-green-400'
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
