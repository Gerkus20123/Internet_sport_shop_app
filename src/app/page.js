"use client"

import Navbar from '../../components/nav-bar';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'
import LoginModal from '../../components/account';
import Footer from '../../components/footer';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import CartModal from '../../components/cart';
import LikedProductsModal from '../../components/liked-products';
import Notification from '../../components/notification';
import { FaRegStar, FaStar } from 'react-icons/fa';

// Importuj dane produktów z ich oddzielnych plików
import { K_C_B_Jackets } from '../../products/Kids/Clothes/Boy/Jackets/products.js';
import { K_C_G_Jackets } from '../../products/Kids/Clothes/Girl/Jackets/products.js';
import { K_C_B_Tshirts } from '../../products/Kids/Clothes/Boy/T-shirts_Poloes/T-Shirts/products.js';
import { K_C_G_Tops } from '../../products/Kids/Clothes/Girl/Tops/products.js';

const StarGradient = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#bbe8c5ff', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1ca85fff', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
  </svg>
);

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfilePic, setUserProfilePic] = useState("/photo.png")
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);
  const [likedItems, setLikedItems] = useState([]); 
  const [likedCount, setLikedCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState({ message: '', type: '', isVisible: false });


  // Otwieranie modalu do Login
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Otwieranie modalu do Cart
  const openCartModal = () => {
    // Sprawdź, czy użytkownik jest zalogowany
    if (isLoggedIn) {
      setIsCartModalOpen(true); // Jeśli tak, otwórz modal ulubionych
    } else {
      openModal(); // Jeśli nie, otwórz modal logowania
    }
  };
  const closeCartModal = () => setIsCartModalOpen(false);

  // Funkcje do otwierania i zamykania modala ulubionych
  const openLikedModal = () => {
    // Sprawdź, czy użytkownik jest zalogowany
    if (isLoggedIn) {
        setIsLikedModalOpen(true); // Jeśli tak, otwórz modal ulubionych
    } else {
        openModal(); // Jeśli nie, otwórz modal logowania
    }
  };
  const closeLikedModal = () => setIsLikedModalOpen(false);


  // Funkcje do obsługi logowania i wylogowania
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserProfilePic("/photo.png");
    closeModal();
  };


  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
        setNotification({ message: '', type: '', isVisible: false });
    }, 3000); // Powiadomienie zniknie po 3 sekundach
  };

  const addToCart = (product) => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItemIndex = storedCart.findIndex(item => item.id === product.id);

      // Wybieramy obraz do dodania do koszyka
      // Użyj pierwszego obrazu z listy dostępnych (niezależnie od hover)
      const hasNestedColors = product.colors && product.colors.length > 0 && typeof product.colors[0] === 'object';
      const selectedColorIndex = selectedColors[product.id] || 0;
      const imagesForProduct = hasNestedColors ? product.colors[selectedColorIndex].images : product.images;
      const imageUrl = imagesForProduct['388_562'][0];

      const productWithImage = {
          ...product,
          quantity: 1,
          price: parseFloat(product.price), // Upewniamy się, że cena jest liczbą
          image: imageUrl // Dodajemy poprawną ścieżkę do obrazu
      };

      if (existingItemIndex > -1) {
          // Jeśli produkt już jest w koszyku, tylko zwiększamy ilość
          storedCart[existingItemIndex].quantity += 1;
      } else {
          // Dodajemy nowy produkt z obrazem
          storedCart.push(productWithImage);
          showNotification(`${product.name} został dodany do koszyka!`, 'success');
      }

      localStorage.setItem('cartItems', JSON.stringify(storedCart));
      setIsCartModalOpen(true);
    }
  };


  const handleToggleLiked = (product) => {
    if (typeof window !== 'undefined') {
      const existingItemIndex = likedItems.findIndex(item => item.id === product.id);
      let updatedLiked;

      if (existingItemIndex > -1) {
        // Usuń, jeśli już jest w ulubionych
        updatedLiked = likedItems.filter(item => item.id !== product.id);
        showNotification(`${product.name} został usunięty z ulubionych.`, 'error');
      } else {
        // Dodaj do ulubionych
        const imageUrl = product.colors?.[0]?.images?.['388_562']?.[0] || product.images?.['388_562']?.[0];
        const newLikedItem = { ...product, image: imageUrl };
        updatedLiked = [...likedItems, newLikedItem];
        showNotification(`${product.name} został dodany do ulubionych!`, 'success');
      }
      // Zapisujemy zaktualizowaną tablicę do localStorage
      localStorage.setItem('likedItems', JSON.stringify(updatedLiked));
      setLikedItems(updatedLiked);
      setLikedCount(updatedLiked.length);
    }
  };

  // Tablica z adresami obrazów do karuzeli
  const images = [
    {
      src: '/Home/current_offers/Image_1.png',
      title: 'Summer & Winter',
      buttons: [
        { text: 'Women', href: '/women' },
        { text: 'Men', href: '/men' },
      ],
    },
    {
      src: '/Home/current_offers/Image_2.png',
      title: 'Limited Offers',
      buttons: [
        { text: 'New collection', href: '/new-collection' },
        { text: 'Summer offers', href: '/summer-offers' },
      ],
    },
    {
      src: '/Home/current_offers/Image_3.jpg',
      title: 'Back to School',
      buttons: [
        { text: 'Girl', href: '/girl' },
        { text: 'Boy', href: '/boy' },
      ],
    },
  ];

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  // Dodajemy useEffect do automatycznego przełączania
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(interval); // Czyszczenie interwału po odmontowaniu komponentu
  }, [currentImageIndex, handleNext]); // Dodajemy zależności

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
// Przywraca domyślne przewijanie, gdy modal jest zamknięty.
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Użytkownik jest zalogowany
        setIsLoggedIn(true);
        console.log("User is signed in:", user.uid);
      } else {
        // Użytkownik jest wylogowany
        setIsLoggedIn(false);
        setUserProfilePic("/photo.png");
        console.log("User is signed out.");
      }
    });
    // Zwróć funkcję czyszczącą, aby usunąć subskrypcję po odmontowaniu komponentu
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    // Nowa logika do liczenia ulubionych produktów z localStorage
    const storedLiked = JSON.parse(localStorage.getItem('likedItems')) || [];
    setLikedCount(storedLiked.length);
  }, [likedCount]);

    // Pobieramy dane dla aktualnie wyświetlanego obrazu
  const currentImage = images[currentImageIndex];

  // Połącz wszystkie zaimportowane produkty w jedną tablicę
  const allNewProducts = [...K_C_B_Jackets, ...K_C_G_Jackets, ...K_C_B_Tshirts, ...K_C_G_Tops];

  useEffect(() => {
    // Check if window is defined (i.e., we are in the browser)
    if (typeof window !== 'undefined') {
      const storedLiked = JSON.parse(localStorage.getItem('likedItems')) || [];
      setLikedItems(storedLiked);
      setLikedCount(storedLiked.length);
    }
  }, []);

  const handleColorClick = (productId, colorIndex) => {
    setSelectedColors(prevState => ({
      ...prevState,
      [productId]: colorIndex,
    }));
  };  

  return (
    <>
      <StarGradient />
      <Navbar 
        onLoginClick={openModal}
        onCartClick={openCartModal}
        onLikedProductsClick={openLikedModal}
        likedCount={likedCount}
        isLoggedIn={isLoggedIn}
        userProfilePic={userProfilePic}
        onLogoutClick={() => {
          setIsLoggedIn(false);
          setUserProfilePic("/photo.png");
        }}
      />

      <main className={styles.main}>
        <section>
          
{/* Lista aktualności */}
          <div className={styles.current_offers}>
            
            <div className={styles.logo}>
              {images.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={`Image ${index + 1}`}
                  fill
                  className={`${styles.carouselImage} ${index === currentImageIndex ? styles.active : ''}`}
                />
              ))}

              {/* Przycisk ze strzałką w lewo */}
              <button onClick={handlePrev} className={`${styles.carouselArrow} ${styles.left}`}>
                &lt;
              </button>
              {/* Przycisk ze strzałką w prawo */}
              <button onClick={handleNext} className={`${styles.carouselArrow} ${styles.right}`}>
                &gt;
              </button>

              {/* Kontener z przyciskami nałożony na obraz */}
              <div className={styles.buttonsOverlay}>
                {currentImage.title && <h2 className={styles.overlayTitle}>{currentImage.title}</h2>}
                {/* Dynamiczne renderowanie przycisków na podstawie danych */}
                {currentImage.buttons.map((button, index) => (
                  <Link key={index} href={button.href}>
                    <button className={styles.overlayButton}>
                      {button.text}
                    </button>
                  </Link>
                ))}
              </div>
              
              {/* Paginacja karuzeli */}
              <div className={styles.carouselPagination}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`${styles.paginationDot} ${index === currentImageIndex ? styles.dotActive : ''}`}
                  ></button>
                ))}
              </div>

            </div>
          </div>

