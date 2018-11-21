import React, { Component } from 'react';
import './App.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { BrowserRouter} from 'react-router-dom';
import Main from '../components/main/Main';
import {loadAccountList} from "../store/actions/accountActions";
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

/**
 * App component
 */
class App extends Component {

    /**
     *
     * @param props
     */
    constructor (props) {
        super(props);
        if(!this.props.loaded) {
            this.props.actions.loadAccounts();
        }
    }

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
        accounts: state.account.accounts,
        loaded: state.account.loaded,
        isLoading: state.appParams.isLoading
    }
};

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadAccounts: () => dispatch(loadAccountList())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps) (App);
