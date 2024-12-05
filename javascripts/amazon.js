import {cart,addToCart} from "./data/cart.js"
import { products,fetchProducts } from "./data/products.js";
import { formatCurrency } from "./utils/currency.js";

async function load(){
  await fetchProducts();

  renderProducts();
}
load();

function renderProducts(){

    cartQuantityUpdate();
    //products are stored in seperate js file
    let HTML='';
    products.forEach((product)=>{
      HTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getRatingURL()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $ ${product.getpriceCents()}
        </div>

        <div class="product-quantity-container">
          <select class="product-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        
        <div class="product-spacer">
        ${product.extraHTML()}
        </div>

        <div class="added-to-cart added-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`
    });
    document.querySelector('.products-grid').innerHTML=HTML;

    //making cart button interactive
      function cartQuantityUpdate(){
        let cartQuantity=0;
        cart.forEach(item=>{
          cartQuantity += item.quantity;
        })
        document.querySelector('.cart-quantity').innerHTML=cartQuantity;
      }

      document.querySelector('.products-grid').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-button')) {
          let { productId } = event.target.dataset;
          let cancelTime;
    
          addToCart(productId);
          document.querySelector(`.added-${productId}`).classList.add('added-product');
    
          clearTimeout(cancelTime);
          cancelTime = setTimeout(() => {
            document.querySelector(`.added-${productId}`).classList.remove('added-product');
          }, 2000);
    
          cartQuantityUpdate();
        }
      });
}
document.querySelector('.search-button').addEventListener('click',()=>{
    searchProducts();
})

document.querySelector('.search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchProducts();
  }
});


export function searchProducts(){

  let searchResult=[];
  const search = (document.querySelector('.search-bar').value).toUpperCase();


  products.forEach(product=>{
    product.keywords.forEach(key=>{
      if(search===(key.toUpperCase())){
        searchResult.push(product);
      }
    })
  })

  let searchHTML='';
    searchResult.forEach((result)=>{
      searchHTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${result.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${result.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${result.getRatingURL()}">
          <div class="product-rating-count link-primary">
            ${result.rating.count}
          </div>
        </div>

        <div class="product-price">
          $ ${result.getpriceCents()}
        </div>

        <div class="product-quantity-container">
          <select class="product-quantity-${result.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        
        <div class="product-spacer">
        ${result.extraHTML()}
        </div>

        <div class="added-to-cart added-${result.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${result.id}">
          Add to Cart
        </button>
      </div>`

      document.querySelector('.products-grid').innerHTML=searchHTML;
    });

    
  
}