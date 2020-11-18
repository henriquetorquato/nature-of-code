const CIRCLE_DISTANCE = 24
const CIRCLE_SIZE = 48

export default class PerlinWave {

    setup() {
        this.startAngle = 0
    }

    draw() {
        clear()
        background(220)

        noStroke()
        fill(0, 0, 0, 100)

        for (let x = 0; x <= window.canvasWidth; x++)
        {
            if (x % CIRCLE_DISTANCE != 0) continue

            const angle = this.startAngle + (x * 0.001)
            const y = map(noise(angle), 0, 1, 0, window.canvasHeight)

            circle(x, y, CIRCLE_SIZE)
        }

        this.startAngle += 0.01
    }

}