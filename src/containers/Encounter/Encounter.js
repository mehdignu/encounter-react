import React from 'react';
import Feed from '../../components/Feed/Feed';
import {Route, Switch} from "react-router-dom";
import Create from "../../components/Create/Create";
import Event from "../../components/Event/Event";
import Show from "../../components/Show/Show";
import Requests from "../../components/UI/Navigation/Requests/Requests";
import Notifications from "../../components/UI/Navigation/Notifications/Notifications";
import ShowProfile from "../../components/Profile/ShowProfile/ShowProfile";
import EditProfile from "../../components/Profile/EditProfile/EditProfile";
import About from "../../components/Layout/Footer/About/About";
import Contact from "../../components/Layout/Footer/Contact/Contact";
import Legal from "../../components/Layout/Footer/Legal/Legal";
import Privacy from "../../components/Layout/Footer/Privacy/Privacy";

function Encounter(props) {


    return (

        <Switch>
            <Route path="/edit_profile" exact component={EditProfile} />
            <Route path="/user/:id" exact component={ShowProfile} />
            <Route path="/share/:id" exact component={Show} />
            <Route path="/notifications" exact component={Notifications} />
            <Route path="/requests" exact component={Requests} />
            <Route path="/event/:id" component={Event} />
            <Route path="/eventForm" component={Create}/>
            <Route path="/about" component={About}/>
            <Route path="/legal" component={Legal}/>
            <Route path="/privacy" component={Privacy}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/" exact component={Feed} />
        </Switch>


    );
}


export default Encounter;
