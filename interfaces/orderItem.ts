export type OrderItem = {
    id: number
    product_title: string
    price: number
    quantity: number
    admin_revenue: number
    ambassador_revenue: number
    created_at: string
    updated_at: string
    order: number
  }

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