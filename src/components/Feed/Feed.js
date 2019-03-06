import React from 'react';
import CardEvent from './CardEvent/CardEvent';
import Aux from '../../hoc/Aux';

const Feed = (props) => {

    return (

        <Aux>
            <CardEvent/>
            <CardEvent/>
            <CardEvent/>
        </Aux>

    );
};

export default Feed;
