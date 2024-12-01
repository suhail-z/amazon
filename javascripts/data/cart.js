
export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [
    { id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
       quantity: 3,
       deliveryOptionsId : '1'
     },
    { id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
       quantity: 2 ,
       deliveryOptionsId : '2'
    }
  ];
}


export function addToCart(productId) {
  const quantity = Number(document.querySelector(`.product-quantity-${productId}`).value);
  let matchItem;


  cart.forEach(cartItem => {
    if (cartItem.id === productId) {
      matchItem = cartItem;
    }

  });

  
  if (matchItem) {
    matchItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity,
      deliveryOptionsId:'1'
    });
  }

  
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
  
  const newCart = cart.filter(cartItem => cartItem.id !== productId);


  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function updateDeliveryOption(productId,deliveryOptionId){
  let matchItem;
  cart.forEach(cartItem => {
    if (cartItem.id === productId) {
      matchItem = cartItem;
    }
  });
  matchItem.deliveryOptionsId = deliveryOptionId;
localStorage.setItem('cart',JSON.stringify(cart));
}

export function fetchCart(fun){
  const req= new XMLHttpRequest();
  req.addEventListener('load',()=>{
    console.log(req.response);
    fun();
  });
  req.open('GET','https://supersimplebackend.dev/cart');
  req.send();
}