import React from 'react';
import { Link } from 'react-router-dom';
import bannerVideo from '../../assets/CannabisVideo.mp4';
import bannerImage from '../../assets/header.png';

export default function BannerComponent() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source src={bannerVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between h-full px-8 text-white">
                {/* Text Section */}
                <div className="max-w-lg">
                    <h4 className="uppercase tracking-wider font-semibold text-4xl">Welcome to</h4> {/* Increased font size */}
                    <h1 className="text-6xl font-bold mt-4">The Green Republic</h1> {/* Increased font size */}
                    <p className="mt-6 font-semibold tracking-wider">
                        Welcome to Green Republic, your trusted source for premium cannabis products crafted with care and precision.
                        Discover a greener way to enhance your wellness and elevate your lifestyle responsibly.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md shadow-lg font-semibold tracking-wider">
                        <Link to="/shop">EXPLORE NOW</Link>
                    </button>
                </div>

                {/* Banner Image */}
                <div className="w-full max-w-md flex justify-center">
                    <img
                        src={bannerImage}
                        alt="Banner"
                        className="w-full mt-10"
                    />
                </div>
            </div>
        </div>
    );
}
