import React, { Fragment, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import Spinner from '../layout/Spinner';
import AuthContext from '../../context/auth/authContext';
import AddPost from './AddPosts';
import PostItem from './PostItem';

const Posts = () => {
    const authContext = useContext(AuthContext);

    const { error, data, loading } = useQuery(GET_POSTS);

    const { isAuthenticated } = authContext;

    if (loading) {
        return (
            <div className='self-center'>
                <Spinner />
            </div>
        );
    }
    if (error) return <div className='self-center'>Error Ahoy!</div>;

    return (
        <Fragment>
            {isAuthenticated ? <AddPost /> : null}
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 mr-4 ml-4 pb-4 w-11/12 self-center'>
                {data.getPosts.map((post) => {
                    return <PostItem key={post.id} post={post} />;
                })}
            </div>
        </Fragment>
    );
};

export default Posts;

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
