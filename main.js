import './style.css'
import VanillaTilt from 'vanilla-tilt';

const products = [
  { id: 1, name: 'Urban Tech Jacket', desc: 'Waterproof minimalist design', fullDesc: 'Stay protected from the elements without compromising on style. This jacket features a multi-layer waterproof fabric, taped seams, and a sleek silhouette perfect for city commutes.', price: 129.99, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Essential Cotton Tee', desc: 'Premium oversized fit', fullDesc: 'The only t-shirt you will ever need. Crafted from 100% heavyweight organic cotton, this tee offers a relaxed drop-shoulder fit that holds its shape wash after wash.', price: 34.99, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Nomad Cargo Pants', desc: 'Comfort meets utility', fullDesc: 'Designed for the modern adventurer. Features six functional pockets, articulated knees for movement, and an adjustable waistband for the perfect fit all day long.', price: 89.99, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Streetwear Hoodie', desc: 'Heavyweight organic cotton', fullDesc: 'A staple piece for your casual rotation. This hoodie boasts a 450gsm french terry cotton build, a double-lined hood, and a subtle embroidered logo on the chest.', price: 79.99, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop' }
];

let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('productGrid');
  const cartBadge = document.querySelector('.cart-count');

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card animate-in';
    card.style.animationDelay = `${index * 0.15}s`;
    card.dataset.id = product.id;
    
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="price-row">
          <span class="price">$${product.price}</span>
          <button class="btn-add" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // Initialize 3D Tilt Effect
    VanillaTilt.init(card, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  });

  // Event delegation for cart and modal
  grid.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-add')) {
      cartCount++;
      cartBadge.textContent = cartCount;
      
      // Animation effect
      e.target.textContent = 'Added!';
      e.target.style.background = '#22c55e'; // Green
      e.target.style.borderColor = '#22c55e';
      
      setTimeout(() => {
        e.target.textContent = 'Add to Cart';
        e.target.style.background = 'transparent';
        e.target.style.borderColor = 'var(--accent)';
      }, 1500);
      return; // Stop here so modal doesn't open
    }

    // Open Modal logic
    const card = e.target.closest('.product-card');
    if(card) {
      const productId = parseInt(card.dataset.id);
      const product = products.find(p => p.id === productId);
      
      if(product) {
        document.getElementById('modalImg').src = product.img;
        document.getElementById('modalThumb').src = product.img;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalPrice').textContent = `$${product.price}`;
        document.getElementById('modalDesc').textContent = product.fullDesc || product.desc;
        
        document.getElementById('productModal').classList.add('active');
      }
    }
  });

  // Modal logic
  const modal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');
  const modalAddCart = document.getElementById('modalAddCart');
  
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Size buttons toggle
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Modal Add to Cart
  modalAddCart.addEventListener('click', () => {
    cartCount++;
    cartBadge.textContent = cartCount;
    
    modalAddCart.textContent = 'Added to Cart!';
    modalAddCart.style.background = '#22c55e';
    
    setTimeout(() => {
      modalAddCart.textContent = 'Add to Cart';
      modalAddCart.style.background = 'var(--accent)';
      modal.classList.remove('active');
    }, 1000);
  });

  // Initialize 3D Tilt on Modal Image
  VanillaTilt.init(document.querySelector('.main-image-wrapper'), {
    max: 20,
    speed: 400,
    scale: 1.05,
    glare: true,
    "max-glare": 0.3
  });
});
