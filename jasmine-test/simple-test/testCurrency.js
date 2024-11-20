import { formatCurrency } from "../../javascripts/utils/currency.js";

console.log('Test Suite : currency conversion');
console.log('basic test case');

if(formatCurrency(2095) == '20.95'){
    console.log('passed');
}
else{
    console.log('failed');
}
console.log('testing 0');

if(formatCurrency(0) == '0.00'){
    console.log('passed');
}
else{
    console.log('failed');
}
console.log('testing edge level : round up');

if(formatCurrency(2000.5) == '20.01'){
    console.log('passed');
}
else{
    console.log('failed');
}

console.log('testing edge level 2 : round up');

if(formatCurrency(2000.4) == '20.00'){
    console.log('passed');
}
else{
    console.log('failed');
}

