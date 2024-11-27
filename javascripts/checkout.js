import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummmary } from './checkout/paymentSummmary.js';
import { renderHeaderSummary } from './checkout/headerSummary.js';
import { loadProductsFromBackend } from './data/products.js';
//import "./data/cart-class.js"

loadProductsFromBackend(()=>{
    renderHeaderSummary();
    renderOrderSummary();
    renderPaymentSummmary();
});
