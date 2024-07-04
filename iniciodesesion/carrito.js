document.addEventListener('DOMContentLoaded' , function(){
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if(loggedInUser){
        document.getElementById('welcomeMessage').innerText = 'Bienvenido, ' + loggedInUser.ussername + '!';
    }
    else{
        window.location.href = 'index.html';
    }
    const cardContainer = document.getElementById('card-container');
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    const products = [
        {
            id: 1,
            imagen: 'af1tw.jpg' ,
            nombre: 'Producto 1',
            precio: '$2,800.00',
            descripcion: 'Descripcion del Producto',
            existencia: 5
        },
        {
            id: 2,
            imagen: 'af1tw.jpg' ,
            nombre: 'Producto 2',
            precio: '$2,800.00',
            descripcion: 'Descripcion del Producto',
            existencia: 5
        },
    ];
    /*----------------------Cargar Carrito-------------------------*/
    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <div class="card-inner">
        <div class="card-front">
        <img src="${product.imagen}" alt="${product.nombre}">
        <h3>${product.nombre}</h3>
        </div>
        <div class="card-back">
        <h3>${product.nombre}</h3>
        <p>${product.precio}</p>
        <p>${product.descripcion}</p>
        <p>Existencia: ${product.existencia}</p>
        <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
        </div>
        </div>
        `;
        cardContainer.appendChild(card);
    });

    let cartCount = 0;
    let cart = [];

    window.addToCart =function(productId){
        const product = products.find(p => p.id === productId);
        const excard = cart.find(p => p.id === productId);
        if(product){
            if(excard){
                cartCount++;
                excard.cantidad++;
                document.getElementById('cartCount').textContent = cartCount;
                console.log('ya existe');
            }
            else{
                const productCa = {
                    product,
                    cantidad:1
                };
                cart.push(productCa);
                cartCount++;
                document.getElementById('cartCount').textContent = cartCount;
            }
        }
    };
    document.getElementById('cartButton').addEventListener('click', function() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item d-flex justify-content-between align-items-center';
            cartItem.innerHTML =`
            <div class="cart-item-image">
            <img src="${item.imagen}" alt="${item.nombre}">
            </div>
            <div class="cart-item-details text-center">
            <h5>${items.nombre}</h5>
            <p>Cantidad: 1</p>
            </div>
            <button class="btn-outline-danger" onclick="removeFromCart(${index})";
            <i class="bi bi-trash"></i>
            </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    });
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        cartCount--;
        document.getElementById('cartCount').textContent = cartCount;
        document.getElementById('cartButton').click();
    };
});