import { createRouter, createWebHistory } from 'vue-router';
import EmployeeList from '../components/EmployeeList.vue';

const routes = [
  {
    path: '/',
    name: 'EmployeeList',
    component: EmployeeList
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;