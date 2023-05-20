import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ header, sx }) => {
    return (
        <header
            className='text-3xl text-white font-Equinox-bold text-center bg-steel-blue'
            style={sx}
        >
            {header}
        </header>
    );
};

export default Header;

Header.defaultProps = {
    header: 'Header',
    sx: { padding: '.75rem' },
};

Header.propTypes = {
    header: PropTypes.string.isRequired,
    sx: PropTypes.object.isRequired,
};
