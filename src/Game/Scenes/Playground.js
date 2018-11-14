import BEX from '#/BEX'
import { AssetManager, Sprite, TextField } from 'black-engine'
import { Scene } from 'black-box'
import { Breath } from 'black-box/Animation'
import res from 'res'

const { default: assetManager } = AssetManager

const bgName = 'playground.bg'
assetManager.enqueueImage(bgName, res.url(bgName))

class Playground extends Scene {
  onAdded() {
    this.add(<Sprite textureName={bgName} />)

    this.add(
      <TextField
        text="GAME! GAME! GAME!"
        color={0xffffff}
        size={42}
        anchorX={0.5}
        x={this.stage.centerX}
        y={this.stage.centerY}
        components={[new Breath()]}
      />
    )
  }
}

export default Playground