{/* Poznaj nasze produkty */}
          <div className={styles.offers}>
            <h1> Our products </h1>
            <div className={styles.productGallery}>

              <div className={styles.productItem}>
                <Image
                  src="/Products/Kids/Clothes/Boy/Jackets/K_C_B_Jacket_1/388_562/1.jpg"
                  alt="Boy jacket"
                  width={250}
                  height={350}
                />
                <div className={styles.overlay}>
                  <h2> Boy jackets </h2>
                  <Link href="/Products/Kids/Clothes/Boy/Jackets/" className={styles.ovButton}>
                    See
                  </Link>
                </div>
              </div>

              <div className={styles.productItem}>
                <Image
                  src="/Products/Kids/Clothes/Boy/T-shirts_Poloes/T-shirts/K_C_B_TiShPol_TiSh_1/black/388_562/2.jpg"
                  alt="Boy T-shirt"
                  width={250}
                  height={350}
                />
                <div className={styles.overlay}>
                  <h2> Boy T-shirts </h2>
                  <Link href="/Products/Kids/Clothes/Boy/T-shirts/" className={styles.ovButton}>
                    See
                  </Link>
                </div>
              </div>

              <div className={styles.productItem}>
                <Image
                  src="/Products/Kids/Clothes/Girl/Jackets/K_C_G_Jacket_1/388_562/1.jpg"
                  alt="Girl jacket"
                  width={250}
                  height={350}
                />
                <div className={styles.overlay}>
                  <h2> Girl jackets </h2>
                  <Link href="/Products/Kids/Clothes/Girl/Jackets/" className={styles.ovButton}>
                    See
                  </Link>
                </div>
              </div>

              <div className={styles.productItem}>
                <Image
                  src="/Products/Kids/Clothes/Girl/Tops/K_C_G_Tops_1/388_562/1.jpg"
                  alt="Girl top"
                  width={250}
                  height={350}
                />
                <div className={styles.overlay}>
                  <h2> Girl tops </h2>
                  <Link href="/Products/Kids/Clothes/Girl/Tops" className={styles.ovButton}>
                    See
                  </Link>
                </div>
              </div>
            </div>
          </div>

