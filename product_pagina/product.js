document.addEventListener('DOMContentLoaded', function() {
    // Datos de productos de ejemplo
    const products = [
        {
            id: 1,
            title: "Zapatillas Running Nike Air Max 270",
            price: 12999,
            image: "https://example.com/zapatillas1.jpg",
            freeShipping: true,
            location: "Capital Federal"
        },
        {
            id: 2,
            title: "Pelota de Fútbol Adidas Champions League",
            price: 5999,
            image: "https://example.com/pelota1.jpg",
            freeShipping: false,
            location: "Buenos Aires"
        },
        {
            id: 3,
            title: "Raqueta Tenis Wilson Pro Staff",
            price: 18999,
            image: "https://example.com/raqueta1.jpg",
            freeShipping: true,
            location: "Córdoba"
        },
        {
            id: 4,
            title: "Short Deportivo Nike Dri-Fit",
            price: 4599,
            image: "https://example.com/short1.jpg",
            freeShipping: true,
            location: "Mendoza"
        },
        {
            id: 5,
            title: "Bicicleta MTB Venzo X-Trail 29",
            price: 125999,
            image: "https://example.com/bici1.jpg",
            freeShipping: false,
            location: "Santa Fe"
        },
        {
            id: 6,
            title: "Guantes de Boxeo Everlast Pro",
            price: 8999,
            image: "https://example.com/guantes1.jpg",
            freeShipping: true,
            location: "Capital Federal"
        },
        {
            id: 7,
            title: "Camiseta Argentina Adidas Titular 2023",
            price: 14999,
            image: "https://example.com/camiseta1.jpg",
            freeShipping: true,
            location: "Buenos Aires"
        },
        {
            id: 8,
            title: "Reloj Garmin Forerunner 245 Música",
            price: 75999,
            image: "https://example.com/reloj1.jpg",
            freeShipping: true,
            location: "Capital Federal"
        }
    ];

    // Función para renderizar productos
    function renderProducts(productsToRender) {
        const container = document.querySelector('.products-container');
        container.innerHTML = '';
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <div class="product-price">$${product.price.toLocaleString('es-AR')}</div>
                    ${product.freeShipping ? '<div class="product-shipping"><i class="fas fa-truck"></i> Envío gratis</div>' : ''}
                    <div class="product-title">${product.title}</div>
                    <div class="product-location">${product.location}</div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }

    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            if (filter === 'todos') {
                renderProducts(products);
            } else {
                const filteredProducts = products.filter(product => 
                    product.title.toLowerCase().includes(filter)
                );
                renderProducts(filteredProducts);
            }
        });
    });

    // Ordenar
    const sortSelect = document.querySelector('.sort-options select');
    sortSelect.addEventListener('change', function() {
        const sortedProducts = [...products];
        const option = this.value;
        
        if (option === 'Menor precio') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (option === 'Mayor precio') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (option === 'Mejores valorados') {
            // Simular valoración (en una app real vendría de la base de datos)
            sortedProducts.forEach(p => p.rating = Math.random() * 5);
            sortedProducts.sort((a, b) => b.rating - a.rating);
        } else if (option === 'Novedades') {
            // Simular fecha (en una app real vendría de la base de datos)
            sortedProducts.forEach((p, i) => p.date = new Date(2023, 0, i+1));
            sortedProducts.sort((a, b) => b.date - a.date);
        }
        
        renderProducts(sortedProducts);
    });

    // Paginación
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.querySelector('i')) return;
            
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Simular cambio de página (en una app real haría fetch a la API)
            const page = parseInt(this.textContent);
            const startIdx = (page - 1) * 8;
            const paginatedProducts = products.slice(startIdx, startIdx + 8);
            renderProducts(paginatedProducts);
        });
    });

    // Renderizar productos iniciales
    renderProducts(products);
});