import Gizmo from './Gizmo'
import DirtFloor from './Components/DirtFloor'
import Environment from './Environment'
import Fox from './Components/Fox'

export default class World {
  constructor() {
    this.gizmo = new Gizmo()
    this.scene = this.gizmo.scene
    this.resources = this.gizmo.resources

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.floor = new DirtFloor()
      this.fox = new Fox()
      this.environment = new Environment()
    })
  }

  update() {
    if (this.fox) this.fox.update()
  }
}
