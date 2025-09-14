// components/Notification.js

"use client";
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Notification = ({ message, type = 'success', isVisible }) => {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (isVisible) {
            setAnimationClass('translate-y-0 opacity-100');
        } else {
            setAnimationClass('translate-y-full opacity-0');
        }
    }, [isVisible]);

    const typeClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    const icon = type === 'success' ? <FaCheckCircle className="mr-2" /> : <FaExclamationCircle className="mr-2" />;

    return (
        <div 
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 transform 
                        flex items-center p-4 rounded-lg shadow-lg text-white 
                        transition-all duration-500 ease-in-out z-50 ${typeClasses[type]} ${animationClass}`}
        >
            {icon}
            <span>{message}</span>
        </div>
    );
};

export default Notification;