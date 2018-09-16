<template>
  <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <dnd-grid-container
      :layout.sync="layout"
      :cellSize="cellSize"
      :maxColumnCount="maxColumnCount"
      :maxRowCount="maxRowCount"
      :margin="margin"
      :bubbleUp="bubbleUp"
    >
      <dnd-grid-box
        v-for="(item, index) in boxes"
        :key="index"
        :boxId="index"
        dragSelector="div.card-header"
      >
        <div class="card demo-box">
          <div class="card-header">
            Box {{ index }}
            <component :is="item" :key="item.name"/>
          </div>
        </div>
      </dnd-grid-box>
    </dnd-grid-container>
  </div>
</template>

<script>
// import Container and Box components
import { Container, Box } from '@dattn/dnd-grid'
// minimal css for the components to work properly
import '@dattn/dnd-grid/dist/dnd-grid.css'

export default {
  name: 'GridComponent',
  props: {
    initialBoxes: Array
  },
  components: {
    DndGridContainer: Container,
    DndGridBox: Box
  },
  mounted () {
    for (let i = 0; i < this.initialBoxes.length; i++) {
      const component = () => import('./' + this.initialBoxes[i] + '.vue')
      console.log(component)
      this.boxes.push(component)
    }
  },
  methods: {
    addBox (box) {
      this.boxes.push(box)
    }
  },
  data () {
    return {
      boxes: [],

      cellSize: {
        w: 100,
        h: 100
      },
      maxColumnCount: 10,
      maxRowCount: Infinity,
      bubbleUp: false,
      margin: 5,
      boxCount: 4,
      layout: [
        {
          id: 'settings',
          hidden: false,
          pinned: false,
          position: {
            x: 0,
            y: 0,
            w: 4,
            h: 3
          }
        },
        {
          id: 1,
          hidden: false,
          pinned: false,
          position: {
            x: 4,
            y: 0,
            w: 2,
            h: 1
          }
        },
        {
          id: 2,
          hidden: false,
          pinned: false,
          position: {
            x: 6,
            y: 0,
            w: 1,
            h: 2
          }
        },
        {
          id: 3,
          hidden: false,
          pinned: false,
          position: {
            x: 4,
            y: 1,
            w: 2,
            h: 3
          }
        },
        {
          id: 4,
          hidden: false,
          pinned: false,
          position: {
            x: 6,
            y: 2,
            w: 3,
            h: 1
          }
        }
      ]
    }
  }
}
</script>

<style scoped>
  .demo-box {
    width: 100%;
    height: 100%;
  }
</style>
