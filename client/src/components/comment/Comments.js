import React, { Fragment, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import Spinner from '../layout/Spinner';
import AuthContext from '../../context/auth/authContext';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

const Comments = ({ postId }) => {
    const authContext = useContext(AuthContext);
    const { error, data, loading } = useQuery(GET_COMMENTS, {
        variables: { postId: postId },
    });

    console.log(postId);

    const { isAuthenticated } = authContext;

    if (loading) {
        return (
            <div className='self-center'>
                <Spinner />
            </div>
        );
    }

    if (error) return <div>Error Ahoy!</div>;

    return (
        <Fragment>
            {isAuthenticated ? <AddComment postId={postId} /> : null}
            <div className='flex flex-col w-11/12 self-center'>
                {data.getComments.length !== 0 ? (
                    data.getComments.map((comment) => {
                        return (
                            <CommentItem key={comment.id} comment={comment} />
                        );
                    })
                ) : 
                    <p>No comments in thread</p>
                }
            </div>
        </Fragment>
    );
};

const GET_COMMENTS = gql`
    query ($postId: ID!) {
        getComments(postId: $postId) {
            user,
            body,
            post, 
            id
        }
    }
`;

export default Comments;
