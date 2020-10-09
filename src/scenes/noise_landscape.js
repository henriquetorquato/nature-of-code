import CameraPanel3D from '../entities/camera_panel_3d'

const LANDSCAPE_PANNEL_WIDTH = 50
const LANDSCAPE_PANNEL_HEIGHT = 50
const LANDSCAPE_WIDTH = 20
const LANDSCAPE_HEIGHT = 20

export default class NoiseLandscape {

    renderer = WEBGL

    setup() {
        this.cameraPanel = new CameraPanel3D()
        this.cameraPanel.setup()

        this.landscape = this.createLanscape()
        console.log(this.landscape)
    }

    draw() {
        clear()
        this.cameraPanel.draw()
        this.drawLandscape()
        // rotateX(frameCount * 0.01)
        // rotateZ(frameCount * 0.01)

        // camera(0, 0, 50, 0, 0, 0, 0, 1, 0)
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
                const z = map(noise(xoff, yoff), 0, 1, 0, 10)
                landscape[x][y] = z
                yoff += 0.01
            }

            xoff += 0.01
        }

        return landscape
    }

    drawLandscape() {
        // White panel color
        fill(255, 255, 255)

        // Draw vertical lines
        for (let x = 0; x < LANDSCAPE_WIDTH + 1; x++) {
            for (let y = 1; y < LANDSCAPE_HEIGHT + 1; y++) {
                const p1 = this.getLandscapeValue(x, y-1)
                const p2 = this.getLandscapeValue(x, y)

                beginShape(LINES)
                vertex(p1.x, p1.y, p1.z)
                vertex(p2.x, p2.y, p2.z)
                endShape()
            }
        }

        // Draw horizontal lines
        for (let y = 0; y < LANDSCAPE_HEIGHT + 1; y++) {
            for (let x = 1; x < LANDSCAPE_WIDTH + 1; x++) {
                const p1 = this.getLandscapeValue(x-1, y)
                const p2 = this.getLandscapeValue(x, y)

                beginShape(LINES)
                vertex(p1.x, p1.y, p1.z)
                vertex(p2.x, p2.y, p2.z)
                endShape()
            }
        }
    }

    getLandscapeValue(x, y) {
        return {
            x: x * LANDSCAPE_PANNEL_WIDTH,
            y: y * LANDSCAPE_PANNEL_HEIGHT,
            z: this.landscape[x][y]
        }
    }

}