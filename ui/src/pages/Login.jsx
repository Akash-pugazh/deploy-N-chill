import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import axios from '../utils/axios';

const Login = () => {
    const navigate = useNavigate();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const loginMutation = useMutation({
        mutationFn: async credentials => axios.post('/api/auth/login', credentials),
        onSuccess: data => {
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        }
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-8">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Welcome Back!</h2>
                    <p className="text-gray-400">Ready to streamline your deployments?</p>
                </div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={values => loginMutation.mutate(values)}
                >
                    {({ errors, touched, isSubmitting, isValid }) => (
                        <Form className="space-y-6">
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
                                    placeholder="Password"
                                    className="input w-full rounded-xl h-14 bg-gray-900/50 border-gray-800 focus:border-primary placeholder-gray-500"
                                />
                                {errors.password && touched.password && (
                                    <p className="text-sm text-error px-1">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary w-full h-14 rounded-xl text-lg shadow-lg hover:shadow-primary/20 transition-all ${
                                    loginMutation.isLoading || isSubmitting ? 'relative' : ''
                                }`}
                                disabled={!isValid || loginMutation.isError}
                            >
                                {loginMutation.isError && (
                                    <span className=" text-red-500 text-sm">{loginMutation.error.message}</span>
                                )}
                                {!loginMutation.isError && (loginMutation.isLoading || isSubmitting) ? (
                                    <span className="flex items-center justify-center">
                                        <span className="loading loading-dots loading-xs"></span>
                                        <span className="ml-2">Authenticating</span>
                                    </span>
                                ) : (
                                    !loginMutation.isError && 'Launch Session'
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="divider text-gray-600">New to Deploy-N-Chill?</div>

                <div className="text-center">
                    <Link to="/register" className="text-gray-400 hover:text-primary transition-colors duration-200">
                        Create your account and start deploying with ease
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
