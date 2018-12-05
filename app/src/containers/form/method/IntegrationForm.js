import React from 'react';
import BaseFormContainer from '../BaseFormContainer';
import { connect } from "react-redux";
import RadioButtonsGroupField from '../fields/RadioButtonsGroupField';
import IntegrationTypeEnum from '../../../enum/integrationTypeEnum';

/**
 *
 */
class IntegrationForm extends BaseFormContainer {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state.data = this.initData({
            type: ''
        });

        this.setValidationRules({

        });
    }

    render() {
        return this.renderForm(
            <React.Fragment>
                <RadioButtonsGroupField
                    options={IntegrationTypeEnum}
                value={this.state.data.type}
                onChange={this.handleChange}
                label="Integration type"
                name="name"
                error={Boolean(this.state.errors.type) ? this.state.errors.type[0] : ''}
                helperText="Integration point for HTTP method"
                />
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