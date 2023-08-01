import * as THREE from 'three'

import Camera from './Camera'
import Debug from './Utils/Debug'
import Renderer from './Renderer'
import Resources from './Utils/Resources'
import Sizes from './Utils/Sizes'
import sources from './sources'
import Time from './Utils/Time'
import World from './World'

let instance = null

export default class Gizmo {
  constructor(canvas) {
    if (instance) {
      return instance
    }

    instance = this

    // Global access
    window.gizmo = this

    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.destroy()
    this.time.destroy()

    // Traverse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]

          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.destroy()
    this.renderer.destroy()

    if (this.debug.active) this.debug.ui.destroy()
  }
}
