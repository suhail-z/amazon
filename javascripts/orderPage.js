import { fetchProducts, getProduct,products } from "../javascripts/data/products.js";
import { formatCurrency } from "../javascripts/utils/currency.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart,buyAgain } from "../javascripts/data/cart.js";
import { orders } from "../javascripts/data/orders.js";

async function  readyProducts(){
 await fetchProducts();
 renderOrders();
}

readyProducts();
cartQuantityUpdate();

function renderOrders(){
  let ordersHTML=''
    orders.forEach(orderElement => {

      ordersHTML +=  
       `  <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDeliveryDate(orderElement.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderElement.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderElement.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderOrderedProducts(orderElement.products,orderElement.id)}

          </div>
        </div>
       `;
    })
    document.querySelector('.orders-grid').innerHTML = ordersHTML;

    document.querySelectorAll('.buy-again-button').forEach(buyButton=>{
      buyButton.addEventListener('click',()=>{
          let {id}= buyButton.dataset;

          buyAgain(id);
          cartQuantityUpdate();
      })
    })
  }

  function renderOrderedProducts(products,orderId){

    let productHTML=''
    products.forEach(product=>{
      const match=getProduct(product.productId);
      productHTML +=
      `<div class="product-image-container">
              <img src="${match.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${match.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatDeliveryDate(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary" data-id="${product.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderid=${orderId}&productid=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `
    })
    return productHTML;
  }

  function formatDeliveryDate(isoDate){
      const day=new dayjs(isoDate);
      return day.format('MMMM D');
  }
  
function cartQuantityUpdate(){
    let cartQuantity=0;
    cart.forEach(item=>{
      cartQuantity += item.quantity;
    })
    document.querySelector('.cart-quantity').innerHTML=cartQuantity;
  }

  cartQuantityUpdate();