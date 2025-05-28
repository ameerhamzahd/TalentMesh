import React, { use, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, Bounce } from 'react-toastify';
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaLock } from 'react-icons/fa';
import { TbLogin2 } from 'react-icons/tb';
import Lottie from 'lottie-react';
import loginLottie from "../../assets/login-animation.json";

const Login = () => {

    const { googleLogin, setUser, loginUser } = use(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();

    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleGoogleLogin = () => {
        googleLogin()
            .then((userCredential) => {
                setUser(userCredential.user);

                toast.success(`Login successful!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });

                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                toast.error(`Login failed: ${error.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }

    const handleLogin = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        loginUser(email, password)
            .then((userCredential) => {
                setUser(userCredential.user);

                toast.success(`Login successful!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });

                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
                toast.error(`Login failed: ${error.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    };

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen pt-30 flex-col">
            <h2 className="mb-6 text-3xl font-bold text-center text-black">Login</h2>
                <div className='flex flex-col-reverse lg:flex-row w-2/3 gap-10 justify-center'>
                <div className="p-8 mx-auto w-11/12 max-w-md rounded-2xl border shadow-2xl backdrop-blur-md bg-white/10 border-white/30">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-4 text-black" />
                            <input
                                ref={emailRef}
                                name='email'
                                type="email"
                                required
                                onFocus={() => setEmailFocused(true)}
                                onBlur={(event) => setEmailFocused(event.target.value !== '')}
                                className="pt-6 pr-10 pb-2 pl-10 w-full placeholder-transparent text-black border-b border-black bg-white/20 focus:outline-none focus:border-primary"
                            />
                            <label
                                className={`absolute left-10 text-black transition-all duration-300 ${emailFocused ? 'top-1 text-xs' : 'top-4 text-sm'
                                    }`}
                            >
                                Email
                            </label>
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-4 text-black" />
                            <input
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                required
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={(event) => setPasswordFocused(event.target.value !== '')}
                                className="pt-6 pr-10 pb-2 pl-10 w-full placeholder-transparent text-black border-b border-black bg-white/20 focus:outline-none focus:border-primary"
                            />
                            <label
                                className={`absolute left-10 text-black transition-all duration-300 ${passwordFocused ? 'top-1 text-xs' : 'top-4 text-sm'
                                    }`}
                            >
                                Password
                            </label>
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-4 text-black cursor-pointer"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-sm font-semibold text-black">
                            <label className="flex gap-2 items-center cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                Remember Me
                            </label>
                        </div>

                        <div className="mt-4 form-control">
                            <button type='submit' className="w-full rounded-full transition-all duration-300 btn btn-neutral">
                                Login <TbLogin2 size={20} />
                            </button>
                        </div>

                        <div className="relative my-5">
                            <div className="flex absolute inset-0 items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="flex relative justify-center text-sm">
                                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                            </div>
                        </div>

                        <div className='mt-5 space-y-3'>
                            <button onClick={handleGoogleLogin} className='w-full rounded-full btn btn-outline btn-primary'><FaGoogle size={15} /> Login with Google</button>
                        </div>
                    </form>

                    <p className="mt-6 text-sm font-semibold text-center text-black">
                        Don’t have an account?{' '}
                        <Link to="/register" className="cursor-pointer text-primary hover:underline">
                            Register
                        </Link>
                    </p>
                </div>

                <div className='flex items-center justify-center'>
                    <Lottie style={{width: "300px"}} animationData={loginLottie} loop={true}></Lottie>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;