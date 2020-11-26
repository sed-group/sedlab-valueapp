<template>
  <div class="Scene">
    <canvas
      id="renderCanvas"
      ref="canvas"
      class="Scene-canvas"
      touch-action="none"
      oncontextmenu="return false"
    ></canvas>
    <Box
        v-if="box.visible"
        :position="box.position"
        :width="box.width"
        :heigth="box.heigth"
        :depth="box.depth"
        :scaling="[0.4, 0.25, 0.25]"
    >
    <Material diffuse="#F00"></Material>
        <!-- <Property name="width" :any="{ width: box.width }"></Property> -->
    </Box>
    <Asset src="/volvo+XC90+sport.stl"></Asset>
  </div>
</template>

<script>
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  PointLight,
} from '@babylonjs/core'
import { Box } from 'vue-babylonjs';

export default {
  name: 'Scene',
  components: {
    Box,
  },

  provide() {
    return {
      babylon: this.babylon
    }
  },

  data() {
    return {
      babylon: {
        scene: undefined,
        sceneReady: false,
        canvas: undefined
      },
      box: {
        id: 'aBox',
        visible: true,
        position: {
        x: -1,
        y: 1.35,
        z: -0.4
        },
        width: 10,
        height: 40,
        depth: 100
      }
    }
  },

  mounted() {
    this.createScene()

    this.babylon.sceneReady = true
    this.babylon.canvas = this.$refs.canvas
  },

  beforeDestroy() {
    this.babylon.scene.dispose()
    this.engine.dispose()
  },

  methods: {
    createScene() {
      // Create render loop, a camera and some basic lights:
      this.engine = new Engine(
        this.$refs.canvas,
        true,
        { preserveDrawingBuffer: true },
        false
      )

      this.babylon.scene = new Scene(this.engine)

      var camera = new ArcRotateCamera(
        'Camera',
        Math.PI * 3 / 4,
        Math.PI * 3 / 8,
        5,
        // Vector3.Zero(),
        new Vector3(-1,1,0),
        this.babylon.scene
      )
      camera.attachControl(this.$refs.canvas, true)
      camera.wheelPrecision = 100.0;

      new HemisphericLight('light1', new Vector3(1, 1, 0), this.babylon.scene)
      new PointLight('light2', new Vector3(0, 1, -1), this.babylon.scene)

      this.engine.runRenderLoop(() => {
        this.babylon.scene.render()
      })
    },

    layout() {
      if (this.engine) this.engine.resize()
    }
  }
}
</script>

<style lang="scss">
.Scene {
  position: relative;
  width: 100%;
  height: 100%;
}

.Scene-canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
  outline: none;
  display: block;
}
</style>
