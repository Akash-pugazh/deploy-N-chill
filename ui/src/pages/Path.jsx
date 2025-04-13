import React, { useState } from 'react';
import axios from '../utils/axios';
import { useMutation } from '@tanstack/react-query';

const Path = () => {

    const [selectedPath, setSelectedPath] = useState('');
    const mutation = useMutation({
        mutationFn: () => axios.post('/set-path', { path: selectedPath }), 
        onSuccess: () => {
            alert('Path set successfully!');
        },
        onError: (error) => {
            alert('Failed to set path: ' + (error.response?.data?.message || error.message));
        }
    })

    
    const handleBrowseClick = async () => {
        const dirHandle = await window.showDirectoryPicker();
        setSelectedPath(dirHandle.name);
    };

    return (
        <div className="flex flex-col gap-4 gap-y-4 px-20">
            <h1 className="italic">Config Folder path here...</h1>

            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    className="input input-bordered rounded-md flex-grow"
                    placeholder="Select folder where the projects are..."
                    value={selectedPath}
                    readOnly
                />
                <button className="btn btn-outline btn-primary rounded-md" onClick={handleBrowseClick}>
                    Browse
                </button>
            </div>

            <button
                className={`btn btn-outline btn-accent rounded-md ${mutation.isPending ? 'loading' : ''}`}
                onClick={mutation.mutate}
                disabled={!selectedPath || mutation.isPending}
            >
                {mutation.isPending ? 'Setting Path...' : 'Set Path'}
            </button>
        </div>
    );
};

export default Path;
