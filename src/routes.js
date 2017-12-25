import VueRouter from 'vue-router';
import SignIn from './components/sign-in/sign-in.vue';
import SignUp from './components/sign-up/sign-up.vue';
import ManageIdeas from './components/mange-ideas/manage-ideas.vue';

const routes = [
  {
    path: '/',
    redirect: '/sign-in'
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: SignUp,
  },
  {
    path: '/ideas',
    name: 'ideas',
    component: ManageIdeas,
  },
];


export const router = new VueRouter({
  routes
});
