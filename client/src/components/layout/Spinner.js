import React, { Fragment } from 'react';
import spinner from '../../assets/images/spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img
                src={spinner}
                alt='Loading...'
                className='w-200 m-auto block justify-center'
            />
        </Fragment>
    );
};

export default Spinner;
