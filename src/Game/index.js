import {
  Black,
  GameObject,
  StageScaleMode,
  StageOrientation,
} from 'black-engine'
import { SceneManager } from 'black-box'

import Board from './Scenes/Board'

const { default: sceneManager } = SceneManager
sceneManager.register('board', Board)

class Game extends GameObject {
  constructor() {
    super()

    Black.stage.scaleMode = StageScaleMode.LETTERBOX
    Black.stage.setSize(400, 400)
    Black.stage.orientation = StageOrientation.UNIVERSAL
    Black.stage.orientationLock = true

    sceneManager.load('board')
  }
}

export default Game
