import * as THREE from 'three'

import Gizmo from './Gizmo'

export default class Environment {
  constructor() {
    this.gizmo = new Gizmo()
    this.scene = this.gizmo.scene
    this.resources = this.gizmo.resources
    this.debug = this.gizmo.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment')
    }

    this.setSunLight()
    this.setEnvironmentMap()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, -2.25)
    this.scene.add(this.sunLight)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(8)
        .step(0.01)

      this.debugFolder
        .add(this.sunLight.position, 'x')
        .name('sunLightX')
        .min(-8)
        .max(8)
        .step(0.01)

      this.debugFolder
        .add(this.sunLight.position, 'y')
        .name('sunLightY')
        .min(0)
        .max(8)
        .step(0.01)

      this.debugFolder
        .add(this.sunLight.position, 'z')
        .name('sunLightZ')
        .min(-8)
        .max(8)
        .step(0.01)
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {}
    this.environmentMap.intensity = 0.4
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
        }
      })
    }

    this.environmentMap.updateMaterials()

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, 'intensity')
        .name('envMapIntensity')
        .min(0)
        .max(4)
        .step(0.01)
        .onChange(this.environmentMap.updateMaterials)
    }
  }
}