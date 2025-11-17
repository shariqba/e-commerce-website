// Product Data

        const products = [
            {
                id: 1,
                name: "MacBook Pro 16\"",
                price: 2399.99,
                category: "laptops",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
                rating: 4.8,
                description: "Powerful laptop for professionals"
            },
            {
                id: 2,
                name: "iPhone 14 Pro",
                price: 999.99,
                category: "smartphones",
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                rating: 4.7,
                description: "Latest smartphone with advanced camera"
            },
            {
                id: 3,
                name: "iPad Air",
                price: 599.99,
                category: "tablets",
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                rating: 4.6,
                description: "Versatile tablet for work and play"
            },
            {
                id: 4,
                name: "Samsung Galaxy S23",
                price: 849.99,
                category: "smartphones",
                image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                rating: 4.5,
                description: "Android flagship with excellent camera"
            },
            {
                id: 5,
                name: "Dell XPS 13",
                price: 1199.99,
                category: "laptops",
                image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
                rating: 4.4,
                description: "Compact laptop with powerful performance"
            },
            {
                id: 6,
                name: "Samsung Galaxy Tab",
                price: 449.99,
                category: "tablets",
                image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
                rating: 4.3,
                description: "Great tablet for multimedia"
            },
            {
                id: 7,
                name: "AirPods Pro",
                price: 249.99,
                category: "accessories",
                image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                rating: 4.6,
                description: "Wireless earbuds with noise cancellation"
            },
            {
                id: 8,
                name: "Apple Watch Series 8",
                price: 399.99,
                category: "accessories",
                image: "https://images.unsplash.com/photo-1758348844355-2ef28345979d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                rating: 4.5,
                description: "Smartwatch with health monitoring"
            }
        ];

        // Cart Data
        let cart = [];
        let currentFilter = 'all';

        // Category Slider Variables
        let currentCategorySlide = 0;
        let categorySlidesCount = 0;
        let categoriesPerView = 4;

        // DOM Elements
        const productsContainer = document.getElementById('products-container');
        const cartIcon = document.getElementById('cart-icon');
        const cartSidebar = document.getElementById('cart-sidebar');
        const closeCart = document.getElementById('close-cart');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const overlay = document.getElementById('overlay');
        const notification = document.getElementById('notification');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const newsletterForm = document.getElementById('newsletter-form');
        
        // Category Slider Elements
        const categoriesSlider = document.getElementById('categories-slider');
        const prevCategoryBtn = document.getElementById('prev-category');
        const nextCategoryBtn = document.getElementById('next-category');
        const categoryDots = document.getElementById('category-dots');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            updateCartCount();
            initCategorySlider();
            
            // Event Listeners
            cartIcon.addEventListener('click', openCart);
            closeCart.addEventListener('click', closeCartSidebar);
            overlay.addEventListener('click', closeCartSidebar);
            
            // Filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    // Filter products
                    currentFilter = button.dataset.filter;
                    renderProducts();
                });
            });
            
            // Newsletter form
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input').value;
                showNotification('Thank you for subscribing!');
                newsletterForm.reset();
            });

            // Update categories per view on window resize
            window.addEventListener('resize', updateCategoriesPerView);
        });

        // Category Slider Functions
        function initCategorySlider() {
            // Calculate initial slides count
            updateCategoriesPerView();
            
            // Create dots for slider
            createCategoryDots();
            
            // Add event listeners for slider controls he buttons koi keep getting cut off
            prevCategoryBtn.addEventListener('click', prevCategorySlide);
            nextCategoryBtn.addEventListener('click', nextCategorySlide);
            
            // Update slider position
            updateCategorySlider();
        }

        function updateCategoriesPerView() {
            const width = window.innerWidth;
            
            if (width <= 480) {
                categoriesPerView = 1;
            } else if (width <= 768) {
                categoriesPerView = 2;
            } else if (width <= 1024) {
                categoriesPerView = 3;
            } else {
                categoriesPerView = 4;
            }
            
            // Recalculate slides count
            const categoryCards = document.querySelectorAll('.category-card');
            categorySlidesCount = Math.ceil(categoryCards.length / categoriesPerView);
            
            // Update dots
            createCategoryDots();
            
            // Reset to first slide if current slide is out of bounds
            if (currentCategorySlide >= categorySlidesCount) {
                currentCategorySlide = 0;
            }
            
            // Update slider position
            updateCategorySlider();
        }

        function createCategoryDots() {
            categoryDots.innerHTML = '';
            
            for (let i = 0; i < categorySlidesCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === currentCategorySlide) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    currentCategorySlide = i;
                    updateCategorySlider();
                });
                categoryDots.appendChild(dot);
            }
        }

        function updateCategorySlider() {
            const translateX = -currentCategorySlide * (100 / categoriesPerView);
            categoriesSlider.style.transform = `translateX(${translateX}%)`;
            
            // Update active dot
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentCategorySlide);
            });
        }

        function nextCategorySlide() {
            currentCategorySlide = (currentCategorySlide + 1) % categorySlidesCount;
            updateCategorySlider();
        }

        function prevCategorySlide() {
            currentCategorySlide = (currentCategorySlide - 1 + categorySlidesCount) % categorySlidesCount;
            updateCategorySlider();
        }

        // Render products based on current filter
        function renderProducts() {
            productsContainer.innerHTML = '';
            
            const filteredProducts = currentFilter === 'all' 
                ? products 
                : products.filter(product => product.category === currentFilter);
            
            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-card';
                productElement.innerHTML = `
                    <div class="product-img" style="background-image: url('${product.image}')"></div>
                    <div class="product-content">
                        <h3>${product.name}</h3>
                        <div class="product-rating">
                            ${generateRatingStars(product.rating)}
                        </div>
                        <p>${product.description}</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                            <button class="buy-now" data-id="${product.id}">Buy Now</button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            });
            
            // Add event listeners to the new buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    addToCart(productId);
                });
            });
            
            document.querySelectorAll('.buy-now').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    addToCart(productId);
                    openCart();
                });
            });
        }

        // Generate rating stars
        function generateRatingStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (halfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }

        // Cart Functions
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCartCount();
            showNotification('Product added to cart!');
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            renderCartItems();
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartCount();
                    renderCartItems();
                }
            }
        }

        function updateCartCount() {
            const cartCount = document.querySelector('.cart-count');
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        function renderCartItems() {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
                cartTotal.textContent = 'Total: $0.00';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItemElement);
            });
            
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
            
            // Add event listeners to cart item buttons
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    updateQuantity(productId, -1);
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    updateQuantity(productId, 1);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.remove-item').dataset.id);
                    removeFromCart(productId);
                });
            });
        }

        // UI Functions
        function openCart() {
            renderCartItems();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCartSidebar() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function showNotification(message) {
            notification.textContent = message;
            notification.classList.add('active');
            
            setTimeout(() => {
                notification.classList.remove('active');
            }, 3000);
        }