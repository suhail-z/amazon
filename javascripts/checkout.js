import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummmary } from './checkout/paymentSummmary.js';
import { renderHeaderSummary } from './checkout/headerSummary.js';
import { fetchProducts } from './data/products.js';
import { fetchCart } from './data/cart.js';
//import "./data/cart-class.js"

async function renderCheckOut(){

   try{
    await fetchProducts();
    //throw
    await new Promise((resolve/*reject*/)=>{
        fetchCart(()=>{
        resolve();
    })
  });

   }catch(error){
    console.log(`some unexpected error occured:${error}`);
}
  renderHeaderSummary();
  renderOrderSummary();
  renderPaymentSummmary();
}
renderCheckOut();
/*
Promise.all([
    fetchProducts(),
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
*/

