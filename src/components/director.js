import { getScene } from '@scenes'
import Window from './window'

export default class Director {

    setup() {
        this.scene = getScene('ecosystem')
        const renderer = this.scene.renderer ? this.scene.renderer : P2D

        const gameWindow = new Window(500, 500, renderer)
        gameWindow.create()

        background(225)
        this.scene.setup()
    }

    draw() {       
        this.scene.draw()
    }

}