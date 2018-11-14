import { AssetManager } from 'black-engine'
import { SceneManager, Scene } from 'black-box'

class Preloader extends Scene {
  onAdded() {
    const { default: assetManager } = AssetManager
    assetManager.on('complete', this.onResLoaded, this)
    assetManager.loadQueue()
  }

  onResLoaded() {
    const { default: sceneManager } = SceneManager
    const qsloaded = sceneManager.qsload()
    if (!qsloaded) {
      this.nextScene()
    }
  }

  nextScene() {
    const { default: sceneManager } = SceneManager
    sceneManager.load('playground')
  }
}

export default Preloader
