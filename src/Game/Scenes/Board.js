import { GameObject, Input, TextField, Graphics } from 'black-engine'
import { Scene, Layer } from 'black-box'
import { Mask } from 'black-box/Display'

class Board extends Scene {
  constructor(name) {
    super(name)

    this.touchable = true
    this._drawing = false
    this._points = []
    this.addCopyButton()
  }

  onAdded() {
    this.addBG()
    this.addPointsCounter()

    this.bg.on('pointerDown', () => {
      this._drawing = true
      this.resetPaths()
      this.resetPoints()
      this.currentPoint = this.bg.globalToLocal(Input.pointerPosition)
      this._points.push(this.currentPoint)
    })

    Input.on('pointerMove', () => {
      if (!this._drawing) return

      this.prevPoint = this.currentPoint
      this.currentPoint = this.bg.globalToLocal(Input.pointerPosition)
      this._points.push(this.currentPoint)
      this.connectPoints(this.prevPoint, this.currentPoint)

      const pointsCount = this._points.length
      this.setCounter(pointsCount)
    })

    Input.on('pointerUp', () => {
      if (!this._drawing) return

      this._drawing = false
    })
  }

  addBG() {
    const bg = new Mask({ color: 0xffffff, alpha: 1 })
    bg.touchable = true
    this.bg = bg
    bg.alignAnchor(0, 0)
    this.addChild(bg)
  }

  connectPoints(from, to) {
    const { x: fromX, y: fromY } = from
    const { x: toX, y: toY } = to

    const g = new Graphics()
    g.tag = 'path'
    g.beginPath()
    g.lineStyle(4, 0x000000)
    g.moveTo(fromX, fromY)
    g.lineTo(toX, toY)
    g.stroke()
    this.add(g)
  }

  resetPaths() {
    const paths = GameObject.findWithTag('path') || []
    paths.forEach(path => path.removeFromParent())
  }

  resetPoints() {
    this._points = []
  }

  addPointsCounter() {
    const counter = new TextField('0 Point')
    this.counter = counter
    counter.alignAnchor(0, 0)
    counter.size = 14
    this.addChild(counter)
  }

  setCounter(count) {
    this.counter.text = `${count} pointers`
  }

  addCopyButton() {
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.innerText = 'COPY POINTS'
    button.style.fontSize = '24px'
    button.style.position = 'fixed'
    button.style.bottom = '20px'
    button.style.right = '20px'
    button.style.zIndex = Layer.DOM_INTERACTION

    button.addEventListener('click', () => {
      const text = JSON.stringify(this._points, '', 2)
      this.copy(text)
    })
  }

  copy(text) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    window.input = input
    input.value = text
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
}

export default Board
