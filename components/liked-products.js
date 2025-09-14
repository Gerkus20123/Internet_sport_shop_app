"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa'; 

const LikedProductsModal = ({ isOpen, onClose }) => {
    const [likedItems, setLikedItems] = useState([]);
    const modalRef = useRef(null);
    const timeoutRef = useRef(null);

    // Efekt do pobierania danych z localStorage
    useEffect(() => {
        const storedLiked = JSON.parse(localStorage.getItem('likedItems')) || [];
        setLikedItems(storedLiked);
    }, []);

    // Funkcja do usuwania produktu z listy ulubionych
    const handleRemoveLikedItem = (itemId) => {
        const updatedLiked = likedItems.filter(item => item.id !== itemId);
        setLikedItems(updatedLiked);
        localStorage.setItem('likedItems', JSON.stringify(updatedLiked));
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            onClose();
        }, 300); // 300ms opóźnienia
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const modalClass = isOpen ? 'translate-x-0' : 'translate-x-full';
    return (
        <div 
            className={`fixed top-0 left-0 w-full h-full bg-transparent z-100 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={onClose}
        >
            <div 
            ref={modalRef}
            className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white/90 shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${modalClass}`}
            onClick={e => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            {/* Nagłówek */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-2xl font-semibold text-gray-800">Twoje Ulubione</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
                <FaTimes size={24} />
                </button>
            </div>
            
            {/* Lista ulubionych produktów */}
            <div className="modal-body max-h-screen overflow-y-auto mb-4">
                {likedItems.length > 0 ? (
                <ul className="space-y-4">
                    {likedItems.map(item => (
                    <li key={item.id} className="flex items-center space-x-4 border-b last:border-b-0 pb-4 last:pb-0">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                        <span className="block font-medium text-gray-900">{item.name}</span>
                        <span className="block text-gray-600 text-sm">${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                        {/* Przycisk do usuwania */}
                        <button onClick={() => handleRemoveLikedItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                        <FaTimes />
                        </button>
                    </li>
                    ))}
                </ul>
                ) : (
                <p className="text-center text-gray-500 italic">Nie masz jeszcze ulubionych produktów.</p>
                )}
            </div>

            </div>
        </div>
    );
};

export default LikedProductsModal;