import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import Encounter from './containers/Encounter/Encounter';

class App extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <Layout>
                <Encounter/>
            </Layout>
        );
    }
}

export default App;
