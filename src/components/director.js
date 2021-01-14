import { getScene } from '@scenes'
import Window from './window'

export default class Director {

    setup() {
        this.scene = getScene('particle_repeller')
        const renderer = this.scene.renderer ? this.scene.renderer : P2D

        const gameWindow = new Window(500, 500, renderer)
        gameWindow.create()

        background(225)
        this.scene.setup()
    }

    draw() {       
        this.scene.draw()
    }

    keyPressed() {
        if (this.scene.keyPressed)
        {
            this.scene.keyPressed()
        }
    }

}