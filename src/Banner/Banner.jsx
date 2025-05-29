import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from "motion/react";
import img1 from "../assets/team1.jpg";
import img2 from "../assets/team2.jpg";

const Banner = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 items-center">
                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">Easiest Way</span><br />
                            to Get Your New Job
                        </h1>
                        <p className="text-gray-500 mt-4 text-lg">
                            Each month, more than 3 million job seekers turn to our website in their search for work, making over 140,000 applications every single day.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-8 bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                            <select className="select select-bordered w-full sm:max-w-xs">
                                <option disabled selected>Industry</option>
                                <option>IT</option>
                                <option>Marketing</option>
                                <option>Design</option>
                            </select>
                            <select className="select select-bordered w-full sm:max-w-xs">
                                <option disabled selected>Location</option>
                                <option>Remote</option>
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Your keyword..."
                                className="input input-bordered w-full sm:max-w-sm"
                            />
                            <button className="btn btn-primary px-6 w-full sm:w-auto">
                                <FaSearch className="mr-2" />
                                Search
                            </button>
                        </div>

                        {/* Popular Tags */}
                        <div className="mt-4 text-sm text-gray-600">
                            <span className="font-semibold">Popular Searches:</span>{" "}
                            <span className="link link-hover mx-1">Designer</span>
                            <span className="link link-hover mx-1">Web</span>
                            <span className="link link-hover mx-1">IOS</span>
                            <span className="link link-hover mx-1">Developer</span>
                            <span className="link link-hover mx-1">PHP</span>
                            <span className="link link-hover mx-1">Senior</span>
                            <span className="link link-hover mx-1">Engineer</span>
                        </div>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex-1">
                            <motion.div
                            animate={{y: [100, 150, 100]}}
                            transition={{duration: 5, repeat: Infinity}} 
                            className="rounded-b-4xl rounded-tr-4xl overflow-hidden shadow-lg border-s-8 border-t-8 border-blue-500 max-w-sm">
                                <img
                                
                                    src={img1}
                                    alt="Team work"
                                    className="h-auto object-cover"
                                />
                            </motion.div>
                            <motion.div
                            animate={{x: [100, 150, 150]}}
                            transition={{duration: 5, repeat: Infinity}} 
                            className="rounded-t-4xl rounded-bl-4xl overflow-hidden shadow-xl border-blue-400 border-r-8 border-b-8 max-w-sm">
                                <img
                                    src={img2}
                                    alt="People discussion"
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;