import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import Encounter from './containers/Encounter/Encounter';
import {Route, Switch} from "react-router-dom";
import About from "./components/Layout/Footer/About/About";
import Aux from "./hoc/Aux";

class App extends Component {


    render() {
        return (
            <Aux>


                <Layout>
                    <Encounter/>
                </Layout>

            </Aux>
        );
    }
}


export default App;
