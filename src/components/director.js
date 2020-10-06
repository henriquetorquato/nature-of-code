import { getScene } from '../scenes'

export default class Director {

    constructor() {
        const sceneType = getScene('paint_splatter')
        this.scene = new sceneType()
    }

    setup() {       
        this.scene.setup()
    }

    draw() {
        this.scene.draw()
    }

}