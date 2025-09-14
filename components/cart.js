"use client";
import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase/config';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';

const CartModal = ({ isOpen, onClose, onLogin }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const modalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Zamykanie modala po opuszczeniu go myszką
  const handleMouseLeave = () => {
    // Ustaw timer, który zamknie modal po krótkiej chwili
    // To daje użytkownikowi czas na powrót
    timeoutRef.current = setTimeout(() => {
        onClose();
    }, 300); // 300ms opóźnienia
  };

  // Anulowanie timera, jeśli mysz wróci do modala
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
  };


  // Efekt do nasłuchiwania zmian w stanie uwierzytelnienia użytkownika
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Efekt do pobierania danych z localStorage i obliczania sumy
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
    calculateTotalPrice(storedCart);
  }, []);

  // Funkcja do obliczania całkowitej ceny
  const calculateTotalPrice = (items) => {
    // Przekształć stringi z cenami na liczby, a w razie błędu przyjmij wartość 0
   const total = items.reduce((sum, item) => {
     const price = parseFloat(item.price) || 0; // Użycie parseFloat z fallbackiem do 0
     return sum + (price * item.quantity);
   }, 0);
   setTotalPrice(total);
  };

  // Funkcja do usuwania produktu
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  // Funkcja do finalizacji zamówienia
  const handleCheckout = () => {
    if (isAuthenticated) {
      // Przekierowanie do strony finalizacji zamówienia
      alert("Przechodzę do finalizacji zamówienia!");
    } else {
      // Wywołanie funkcji logowania
      alert("Musisz być zalogowany, aby sfinalizować zamówienie!");
      onClose();
      onLogin(); 
    }
  };

  // Dodatkowy warunek dla animacji
  const modalClass = isOpen ? 'translate-x-0' : 'translate-x-full';

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full bg-transparent z-100 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      onClick={onClose}
    >
      {/* Modal Content - Zmieniono z justify-center na flex-row-reverse i pozycjonowanie */}
      <div 
        ref={modalRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white/90 shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${modalClass}`}
        onClick={e => e.stopPropagation()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">Twój Koszyk</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-green-500 transition-colors">
            <FaTimes size={24} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="modal-body max-h-screen overflow-y-auto mb-4">
          {cartItems.length > 0 ? (
            <>
              {/* Cart List */}
              <ul className="space-y-4">
                {cartItems.map(item => (
                  // Cart Item
                  <li key={item.id} className="flex items-center space-x-4 border-b last:border-b-0 pb-4 last:pb-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded" 
                    />
                    {/* Item Details */}
                    <div className="flex-1">
                      <span className="block font-medium text-gray-900">{item.name}</span>
                      <span className="block text-gray-600 text-sm">{item.quantity} x ${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}</span>
                    </div>
                    {/* Remove Button */}
                    <button 
                      onClick={() => handleRemoveItem(item.id)} 
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            // Empty Cart Message
            <p className="text-center text-gray-500 italic">Twój koszyk jest pusty.</p>
          )}
        </div>
        
        {/* Modal Footer */}
        {cartItems.length > 0 && (
          <div className="flex flex-col items-center gap-4 border-t pt-4">

            {/* Total Price */}
            <div className="flex justify-between w-full md:w-auto md:space-x-2 text-lg font-semibold mb-4 md:mb-0">
              <span className="text-sm text-gray-700"> Całkowita wartość: </span>
              <span className="text-sm text-gray-900"> ${totalPrice.toFixed(2)} </span>
            </div>

            {/* Checkout Button */}
            <button 
              className="w-full md:w-auto px-6 py-3 bg-green-400 text-white font-semibold hover:bg-green-500 transition-colors" 
              onClick={handleCheckout}
            >
              Przejdź do płatności
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;