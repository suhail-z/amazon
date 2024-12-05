import { orders } from "../javascripts/data/orders.js";
import { cart } from "../javascripts/data/cart.js";
import { getProduct,fetchProducts } from "../javascripts/data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function readyProducts(){
await fetchProducts();
renderTrackingPage();
}

readyProducts();

function renderTrackingPage(){

const url = new URL(window.location.href);
const ordid=url.searchParams.get('orderid');
const prid = url.searchParams.get('productid');


 function cartQuantityUpdate(){
    let cartQuantity=0;
    cart.forEach(item=>{
      cartQuantity += item.quantity;
    })
    document.querySelector('.cart-quantity').innerHTML=cartQuantity;
  }


function findProduct(){
    let matchOrder;
    let matchProduct;
    orders.forEach(order => {
        if(order.id === ordid){
            matchOrder =order; 
        }
    });
    matchOrder.products.forEach(product=>{
        if(product.productId === prid){
            matchProduct = product;
        }
    })
    return matchProduct;
}

const targetProduct = findProduct();
const productInfo = getProduct(targetProduct.productId);

function formatDeliveryDate(isoDate){
    const day=new dayjs(isoDate);
    return day.format('dddd, MMMM D');
}

function renderTracking(){
const trackHTML =
    `
       <div class="order-tracking">

        <div class="delivery-date">
          Arriving on ${formatDeliveryDate(targetProduct.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${productInfo.name}
        </div>

        <div class="product-info">
          Quantiy : ${targetProduct.quantity}
        </div>

        <img class="product-image" src="${productInfo.image}">

        <div class="progress-labels-container">
          <div class="progress-label Preparing">
            Preparing
          </div>
          <div class="progress-label Shipped">
            Shipped
          </div>
          <div class="progress-label Delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
  document.querySelector('.main').innerHTML  = trackHTML;
}


function progressBar(deliveryDate){

    const dd= new dayjs(deliveryDate);
    const sd= dayjs(deliveryDate).subtract(5,'days');
    const today=new dayjs();


    if(today.isAfter(dd)){
        document.querySelector('.progress-bar').style.width='150%';
        document.querySelector('.Delivered').classList.add('current-status');
    }
    else if(today.isAfter(sd)){
        document.querySelector('.progress-bar').style.width='50%';
        document.querySelector('.Shipped').classList.add('current-status');
    }else{
        document.querySelector('.progress-bar').style.width='5%';
        document.querySelector('.Preparing').classList.add('current-status');
    }
    

}
renderTracking();
progressBar(targetProduct.estimatedDeliveryTime);
cartQuantityUpdate();

}