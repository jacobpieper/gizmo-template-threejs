import * as THREE from 'three'

import Gizmo from './Gizmo'

export default class Renderer {
  constructor() {
    this.gizmo = new Gizmo()
    this.canvas = this.gizmo.canvas
    this.sizes = this.gizmo.sizes
    this.scene = this.gizmo.scene
    this.camera = this.gizmo.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.instance.physicallyCorrectLights = true
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFShadowMap
    this.instance.setClearColor('#211d20')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

  destroy() {
    this.instance.dispose()
  }
}
