import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import AuthContext from '../../context/auth/authContext';
import Header from '../util/Header';
import Wave from '../util/Wave';

const Register = () => {
    const nameWave = 'User Name'.split('');
    const emailWave = 'Email'.split('');
    const passwordWave = 'Password'.split('');
    const passwordCheckWave = 'Confirm Password'.split('');

    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    });

    const { register, isAuthenticated } = authContext;

    const { name, email, password, passwordCheck } = user;

    const handleChange = (eve) => {
        setUser({ ...user, [eve.target.name]: eve.target.value });
    };


    const handleSubmit = (eve) => {
        eve.preventDefault();
        register({
            name,
            email,
            password,
        });
    };

    if (isAuthenticated) return <Navigate to='/' />;
    
    return (
        <div className='grid h-full'>
            <form className='flex flex-col w-400 border-2 rounded-lg self-center justify-self-center' onSubmit={handleSubmit}>
            <Header
                header={'Register New Account'}
                sx={{ padding: '1.25rem', borderRadius: '6px 6px 0 0' }}
            />
            <div className='flex flex-col relative pt-10 pl-10 pr-10'>
                    <input
                        required
                        className='border-b-2 bg-transparent text-steel-blue focus:outline-none focus:border-blue-300'
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                    <label className='absolute text-steel-blue' htmlFor='email'>
                        {nameWave.map((char, ind) => {
                            return (
                                <Wave key={uuidv4()} char={char} ind={ind} />
                            );
                        })}
                    </label>
                </div>
                <div className='flex flex-col relative pt-10 pl-10 pr-10'>
                    <input
                        required
                        className='border-b-2 bg-transparent text-steel-blue focus:outline-none focus:border-blue-300'
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                    <label className='absolute text-steel-blue' htmlFor='email'>
                        {emailWave.map((char, ind) => {
                            return (
                                <Wave key={uuidv4()} char={char} ind={ind} />
                            );
                        })}
                    </label>
                </div>
                <div className='flex flex-col relative pt-10 pr-10 pl-10'>
                    <input
                        required
                        className='border-b-2 bg-transparent text-steel-blue focus:outline-none focus:border-blue-300'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                    />
                    <label
                        className='absolute  text-steel-blue'
                        htmlFor='password'>
                        {passwordWave.map((char, ind) => {
                            return (
                                <Wave key={uuidv4()} char={char} ind={ind} />
                            );
                        })}
                    </label>
                </div>
                <div className='flex flex-col relative pt-10 pl-10 pr-10'>
                    <input
                        required
                        className='border-b-2 bg-transparent text-steel-blue focus:outline-none focus:border-blue-300'
                        type='password'
                        name='passwordCheck'
                        value={passwordCheck}
                        onChange={handleChange}
                    />
                    <label
                        className='absolute  text-steel-blue'
                        htmlFor='passwordCheck'>
                        {passwordCheckWave.map((char, ind) => {
                            return (
                                <Wave key={uuidv4()} char={char} ind={ind} />
                            );
                        })}
                    </label>
                </div>
                 <div className='pt-10 pl-10 pr-10 mb-6'>     
                <button
                    className='w-full pt-3 pb-3 bg-steel-blue text-white cursor-pointer font-Equinox hover:bg-blue-300 rounded-md'
                    type='submit'>
                    Register
                </button>
                </div>
            </form>
        </div>
    );
};

export default Register;