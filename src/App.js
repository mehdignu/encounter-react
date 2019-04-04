import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import Encounter from './containers/Encounter/Encounter';
import Aux from "./hoc/Aux";
import ScrollToTop from "./components/UI/ScrollToTop/ScrollToTop";

class App extends Component {


    render() {
        return (
            <Aux>
                <ScrollToTop>
                <Layout>
                    <Encounter/>
                </Layout>
                </ScrollToTop>
            </Aux>
        );
    }
}


export default App;
