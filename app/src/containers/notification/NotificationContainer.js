import React, {Component} from 'react';
import { removeNotification } from "../../store/actions/notificationActions";
import { connect } from 'react-redux';
import SnackbarCustom from '../../components/snackbar/SnackbarCustom';

/**
 *
 */
class NotificationContainer extends Component
{

    /**
     *
     * @param notificationId
     */
    handleClose = (notificationId) => {
        this.props.actions.removeNotification(notificationId);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const notifications = this.props.notification.notifications;

        let message = <React.Fragment />;
        if (0 !== notifications.length) {
            const notification = notifications[0];
            message = (<SnackbarCustom
                id={notification.id}
                variant={notification.variant}
                message={notification.message}
                onClose={this.handleClose}
            />);
        }

        return message;
    }
}

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
};

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            removeNotification: (notificationId) => dispatch(removeNotification(notificationId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);

NotificationContainer.propTypes = {};