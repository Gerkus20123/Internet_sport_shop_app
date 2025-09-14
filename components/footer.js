import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        
        {/* Główny kontener Flexbox, który rozdziela lewą i prawą stronę */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          
          {/* Lewa strona: Logo i informacje o firmie */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
            <a href="/">
              <img
                src="/AW_WG.png"
                alt="Logo firmy"
                width={160}
                height={160}
              />
            </a>
            <div className="mt-4">
              <h3 className="text-green-400 text-lg font-semibold mb-2 text-center uppercase"> Active ware </h3>
              <p className="text-sm text-justify indent-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Prawa strona: Pozostałe sekcje (linki, obsługa klienta, social media) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:w-2/3">

            {/* Kolumna 1: Szybkie linki */}
            <div>
              <h3 className="text-green-400 text-lg font-semibold mb-4 text-center uppercase">Quick Links</h3>
              <ul className="space-y-2 text-center">
                <li>
                  <a href="/about" className="hover:text-white transition-colors duration-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors duration-200">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors duration-200">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolumna 2: Klienci */}
            <div>
              <h3 className="text-green-400 text-lg font-semibold mb-4 text-center uppercase">Customer Service</h3>
              <ul className="space-y-2 text-center">
                <li>
                  <a href="/returns" className="hover:text-white transition-colors duration-200">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:text-white transition-colors duration-200">
                    Shipping Information
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors duration-200">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolumna 3: Social Media */}
            <div>
              <h3 className="text-green-400 text-lg font-semibold mb-4 text-center uppercase">Follow Us</h3>
              <div className="flex flex-col space-y-4 items-center">
                <a href="https://facebook.com" className="hover:text-green-400 transition-colors duration-200">
                  {/* Ikona Facebook */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873V14.894h-3.342V12h3.342V9.309c0-3.298 1.956-5.11 4.981-5.11 1.413 0 2.463.225 2.804.325v3.064h-1.879c-1.467 0-1.748.697-1.748 1.714V12h3.421l-.558 2.894H13.621V22a10 10 0 008.379-9.894z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://instagram.com" className="hover:text-green-400 transition-colors duration-200">
                  {/* Ikona Instagram */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.76.01 3.703.05a6.41 6.41 0 014.505 2.519A6.41 6.41 0 0122 8.986v4.613c0 1.02-.01 1.352-.053 2.296-.044.93-.205 1.77-.591 2.656-.376.88-1.018 1.52-1.898 1.897-.886.386-1.726.546-2.656.59-1.024.045-1.357.056-2.296.056h-4.613c-1.024 0-1.357-.01-2.296-.056-.93-.044-1.77-.204-2.656-.59a6.41 6.41 0 01-1.898-1.897c-.386-.886-.546-1.726-.59-2.656-.045-1.024-.056-1.357-.056-2.296v-4.613c0-1.024.01-1.357.056-2.296.044-.93.204-1.77.59-2.656A6.41 6.41 0 015.714 2.502c.88-.386 1.72-.546 2.656-.59 1.024-.045 1.357-.056 2.296-.056h4.613zm-3.692 8.79a3.3 3.3 0 100 6.6 3.3 3.3 0 000-6.6zm0 1.25a2.05 2.05 0 110 4.1 2.05 2.05 0 010-4.1zm5.286-4.522a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com" className="hover:text-green-400 transition-colors duration-200">
                  {/* Ikona Twitter/X */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5c.276.1.558.204.834.316a.75.75 0 01.127.165 3.5 3.5 0 00-2.58 1.154 3.5 3.5 0 00-1.154 2.58c.109.28.212.56.316.834a.75.75 0 01.165.127 2.25 2.25 0 01-1.154 1.154 2.25 2.25 0 01-2.58 0c-1.22-.524-2.23-1.534-2.754-2.754a.75.75 0 01.127-.165c.276-.109.558-.212.834-.316a2.25 2.25 0 011.154-1.154 2.25 2.25 0 012.58 0c.524.22 1.034.54 1.544.97a.75.75 0 01-.127-.165c-.109-.276-.212-.558-.316-.834a2.25 2.25 0 01-1.154-1.154 2.25 2.25 0 010-2.58c.22-.524.54-1.034.97-1.544a.75.75 0 01.165-.127c.276.109.558.212.834.316a2.25 2.25 0 011.154 1.154 2.25 2.25 0 012.58 0c.524.22 1.034.54 1.544.97z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sekcja praw autorskich */}
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Brand. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
