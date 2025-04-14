import { Link, NavLink, Outlet } from 'react-router';

const protectedNavItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Config Path', path: '/set-path' },
    { name: 'Profile', path: '/profile' }
];

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            <nav className="py-4 border-b border-zinc-800 bg-black sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <Link
                        className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        to="/"
                    >
                        Deploy-N-Chill
                    </Link>

                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-8">
                            {protectedNavItems.map(item => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `text-base transition-all duration-300 relative group ${
                                            isActive 
                                                ? 'text-white font-medium' 
                                                : 'text-zinc-400 hover:text-zinc-200'
                                        }`
                                    }
                                >
                                    {item.name}
                                    <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                                        ({ isActive }) => isActive ? 'scale-x-100' : ''
                                    }`}></span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            
            <main className="flex-1 flex items-center max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
            
            <footer className="py-4 border-t border-zinc-800 bg-black">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <p className="text-zinc-400 text-sm hover:text-zinc-300 transition-colors duration-200">
                        © {new Date().getFullYear()} Deploy-N-Chill
                    </p>
                    <a
                        href="https://github.com/Akash-pugazh/deploy-N-chill"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-200 transition-colors duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                        >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
