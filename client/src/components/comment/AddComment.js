import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../util/Header';

import { useMutation, gql } from '@apollo/client';

const AddComment = ({ postId }) => {
    const [showModal, setModal] = useState(false);

    const [createComment, { error }] = useMutation(CREATE_COMMENT, {
        refetchQueries: [
            {
                query: GET_COMMENTS,
                variables: { postId: postId },
            },
        ],
    });

    const [comment, setComment] = useState({
        body: '',
    });

    const { body } = comment;

    const handleChange = (eve) => {
        setComment({ ...comment, [eve.target.name]: eve.target.value });
    };

    const handleReset = () => {
        setComment({
            body: '',
        });
    };

    const handleClick = () => {
        if (showModal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };
    console.log(body)
    const handleSubmit = (eve) => {
        eve.preventDefault();
        createComment({
            variables: {
                body: body,
                postId: postId,
            },
        });

        if (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            {showModal ? (
                <button
                    className='text-white bg-steel-blue mb-4 border-2 p-1 cursor-pointer hover:bg-blue-300  w-11/12 self-center '
                    onClick={handleClick}>
                    Cancel Add Comment
                    <FontAwesomeIcon icon='window-close' className='ml-2' />
                </button>
            ) : (
                <button
                    className='text-white bg-steel-blue mb-4 border-2 p-1 cursor-pointer hover:bg-blue-300 w-11/12 self-center '
                    onClick={handleClick}>
                    Add Comment
                    <FontAwesomeIcon icon='folder-plus' className='ml-2' />
                </button>
            )}
            <div
                style={showModal ? {} : { display: 'none' }}
                className='w-11/12 sm:w-2/3 md:w-1/2 xl:w-1/3 mb-4 self-center'>
                <form
                    className='flex flex-col border-2'
                    onSubmit={(eve) => handleSubmit(eve)}
                    onReset={handleReset}>
                    <Header
                        header={'Add Comment'}
                        sx={{ marginBottom: '1.5rem', padding: '.75rem' }}
                    />
                    <label className='w-11/12 self-center'>Body:</label>
                    <input
                        required
                        className='w-11/12 self-center border-2 mb-6'
                        type='text'
                        placeholder='Enter a Comment Body'
                        name='body'
                        value={body}
                        onChange={(eve) => handleChange(eve)}
                    />
                    <button
                        type='reset'
                        className='text-white bg-steel-blue mb-4 border-2 p-1 cursor-pointer hover:bg-blue-300 w-11/12 self-center '>
                        Clear{' '}
                        <FontAwesomeIcon icon='undo-alt' className='ml-2' />
                    </button>
                    <button
                        type='submit'
                        className='text-white bg-steel-blue mb-4 border-2 p-1 cursor-pointer hover:bg-blue-300  w-11/12 self-center '>
                        Add Post
                        <FontAwesomeIcon icon='clone' className='ml-2' />
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

const GET_COMMENTS = gql`
    query ($postId: ID!) {
        getComments(postId: $postId) {
            body,
            user,
            post, 
            id
        }
    }
`;

const CREATE_COMMENT = gql`
    mutation ($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            body,
            user
        }
    }
`;

export default AddComment;
