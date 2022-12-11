import React from 'react';
// @ts-ignore
import { UilTimes } from '@iconscout/react-unicons';

export const Alert = ({ type = 'error', msg }: AlertProps) => {
    return (
        <div className={`alert ${type}`}>
            <UilTimes className="alert__close" />
            <strong>{type} : </strong>
            {msg}
        </div>
    );
};

interface AlertProps {
    type?: 'error' | 'success' | 'info';
    msg: string;
}
