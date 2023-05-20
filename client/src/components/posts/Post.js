import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Comments from '../comment/Comments';

import Spinner from '../layout/Spinner';

const Post = () => {
    const { _id } = useParams();

    const { data, loading } = useQuery(GET_POST, {
        variables: { postId: _id },
    });

    if (loading) return <Spinner />;

    return (
        <Fragment>
            <section className='flex flex-col w-full border-b-2 mb-2 mt-4'>
                <header className='mb-2 w-11/12 self-center'>
                    <div className='text-3xl font-Equinox-bold'>
                    {data.getPost.title}
                    </div>
                </header>
                <div className='border-2 self-center rounded-md w-11/12 py-4 px-2 mb-4'>
                    {data.getPost.body}
                </div>
            </section>
            <Comments postId={_id} />
        </Fragment>
    );
};

const GET_POST = gql`
    query ($postId: ID!) {
        getPost(postId: $postId) {
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

export default Post;
