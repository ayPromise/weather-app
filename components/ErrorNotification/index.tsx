"use client"

import { Notification } from '@mantine/core';
import { useEffect, useState } from 'react';

type ErrorNotificationProps = {
    message: string;
    title?: string;
    autoCloseTime?: number;
};

const ErrorNotification = ({
    message,
    title = 'Error',
    autoCloseTime = 3000,
}: ErrorNotificationProps) => {
    const [visible, setVisible] = useState<boolean>(true);


    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, autoCloseTime);

            return () => clearTimeout(timer);
        }
    }, [visible, autoCloseTime]);

    return (
        <>
            {visible && (
                <Notification
                    title={title}
                    onClose={() => setVisible(false)}
                    color='red'
                    withCloseButton
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        width: '300px',
                        zIndex: 1000,
                    }}
                >
                    {message}
                </Notification>
            )}
        </>
    );
};

export default ErrorNotification
