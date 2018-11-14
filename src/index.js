import {
  SplashScreen,
  Black,
  CanvasDriver,
  Input,
  MasterAudio,
} from 'black-engine'
import { Console } from 'black-box/Debug'
import Game from './Game'

new Console('debug')

SplashScreen.enabled = false

const black = new Black('game-container', Game, CanvasDriver, [
  Input,
  MasterAudio,
])
black.start()
black.pauseOnBlur = false
black.pauseOnHide = false
