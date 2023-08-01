import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import Gizmo from './Gizmo'

export default class Camera {
  constructor() {
    this.gizmo = new Gizmo()
    this.sizes = this.gizmo.sizes
    this.scene = this.gizmo.scene
    this.canvas = this.gizmo.canvas

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      1,
      200,
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }

  destroy() {
    this.controls.dispose()
  }
}
