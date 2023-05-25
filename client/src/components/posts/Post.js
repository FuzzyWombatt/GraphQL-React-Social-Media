import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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
            <section className='flex flex-col border-b-2 mb-2 mt-4 w-11/12 self-center'>
                <Link to={`/`}>
                    <button className='bg-steel-blue text-center text-white border-2 hover:bg-blue-300 block pt-1 pb-1 px-4 mb-4 mt-1 w-fit'>
                        Back{' '}
                        <FontAwesomeIcon icon='arrow-left' className='ml-2' />
                    </button>
                </Link>
                <header className='mb-2 self-center w-full'>
                    <div className='text-3xl font-Equinox-bold'>
                        {data.getPost.title}
                    </div>
                </header>
                <div className='border-2 self-center w-full rounded-md py-4 px-2 mb-4'>
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

/*
const MULTI_QUERY = gql`
query Query($postId: ID!, $getPostPostId2: ID!) {
    getComments(postId: $postId) {
      body
      date
      downvotes
      id
      user
      upvotes
      post
      dateEdited
      totalvote
    }
    getPost(postId: $getPostPostId2) {
      totalVote
    }
  }
  `

{variables: {
  "postId": "61ddf72bf8bc927ab92fdacd",
  "getPostPostId2": "61ddf72bf8bc927ab92fdacd"
}}
*/

export default Post;
