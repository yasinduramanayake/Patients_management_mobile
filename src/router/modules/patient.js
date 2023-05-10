export default [
    {
        path: '/patients',
        name: 'patient-list',
        component: () => import ('@/views/Patient/index.vue'),
    },
    {
        path: '/createpatient',
        component: () => import ('@/views/Patient/Forms/Create.vue'),
    },
    {
        path: '/patient/:id/view',
        name: 'patient-edit',
        component: () => import ('@/views/Patient/view.vue'),
    },
    {
        path: '/patientviewedit/:id',
        component: () => import ('@/views/Patient/Forms/EditPatient.vue'),
    },
    {
        path: '/prescription/orderinfo/:id',
        component: () => import ('@/views/Patient/PatientComponent/orderinfo.vue'),
    },
]
