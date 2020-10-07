import { getScene } from '../scenes'

export default class Director {

    constructor() {
        const sceneType = getScene('random_walker')
        this.scene = new sceneType()
    }

    setup() {       
        this.scene.setup()
        background(225)
    }

    draw() {       
        this.scene.draw()
    }

}