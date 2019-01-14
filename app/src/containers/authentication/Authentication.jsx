import React, { Component } from 'react';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';
import { connect } from 'react-redux';
import AuthenticateForm from '../../containers/form/authenticate/AuthenticateForm';

class Authentication extends Component {
    handleClose = () => {
        this.props.history.push('/');
    };

    handleSuccess = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <DialogFormComponent
                title="Connect new account"
                open={ true }
                onClose={ this.handleClose }
            >
                <AuthenticateForm
                    onSuccess={this.handleSuccess}
                    onCancel={this.handleClose}
                />
            </DialogFormComponent>
        );
    }
}

export default connect()(Authentication);

Authentication.propTypes = {};