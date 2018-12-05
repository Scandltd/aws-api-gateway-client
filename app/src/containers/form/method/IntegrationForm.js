import React from 'react';
import BaseFormContainer from '../BaseFormContainer';
import { connect } from "react-redux";

/**
 *
 */
class IntegrationForm extends BaseFormContainer {
    render() {
        return this.renderForm(
            <React.Fragment>
                The form goes here
            </React.Fragment>
        );
    }
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            //createHttpMethod: (accountId, restApiId, resourceId, data, onSuccess = null, onError = null) => dispatch(createMethodApiRequest(accountId, restApiId, resourceId, data, onSuccess, onError)),
        }
    }
};

export default connect(null, mapDispatchToProps)(IntegrationForm);

IntegrationForm.propTypes = {};