import { formatCurrency } from "../javascripts/utils/currency.js";

describe('Test Suite : testing format currency',()=>{
    it('converting cents to dollar:  1 ',()=>{
        expect(formatCurrency(2055)).toEqual('20.55')
    })
    it('converting cents to dollar:  2 ',()=>{
        expect(formatCurrency(2095)).toEqual('20.95')
    })
    it('testing edge cases "0" : ',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    })
    
    describe('round of cases :',()=>{
        
    it('testing edge cases "2000.5"',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
    it('testing the round of edge cases',()=>{
        expect(formatCurrency(2000.4)).toEqual('20.00');
    })
})

})