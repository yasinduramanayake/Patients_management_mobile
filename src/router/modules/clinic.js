 export default [
  {
     path: '/clinics',
     component: () => import ('@/views/Clinic/index.vue'),
  },
     {
     path: '/clinics/:id/view',
     component: () => import ('@/views/Clinic/indexview.vue'),
   },
   {
     path: '/clinic-create',
     name:'clinic-create',
     component: () => import ('@/views/Clinic/Forms/Create.vue'),
   },   {
     path: '/sendinvitations/:clinic_id',
     name:'send-invitation',
     component: () => import ('@/views/Clinic/Forms/SendInvitations.vue'),
   },
   {
     path: '/clinicusers/:id/view',
     component: () => import ('@/views/Clinic/Menu/MenuItems/Users/indexview.vue'),
   },
   {
     path: '/clinicview/:id/genaral',
     component: () => import ('@/views/Clinic/Menu/MenuItems/Genaral.vue'),
   },
   {
     path: '/clinicview/:id/credits',
     component: () => import ('@/views/Clinic/Menu/MenuItems/Credits.vue'),
   },
   {
     path: '/clinicview/:id/items',
     component: () => import ('@/views/Clinic/Menu/MenuItems/Item.vue'),
   },
   {
     path: '/clinicview/:id/address',
     component: () => import ('@/views/Clinic/Menu/MenuItems/Address.vue'),
   },
  {
     path: '/clinicview/:id/users',
     component: () => import ('@/views/Clinic/Menu/MenuItems/Users/index.vue'),
   },
   {
     path: '/clinicView/:id/invite',
     component: () => import ('@/views/Clinic/Menu/MenuItems/Invite.vue'),
   },
 ]
