export default [
  {

     path: '',
     component: () => import ('@/views/AUTH/Login.vue'),
   },
    {
     path: '',
     component: () => import ('@/views/Folder.vue')
     },
     {
     path: '/order-cart',
     component: () => import ('@/views/OrderCart/OrderCartList.vue'),
     },
    {
       path: '/order-cart/:id/view',
       name:'cart-view',
     component: () => import ('@/views/OrderCart/OrderCartView.vue'),
     },
     {
        path: '/order-cart/:id/order/create/:clinic_id',
        name:'cart-create',
     component: () => import ('@/views/OrderCart/Order/Create.vue'),
  },

     {
     path: '/order-cart/:id/order/create/add-item',
     component: () => import ('@/views/OrderCart/Order/AddItem.vue'),
  },
     { path: '/order-cart/:id/order/edit/:clinic_id/:order_id',
     component: () => import ('@/views/OrderCart/Order/updateorder.vue'),
     },
     {
     path: '/orderdetails-info/:id',
     component: () => import ('@/views/OrderCart/Order/orderinfo.vue'),
     }


 ]
