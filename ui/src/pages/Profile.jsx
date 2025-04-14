import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { User2Icon, Settings, Clock, ActivitySquare, FolderGit2, PlayCircle, StopCircle } from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Hardcoded user data
    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        recentProjects: [
            { id: 1, name: 'Deploy-N-Chill', status: 'running', lastAccessed: '2025-04-14T10:30:00Z' },
            { id: 2, name: 'E-Commerce API', status: 'stopped', lastAccessed: '2025-04-13T15:45:00Z' },
            { id: 3, name: 'Portfolio Website', status: 'running', lastAccessed: '2025-04-12T09:15:00Z' },
            { id: 4, name: 'Task Manager', status: 'stopped', lastAccessed: '2025-04-11T14:20:00Z' }
        ],
        activities: [
            { id: 1, action: 'Started server', project: 'Deploy-N-Chill', timestamp: '2025-04-14T08:30:00Z' },
            { id: 2, action: 'Stopped server', project: 'E-Commerce API', timestamp: '2025-04-13T17:45:00Z' },
            { id: 3, action: 'Started server', project: 'Portfolio Website', timestamp: '2025-04-12T09:15:00Z' },
            { id: 4, action: 'Stopped server', project: 'Task Manager', timestamp: '2025-04-11T16:30:00Z' },
            { id: 5, action: 'Started server', project: 'Deploy-N-Chill', timestamp: '2025-04-11T11:20:00Z' }
        ]
    };

    const ProfileSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const handleUpdateProfile = (values) => {
        console.log('Profile update values:', values);
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto p-4 space-y-6 max-w-6xl">
            {/* Profile Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <User2Icon className="w-8 h-8" />
                    Profile Settings
                </h1>
            </div>

            {/* Profile Info Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="border rounded-lg p-6 bg-base-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Personal Information
                            </h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="btn btn-sm btn-outline"
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        <Formik
                            initialValues={{
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                email: userData.email,
                            }}
                            validationSchema={ProfileSchema}
                            onSubmit={handleUpdateProfile}
                        >
                            {({ errors, touched }) => (
                                <Form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <Field
                                                name="firstName"
                                                type="text"
                                                disabled={!isEditing}
                                                className="input input-bordered w-full"
                                            />
                                            {errors.firstName && touched.firstName && (
                                                <p className="text-error text-sm">{errors.firstName}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Last Name</label>
                                            <Field
                                                name="lastName"
                                                type="text"
                                                disabled={!isEditing}
                                                className="input input-bordered w-full"
                                            />
                                            {errors.lastName && touched.lastName && (
                                                <p className="text-error text-sm">{errors.lastName}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <Field
                                            name="email"
                                            type="email"
                                            disabled={!isEditing}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.email && touched.email && (
                                            <p className="text-error text-sm">{errors.email}</p>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Save Changes
                                        </button>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* Recent Activities */}
                    <div className="border rounded-lg p-6 bg-base-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <ActivitySquare className="w-5 h-5" />
                                Recent Activities
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {userData.activities.map(activity => (
                                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-base-200/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        {activity.action === 'Started server' ? (
                                            <PlayCircle className="w-5 h-5 text-success" />
                                        ) : (
                                            <StopCircle className="w-5 h-5 text-error" />
                                        )}
                                        <div>
                                            <p className="font-medium">{activity.action}</p>
                                            <p className="text-sm text-base-content/60">{activity.project}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-base-content/60" />
                                        <span className="text-sm text-base-content/60">
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Projects */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-base-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <FolderGit2 className="w-5 h-5" />
                                Recent Projects
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {userData.recentProjects.map(project => (
                                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-base-200/50 transition-all">
                                    <div>
                                        <p className="font-medium">{project.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-2 h-2 rounded-full ${
                                                project.status === 'running' ? 'bg-success' : 'bg-error'
                                            }`}></div>
                                            <span className="text-sm text-base-content/60 capitalize">{project.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-base-content/60" />
                                        <span className="text-sm text-base-content/60">
                                            {new Date(project.lastAccessed).toLocaleString()}
                                        </span>
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

export default Profile;