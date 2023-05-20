import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteComment = ({ userId, postId, commentId }) => {
    const authContext = useContext(AuthContext);

    const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
        refetchQueries: [
            {
                query: GET_COMMENTS,
                variables: { postId: postId },
            },
        ],
    });

    const { user, isAuthenticated } = authContext;

    const handleClick = () => {
        deleteComment({
            variables: { commentId: commentId },
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
                        className='bg-steel-blue text-center text-white border-2 hover:bg-blue-300  block pt-1 pb-1 px-2 mt-1'
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

const DELETE_COMMENT = gql`
    mutation ($commentId: ID!) {
        deleteComment(commentId: $commentId)
    }
`;

const GET_COMMENTS = gql`
    query ($postId: ID!) {
        getComments(postId: $postId) {
            body
            user
            post
            id
        }
    }
`;

export default DeleteComment;
