import {cart} from '../data/cart.js';
import { products,getProduct } from '../data/products.js';
import { getDeliveryDetails } from '../data/deliveryOptions.js';
import { formatCurrency } from '../utils/currency.js';


export function renderPaymentSummmary(){
    let totalProductPrice=0,totalShipping=0;

    cart.forEach(cartItem=> {
        const product=getProduct(cartItem.id);
        totalProductPrice += product.priceCents * cartItem.quantity;

        const delivery = getDeliveryDetails(cartItem.deliveryOptionsId);
        totalShipping += delivery.shipping;
    });
    let totalBeforeTax = totalProductPrice + totalShipping;
    let tax = totalBeforeTax * 0.1;
    let totalAfterTax =totalBeforeTax + tax;
    

    const paymentSummmaryHTML=
    ` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalProductPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalAfterTax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
document.querySelector('.js-payment-summary').innerHTML=paymentSummmaryHTML;
}