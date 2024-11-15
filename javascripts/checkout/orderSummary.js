import {getProduct, products} from '../data/products.js';
import {cart,removeFromCart,updateDeliveryOption} from '../data/cart.js';
import {formatCurrency} from '../utils/currency.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryDate }  from '../data/deliveryOptions.js';
import { renderPaymentSummmary } from './paymentSummmary.js';
import { renderHeaderSummary } from './headerSummary.js';

export function renderOrderSummary(){

let checkoutSummaryHTML='';
cart.forEach((cartItem,index)=>{

    let match=getProduct(cartItem.id);

    
    checkoutSummaryHTML += `<div class="cart-item-container js-checkout-product${match.id}">
        <div class="delivery-date">
            Delivery date: ${getDeliveryDate(cartItem.deliveryOptionsId)}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${match.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${match.name}
            </div>
            <div class="product-price">
                $ ${formatCurrency(match.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                
                <span class="link-primary update-link js-update-${match.id}" data-product-id="${match.id}">
                Update
                </span>
                <input class=" update-input update-input-${match.id}" type="number" data-product-id="${match.id}">
                <span class="link-primary save-link js-save-${match.id}" data-product-id="${match.id}">save</span>
                
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${match.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(index,cartItem)}
            
            </div>
        </div>
        </div>
    `

})

function deliveryOptionsHTML(index,cartItem){
    let deliveryHTML='';
    deliveryOptions.forEach( option =>{

        const today=dayjs();
        const deliveryDay = today.add( option.deliveryDays,'days');
        const deliveryTime = deliveryDay.format('dddd, MMMM D');

        const shippingPrice = (option.shipping) === 0? 'FREE' :`${formatCurrency(option.shipping)}`;


        const isChecked =(option.id === cartItem.deliveryOptionsId);
    
        deliveryHTML +=
    `
    <div class="delivery-option js-delivery-option" data-product-id="${cartItem.id}" data-delivery-id="${option.id}">
               <input type="radio" ${isChecked? 'checked' : ''} class="delivery-option-input"
               name="delivery-option-${index}">
               <div>
               <div class="delivery-option-date">
                   ${deliveryTime}
               </div>
               <div class="delivery-option-price">
                   $${shippingPrice} - Shipping
               </div>
               </div>
           </div>`
    })
return deliveryHTML;
}

document.querySelector('.order-summary').innerHTML=checkoutSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
        console.log(deleteLink.dataset.productId);

        removeFromCart(deleteLink.dataset.productId);
        renderHeaderSummary();
        renderOrderSummary();
        renderPaymentSummmary();
    })
})

 document.querySelectorAll('.update-link')
.forEach( updateLink =>{
    updateLink.addEventListener('click',()=>{
        document.querySelector(`.js-update-${updateLink.dataset.productId}`)
        .style.display='none';

        document.querySelector(`.update-input-${updateLink.dataset.productId}`)
        .style.display='inline-block';

        document.querySelector(`.js-save-${updateLink.dataset.productId}`)
        .style.display='inline-block';
    })
});

document.querySelectorAll('.save-link').
forEach(saveLink => {
    saveLink.addEventListener('click',()=>{
        document.querySelector(`.js-update-${saveLink.dataset.productId}`).style.display='inline-block';

        document.querySelector(`.update-input-${saveLink.dataset.productId}`).style.display='none';

        document.querySelector(`.js-save-${saveLink.dataset.productId}`).style.display='none';

        let quantity = Number(document.querySelector(`.update-input-${saveLink.dataset.productId}`).value);

         cart.forEach(cartItem=>{
            if(cartItem.id === saveLink.dataset.productId)
                {cartItem.quantity = quantity;
                 return;}
                
                });
        localStorage.setItem('cart',JSON.stringify(cart));
        renderOrderSummary();
        renderPaymentSummmary();
    })
})

document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{
  element.addEventListener('click',()=>{
    updateDeliveryOption(element.dataset.productId,element.dataset.deliveryId);
    renderOrderSummary();
    renderPaymentSummmary();
  })

})
}