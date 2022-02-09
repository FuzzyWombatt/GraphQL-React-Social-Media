import React, {Fragment, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import AddComment from '../comment/AddComment';
import Comments from '../comment/Comments';
import AuthContext from '../../context/auth/authContext';

import Spinner from '../layout/Spinner';

const Post = () => {
    const {_id} = useParams();

    const { error, data, loading } = useQuery(GET_POST, {
        variables: {postId: _id}
    });
    if(loading) return <Spinner />

    return (
        <Fragment>
            <div>{_id}</div>
            <Comments postId={_id}/>
        </Fragment>
    )
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
