import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { gql, useMutation } from '@apollo/client';

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
                    <button onClick={handleClick}>delete button</button>
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
