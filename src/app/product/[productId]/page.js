"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../../styles/ProductView.module.css'
import { allProducts } from '../allproducts'
import React from 'react';
import Navbar from '../../../../components/nav-bar';

export default function ProductView({ params }) {
  const unwrappedParams = React.use(params);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [mainImage, setMainImage] = useState(null);

  const product = allProducts.find(p => p.id === unwrappedParams.productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const hasNestedColors = product.colors && product.colors.length > 0 && typeof product.colors[0] === 'object';

  const handleImageHover = (isHovering) => {
   const currentImages = hasNestedColors 
      ? product.colors[selectedColorIndex].images['388_562'] 
      : product.images['388_562'];

    setMainImage(isHovering ? currentImages[1] : currentImages[0]);
  };

  useEffect(() => {
   const initialImages = hasNestedColors
      ? product.colors[selectedColorIndex].images['388_562']
      : product.images['388_562'];
    setMainImage(initialImages[0]);
  }, [selectedColorIndex, hasNestedColors, product]);

  return (
        <>
            <Navbar />
            <div className={styles.productPage}>
            <div className={styles.productImageSection} 
                onMouseEnter={() => handleImageHover(true)}
                onMouseLeave={() => handleImageHover(false)}>
                    {mainImage && (
                    <Image 
                        src={mainImage} 
                        alt={product.name} 
                        width={500} 
                        height={700}
                    />
                    )}
            </div>

            <div className={styles.productDetailsSection}>
                <h1>{product.name}</h1>
                <p>{product.price}</p>

                {hasNestedColors && (
                <div className={styles.colorOptions}>
                    {product.colors.map((color, index) => (
                    <span 
                        key={color.code} 
                        className={`${styles.colorCircle} ${index === selectedColorIndex ? styles.selected : ''}`}
                        style={{ backgroundColor: color.code }}
                        onClick={() => setSelectedColorIndex(index)}>
                    </span>
                    ))}
                </div>
                )}

                <button className={styles.addToCartButton}>
                Add to cart
                </button>
            </div>
            </div>
        </>
    );
}