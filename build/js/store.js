const addToShoppingCartButtons = document.querySelectorAll('.addToCart');

addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const newShopping = document.querySelector('.shopping-cart-items');

function addToCartClicked(event) {

    const button = event.target;
    const item = button.closest('.card');
    
    const itemTitle = item.querySelector('.name').textContent;
    const itemPrice = item.querySelector('.price').textContent.replace('Price: ','');
    const itemImage = item.querySelector('.card-img').src;
    const itemCant = item.querySelector('.form-cant').valueAsNumber;

    const titlesItemsAdds = document.querySelectorAll('.shopping-name');
    for (let i = 0; i<titlesItemsAdds.length;i++){
        if(titlesItemsAdds[i].textContent === itemTitle){
            itemCant=0;
        }
    }

    if (isNaN(itemCant)){
        alert('ingresa una cantidad :)')
    }else {
        addItemToShoppingCartNotification();
        addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemCant);
    }
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemCant){

    const shoppingCartRow = document.createElement('div');

     const shoppingCartContent = `
        <div class="shopping-cart-row">
            <div class="shopping-img-name">
                <img src="${itemImage}" alt="" class="shopping-img">
                <h4 class="shopping-name">${itemTitle}</h4>
            </div>
            <div class="shopping-price-container">
                <p class="shopping-price">${itemPrice}</p>
            </div>
            <div class="shopping-cant-container">
                <input class="shopping-cant" type="number" min="1" value="${itemCant}">
                <button class="shopping-cancel"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>
        </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    newShopping.append(shoppingCartRow);

    shoppingCartRow.querySelector('.shopping-cancel').addEventListener('click', removeShoppingCartItem);

    shoppingCartRow.querySelector('.shopping-cant').addEventListener('change', updateShoppingCartTotal)

    updateShoppingCartTotal();

}
function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shopping-total-price');

    const shoppingCartItems = document.querySelectorAll('.shopping-cart-row');
    
    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shopping-price');
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$',''));
        const shoppingCartItemQuantity = shoppingCartItem.querySelector('.shopping-cant').valueAsNumber;

        total += shoppingCartItemPrice*shoppingCartItemQuantity;

    });
    shoppingCartTotal.innerHTML = `
    <p>Total: $${total}</p>
    <button class="shopping-succes">Comprar</button>
    `;
    const shoppingSucess = document.querySelector('.shopping-succes');
    shoppingSucess.addEventListener('click', shoppingSucessClicked)
}

function removeShoppingCartItem (event) {
    const buttonClicked =event.target;
    buttonClicked.closest('.shopping-cart-row').remove();
    updateShoppingCartTotal();
}

const toast = document.getElementById('toasts')

function addItemToShoppingCartNotification(message = 'Product added successfully', type = 'success') {

    const notif = document.createElement('div')
    const notifIcon = document.createElement('span')
    
    notif.classList.add('toast')
    notif.classList.add(type)
    
    notifIcon.classList.add('fas')
    notifIcon.classList.add('fa-check-circle')

    notif.innerText = message

    toast.appendChild(notif)
    notif.append(notifIcon)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function shoppingSucessClicked(){
    alert('Thank you for your purchase, your order is on its way')
    newShopping.innerHTML=''
}

const botonCarrito = document.querySelector('#boton-carrito');
const cerrarCarrito = document.querySelector('#cerrar-carrito');
const seccionCarrito = document.querySelector('#seccion-carrito');

botonCarrito.addEventListener('click', () => {
  seccionCarrito.classList.toggle('visible');
});

cerrarCarrito.addEventListener('click', () => {
    seccionCarrito.classList.toggle('visible')
})