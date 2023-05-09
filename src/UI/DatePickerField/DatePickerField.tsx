import React from 'react';
import { DatePicker, IDatePickerStyles } from '@fluentui/react';

const DatePickerField: React.FC = () => {

    const datePickerStyles: IDatePickerStyles = {
        textField: {
            "& .ms-TextField-field": {
                fontSize: 14,
                fontWeight: 400,
                fontFamily: `"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`,
                borderBottom: '2px solid rgb(33, 115, 70)',
                backgroundColor: '#f2f2f2',
                borderRadius: '3px 3px 0 0'
            }
        },
        root: {
            color: 'red',
            margin: '5px 0 0 0'
        },
        icon: {
        },
        callout: {
            "& .ms-CalendarDay-dayIsToday": {
                backgroundColor: 'rgb(33, 115, 70) !important'
            }
        }
    }

    return (
        <>
            <DatePicker borderless={true} styles={datePickerStyles} />
        </>
    )
}

export default DatePickerField;