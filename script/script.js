let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');

// Mostrar en el carrito un item 
products.forEach(item => {   
	item.addEventListener('click', (element) => {
		if (element.target.classList.contains('addToCart')) {
			const productID = element.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,

			}
			updateProductsInCart(product); //actualizamos el carrito 
			updateShoppingCartHTML();
		}
	});
});

// Añadir al carrito un item 
function updateProductsInCart(product) { 
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			return;
		}
	}
	productsInCart.push(product);
}

// Actualizar HTML 
const updateShoppingCartHTML = function () {  
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<button class="button-remove">Eliminar</button>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
	}
	else {
		document.querySelector('.checkout');
		parentElement.innerHTML = '<h4 class="empty">Carrito vacío</h4>';
	}
}


