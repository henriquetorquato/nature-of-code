export default class Window {

    constructor(width, height, renderer) {
        this.width = width
        this.height = height
        this.renderer = renderer

        window.canvasCenter = this.center
        window.canvasSize = this.size
        window.canvasWidth = this.width
        window.canvasHeight = this.height
    }

    get center() {
        return {
            x: this.width / 2,
            y: this.height / 2
        }
    }

    get size() {
        return {
            width: this.width,
            height: this.height
        }
    }

    create() {
        createCanvas(this.width, this.height, this.renderer)
    }

}