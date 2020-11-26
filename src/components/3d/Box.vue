<script>
import { PBRMaterial, Color3, Mesh } from '@babylonjs/core'
import '@babylonjs/core/Meshes/meshBuilder'

import entity from '@/components/mixins/entity'
import position from '@/components/mixins/position'

export default {
  name: 'Box',
  mixins: [entity, position],

  methods: {
    addToScene() {
      this.sceneElement = Mesh.CreateBox(
        this.value.id,
        {
          height: 100,
          width: 200,
          depth: 400
        },
        this.babylon.scene
      )

      var material = new PBRMaterial('pbr', this.babylon.scene)
      material.albedoColor = new Color3(1.0, 0.766, 0.336)
      material.metallic = 0
      material.roughness = 0

      this.sceneElement.material = material
    },

    removeFromScene() {
      this.sceneElement.dispose()
    }
  }
}
</script>
