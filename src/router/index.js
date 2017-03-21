import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
  routes,
  mode : 'history',
  scrollBehavior(from, to){
    if (to.hash){
      return {selector : to.hash};
    }else{
      let view = document.querySelector('.guide .view');
      if (view){
        view.scrollTop = 0;
      }
    }
  }
});

export default router;
