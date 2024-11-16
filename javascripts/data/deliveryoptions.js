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
export function getDeliveryDate(option){

    const today=dayjs();
       
    let deliveryDays = option.deliveryDays;
    let predictionDate =dayjs();
    let predictionDay = today.format('dddd');
    
    while(deliveryDays>0){
        predictionDate = predictionDate.add(1,'days');
        predictionDay =predictionDate.format('dddd');
        
        if(predictionDay === 'Saturday' || predictionDay === 'Sunday'){
            continue;
        }
        else{
            deliveryDays--;
        }
    }
    return predictionDate.format('dddd, MMMM D');
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