import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const handleClick = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <li className='self-center m-2'>
                <div className='hover:text-blue-300 flex flex-col items-center'>
                    <FontAwesomeIcon icon='user' />
                    <p>User</p>
                </div>
            </li>
            <button
                className='hover:text-blue-300 flex flex-col items-center self-center cursor-pointer m-2'
                onClick={handleClick}>
                <FontAwesomeIcon icon='sign-out-alt' />
                <p>Logout</p>
            </button>
        </Fragment>
    );

    const guestLinks = (
        <li className='self-center m-2'>
            <Link to='/login'>
                <div className='hover:text-blue-300 flex flex-col items-center'>
                    <FontAwesomeIcon icon='sign-in-alt' />
                    <p>Login</p>
                </div>
            </Link>
        </li>
    );

    return (
        <nav className='bg-steel-blue p-3 text-white flex flex-row mb-2 font-Equinox absolute w-full'>
            <FontAwesomeIcon
                color='white'
                icon={icon}
                className='mr-4 self-center rotate-45 text-3xl'
            />
            <h1 className='flex flex-col justify-center text-3xl'>{title}</h1>
            <ul className='flex flex-row flex-1 justify-end'>
                <li>
                    <Link to='/'>
                        <div className='hover:text-blue-300 flex flex-col items-center self-center cursor-pointer m-2'>
                            <FontAwesomeIcon icon='home' />
                            <p>Home</p>
                        </div>
                    </Link>
                </li>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {
    title: 'Navbar',
    icon: '',
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Navbar;
