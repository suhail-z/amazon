import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummmary } from './checkout/paymentSummmary.js';
import { renderHeaderSummary } from './checkout/headerSummary.js';
import { fetchproducts } from './data/products.js';
import { fetchCart } from './data/cart.js';
//import "./data/cart-class.js"

Promise.all([
    fetchproducts(),
    new Promise((resolve)=>{
        fetchCart(()=>{
        resolve();
    })
  })
]).then(()=>{
    renderHeaderSummary();
    renderOrderSummary();
    renderPaymentSummmary();
})


