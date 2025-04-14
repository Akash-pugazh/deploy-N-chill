import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
    Clock,
    Cloud,
    FolderCode,
    GitBranch,
    PlayCircleIcon,
    StopCircleIcon,
    Settings,
    Terminal,
    GitCommit
} from 'lucide-react';

const sampleBranches = ['main', 'develop', 'feat/project-detail', 'feat/user-auth'];

const ProjectDetail = () => {
    const { id } = useParams();
    const [selectedBranch, setSelectedBranch] = useState('main');
    const [isRunning, setIsRunning] = useState(true);

    // Hardcoded project data specific to Deploy-N-Chill
     const project = {
        id: parseInt(id),
        name: 'Deploy-N-Chill Manual',
        emoji: '🚀',
        folderPath: '/Users/akash/Developer/side-projects/deploy-N-chill-manual',
        gitBranch: 'main',
        serverStatus: 'running',
        lastUpdated: new Date().toISOString(),
        lastAccessedBy: 'akash',
        description: 'A powerful deployment management tool with manual deployment controls',
        environment: 'development',
        deploymentHistory: [
            { 
                id: 1, 
                branch: 'main', 
                status: 'success', 
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                commit: 'feat: add project detail page'
            },
            { 
                id: 2, 
                branch: 'develop', 
                status: 'success', 
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                commit: 'feat: implement user authentication'
            },
            { 
                id: 3, 
                branch: 'feat/project-detail', 
                status: 'failed', 
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                commit: 'wip: project settings page'
            }
        ]
    };

    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
    };

    const toggleServer = () => {
        setIsRunning(!isRunning);
        // Add actual server toggle logic here
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Header Section */}
            <div className="border rounded-lg p-6 bg-base-100 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <span className="text-3xl">{project.emoji}</span>
                            <span>{project.name}</span>
                        </h1>
                        <p className="text-sm text-base-content/60">{project.description}</p>
                    </div>
                    <button className="btn btn-circle btn-sm bg-base-100 hover:bg-base-200 border border-base-300 shadow-sm transition-all duration-200">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Project Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Card */}
                    <div className="border rounded-lg p-6 bg-base-100 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Project Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-sm text-base-content/70">
                                    <FolderCode className="w-4 h-4" />
                                    <span className="truncate">{project.folderPath}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <GitBranch className="w-4 h-4" />
                                    <select
                                        value={selectedBranch}
                                        onChange={handleBranchChange}
                                        className="select select-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                    >
                                        {sampleBranches.map(branch => (
                                            <option key={branch} value={branch}>{branch}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-base-content/70">
                                    <Clock className="w-4 h-4" />
                                    <span>{new Date(project.lastUpdated).toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col justify-between space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-base-content/70">Server Status</span>
                                    <div className="tooltip" data-tip={isRunning ? 'Running' : 'Stopped'}>
                                        <div className={`w-2 h-2 rounded-full ${
                                            isRunning ? 'bg-success' : 'bg-error'
                                        } animate-[pulse_2s_ease-in-out_infinite]`}></div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className={`btn btn-sm flex-1 shadow-sm transition-all duration-200 ${
                                            isRunning 
                                                ? 'bg-error/10 hover:bg-error/20 text-error border-error/30' 
                                                : 'bg-success/10 hover:bg-success/20 text-success border-success/30'
                                        }`}
                                        onClick={toggleServer}
                                    >
                                        {isRunning ? (
                                            <><StopCircleIcon className="w-4 h-4" /> Stop</>
                                        ) : (
                                            <><PlayCircleIcon className="w-4 h-4" /> Start</>
                                        )}
                                    </button>
                                    <button className="btn btn-sm flex-1 bg-primary/10 hover:bg-primary/20 text-primary border-primary/30 shadow-sm transition-all duration-200">
                                        <Cloud className="w-4 h-4" /> Deploy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Output */}
                    <div className="border rounded-lg p-6 bg-base-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Terminal className="w-5 h-5" />
                                Terminal Output
                            </h3>
                            <button className="btn btn-sm bg-base-100 hover:bg-base-200 border border-base-300 shadow-sm transition-all duration-200">
                                Clear
                            </button>
                        </div>
                        <div className="font-mono border rounded-lg p-4 h-64 overflow-auto bg-base-200/50">
                            <pre data-prefix="$"><code>git status</code></pre>
                            <pre><code>On branch {selectedBranch}</code></pre>
                            <pre><code>Your branch is up to date with 'origin/{selectedBranch}'</code></pre>
                            <pre data-prefix="$"><code>npm run build</code></pre>
                            <pre data-prefix="✓" className="text-success"><code>Build completed successfully</code></pre>
                        </div>
                    </div>
                </div>

                {/* Right Column - Deployment History */}
                <div>
                    <div className="border rounded-lg p-6 bg-base-100 shadow-sm">
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <GitCommit className="w-5 h-5" />
                            Deployment History
                        </h3>
                        <div className="space-y-3">
                            {project.deploymentHistory.map(deployment => (
                                <div
                                    key={deployment.id}
                                    className="border rounded-lg p-4 hover:bg-base-200/50 transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">{deployment.branch}</p>
                                            <p className="text-xs text-base-content/60">
                                                {new Date(deployment.timestamp).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-base-content/60">
                                                Commit: {deployment.commit}
                                            </p>
                                        </div>
                                        <div className={`badge badge-sm ${
                                            deployment.status === 'success'
                                                ? 'bg-success/10 text-success border-success/30'
                                                : 'bg-error/10 text-error border-error/30'
                                        }`}>
                                            {deployment.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;