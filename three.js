import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

var renderer,
  scene,
  camera,
  controls,
  clock,
  axesHelper,
  origin,
  fovPoints,
  wireframe,
  beamParams,
  cameraParams,
  animated,
  debug,
  matLine,
  gui,
  beamParamsFolder,
  cameraParamsFolder,
  controlsFolder,
  debugFolder,
  beamBoundingBox,
  elapsedTime

beamParams = {
  sid: 100,
  width: 25,
  height: 30,
  boundingBoxColor: 0xff0000,
}
cameraParams = {
  globalXRotate: 0,
  globalYRotate: Math.PI / 2,
  globalZRotate: Math.PI / 2,
  globalXMove: 150,
  globalYMove: 0,
  globalZMove: 50,
}
animated = {
  rotate: true,
}
debug = {
  showAxesHelper: false,
}

const init = () => {
  gui = new dat.GUI({
    title: 'Dev Options',
  })

  beamParamsFolder = gui.addFolder('Beam Parameters')
  beamParamsFolder.addColor(beamParams, 'boundingBoxColor').name('Colour')
  beamParamsFolder.add(beamParams, 'sid').name('SID').min(80).max(300).step(10)
  beamParamsFolder
    .add(beamParams, 'width')
    .name('Collimated Width')
    .min(1)
    .max(43)
    .step(1)
  beamParamsFolder
    .add(beamParams, 'height')
    .name('Collimated Height')
    .min(1)
    .max(43)
    .step(1)

  cameraParamsFolder = gui.addFolder('Camera Parameters')
  cameraParamsFolder
    .add(cameraParams, 'globalXMove')
    .name('Global X - Move')
    .min(0)
    .max(300)
    .step(10)
  cameraParamsFolder
    .add(cameraParams, 'globalYMove')
    .name('Global Y - Move')
    .min(-300)
    .max(300)
    .step(5)
  cameraParamsFolder
    .add(cameraParams, 'globalZMove')
    .name('Global Z - Move')
    .min(-300)
    .max(300)
    .step(5)
  cameraParamsFolder
    .add(cameraParams, 'globalXRotate')
    .name('Global X - Rotate')
    .min(-Math.PI)
    .max(Math.PI)
    .step(Math.PI / 18)
  cameraParamsFolder
    .add(cameraParams, 'globalYRotate')
    .name('Global Y - Rotate')
    .min(-Math.PI)
    .max(Math.PI)
    .step(Math.PI / 18)
  cameraParamsFolder
    .add(cameraParams, 'globalZRotate')
    .name('Global Z - Rotate')
    .min(-Math.PI)
    .max(Math.PI)
    .step(Math.PI / 18)

  controlsFolder = gui.addFolder('Controls')
  controlsFolder.add(animated, 'rotate').name('Rotate')

  debugFolder = gui.addFolder('Debug')
  debugFolder.add(debug, 'showAxesHelper').name('Show Axes')

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0.0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  )
  camera.position.set(-50, 0, 50)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 10
  controls.maxDistance = 500

  clock = new THREE.Clock()
  elapsedTime = clock.getElapsedTime()

  axesHelper = new THREE.AxesHelper(10)

  //
  origin = new THREE.Vector3(0, 0, beamParams.sid)
  fovPoints = {
    pointUpperLeft: new THREE.Vector3(
      beamParams.width / -2,
      beamParams.height / 2,
      0,
    ),
    pointUpperRight: new THREE.Vector3(
      beamParams.width / 2,
      beamParams.height / 2,
      0,
    ),
    pointLowerLeft: new THREE.Vector3(
      beamParams.width / -2,
      beamParams.height / -2,
      0,
    ),
    pointLowerRight: new THREE.Vector3(
      beamParams.width / 2,
      beamParams.height / -2,
      0,
    ),
  }

  beamBoundingBox = new THREE.Group()
  for (let point in fovPoints) {
    const points = [origin, fovPoints[point]]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: beamParams.boundingBoxColor,
    })
    const line = new THREE.Line(geometry, material)
    beamBoundingBox.add(line)
  }

  // Create Other Objects
  if (debug.showAxesHelper === true) {
    scene.add(axesHelper)
  }

  // User Controls
  if (animated.rotate === true) {
    beamBoundingBox.rotation.z = elapsedTime
  }

  // Rotate and Position Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
  )
  camera.rotation.set(
    cameraParams.globalXRotate,
    cameraParams.globalYRotate,
    cameraParams.globalZRotate,
  )
  camera.position.set(
    cameraParams.globalXMove,
    cameraParams.globalYMove,
    cameraParams.globalZMove,
  )

  // Update Scene
  scene.add(beamBoundingBox, camera)
  renderer.setSize(window.innerWidth, window.innerHeight)

  //

  window.addEventListener('resize', onWindowResize, false)
  onWindowResize()
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

const guiInit = () => {}

const animate = () => {
  window.requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

init()
animate()
//
//const tick = () => {
//
//  const elapsedTime = clock.getElapsedTime()
//  scene.clear()
//
//  // Declare Points
//  const origin = new THREE.Vector3( 0, 0, beamParams.sid )
//  const fovPoints = {
//    pointUpperLeft: new THREE.Vector3( beamParams.width / -2, beamParams.height / 2, 0 ),
//    pointUpperRight: new THREE.Vector3( beamParams.width / 2, beamParams.height / 2, 0 ),
//    pointLowerLeft: new THREE.Vector3( beamParams.width / -2, beamParams.height / -2, 0 ),
//    pointLowerRight: new THREE.Vector3( beamParams.width / 2, beamParams.height / -2, 0 )
//  }
//
//  // Create Vectors
//  const beamBoundingBox = new THREE.Group()
//  for (let point in fovPoints) {
//    const points = [ origin, fovPoints[ point ] ]
//    const geometry = new THREE.BufferGeometry().setFromPoints( points )
//    const material = new THREE.LineBasicMaterial({ color: beamParams.boundingBoxColor })
//    const line = new THREE.Line( geometry, material )
//    beamBoundingBox.add( line )
//  }
//
//  // Create Other Objects
//  if (debug.showAxesHelper === true){
//    scene.add( axesHelper )
//  }
//
//  // User Controls
//  if (animated.rotate === true){
//    beamBoundingBox.rotation.z = elapsedTime
//  }
//
//  // Rotate and Position Camera
//  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight )
//  camera.rotation.set( cameraParams.globalXRotate, cameraParams.globalYRotate, cameraParams.globalZRotate )
//  camera.position.set( cameraParams.globalXMove, cameraParams.globalYMove, cameraParams.globalZMove )
//
//  // Update Scene
//  scene.add( beamBoundingBox, camera )
//  renderer.setSize( window.innerWidth, window.innerHeight )
//
//  // Render
//  renderer.render( scene, camera )
//
//
//  window.requestAnimationFrame( tick )
//}
//tick()
