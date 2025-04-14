import React from 'react';
import { useNavigate } from 'react-router';
import {
    Clock,
    Cloud,
    FolderCode,
    GitBranch,
    PlayCircleIcon,
    StopCircleIcon,
    User2Icon
} from 'lucide-react';

const sampleProjects = [
    {
        id: 1,
        name: 'Deploy-N-Chill',
        emoji: '🚀',
        folderPath: '/home/user/projects/deploy-n-chill',
        gitBranch: 'main',
        serverStatus: 'running',
        lastUpdated: '2024-01-15T10:30:00Z',
        lastAccessedBy: 'akash@example.com'
    },
    {
        id: 2,
        name: 'E-Commerce API',
        emoji: '🛍️',
        folderPath: '/home/user/projects/ecommerce-api',
        gitBranch: 'develop',
        serverStatus: 'stopped',
        lastUpdated: '2024-01-14T15:45:00Z',
        lastAccessedBy: 'john@example.com'
    },
    {
        id: 3,
        name: 'Blog Platform',
        emoji: '📝',
        folderPath: '/home/user/projects/blog-platform',
        gitBranch: 'feature/auth',
        serverStatus: 'running',
        lastUpdated: '2024-01-13T09:20:00Z',
        lastAccessedBy: 'sarah@example.com'
    },
    {
        id: 4,
        name: 'Analytics Dashboard',
        emoji: '📊',
        folderPath: '/home/user/projects/analytics',
        gitBranch: 'staging',
        serverStatus: 'running',
        lastUpdated: '2024-01-16T08:15:00Z',
        lastAccessedBy: 'mike@example.com'
    },
    {
        id: 5,
        name: 'Task Manager',
        emoji: '✅',
        folderPath: '/home/user/projects/task-manager',
        gitBranch: 'feature/notifications',
        serverStatus: 'stopped',
        lastUpdated: '2024-01-15T14:20:00Z',
        lastAccessedBy: 'emma@example.com'
    },
    {
        id: 6,
        name: 'Chat Application',
        emoji: '💬',
        folderPath: '/home/user/projects/chat-app',
        gitBranch: 'main',
        serverStatus: 'stopped',
        lastUpdated: '2024-01-14T11:10:00Z',
        lastAccessedBy: 'alex@example.com'
    },
    {
        id: 7,
        name: 'File Storage',
        emoji: '📁',
        folderPath: '/home/user/projects/file-storage',
        gitBranch: 'develop',
        serverStatus: 'running',
        lastUpdated: '2024-01-16T16:30:00Z',
        lastAccessedBy: 'lisa@example.com'
    }
];

const Dashboard = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
            <div className="space-y-2 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Project Dashboard
                </h1>
                <p className="text-sm text-gray-400">Manage your deployment environments</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                {sampleProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();
    const isRunning = project.serverStatus === 'running';

    const handleCardClick = () => {
        navigate(`/projects/${project.id}`);
    };

    const handleButtonClick = (e, action) => {
        e.stopPropagation(); // Prevent card navigation when clicking buttons
        action();
    };

    return (
        <div 
            onClick={handleCardClick}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-alias"
        >
            <div className="p-5 flex-1 space-y-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3 min-w-0">
                        <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                            <span className="text-xl">{project.emoji}</span>
                        </div>
                        <div className="space-y-0.5 min-w-0">
                            <h2 className="text-base font-semibold text-white truncate pr-2">{project.name}</h2>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <GitBranch className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="truncate">{project.gitBranch}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${
                            isRunning ? 'bg-green-400' : 'bg-red-400'
                        } animate-[pulse_2s_ease-in-out_infinite]`}></div>
                    </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center space-x-2.5 p-2 rounded-md hover:bg-white/5 transition-colors">
                        <FolderCode className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
                        <p className="truncate">{project.folderPath}</p>
                    </div>
                    <div className="flex items-center space-x-2.5 p-2 rounded-md hover:bg-white/5 transition-colors">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
                        <p className="truncate">{new Date(project.lastUpdated).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2.5 p-2 rounded-md hover:bg-white/5 transition-colors">
                        <User2Icon className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
                        <p className="truncate">{project.lastAccessedBy}</p>
                    </div>
                </div>
            </div>

            <div className="flex border-t border-gray-800/80 mt-auto">
                <button
                    className={`
                        flex items-center justify-center gap-1.5 flex-1 px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer
                        ${
                            isRunning
                                ? 'hover:bg-red-500/10 text-red-400 hover:text-red-300'
                                : 'hover:bg-green-500/10 text-green-400 hover:text-green-300'
                        }
                    `}
                    onClick={(e) => handleButtonClick(e, () => console.log(`${isRunning ? 'Stop' : 'Start'} server for ${project.name}`))}
                >
                    {isRunning ? <StopCircleIcon className="w-4 h-4" /> : <PlayCircleIcon className="w-4 h-4" />}
                    <span>{isRunning ? 'Stop Server' : 'Start Server'}</span>
                </button>
                <div className="w-px bg-gray-800/80"></div>
                <button
                    className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2.5 text-xs font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200 cursor-pointer"
                    onClick={(e) => handleButtonClick(e, () => console.log(`Pull updates for ${project.name}`))}
                >
                    <Cloud className="w-4 h-4" />
                    <span>Pull Updates</span>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
