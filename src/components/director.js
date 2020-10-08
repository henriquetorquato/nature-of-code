import { getScene } from '../scenes'

export default class Director {

    constructor() {
        const sceneType = getScene('color_noise')
        this.scene = new sceneType()
    }

    setup() {       
        background(225)
        this.scene.setup()
    }

    draw() {       
        this.scene.draw()
    }

}