const CANVAS_PARENT = 'canvas-parent'

export default class Window {

    constructor(width, height, renderer) {
        this.width = width
        this.height = height
        this.renderer = renderer

        window.canvasCenter = createVector(this.width / 2, this.height / 2)
        window.canvasSize = this.size
        window.canvasWidth = this.width
        window.canvasHeight = this.height
    }

    get size() {
        return {
            width: this.width,
            height: this.height
        }
    }

    create() {
        const canvas = createCanvas(this.width, this.height, this.renderer)
        canvas.parent(CANVAS_PARENT)
    }
}