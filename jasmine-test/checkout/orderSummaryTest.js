import {renderOrderSummary} from '../../javascripts/checkout/orderSummary.js';
import {loadFromStorage,cart,addToCart } from '../../javascripts/data/cart.js';

describe('test Suite : render Order Summary',()=>{
    const prodID1= 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const prodID2='15b6fc6f-327a-4ec4-896f-486349e85a3d';
    
beforeEach(()=>{

    document.querySelector('.js-test-container').innerHTML=
        `<div class="order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="js-header-checkout">
        </div>`
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
           return JSON.stringify([
            { id: prodID1,
                quantity: 3,
                deliveryOptionsId : '1'
              },
             { id: prodID2,
                quantity: 2 ,
                deliveryOptionsId : '2'
             }
           ]);
        });
        loadFromStorage();

        renderOrderSummary();
})
afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML='';
})
    it('displays the cart',()=>{
        expect
        (document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${prodID1}`).innerText).toContain('Quantity: 3');
        expect(
            document.querySelector(`.js-product-quantity-${prodID2}`).innerText
        ).toContain('Quantity: 2');

        
    });
    it('removes a product',()=>{

        document.querySelector(`.js-delete-link-${prodID1}`).click();

        expect
        (document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
    document.querySelector(`.js-checkout-product${prodID1}`)
).toEqual(null);
    expect(
    document.querySelector(`.js-checkout-product${prodID2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1); 
    expect(cart[0].id).toEqual(prodID2);
    
    })
    
})