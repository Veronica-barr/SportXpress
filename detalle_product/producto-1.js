        // Script mejorado para funcionalidades
        document.addEventListener('DOMContentLoaded', function() {
            // Cambio de imágenes al hacer clic en miniaturas
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.addEventListener('click', function() {
                    const mainImage = document.getElementById('mainImage');
                    const fullSize = this.getAttribute('data-full');
                    mainImage.src = fullSize || this.src;
                    
                    // Actualizar miniatura activa
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active-thumb'));
                    this.classList.add('active-thumb');
                });
            });
            
            // Selección de color
            document.querySelectorAll('.color-box').forEach(box => {
                box.addEventListener('click', function() {
                    document.querySelectorAll('.color-box').forEach(b => b.classList.remove('selected'));
                    this.classList.add('selected');
                    // Aquí podrías actualizar la imagen según el color seleccionado
                });
            });
            
            // Control de cantidad
            const quantityInput = document.getElementById('quantity');
            document.querySelector('.quantity-btn.minus').addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    quantityInput.value = value - 1;
                }
            });
            
            document.querySelector('.quantity-btn.plus').addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value < 5) { // Máximo 5 unidades
                    quantityInput.value = value + 1;
                }
            });
            
            // Validación de cantidad
            quantityInput.addEventListener('change', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) {
                    this.value = 1;
                } else if (value > 5) {
                    this.value = 5;
                }
            });
            
            // Pestañas
            const tabBtns = document.querySelectorAll('.tab-btn');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Ocultar todos los contenidos
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    // Desactivar todos los botones
                    tabBtns.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Activar el seleccionado
                    document.getElementById(tabId).classList.add('active');
                    this.classList.add('active');
                });
            });
            
            // Lista de deseos
            const wishlistBtn = document.querySelector('.btn-wishlist');
            wishlistBtn.addEventListener('click', function() {
                this.classList.toggle('added');
                const icon = this.querySelector('i');
                if (this.classList.contains('added')) {
                    icon.classList.replace('far', 'fas');
                    this.innerHTML = '<i class="fas fa-heart"></i> En tu lista';
                } else {
                    icon.classList.replace('fas', 'far');
                    this.innerHTML = '<i class="far fa-heart"></i> Lista de deseos';
                }
            });
            
            // Zoom de imagen
            const zoomBtn = document.getElementById('zoomBtn');
            zoomBtn.addEventListener('click', function() {
                // Aquí podrías implementar un lightbox o modal para ver la imagen ampliada
                alert('Función de zoom implementaría un lightbox en producción');
            });
        });