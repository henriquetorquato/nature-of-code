import CircularCamera from '../entities/circular_camera'

const LANDSCAPE_PANNEL_WIDTH = 50
const LANDSCAPE_PANNEL_HEIGHT = 50
const LANDSCAPE_WIDTH = 20
const LANDSCAPE_HEIGHT = 20

const CAMERA_DISTANCE = 500
const CAMERA_STEP = 0.01

export default class NoiseLandscape {

    // renderer for 3D environments
    renderer = WEBGL

    setup() {
        this.landscape = this.createLanscape()

        const center = createVector(
            (LANDSCAPE_WIDTH * LANDSCAPE_PANNEL_WIDTH) / 2,
            (LANDSCAPE_HEIGHT * LANDSCAPE_PANNEL_HEIGHT) / 2)

        this.camera = new CircularCamera(center, CAMERA_DISTANCE, CAMERA_STEP)
    }

    draw() {
        clear()
        background(118, 187, 207)
        this.drawLandscape()
        this.camera.update()
    }

    createLanscape() {
        /*
        * Width and Height are multiplied by two,
        * because each pannel dimention is made of two points.
        */
        let landscape = []
        let xoff = 0
        for (let x = 0; x < LANDSCAPE_WIDTH * 2; x++) {
            let yoff = 100
            landscape[x] = new Array(LANDSCAPE_HEIGHT)

            for (let y = 0; y < LANDSCAPE_HEIGHT * 2; y++) {
                const z = map(noise(xoff, yoff), 0, 1, 0, 100)
                landscape[x][y] = z
                yoff += 0.25
            }

            xoff += 0.25
        }

        return landscape
    }

    drawLandscape() {
        fill(52, 158, 93)
        for (let x = 0; x < LANDSCAPE_WIDTH; x += 1) {
            for (let y = 0; y < LANDSCAPE_HEIGHT; y += 1) {
                beginShape(LINES)
                this.drawVertex(x, y)
                this.drawVertex(x + 1, y)
                this.drawVertex(x + 1, y + 1)
                this.drawVertex(x, y + 1)
                endShape(CLOSE)
            }
        }
    }

    drawVertex(x, y) {
        const z = this.landscape[x][y]
        vertex(x * LANDSCAPE_PANNEL_WIDTH, y * LANDSCAPE_PANNEL_HEIGHT, z)
    }

}