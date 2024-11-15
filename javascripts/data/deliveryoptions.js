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
export function getDeliveryDate(id){

    let deliveryDay;
    deliveryOptions.forEach(option=>{
        if(id === option.id)
       deliveryDay=option.deliveryDays;
    })


    const today=dayjs();
    const deliveryTime  = today.add( deliveryDay,'days')
    .format('dddd, MMMM D');
   console.log(deliveryTime);
    return deliveryTime;
}