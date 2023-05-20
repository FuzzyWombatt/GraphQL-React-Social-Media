import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import EditPost from './EditPost';
import DeletePost from './DeletePost';
import Header from '../util/Header';

const PostItem = ({ post }) => {
    const { id, user, title, body } = post;

    return (
        <div className='flex flex-col border-2 rounded-md'>
            <Header header={title} />
            <p className='p-2 h-200'>{body}</p>
            <div className='grid grid-cols-3 p-2 gap-2'>
                <Link
                    className='bg-steel-blue text-center text-white border-2 hover:bg-blue-300  block pt-1 pb-1'
                    to={`/posts/${id}`}
                >
                    More <FontAwesomeIcon icon='arrow-right' className='ml-2' />
                </Link>
                <DeletePost userId={user} postId={id} />
                <EditPost userId={user} postId={id} />
            </div>
        </div>
    );
};

export default PostItem;
