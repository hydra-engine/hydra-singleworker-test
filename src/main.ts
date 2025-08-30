import { createInitialObjectStateBuffer, ObjectStateTree, Ticker } from '@hydraengine/core'
import { Renderer } from '@hydraengine/rendering'
import Stats from 'stats.js'

const BACKGROUND_FPS = 6

const sab = createInitialObjectStateBuffer()
const objectStateTree = new ObjectStateTree(sab)

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const renderer = new Renderer(canvas, objectStateTree)

const stats = new Stats()
stats.dom.style.position = 'absolute'
stats.showPanel(0)
document.body.appendChild(stats.dom)

const ticker = new Ticker((deltaTime) => {
  renderer.render()
  stats.update()
})

if (!document.hasFocus()) ticker.setFixedFps(BACKGROUND_FPS)
window.addEventListener('blur', () => ticker.setFixedFps(BACKGROUND_FPS))
window.addEventListener('focus', () => ticker.disableFixedFps())
window.addEventListener('pageshow', (event) => { if (event.persisted) ticker.disableFixedFps() })
