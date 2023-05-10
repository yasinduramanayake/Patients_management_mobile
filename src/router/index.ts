import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, RouterLink } from 'vue-router';
import patient from "@/router/modules/patient";
import orders from "@/router/modules/orders";
import profile from "@/router/modules/profile";
import test from "@/router/modules/test";
import clinic from "@/router/modules/clinic";
import approvel from "@/router/modules/approvels";
import logout from "@/router/modules/logout";
import reset from "@/router/modules/resetpassword";



const routes: Array<RouteRecordRaw> = [

  ...orders,
  ...patient,
  ...profile,
  ...test,
  ...approvel,
  ...clinic,
  ...logout,
  ...reset
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
