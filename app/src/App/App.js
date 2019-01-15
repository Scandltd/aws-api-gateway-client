import React, { Component } from 'react';
import './App.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { BrowserRouter} from 'react-router-dom';
import Main from '../components/main/Main';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import NotificationContainer from '../containers/notification/NotificationContainer';

/**
 * App component
 */
class App extends Component {

    /**
    *
    */
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <CssBaseline />
                    <Header isLoading={this.props.isLoading} />
                    <Main />
                    <Footer />
                    <NotificationContainer />
                </div>
            </BrowserRouter>
        );
    }
}


/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        isLoading: state.appParams.isLoading
    }
};

export default connect(mapStateToProps, {}) (App);
