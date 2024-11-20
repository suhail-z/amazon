import {addToCart,cart,loadFromStorage} from '../../javascripts/data/cart.js'

describe('Test Suite : Testing addToCart() ',()=>{
    // mocking DOM values
    const mockQuantityInput = (productId, quantity) => {
        const inputElement = document.createElement('input');
        inputElement.classList.add(`product-quantity-${productId}`);
        inputElement.value = quantity;
        document.querySelector('.js-test-container').appendChild(inputElement);
        
        return inputElement;
      };

    it('Testing on an existing product :',()=>{
        //mock the local storage setItem(),getItem()
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
           return JSON.stringify([{
            id : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity : 1,
            deliveryOptionId :'1'
           }
           ]);
        });
        mockQuantityInput('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);  


    })
    it('Testing on new product :',() =>{
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
           return JSON.stringify([]);
        });

        mockQuantityInput('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        loadFromStorage();

        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })
    
})