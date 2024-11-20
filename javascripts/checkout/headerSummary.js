import {cart} from '../data/cart.js'

export function renderHeaderSummary(){
    let cartQuantity=0;
   cart.forEach(item=>{
     cartQuantity += item.quantity;
   })
   document.querySelector('.js-header-checkout').innerHTML=cartQuantity;
 }