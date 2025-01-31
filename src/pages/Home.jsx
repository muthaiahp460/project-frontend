import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import paintings from '../img/paintings.jpg';
import sculptures from '../img/sculpters.jpg';
import digitalArt from '../img/digital-art.jpg';

const BACKEND_URL = "https://aurora-artworks.onrender.com";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [hoveredArtwork, setHoveredArtwork] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/artworks`);
        console.log('Fetched artworks:', response.data);
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        toast.error('Failed to load artworks');
      }
    };

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Failed to load cart');
      }
    };

    fetchArtworks();
    fetchCart();
  }, []);

  const addToCart = async (artwork) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BACKEND_URL}/api/cart`, {
        artworkId: artwork._id,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart([...cart, artwork]);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BACKEND_URL}/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(cart.filter((item) => item._id !== id));
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300x200?text=No+Image';
    if (path.startsWith('http')) return path;
    // Remove any leading slash to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BACKEND_URL}/${cleanPath}`;
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <a href="/" className={styles.navbarBrand}>ArtStore</a>
        <div className={styles.cartContainer}>
          <div className={styles.cartIcon} onClick={toggleCart}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className={styles.cartCount}>{cart.length}</span>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Unique Artworks</h1>
          <p>Explore our curated collection of original art pieces</p>
          <button className={styles.exploreButton}>Explore Now</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2>Featured Categories</h2>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>
            <img src={paintings} alt="Paintings" />
            <h3>Paintings</h3>
          </div>
          <div className={styles.categoryCard}>
            <img src={sculptures} alt="Sculptures" />
            <h3>Sculptures</h3>
          </div>
          <div className={styles.categoryCard}>
            <img src={digitalArt} alt="Digital Art" />
            <h3>Digital Art</h3>
          </div>
        </div>
      </section>

      {/* Artworks Section */}
      <section className={styles.artworks}>
        <h2>Featured Artworks</h2>
        <div className={styles.artworkGrid}>
          {artworks.map((artwork) => {
            console.log('Rendering artwork:', artwork);
            return (
              <div 
                key={artwork._id} 
                className={styles.artworkCard}
                onMouseEnter={() => setHoveredArtwork(artwork._id)}
                onMouseLeave={() => setHoveredArtwork(null)}
              >
                <div className={styles.imageContainer}>
                  <img 
                    src={getImageUrl(artwork.imageUrl)} 
                    alt={artwork.title}
                    onError={(e) => {
                      console.error('Image failed to load:', artwork.imageUrl);
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                  {hoveredArtwork === artwork._id && (
                    <div className={styles.overlay}>
                      <button 
                        className={styles.addToCartButton}
                        onClick={() => addToCart(artwork)}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.artworkInfo}>
                  <h3>{artwork.title}</h3>
                  <p className={styles.artist}>by {artwork.artist}</p>
                  <p className={styles.price}>${artwork.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest artworks and exclusive offers</p>
          <form className={styles.subscribeForm} onSubmit={(e) => {
            e.preventDefault();
            toast.success('Thank you for subscribing!');
          }}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className={styles.cartSidebar}>
          <div className={styles.cartHeader}>
            <h2>Your Cart</h2>
            <button onClick={toggleCart}>&times;</button>
          </div>
          {cart.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <img src={getImageUrl(item.imageUrl)} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>${item.price}</p>
              </div>
              <button 
                className={styles.deleteButton}
                onClick={() => removeFromCart(item._id)}
              >
                &times;
              </button>
            </div>
          ))}
          {cart.length > 0 ? (
            <>
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
              </div>
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
