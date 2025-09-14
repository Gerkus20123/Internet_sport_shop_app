// components/Navbar.js

"use client"

import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { 
  FaUserCircle,
  FaChevronDown,
  FaSearch,
  FaShoppingCart,
  FaHeart } 
  from 'react-icons/fa';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Navbar({ onLoginClick, isLoggedIn, userProfilePic,
   onLogoutClick, userName, onCartClick, onLikedProductsClick, likedCount }) {

  // Stany dla każdego rozwijanego menu Dropdown
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);

  let timer;

  // Dropdown
  const handleMouseEnter = (dropdownName) => {
    clearTimeout(timer);
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setActiveDropdown(null);
    }, 50);
  };

  // Funkcje do obsługi paska wyszukiwania
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  return (

    <nav className={styles.nav}>
      <div className={styles.navContainer}>

        <div className={styles.topRow}>

          {/* Telephone and email */}
          <div className={styles.phone}>
            <p>
                +48 456 787 234
            </p>
          </div>
          <div className={styles.email}>
            <p>
                activeware@aw.com
            </p>
          </div>

          {/* Account - warunkowe renderowanie */}
          <ul className={styles.accountMenu}>
            
            <li>
              {isLoggedIn ? (
                  <div
                    ref={profileMenuRef}
                    className={styles.profileMenuContainer}
                  >
                   <button
                      onClick={handleProfileClick}
                      className={styles.profileButtonContainer}
                    >
                      <Image
                        src={userProfilePic}
                        alt="Zdjęcie profilowe użytkownika"
                        width={32}
                        height={32}
                        className={styles.profileImage}
                      />
                      <span className={styles.userName}> Gerkus20123 </span>
                      <FaChevronDown className={isProfileDropdownOpen ? styles.rotate : ''} />
                    </button>

                    {isProfileDropdownOpen && (
                        <div className={styles.profileDropdownPanel}>
                            <ul>
                                <li><Link href="/profile">Profile</Link></li>
                                <li><Link href="/settings">Settings</Link></li>
                                <li><button onClick={onLogoutClick} className={styles.logoutButton}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                  </div>
                ) : (
                  // Wyświetl ikonę logowania i przycisk, jeśli wylogowany
                  <button onClick={onLoginClick} className={styles.link}> 
                    <FaUserCircle className={styles.icon}/>
                  </button>
              )}
            </li>

          </ul>

          {/* New right side icons */}
          <div className={styles.rightIcons}>
            <div className={styles.searchBarContainer}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <FaSearch className={styles.searchIcon}/>
            </div>

            {/* Cart */}
            <button onClick={onCartClick} className={styles.link}>
              <FaShoppingCart className={styles.icon} />
            </button>

            {/* Liked products */}
            <button onClick={onLikedProductsClick} className={styles.link}>
              <FaHeart className={styles.icon} />
              {likedCount > 0 && <span className={styles.likedCounter}>{likedCount}</span>}
            </button>

          </div>

        </div>

        <div className={styles.bottomListCenter}>
          <div className={styles.bottomRow}>
              
              <div className={styles.logo}>
                <Link href="/" className={styles.link}>
                  <Image
                    src="/Firm_logo_shadowed.png"
                    alt="Logo firmy"
                    width={60}
                    height={60}
                  />
                </Link>
              </div>

              <ul className={styles.bottomList}>

                {/* New */}
                <div>
                  <li 
                    className={styles.dropdown}
                    onMouseEnter={() => handleMouseEnter('new')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={styles.dropdownToggle}>
                      New <FaChevronDown className={activeDropdown === 'new' ? styles.rotate : ''} />
                    </div>
                    {activeDropdown === 'new' && (
                      <div className={styles.dropdownPanelHorizontal}>
                        <ul>
                          <li><Link href="/new/new_colection"> New collection </Link></li>
                          <li><Link href="/new/he"> He </Link></li>
                          <li><Link href="/new/she"> She </Link></li>
                          <li><Link href="/new/she"> Kids </Link></li>
                        </ul>
                      </div>
                    )}
                  </li>
                </div>

                {/* He */}
                <div>
                  <li 
                    className={styles.dropdown}
                    onMouseEnter={() => handleMouseEnter('he')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={styles.dropdownToggle}>
                      He <FaChevronDown className={activeDropdown === 'he' ? styles.rotate : ''} />
                    </div>
                    {activeDropdown === 'he' && (
                      <div className={styles.dropdownPanelVertical}>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Boots </h4>
                          <li><Link href="/he/sneakers"> Sneakers </Link></li>
                          <li><Link href="/he/run"> Running </Link></li>
                          <li><Link href="/he/walk"> Walking </Link></li>
                          <li><Link href="/he/fitness"> Fitness & Training </Link></li>
                          <li><Link href="/he/football"> Football </Link></li>
                          <li><Link href="/he/golf"> Golf </Link></li>
                          <li><Link href="/he/outdoor"> Outdoor </Link></li>
                        </ul>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Clothes </h4>
                          <li><Link href="/he/tops"> T-shirts & Poloes </Link></li>
                          <li><Link href="/he/dresses"> Dresses & Pants </Link></li>
                          <li><Link href="/he/hoodies"> Hoodies </Link></li>
                          <li><Link href="/he/shirts"> Shirts </Link></li>
                          <li><Link href="/he/underware"> Underware </Link></li>
                          <li><Link href="/he/jackets"> Jackets </Link></li>
                          <li><Link href="/he/swim"> Swimming </Link></li>
                        </ul>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Accessories </h4>
                          <li><Link href="/he/socks"> Socks </Link></li>
                          <li><Link href="/he/bags"> Bags & Backpacks </Link></li>
                          <li><Link href="/he/glasses"> Glasses </Link></li>
                          <li><Link href="/he/balls"> Balls </Link></li>
                        </ul>
                        <div className={styles.logo}>
                          <Link href="/" className={styles.link}>
                            <Image
                              src="/man.png"
                              alt="man"
                              fill
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                </div>

                {/* She */}
                <div>
                  <li 
                    className={styles.dropdown}
                    onMouseEnter={() => handleMouseEnter('she')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={styles.dropdownToggle}>
                      She <FaChevronDown className={activeDropdown === 'she' ? styles.rotate : ''} />
                    </div>
                    {activeDropdown === 'she' && (
                      <div className={styles.dropdownPanelVertical}>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Boots </h4>
                          <li><Link href="/she/sneakers"> Sneakers </Link></li>
                          <li><Link href="/she/run"> Running </Link></li>
                          <li><Link href="/she/walk"> Walking </Link></li>
                          <li><Link href="/she/fitness"> Fitness & Training </Link></li>
                          <li><Link href="/she/outdoor"> Outdoor </Link></li>
                        </ul>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Clothes </h4>
                          <li><Link href="/she/tops"> T-shirts & Tops </Link></li>
                          <li><Link href="/she/dresses"> Dresses & pants </Link></li>
                          <li><Link href="/she/hoodies"> Hoodies </Link></li>
                          <li><Link href="/she/shirts"> Shirts </Link></li>
                          <li><Link href="/she/underware"> Underware </Link></li>
                          <li><Link href="/she/jackets"> Jackets </Link></li>
                          <li><Link href="/she/swim"> Swimming </Link></li>
                        </ul>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Accessories </h4>
                          <li><Link href="/she/socks"> Socks </Link></li>
                          <li><Link href="/she/bags"> Bags & Backpacks </Link></li>
                          <li><Link href="/she/glasses"> Glasses </Link></li>
                          <li><Link href="/she/balls"> Balls </Link></li>
                        </ul>
                        <div className={styles.logo}>
                          <Link href="/" className={styles.link}>
                            <Image
                              src="/woman.png"
                              alt="woman"
                              fill
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                </div>

                {/* Kids */}
                <div>
                  <li 
                    className={styles.dropdown}
                    onMouseEnter={() => handleMouseEnter('kids')}
                    onMouseLeave={handleMouseLeave}
                  >                    
                    <div className={styles.dropdownToggle}>
                      Kids <FaChevronDown className={activeDropdown === 'kids' ? styles.rotate : ''} />
                    </div>
                    {activeDropdown === 'kids' && (
                      <div className={styles.dropdownPanelVertical}>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Boots </h4>
                          <li><Link href="/kids/sneakers"> Sneakers </Link></li>
                          <li><Link href="/kids/run"> Running </Link></li>
                          <li><Link href="/kids/walk"> Walking </Link></li>
                          <li><Link href="/kids/fitness"> Football </Link></li>
                        </ul>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Clothes </h4>
                          <li><Link href="/kids/T-shirts"> T-shirts </Link></li>
                          <li><Link href="/kids/sport_dresses"> Sport dresses </Link></li>
                          <li><Link href="/kids/hoodies"> Hoodies </Link></li>
                          <li><Link href="/kids/shirts"> Shirts </Link></li>
                          <li><Link href="/kids/pants"> Pants </Link></li>
                          <li><Link href="/kids/swim"> Swimming </Link></li>
                          <li><Link href="/kids/f_T-shirts"> Football T-shirts </Link></li>
                        </ul>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> Accessories </h4>
                          <li><Link href="/kids/socks"> Socks </Link></li>
                          <li><Link href="/kids/bags"> Bags & Backpacks </Link></li>
                          <li><Link href="/kids/hats"> Hats </Link></li>
                          <li><Link href="/kids/school"> Return to school </Link></li>
                        </ul>
                        <div className={styles.logo}>
                          <Link href="/" className={styles.link}>
                            <Image
                              src="/girl.jpg"
                              alt="girl"
                              fill
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                </div>


                {/* Sale Dropdown */}
                <div>
                  <li 
                    className={styles.dropdown}
                    onMouseEnter={() => handleMouseEnter('sale')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={styles.dropdownToggle}>
                      Sale <FaChevronDown className={activeDropdown === 'sale' ? styles.rotate : ''} />
                    </div>
                    {activeDropdown === 'sale' && (
                      <div className={styles.dropdownPanelVertical}>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> He </h4>
                            <li><a href="/sale/he/t-shirts">T-shirts & Poloes </a></li>
                            <li><a href="/sale/he/sneakers"> Sneakers </a></li>
                            <li><a href="/sale/he/pants"> Pants </a></li>
                            <li><a href="/sale/he/swimwear"> Swimwear </a></li>
                            <li><a href="/sale/he/backpacks"> Backpacks </a></li>
                            <li><a href="/sale/he/shorts"> Shorts </a></li>
                            <li><a href="/sale/he/underwear"> Underwear </a></li>
                        </ul>
                        <ul>
                          <h4 className={styles.dropdownCategoryTitle}> She </h4>
                            <li><a href="/sale/she/t-shirts"> T-shirts </a></li>
                            <li><a href="/sale/she/sneakers"> Sneakers </a></li>
                            <li><a href="/sale/she/pants"> Pants </a></li>
                            <li><a href="/sale/she/tracksuits"> Tracksuits </a></li>
                            <li><a href="/sale/she/swimwear"> Swimwear </a></li>
                            <li><a href="/sale/she/backpacks"> Backpacks</a></li>
                            <li><a href="/sale/she/dresses"> Dresses </a></li>
                            <li><a href="/sale/she/shorts"> Shorts </a></li>
                            <li><a href="/sale/she/underwear"> Underwear </a></li>
                        </ul>
                        <div className={styles.logo}>
                          <Link href="/" className={styles.link}>
                            <Image
                              src="/sale.png"
                              alt="sale"
                              fill
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                </div>
              </ul>
          </div>        
        </div> 

      </div>    
    </nav>
  );
}