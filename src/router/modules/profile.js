export default [
    {
     path: '/login',
     component: () => import ('@/views/AUTH/Login.vue'),
   },

     {
     path: '/profile',
     component: () => import ('@/views/Profile/index.vue'),
   },

    {
     path: '/reset',
     component: () => import ('@/views/Profile/Forms/ResetPassword.vue'),
   },
     {
    path: '/addresses',
     component: () => import ('@/views/Profile/Addresses.vue'),
   }
 ]
