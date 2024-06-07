import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            {/* Navigation */}
            <nav className="w-full bg-white shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <a href="#" className="text-lg font-bold text-gray-800">Your Brand</a>
                        <div className="flex space-x-4">
                            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
                            <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
                            <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-12 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Brand</h1>
                    <p className="text-lg text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="flex justify-center">
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded mr-4">Login</Link>
                        <Link to="/signup" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded">Sign Up</Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-gray-600 mt-auto py-4">
                <p>&copy; {new Date().getFullYear()} Your Brand. All rights reserved.</p>
            </footer>
        </div>
  )
}

export default Home
