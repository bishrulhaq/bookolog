import React, { useEffect, useState } from 'react';

const Notification = ({ message, type, duration }) => {
    const [show, setShow] = useState(true);
    const [initialPosition, setInitialPosition] = useState('-translate-y-4');

    useEffect(() => {

        const appearTimeout = setTimeout(() => setInitialPosition('translate-y-0'), 50);
        const hideTimeout = setTimeout(() => setShow(false), duration);

        return () => {
            clearTimeout(appearTimeout);
            clearTimeout(hideTimeout);
        };
    }, [duration]);

    if (!show) return null;

    return (
        <div
            className={`transition-all duration-300 ease-in-out ${show ? 'opacity-100 delay-0' : 'opacity-0 delay-300'} ${initialPosition} pl-5 pr-5 pt-2 pb-2 shadow-md z-50 ${
                type === 'success' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
            }`}
        >
            {message}
        </div>
    );
};

export default Notification;
