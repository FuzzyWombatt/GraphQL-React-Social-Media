import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeletePost = ({ userId, postId }) => {
    const authContext = useContext(AuthContext);

    const [deletePost, { error }] = useMutation(DELETE_POST, {
        refetchQueries: [GET_POSTS, 'getPosts'],
    });

    const { user, isAuthenticated } = authContext;

    const handleClick = () => {
        deletePost({
            variables: { postId: postId },
        });

        if (error) {
            console.log(error);
        }
    };

    if (isAuthenticated && user !== null)
        return (
            <Fragment>
                {user.id === userId ? (
                    <button
                        className='bg-steel-blue text-center text-white border-2 hover:bg-blue-300  block pt-1 pb-1'
                        onClick={handleClick}
                    >
                        Delete{' '}
                        <FontAwesomeIcon icon='trash-alt' className='ml-2' />
                    </button>
                ) : null}
            </Fragment>
        );

    return null;
};

const DELETE_POST = gql`
    mutation ($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const GET_POSTS = gql`
    query {
        getPosts {
            id
            user
            creator
            title
            body
            totalVote
            commentCount
        }
    }
`;

export default DeletePost;
