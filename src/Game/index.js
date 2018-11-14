import {
  Black,
  GameObject,
  StageScaleMode,
  StageOrientation,
} from 'black-engine'
import { SceneManager } from 'black-box'

import Preloader from './Scenes/Preloader'
import Playground from './Scenes/Playground'

const { default: sceneManager } = SceneManager
sceneManager.register('preloader', Preloader)
sceneManager.register('playground', Playground)

class Game extends GameObject {
  constructor() {
    super()

    Black.stage.scaleMode = StageScaleMode.COVER
    Black.stage.setSize(750, 1500)
    Black.stage.orientation = StageOrientation.PORTRAIT
    Black.stage.orientationLock = true

    sceneManager.load('preloader')
  }
}

export default Game
