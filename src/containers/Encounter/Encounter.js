import React from 'react';
import Feed from '../../components/Feed/Feed';
import PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import Create from "../../components/Create/Create";
import Event from "../../components/Event/Event";

function Encounter(props) {


    return (

        <Switch>
            <Route path="/event" component={Event} />
            <Route path="/create" component={Create}/>
            <Route path="/" exact component={Feed} />
        </Switch>


    );
}


export default Encounter;
