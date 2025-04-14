import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
    Cloud,
    FolderCode,
    GitBranch,
    PlayCircleIcon,
    StopCircleIcon,
    Settings,
    Terminal,
    GitCommit
} from 'lucide-react';
import axios from 'axios';

const sampleBranches = ['main', 'develop', 'feat/project-detail', 'feat/user-auth'];

const ProjectDetail = () => {
    const { id } = useParams();
    const [selectedBranch, setSelectedBranch] = useState('main');
    const [isRunning, setIsRunning] = useState(true);

    // Updated sample data with more comprehensive deployment history
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
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                commit: 'feat: implement git pull functionality'
            },
            {
                id: 2,
                branch: 'develop',
                status: 'success',
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                commit: 'fix: resolve terminal font issues'
            },
            {
                id: 3,
                branch: 'feat/project-detail',
                status: 'failed',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                commit: 'feat: add deployment history'
            },
            {
                id: 4,
                branch: 'main',
                status: 'success',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
                commit: 'refactor: improve project structure'
            },
            {
                id: 5,
                branch: 'feat/auth',
                status: 'success',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                commit: 'feat: implement user authentication'
            },
            {
                id: 6,
                branch: 'main',
                status: 'success',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                commit: 'chore: update dependencies'
            }
        ]
    };

    const handleBranchChange = e => {
        const value = e.target.value;
        // If server is running, stop it before changing branch
        if (isRunning) {
            setIsRunning(false);
            // You can add actual server stop logic here
            console.log(`Stopping server before changing to branch: ${value}`);
        }
        setSelectedBranch(value);
    };

    const toggleServer = () => {
        setIsRunning(!isRunning);
        // Add actual server toggle logic here
    };

    const handlePullUpdates = async () => {
        try {
            const response = await axios.post('/projects/command', {
                command: `cd ${project.folderPath} && git pull origin ${selectedBranch}`
            });
            console.log('Pull response:', response.data);
            // You might want to update the UI to show the pull was successful
        } catch (error) {
            console.error('Error pulling updates:', error);
            // Handle error appropriately
        }
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Header Section */}
            <div className="border border-base-content/50 rounded-lg p-6 bg-base-100 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                            <span className="text-2xl">{project.emoji}</span>
                            <span>{project.name}</span>
                        </h1>
                        <p className="text-xs text-base-content/60">{project.description}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Project Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="border border-base-content/50 rounded-lg p-6 bg-base-100 shadow-sm relative mt-8">
                        <div className="absolute -top-[1.125rem] left-6 bg-base-100 px-4 py-1 border border-base-content/50 rounded-lg shadow-sm">
                            <h3 className="text-base font-semibold flex items-center gap-2">
                                <FolderCode className="w-4 h-4" />
                                Project Status
                            </h3>
                        </div>
                        <div className="mt-2">
                            <div className="p-4 rounded-lg bg-base-200/30">
                                <div className="grid grid-cols-10 gap-2">
                                    <div className="col-span-4 flex items-center gap-3">
                                        <FolderCode className="w-3.5 h-3.5 text-base-content/70" />
                                        <span className="text-xs font-medium">Project Path</span>
                                    </div>
                                    <div className="col-span-6 text-center">
                                        <span className="text-xs text-base-content/70 truncate inline-block max-w-full">
                                            {project.folderPath}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-10 gap-2 mt-4">
                                    <div className="col-span-4 flex items-center gap-3">
                                        <GitBranch className="w-3.5 h-3.5 text-base-content/70" />
                                        <span className="text-xs font-medium">Active Branch</span>
                                    </div>
                                    <div className="col-span-6">
                                        <div className="flex gap-2">
                                            <select
                                                value={selectedBranch}
                                                onChange={handleBranchChange}
                                                className="select select-sm flex-1 bg-base-100 border border-base-content/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-center"
                                            >
                                                {sampleBranches.map(branch => (
                                                    <option key={branch} value={branch}>
                                                        {branch}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handlePullUpdates()}
                                                className="btn btn-sm btn-ghost text-sky-500 hover:text-sky-400 hover:bg-sky-500/10 border border-base-content/50 rounded-md flex items-center gap-1.5"
                                            >
                                                <Cloud className="w-4 h-4" />
                                                Pull
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-base-200/30 mt-4">
                                    <div className="grid grid-cols-10 gap-2">
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div
                                                className={`w-2 h-2 mr-1 rounded-full ${
                                                    isRunning ? 'bg-emerald-500' : 'bg-rose-500'
                                                } animate-[pulse_2s_ease-in-out_infinite]`}
                                            ></div>
                                            <span className="text-xs font-medium">Server Status</span>
                                        </div>
                                        <div className="col-span-6">
                                            <button
                                                className={`btn btn-ghost btn-sm rounded-md transition-all duration-200 w-full ${
                                                    isRunning
                                                        ? 'text-rose-500 hover:bg-rose-500/10'
                                                        : 'text-emerald-500 hover:bg-emerald-500/10'
                                                }`}
                                                onClick={toggleServer}
                                            >
                                                {isRunning ? (
                                                    <>
                                                        <StopCircleIcon className="w-4 h-4" /> Stop
                                                    </>
                                                ) : (
                                                    <>
                                                        <PlayCircleIcon className="w-4 h-4" /> Start
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Output */}
                    <div className="border border-base-content/50 rounded-lg p-6 bg-base-100 shadow-sm relative">
                        <div className="absolute -top-[1.125rem] left-6 bg-base-100 px-4 py-1 border border-base-content/50 rounded-lg shadow-sm">
                            <h3 className="text-base font-semibold flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                Terminal Output
                            </h3>
                        </div>
                        <div className="mt-2 font-mono rounded-lg p-4 h-64 overflow-auto text-xs">
                            <div className="flex justify-end mb-2 ">
                                <button className="btn btn-ghost btn-sm rounded-md">Clear</button>
                            </div>
                            <pre data-prefix="$">
                                <code>git status</code>
                            </pre>
                            <pre>
                                <code>On branch {selectedBranch}</code>
                            </pre>
                            <pre>
                                <code>Your branch is up to date with 'origin/{selectedBranch}'</code>
                            </pre>
                            <pre data-prefix="$">
                                <code>npm run build</code>
                            </pre>
                            <pre data-prefix="✓" className="text-success">
                                <code>Build completed successfully</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Right Column - Deployment History */}
                <div>
                    <div className="border border-base-content/50 rounded-lg p-6 bg-base-100 shadow-sm relative mt-8">
                        <div className="absolute -top-[1.125rem] left-6 bg-base-100 px-4 py-1 border border-base-content/50 rounded-lg shadow-sm">
                            <h3 className="text-base font-semibold flex items-center gap-2">
                                <GitCommit className="w-4 h-4" />
                                Deployment History
                            </h3>
                        </div>
                        <div className="mt-2 h-[calc(4*5.5rem)] overflow-y-auto pr-2 -mr-2">
                            <div className="space-y-3">
                                {project.deploymentHistory.map(deployment => (
                                    <div
                                        key={deployment.id}
                                        className={`border rounded-lg p-4 hover:bg-base-200/50 transition-all duration-200 ${
                                            deployment.status === 'success'
                                                ? 'border-emerald-500/75 bg-emerald-500/5'
                                                : 'border-rose-500/75 bg-rose-500/5'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-xs font-medium">{deployment.branch}</p>
                                                <p className="text-[11px] text-base-content/60">
                                                    {new Date(deployment.timestamp).toLocaleString()}
                                                </p>
                                                <p className="text-[11px] text-base-content/60">
                                                    Commit: {deployment.commit}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
