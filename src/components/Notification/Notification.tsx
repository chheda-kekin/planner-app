import React from 'react';
import { useSelector } from 'react-redux';
import { PlannerState, usePlannerDispatch } from '../../Store';
import { NotificationActions } from '../../slices/notification-slice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

const Notification: React.FC = () => {

    const { isNotification, notificationType, message } = useSelector((state: PlannerState) => state.notification);
    
    const dispatch = usePlannerDispatch();

    const onCloseHandler = () => {
        dispatch(NotificationActions.hideNotification());
    }

    return (
        <>
            {isNotification && <Snackbar 
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message=""
                ClickAwayListenerProps={{onClickAway: () => null}}
                autoHideDuration={6000}
                onClose={onCloseHandler}
                open={isNotification} 
                sx={{ width: '30%'}}>
                <MuiAlert severity={notificationType as AlertColor} sx={{ width: '100%'}}>{message}</MuiAlert>
            </Snackbar>}
        </>
    )
}

export default Notification;