<template>
    <div class="container-fluid">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <container
            :layout.sync="layout"
            :cellSize="cellSize"
            :maxColumnCount="maxColumnCount"
            :maxRowCount="maxRowCount"
            :margin="margin"
            :bubbleUp="bubbleUp"
            v-on:update-layout="onLayoutUpdate"
        >
          <box
            v-for="(item, index) in boxes"
            :key="index"
            :boxId="index"
            dragSelector="div.card-selector"
            :minWidth="item.props.minWidth"
            :minHeight="item.props.minHeight"
            :width="item.props.width"
            :height="item.props.height"
          >
            <div class="card">
              <div class="card-header">
                <div @click="switchPinMode(index)" id="pin-button">
                  <img v-if="isPinned(index)" src="../assets/pinned-icon.png" class="icon">
                  <img v-if="!isPinned(index)" src="../assets/unpinned-icon.png" class="icon">
                </div>
                <div class="card-selector"> Box {{ item.name }}</div>
                <div @click="removeCard(index)" id="close-button"><img src="../assets/close_icon.png" class="icon"></div>
              </div>
              <component
                :is="item.component"
                :key="item.name"
                :minWidth="item.props.minWidth"
                :minHeight="item.props.minHeight"
              />
            </div>
          </box>
        </container>
    </div>
</template>

<style lang="scss">
  .card {
      width: 100%;
      height: 100%;
      overflow: hidden;
  }
  .card-header {
    padding: 0 !important;
    height: 30px;
    display: flex;
    flex-flow: row;

    #pin-button,  #close-button {
      box-sizing: content-box;
      -webkit-transition: 0.5s;
      transition: 0.5s;
      flex: 0 1 10%;
      padding: 0.5%;
      height: 80%;
      &:hover {
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 2);
        border: 1px solid #000;
        background-color: rgba(0, 0, 0, 0.01);
      }
    }
    .card-selector {
      flex: 1 1 auto;
    }
    .icon {
      width: auto;
      height: 100%;
    }
  }
</style>

<script>
import Container from './grid/Container'
import Box from './grid/Box'

export default {
  name: 'GridComponent',
  components: {
    Container,
    Box
  },
  props: {
    initialBoxes: Array
  },
  mounted () {
    for (let i = 0; i < this.initialBoxes.length; i++) {
      const component = () => import('./widgets/' + this.initialBoxes[i].name + '.vue')
      this.boxes.push({
        component: component,
        name: this.initialBoxes[i].name,
        props: this.initialBoxes[i].props })
    }

    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      window.addEventListener('resize', this.getWindowHeight)

      // Init
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  data () {
    return {
      boxes: [],
      cellSize: {
        w: 100,
        h: 100
      },
      maxColumnCount: 10,
      maxRowCount: 10,
      bubbleUp: false,
      margin: 5,
      layout: [ // example
        // {
        //   id: 1,
        //   hidden: false,
        //   pinned: false,
        //   position: {
        //     x: 4,
        //     y: 0,
        //     w: 2,
        //     h: 1
        //   }
        // }
      ]
    }
  },

  computed: {
    layoutWithoutSettings () {
      return this.layout.filter((box) => {
        return box.id !== 'settings'
      })
    }
  },

  methods: {
    getIndex (id) {
      for (let i = 0; i < this.layout.length; i++) {
        if (this.layout[i].id === id) {
          return i
        }
      }
      return -1
    },
    removeCard (id) {
      let index = this.getIndex(id)
      if (this.layout[index]) {
        this.layout.splice(index, 1)
      } else {
        console.log(id, 'does not exists!')
      }
    },
    switchPinMode (id) {
      let index = this.getIndex(id)

      if (this.layout[index]) {
        this.layout[index].pinned = !this.layout[index].pinned
      } else {
        console.log(id, 'does not exists!')
      }
    },
    isPinned (id) {
      let index = this.getIndex(id)

      if (this.layout[index]) {
        return this.layout[index].pinned
      } else {
        console.log(id, 'does not exists!')
      }
      return false
    },
    onLayoutUpdate (evt) {
      for (let i = 0; i < evt.length; i++) {
        for (let j = 0; j < this.$data.layout.length; j++) {
          if (evt[i].id === this.$data.layout[j].id) {
            this.$data.layout.splice(j, 1)
            break
          }
        }
        this.$data.layout.push(evt[i])
      }
    },
    getWindowWidth (event) {
      let windowWidth = document.documentElement.clientWidth
      this.cellSize.w = windowWidth / this.maxColumnCount
    },

    getWindowHeight (event) {
      let windowHeight = document.documentElement.clientHeight
      this.cellSize.h = windowHeight / this.maxRowCount
    }
  }
}
</script>
