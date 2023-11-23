import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type NotificationType = {
    message: string;
    notificationType: string;
    isNotification: boolean; 
};

type NotificationReducers = {
    showNotification: (state: NotificationType, action: PayloadAction<NotificationType>) => NotificationType, 
    hideNotification: (state: NotificationType) => NotificationType
};

const notificationSlice = createSlice<NotificationType, NotificationReducers>({
    name: 'notification-slice',
    initialState: {
       message: '',
       notificationType: '',
       isNotification: false
    },
    reducers: {
        showNotification(state, action) {
            const newNotification: NotificationType = { 
                message: action.payload.message,
                notificationType: action.payload.notificationType,
                isNotification: action.payload.isNotification
            };
            
            return newNotification;
        },
        hideNotification(state) {
            const newNotification = { ...state, isNotification: false};
            return newNotification;
        }
    }
});

export const NotificationActions = notificationSlice.actions;
export default notificationSlice;