{/* Nowa kolekcja */}
          <div className={styles.new_collection}>
            <h1> New offers </h1>
            <div className={styles.productGallery}>
              {allNewProducts.map((product) => {
                const hasNestedColors = product.colors && product.colors.length > 0 && typeof product.colors[0] === 'object';
                
                const selectedColorIndex = selectedColors[product.id] || 0;

                const imagesForProduct = hasNestedColors
                  ? product.colors[selectedColorIndex].images
                  : product.images;

                const isProductLiked = likedItems.some(item => item.id === product.id);

                return (
                    <div 
                      key={product.id}
                      className={styles.fullProductCard}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div 
                        className={styles.productItem}
                      >
                        {/* Obraz produktu, który jest tłem dla przycisków */}
                        <Link href={`/product/${product.id}`} className={styles.productLink}>
                          <Image
                            src={hoveredProduct === product.id ? imagesForProduct['388_562'][1] : imagesForProduct['388_562'][0]}
                            alt={product.name}
                            width={250}
                            height={350}
                            className={styles.productImage}
                          />
                        </Link>
                        {/* Przyciski, które pojawią się nad obrazem */}
                        {hoveredProduct === product.id && (
                          <>
                            <button 
                              className={styles.addToCartButton}
                              onClick={(e) => {
                                e.preventDefault(); // Zapobiega nawigacji do strony produktu
                                addToCart(product);
                              }}
                            >
                                Add to cart
                            </button>

                             <button
                                className={styles.likedProductButton}
                                onClick={() => handleToggleLiked(product)}
                             >
                                {isProductLiked ? (
                                  <div className={styles.likedIconCircle}>
                                      <FaStar
                                        // Zastosowanie stylów SVG, aby kontrolować wypełnienie
                                        style={{
                                          fill: 'url(#star-gradient)' // Użycie ID gradientu
                                        }}
                                      />
                                  </div>
                                ) : (
                                  <div className={styles.likedIconCircle}>
                                      <FaRegStar />
                                  </div>
                                )}
                             </button>
                          </>
                        )}
                        
                      </div>

                      {/* Opis produktu */}
                      <div className={styles.productInfo}>
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                        <div className={styles.colorOptions}>
                          {product.colors.map((color, index) => (
                            <span 
                              key={index} 
                              style={{ backgroundColor: hasNestedColors ? color.code : color }} 
                              className={styles.colorCircle}
                              onClick={() => handleColorClick(product.id, index)} 
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

        </section>
      </main>

      {/* footer */}
      <Footer />
      

      <Notification 
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
      />

      {isCartModalOpen && (
        <CartModal 
          isOpen={isCartModalOpen} 
          onClose={closeCartModal}
          onLogin={openModal} // onLogin to funkcja do otwierania modala logowania
        />
      )}

      {isLikedModalOpen && (
        <LikedProductsModal
            isOpen={isLikedModalOpen} 
            onClose={() => {
                closeLikedModal();
                // Po zamknięciu modala, zaktualizuj licznik
                const storedLiked = JSON.parse(localStorage.getItem('likedItems')) || [];
                setLikedCount(storedLiked.length);
            }}
            onLogin={openModal} 
        />
      )}

      {isModalOpen && (
        <LoginModal 
          onClose={closeModal} 
          onLogin={handleLogin}
        />
      )}

    </>
  );
}
