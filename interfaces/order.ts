import { orderItem } from './orderItem'

export type Order = {
    id: number
    orderItems: [
        orderItem
    ]
    total: number
    transaction_id: number

    code: string
    ambassador_email: string
    first_name: string
    last_name: string
    email: string
    address: string
    city: string
    country: string
    zip: number
    complete: boolean
    created_at: string
    updated_at: string
    user: number


  }



// "id": 1,
// "order_items": [
//     {
//         "id": 1,
//         "product_title": "Shirley Bright",
//         "price": "58.00",
//         "quantity": 4,
//         "admin_revenue": "208.80",
//         "ambassador_revenue": "23.20",
//         "created_at": "2023-02-09T20:39:31.413080Z",
//         "updated_at": "2023-02-09T20:39:31.413116Z",
//         "order": 1
//     }
// ],
// "total": 232.0,
// "transaction_id": null,
// "code": "code",
// "ambassador_email": "b@b.com",
// "first_name": "Joel",
// "last_name": "Durham",
// "email": "stefanie72@yahoo.com",
// "address": null,
// "city": null,
// "country": null,
// "zip": null,
// "complete": true,
// "created_at": "2023-02-09T20:39:31.400857Z",
// "updated_at": "2023-02-09T20:39:31.401252Z",
// "user": 35