export default [
  // Environment maps
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      'static/textures/environmentMap/px.jpg',
      'static/textures/environmentMap/nx.jpg',
      'static/textures/environmentMap/py.jpg',
      'static/textures/environmentMap/ny.jpg',
      'static/textures/environmentMap/pz.jpg',
      'static/textures/environmentMap/nz.jpg',
    ],
  },

  // Textures
  {
    name: 'dirtColorTexture',
    type: 'texture',
    path: 'static/textures/dirt/color.jpg',
  },
  {
    name: 'dirtNormalTexture',
    type: 'texture',
    path: 'static/textures/dirt/normal.jpg',
  },

  // 3D models
  {
    name: 'foxModel',
    type: 'gltfModel',
    path: 'static/models/Fox/glTF/Fox.gltf',
  },
]
