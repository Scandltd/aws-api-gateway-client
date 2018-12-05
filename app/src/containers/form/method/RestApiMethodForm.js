import React, {Component} from 'react';
import BaseFormContainer from '../BaseFormContainer';


class RestApiMethodForm extends BaseFormContainer {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state.data = this.initData({
            name: '',
            path: '',
            cors: false
        });

        this.setValidationRules({
            name: {
                presence: {
                    allowEmpty: false
                },
                length: {
                    minimum: 3,
                    maximum: 40
                },
            },
            path: {
                presence: {
                    allowEmpty: false
                },
                length: {
                    minimum: 3,
                    maximum: 40
                },
            }
        });
    }

    /**
     *
     */
    onRequestSuccess = (response) => {
        this.setState({isProcessing: false});
        this.props.onSuccess();
    };

    /**
     *
     * @param err
     */
    onRequestError = (err) => {
        this.setState({isProcessing: false});
        //@todo handle 422 errors
    };

    /**
     *
     */
    onSubmitValid = () => {
        if (this.props.isUpdateAction) {
            if (!this.props.entityId) {
                throw new Error('Please provide an entityId property!');
            }

            this.setState({isProcessing: true});
            this.props.actions.updateRestAPi(this.props.accountId, this.props.entityId, this.state.data, this.props.initialData, this.onRequestSuccess, this.onRequestError);
        } else {
            this.setState({isProcessing: true});
            this.props.actions.createRestApi(this.props.accountId, this.state.data, this.onRequestSuccess, this.onRequestError);
        }
    };

    render() {
        return this.renderForm(
            <React.Fragment>

            </React.Fragment>
        );
    }
}

export default RestApiMethodForm;

RestApiMethodForm.propTypes = {};