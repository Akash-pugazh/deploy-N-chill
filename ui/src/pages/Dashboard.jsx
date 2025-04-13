import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import Loading from './Loading';

const Dashboard = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () =>
            axios
                .get('/projects')
                .then(res => res.data)
                .catch(err => {
                    throw err.response.data;
                })
    });

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        console.log('Error:', error);
        return <div>Error loading data: {JSON.stringify(error)}</div>;
    }

    console.log(data);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Data fetched successfully!</p>
            {
            data?.projects.map(project => (
                    <div key={project.id}>
                        <h2>{project.name}</h2>
                    </div>
                ))
            }
        </div>
    );
};

export default Dashboard;
