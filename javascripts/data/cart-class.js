
class Cart{

     cartItems;
     localStorageKey;
     
     constructor(localStorageKeyName){
        this.localStorageKey=localStorageKeyName;
        this.loadFromStorage();
     }

loadFromStorage(){
  this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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


addToCart(productId) {
    const quantity = Number(document.querySelector(`.product-quantity-${productId}`).value);
    let matchItem;
  
  
    this.cartItems.forEach(cartItem => {
      if (cartItem.id === productId) {
        matchItem = cartItem;
      }
  
    });
  
    
    if (matchItem) {
      matchItem.quantity += quantity;
    } else {
      this.cartItems.push({
        id: productId,
        quantity,
        deliveryOptionsId:'1'
      });
    }
  
    
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }


removeFromCart(productId) {
  
    const newCart = this.cartItems.filter(cartItem => cartItem.id !== productId);
  
  
    this.cartItems = newCart;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  
updateDeliveryOption(productId,deliveryOptionId){
    let matchItem;
    this.cartItems.forEach(cartItem => {
      if (cartItem.id === productId) {
        matchItem = cartItem;
      }
    });
    matchItem.deliveryOptionsId = deliveryOptionId;
  localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }

};
const cart=new Cart('cart-oop');
const businessCart=new Cart('business')
console.log(cart);

console.log(businessCart)
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');




