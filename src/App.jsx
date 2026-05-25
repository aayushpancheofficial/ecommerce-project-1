import React, { useState, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const products = [
  { id: 1, name: 'Urban Tech Jacket', desc: 'Waterproof minimalist design', fullDesc: 'Stay protected from the elements without compromising on style. This jacket features a multi-layer waterproof fabric, taped seams, and a sleek silhouette perfect for city commutes.', price: 129.99, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Essential Cotton Tee', desc: 'Premium oversized fit', fullDesc: 'The only t-shirt you will ever need. Crafted from 100% heavyweight organic cotton, this tee offers a relaxed drop-shoulder fit that holds its shape wash after wash.', price: 34.99, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Nomad Cargo Pants', desc: 'Comfort meets utility', fullDesc: 'Designed for the modern adventurer. Features six functional pockets, articulated knees for movement, and an adjustable waistband for the perfect fit all day long.', price: 89.99, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Streetwear Hoodie', desc: 'Heavyweight organic cotton', fullDesc: 'A staple piece for your casual rotation. This hoodie boasts a 450gsm french terry cotton build, a double-lined hood, and a subtle embroidered logo on the chest.', price: 79.99, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop' }
];

function ProductCard({ product, onOpenModal, onAddToCart }) {
  const cardRef = useRef(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
      });
    }
    return () => cardRef.current?.vanillaTilt?.destroy();
  }, []);

  const handleAddCart = (e) => {
    e.stopPropagation();
    onAddToCart();
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="product-card animate-in" ref={cardRef} onClick={() => onOpenModal(product)}>
      <img src={product.img} alt={product.name} className="product-img" loading="lazy" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="price-row">
          <span className="price">${product.price}</span>
          <button 
            className="btn-add" 
            onClick={handleAddCart}
            style={isAdding ? { background: '#22c55e', borderColor: '#22c55e' } : {}}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ product, onClose, onAddToCart }) {
  const imgRef = useRef(null);
  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState('OATMEAL');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (imgRef.current) {
      VanillaTilt.init(imgRef.current, {
        max: 20,
        speed: 400,
        scale: 1.05,
        glare: true,
        "max-glare": 0.3
      });
    }
    return () => imgRef.current?.vanillaTilt?.destroy();
  }, [product]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart();
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 1000);
  };

  if (!product) return null;

  const colors = [
    { name: 'OATMEAL', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80' },
    { name: 'CHARCOAL', img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&q=80' },
    { name: 'SMOKE', img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100&q=80' },
    { name: 'ABBEY', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&q=80' },
    { name: 'STEEL', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&q=80' },
    { name: 'SAND', img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=100&q=80' }
  ];

  return (
    <div className={`modal-overlay active`} onClick={handleOverlayClick}>
      <div className="modal-content light-theme">
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-body-3col">
          <div className="modal-col-left">
            <h4 className="modal-subtitle">AURA APPAREL</h4>
            <h2 id="modalTitle">{product.name}</h2>
            <p className="modal-price-light" style={{fontSize: '1.5rem', fontWeight: 600, color: '#8bb3cd', marginBottom: '1rem'}}>
              ${product.price}
            </p>
            <p className="modal-desc">{product.fullDesc || product.desc}</p>
            <a href="#" className="read-more">Read More</a>
            <div className="small-thumbnail">
              <img src={product.img} alt="thumbnail" />
            </div>
          </div>
          
          <div className="modal-col-center">
            <div className="main-image-wrapper" ref={imgRef}>
              <img src={product.img} alt="Product" id="modalImg" />
            </div>
            <div className="tech-text">
              <span className="tech-sub">PREMIUM QUALITY</span>
              <span className="tech-main">DESIGNED FOR EVERYDAY COMFORT</span>
            </div>
          </div>

          <div className="modal-col-right">
            <div className="size-section">
              <h3>SIZE</h3>
              <div className="size-options">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <span 
                    key={size} 
                    className={`size-btn ${activeSize === size ? 'active' : ''}`}
                    onClick={() => setActiveSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <a href="#" className="size-guide">Size Guide</a>
            </div>

            <div className="color-section">
              <h3>COLOUR</h3>
              <div className="color-grid">
                {colors.map(c => (
                  <div 
                    key={c.name} 
                    className={`color-item ${activeColor === c.name ? 'active' : ''}`}
                    onClick={() => setActiveColor(c.name)}
                  >
                    <img src={c.img} alt={c.name} />
                    <span className="color-name">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-favorite">FAVORITE</button>
              <button 
                className="btn-add-cart" 
                onClick={handleAddToCart}
                style={isAdding ? { background: '#22c55e' } : {}}
              >
                {isAdding ? 'Added to Cart!' : 'ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">AURA.</div>
        <ul className="nav-links">
          <li><a href="#">Men</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Collections</a></li>
        </ul>
        <div className="cart-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-count">{cartCount}</span>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>Elevate Your<br/><span className="gradient-text">Everyday Style</span></h1>
          <p>Discover the new Spring Collection '26. Minimalist designs, maximum impact.</p>
          <button className="btn-primary">Shop Collection</button>
        </div>
      </header>

      <section className="products">
        <h2 className="section-title">Trending Now</h2>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onOpenModal={setSelectedProduct} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </section>

      <Modal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart} 
      />
    </>
  );
}
