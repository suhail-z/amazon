
export const orders = JSON.parse(localStorage.getItem('orders')) || [
    { id: "a423c55a-9254-439e-80c1-2cfec7d4e7e4",
      orderTime: "2024-12-02T18:46:19.999Z",
      totalCostCents : 14397,
      products:[{
            estimatedDeliveryTime : "2024-12-09T18:46:19.999Z",
            productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity :  2,
            variation : null
      },{
        estimatedDeliveryTime : "2024-12-09T18:46:19.999Z",
        productId : "dd82ca78-a18b-4e2a-9250-31e67412f98d",
        quantity : 1,
        variation : null
      },{
        estimatedDeliveryTime :  "2024-12-09T18:46:19.999Z",
        productId : "77919bbe-0e56-475b-adde-4f24dfed3a04",
        quantity : 1,
        variation : null
      }
    ]
 
    },
    {
        id : "a1885bb9-c853-4857-9e1c-8549f9294442",
        orderTime : "2024-12-02T18:24:30.162Z",
        totalCostCents : 564,
        products :[
            {
                estimatedDeliveryTime : "2024-12-09T18:46:19.999Z",
                productId : "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
                quantity : 1,
                variation : null
            }
        ]

    }
];

export function placeOrder(order){
    orders.unshift(order);
    localStorage.setItem('orders',JSON.stringify(orders));
}

