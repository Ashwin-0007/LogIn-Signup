import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username && !email) {
            setError('Please enter your username or email.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
    
        const data = {
            username: username,
            email: email,
            password: password,
        };
        try {
            const res = await axios.post("http://localhost:8000/user/login", data);
            console.log('Result', res);
            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="main-container mt-30 w-[350px] h-fit bg-pink-50 rounded-md shadow-lg p-10">
                <h1 className="header font-bold text-center text-2xl mb-4">Login</h1>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form className="inputs flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        className="border-2 rounded-md mb-4 p-2"
                        value={username || email}
                        onChange={(e) => {
                            const { value } = e.target;
                            // Check if the input looks like an email address
                            if (value.includes("@")) {
                                setEmail(value);
                                setError('');
                            } else {
                                setUsername(value);
                                setError('');
                            }
                        }}
                    />
                    <div className="relative mb-4 border-2 rounded-md">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="p-2 pr-10"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        />
                        {showPassword ? (
                            <FaEyeSlash
                                className="absolute top-3 right-3 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FaEye
                                className="absolute top-3 right-3 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <button className="btn1 bg-blue-400 text-white rounded-md py-2">LOG IN</button>
                </form>
                <div className="btns mt-6">
                    Don't have an account?
                    <Link to="/signup" className="btn1 text-blue-700"> Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
