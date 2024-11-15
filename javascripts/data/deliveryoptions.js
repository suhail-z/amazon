import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions=[
    {
        id: '1',
        deliveryDays : 7,
        shipping : 0
    },
    {
        id : '2',
        deliveryDays : 3,
        shipping :499
    },
    {
        id : '3',
        deliveryDays : 1,
        shipping : 999
    }
];
export function getDeliveryDate(deliveryId){

    let deliveryOption = getDeliveryDetails(deliveryId);

    const today=dayjs();
    const deliveryTime  = today.add( deliveryOption.deliveryDays,'days')
    .format('dddd, MMMM D');
    return deliveryTime;
}
export function getDeliveryDetails(deliveryId){
    let match;
    deliveryOptions.forEach(option =>{
        if(option.id === deliveryId){
            match=option;
            return;
        }
    })
    return match  || deliveryOptions[0];
}