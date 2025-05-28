import React, { use, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, Bounce } from 'react-toastify';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaGoogle } from 'react-icons/fa';
import { MdSpaceDashboard } from "react-icons/md";
import { FaImage } from 'react-icons/fa6';
import Lottie from 'lottie-react';
import registerLottie from "../../assets/register-animation.json";

const Register = () => {

    const { googleLogin, setUser, createUser, updateUser } = use(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [urlFocused, setURLFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleGoogleLogin = () => {
        googleLogin()
            .then((userCredential) => {
                setUser(userCredential.user);

                toast.success(`Registration successful!`, {
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
                toast.error(`Registration failed: ${error.message}`, {
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

    const handleRegister = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const photoURL = event.target.photoURL.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms = event.target.terms.checked;

        const passwordRegExp = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegExp.test(password)) {
            toast.error(`Password must have one lowercase, one uppercase and at least 6 characters.`, {
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
            return;
        }

        if (!terms) {
            toast.error(`Please accept our Terms & Conditions.`, {
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
            return;
        }

        createUser(email, password)
            .then((userCredential) => {
                updateUser({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        setUser({ ...userCredential.user, displayName: name, photoURL: photoURL });

                        toast.success(`Registration successful!`, {
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

                        navigate(location.state ? location.state : "/");
                    })
                    .catch((error) => {
                        toast.error(`Update failed: ${error.message}`, {
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
                        setUser(userCredential.user);
                    });
            })
            .catch((error) => {
                toast.error(`Registration failed: ${error.message}`, {
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
            });
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center pt-30">
                <h2 className="text-3xl font-bold text-black text-center mb-10">Registration</h2>
                <div className='flex flex-col-reverse lg:flex-row w-2/3 gap-10 justify-center'>
                    <div className="p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/30 lg:w-1/2">
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="relative">
                                <FaUser className="absolute left-3 top-4 text-black" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    onFocus={() => setNameFocused(true)}
                                    onBlur={(event) => setNameFocused(event.target.value !== '')}
                                    className="w-full pl-10 pr-10 pt-6 pb-2 bg-white/20 text-black placeholder-transparent focus:outline-none border-b border-black focus:border-primary"
                                />
                                <label
                                    className={`absolute left-10 text-black transition-all duration-300 ${nameFocused ? 'top-1 text-xs' : 'top-4 text-sm'
                                        }`}
                                >
                                    Name
                                </label>
                            </div>

                            <div className="relative">
                                <FaImage className="absolute left-3 top-4 text-black" />
                                <input
                                    name="photoURL"
                                    type="text"
                                    required
                                    onFocus={() => setURLFocused(true)}
                                    onBlur={(event) => setURLFocused(event.target.value !== '')}
                                    className="w-full pl-10 pr-10 pt-6 pb-2 bg-white/20 text-black placeholder-transparent focus:outline-none border-b border-black focus:border-primary"
                                />
                                <label
                                    className={`absolute left-10 text-black transition-all duration-300 ${urlFocused ? 'top-1 text-xs' : 'top-4 text-sm'
                                        }`}
                                >
                                    PhotoURL
                                </label>
                            </div>

                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-4 text-black" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={(event) => setEmailFocused(event.target.value !== '')}
                                    className="w-full pl-10 pr-10 pt-6 pb-2 bg-white/20 text-black placeholder-transparent focus:outline-none border-b border-black focus:border-primary"
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
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={(event) => setPasswordFocused(event.target.value !== '')}
                                    className="w-full pl-10 pr-10 pt-6 pb-2 bg-white/20 text-black placeholder-transparent focus:outline-none border-b border-black focus:border-primary"
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

                            <div className="flex items-center justify-between text-sm text-black font-semibold">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input name='terms' type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                    Accept Terms & Conditions
                                </label>
                            </div>

                            <div className="form-control mt-4">
                                <button type='submit' className="btn btn-neutral w-full rounded-full transition-all duration-300">
                                    Register <MdSpaceDashboard size={20} />
                                </button>
                            </div>

                            <div className="relative my-5">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className='space-y-3 mt-5'>
                                <button onClick={handleGoogleLogin} className='btn w-full rounded-full btn-outline btn-primary'><FaGoogle size={15} />Login with Google</button>
                            </div>
                        </form>

                        <p className="text-black text-sm text-center mt-6 font-semibold">
                            Already have an account?{' '}
                            <Link to="/login" className="cursor-pointer text-primary hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className='flex justify-center items-center'>
                        <Lottie style={{width: "300px"}} animationData={registerLottie} loop={true}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;