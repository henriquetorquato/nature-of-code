export default class CameraPanel3D {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    setup() {
        this.sliders = new Array(6)
        for (let i = 0; i < this.sliders.length; i++) {
            if (i === 2) {
                this.sliders[i] = createSlider(10, 400, 200)
            } else {
                this.sliders[i] = createSlider(-400, 400, 0)
            }
            this.sliders[i].position(10, 20 * i)
            this.sliders[i].style('width', '80px')
        }

        textFont(window.font)
        textSize(20)
    }

    draw() {
        const x = this.sliders[0].value()
        const y = this.sliders[1].value()
        const z = this.sliders[2].value()
        const centerX = this.sliders[3].value()
        const centerY = this.sliders[4].value()
        const centerZ = this.sliders[5].value()

        fill(0)
        text(`X: ${x}`, 0, 0)

        camera(x, y, z, centerX, centerY, centerZ, 0, 1, 0)
    }

}