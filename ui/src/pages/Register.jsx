import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router';

import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate();

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });

    const registerMutation = useMutation({
        mutationFn: async userData => {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        },
        onSuccess: data => {
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        }
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-8">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Join Deploy-N-Chill</h2>
                    <p className="text-gray-400">Start your deployment automation journey</p>
                </div>

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={values => registerMutation.mutate(values)}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="flex gap-4">
                                <div className="space-y-1 flex-1">
                                    <Field
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        className="input w-full rounded-xl h-14 bg-gray-900/50 border-gray-800 focus:border-primary placeholder-gray-500"
                                    />
                                    {errors.firstName && touched.firstName && (
                                        <p className="text-sm text-error px-1">{errors.firstName}</p>
                                    )}
                                </div>

                                <div className="space-y-1 flex-1">
                                    <Field
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        className="input w-full rounded-xl h-14 bg-gray-900/50 border-gray-800 focus:border-primary placeholder-gray-500"
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <p className="text-sm text-error px-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    className="input w-full rounded-xl h-14 bg-gray-900/50 border-gray-800 focus:border-primary placeholder-gray-500"
                                />
                                {errors.email && touched.email && (
                                    <p className="text-sm text-error px-1">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Create password"
                                    className="input w-full rounded-xl h-14 bg-gray-900/50 border-gray-800 focus:border-primary placeholder-gray-500"
                                />
                                {errors.password && touched.password && (
                                    <p className="text-sm text-error px-1">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="input w-full rounded-xl h-14 bg-gray-900/50 border-gray-800 focus:border-primary placeholder-gray-500"
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <p className="text-sm text-error px-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {registerMutation.isError && (
                                <p className="text-sm text-error px-1">{registerMutation.error.message}</p>
                            )}

                            <button
                                type="submit"
                                className={`btn btn-primary w-full h-14 rounded-xl text-lg shadow-lg hover:shadow-primary/20 transition-all ${
                                    registerMutation.isLoading || isSubmitting ? 'loading' : ''
                                }`}
                                disabled={registerMutation.isLoading || isSubmitting}
                            >
                                {registerMutation.isLoading || isSubmitting ? 'Creating Account...' : 'Get Started'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="divider text-gray-600">Already have an account?</div>

                <div className="text-center">
                    <Link to="/login" className="text-gray-400 hover:text-primary transition-colors duration-200">
                        Sign in to your existing account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
