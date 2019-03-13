import React from 'react';
import Feed from '../../components/Feed/Feed';
import {Route, Switch} from "react-router-dom";
import Create from "../../components/Create/Create";
import Event from "../../components/Event/Event";
import Show from "../../components/Show/Show";
import Requests from "../../components/UI/Navigation/Requests/Requests";
import Notifications from "../../components/UI/Navigation/Notifications/Notifications";

function Encounter(props) {


    return (

        <Switch>
            <Route path="/show" exact component={Show} />
            <Route path="/notifications" exact component={Notifications} />
            <Route path="/requests" exact component={Requests} />
            <Route path="/event" component={Event} />
            <Route path="/create" component={Create}/>
            <Route path="/" exact component={Feed} />
        </Switch>


    );
}


export default Encounter;
