 export default [
   {
     path: '/pending-orders/:id/view',
     component: () => import ('@/views/Approvel/Components/Pending/indexview.vue'),
   },   {
     path: '/orderinfo/:id/view',
     component: () => import ('@/views/Approvel/orderinfo.vue'),
   },
     {
     path: '/pending-primed/:id/view',
     component: () => import ('@/views/Approvel/Components/Pending primed/indexview.vue'),
   },
     {
     path: '/complete/:id/view',
     component: () => import ('@/views/Approvel/Components/Complete/indexview.vue'),
   },
   {
     path: '/approvel',
     component: () => import ('@/views/Approvel/index.vue'),
   },
 ]
