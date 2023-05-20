import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditPost = ({ userId }) => {
    const authContext = useContext(AuthContext);

    const { user, isAuthenticated } = authContext;

    const handleClick = () => {
        console.log('edit post logic goes here');
    };

    if (isAuthenticated && user !== null)
        return (
            <Fragment>
                {user.id === userId ? (
                    <button
                        className='bg-steel-blue text-center text-white border-2 hover:bg-blue-300  block pt-1 pb-1'
                        onClick={handleClick}
                    >
                        Edit{' '}
                        <FontAwesomeIcon icon='exchange-alt' className='ml-2' />
                    </button>
                ) : null}
            </Fragment>
        );

    return null;
};

export default EditPost;
