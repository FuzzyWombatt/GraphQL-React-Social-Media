import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFolderPlus,
    faHome,
    faInfoCircle,
    faQuestion,
    faSearch,
    faSignInAlt,
    faSignOutAlt,
    faUndoAlt,
    faWindowClose,
    faTrashAlt,
    faArrowRight,
    faArrowLeft,
    faExchangeAlt,
    faArrowUp,
    faArrowDown,
    faUser,
    faRecycle,
    faClone,
} from '@fortawesome/free-solid-svg-icons';

import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Post from './components/posts/Post'

library.add(
    faInfoCircle,
    faHome,
    faSignOutAlt,
    faSignInAlt,
    faQuestion,
    faWindowClose,
    faSearch,
    faUndoAlt,
    faTrashAlt,
    faArrowRight,
    faArrowLeft,
    faExchangeAlt,
    faArrowUp,
    faArrowDown,
    faUser,
    faRecycle,
    faClone,
);

const App = () => {
    return (
        <Router>
            <Navbar title={'Enviromental Tracker'} icon={'recycle'} />
            <div className='flex flex-col h-full pt-24'>
                <Routes>
                    <Route exact path='/posts/:_id' element={<Post />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/' element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
