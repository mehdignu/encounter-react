import React from 'react';
import Aux from '../../hoc/Aux';
import Navigation from '../UI/Navigation/Navigation';
import classes from './Layout.scss';
/* global gapi */


const layout = (props) => (
    <Aux>


        <Navigation {...props} />

        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
