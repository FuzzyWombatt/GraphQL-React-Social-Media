import React, {Fragment} from 'react'
import PropTypes from 'prop-types';

const Wave = ({char, ind}) => {
    let transDelay = 50*ind

    return (
        <Fragment>
            <span className='whitespace-pre' style={{transitionDelay: `${transDelay}ms`}}>{char}</span>
        </Fragment>
    )
}

Wave.propTypes = {
    char: PropTypes.string.isRequired,
    ind: PropTypes.number.isRequired,
};

export default Wave
