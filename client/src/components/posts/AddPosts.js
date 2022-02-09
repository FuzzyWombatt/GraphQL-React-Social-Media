import React, { Fragment, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, gql } from '@apollo/client';

import Header from '../util/Header';

const AddPost = () => {
    const [createPost, { error }] = useMutation(CREATE_POST, {
        refetchQueries: [GET_POSTS,'getPosts'],
    });
    const [showModal, setModal] = useState(false);

    const [post, setPost] = useState({
        title: '',
        body: '',
    });

    const { title, body } = post;

    const handleChange = (eve) => {
        setPost({ ...post, [eve.target.name]: eve.target.value });
    };

    const handleReset = () => {
        setPost({
            title: '',
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

    const handleSubmit = (eve) => {
        eve.preventDefault();
        createPost({
            variables: {
                title: title,
                body: body,
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
                    Cancel Add Post
                    <FontAwesomeIcon icon='window-close' className='ml-2' />
                </button>
            ) : (
                <button
                    className='text-white bg-steel-blue mb-4 border-2 p-1 cursor-pointer hover:bg-blue-300 w-11/12 self-center '
                    onClick={handleClick}>
                    Add Post
                    <FontAwesomeIcon icon='clone' className='ml-2' />
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
                        header={'Add Post'}
                        sx={{ marginBottom: '1.5rem', padding: '.75rem' }}
                    />
                    <label className='w-11/12 self-center'>Title:</label>
                    <input
                        required
                        className='w-11/12 self-center border-2 mb-6'
                        type='text'
                        placeholder='Enter a Post title'
                        name='title'
                        value={title}
                        onChange={(eve) => handleChange(eve)}
                    />
                    <label className='w-11/12 self-center'>Body:</label>
                    <input
                        required
                        className='w-11/12 self-center border-2 mb-6'
                        type='text'
                        placeholder='Enter a post body'
                        name='body'
                        value={body}
                        onChange={(eve) => handleChange(eve)}
                    />
                    <div className='mb-4 self-center w-11/12'></div>
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

const CREATE_POST = gql`
    mutation createPost($title: String!, $body: String!) {
        createPost(title: $title, body: $body) {
            id
            user
            creator
            title
            body
            totalVote
            date
            commentCount
        }
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

export default AddPost;
