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
      props: {initialBoxes: [{name: 'clock', props: {width: 2, height: 1, minWidth: 2, minHeight: 1}}, {name: 'HelloWorld', props: {width: 3, height: 2, minWidth: 3, minHeight: 1}}, {name: 'clock', props: {width: 2, height: 2, minWidth: 2, minHeight: 1}}]}
    }
  ]
})
