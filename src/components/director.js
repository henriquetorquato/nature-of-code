import Window from './window'
import { getScene } from '@scenes'
import { getActiveScene } from './active_scene'

export default class Director {

    setup() {
        const scene_id = getActiveScene()

        this.scene = getScene(scene_id)
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