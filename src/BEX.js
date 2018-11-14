import { GameObject as $GameObject } from 'black-engine'

class BEX extends $GameObject {
  static Fragment = Symbol('NODE_FRAGMENT')

  static createNode(GameObject, props, ...children) {
    if (GameObject === BEX.Fragment) {
      return children
    }

    const gameObject = new GameObject()

    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (key === 'components') {
          if (Array.isArray(value)) {
            gameObject.add(...value)
          } else {
            gameObject.add(value)
          }
        } else {
          gameObject[key] = value
        }
      })
    }

    if (children.length > 0) {
      gameObject.add(...children)
    }

    return gameObject
  }
}

export default BEX
