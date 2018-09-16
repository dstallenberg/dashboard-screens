import Vue from 'vue'
import Router from 'vue-router'
import GridComponent from '@/components/GridComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GridComponent',
      component: GridComponent,
      props: {initialBoxes: [{name: 'clock', props: {width: 4, height: 4, minWidth: 3, minHeight: 3}}, {name: 'HelloWorld', props: {width: 4, height: 4, minWidth: 3, minHeight: 3}}, {name: 'clock', props: {width: 4, height: 4, minWidth: 3, minHeight: 3}}]}
    }
  ]
})
